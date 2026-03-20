import crypto from "crypto";

// Ensure a safe 32-byte key is derived from the environment variable. 
// If it's missing, it will generate a random one for development (which resets on server restart).
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString("hex");

function getKey(): Buffer {
  const key = Buffer.from(ENCRYPTION_KEY, "hex");
  if (key.length !== 32) {
    // If not exactly 32 bytes, hash it to make it exactly 32 bytes
    return crypto.createHash("sha256").update(String(ENCRYPTION_KEY)).digest();
  }
  return key;
}

export function encrypt(text: string): string {
  if (!text) return text;
  try {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", getKey(), iv);
    const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return `enc:${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
  } catch (err) {
    console.error("Encryption failed", err);
    return text;
  }
}

export function decrypt(encText: string): string {
  if (!encText || !encText.startsWith("enc:")) return encText; // If not encrypted, return as is (for backwards compatibility)
  
  try {
    const parts = encText.substring(4).split(":");
    if (parts.length !== 3) return encText;
    
    const [ivHex, authTagHex, encryptedHex] = parts;
    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      getKey(),
      Buffer.from(ivHex, "hex")
    );
    decipher.setAuthTag(Buffer.from(authTagHex, "hex"));
    
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedHex, "hex")),
      decipher.final(),
    ]);
    return decrypted.toString("utf8");
  } catch (err) {
    console.warn("Decryption failed", err);
    return "[Encrypted/Unreadable Data]";
  }
}
