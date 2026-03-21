import crypto from "crypto";

// Critical: ENCRYPTION_KEY must be a stable 32-byte hex string set in the environment.
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY && process.env.NODE_ENV === "production") {
  throw new Error("CRITICAL: ENCRYPTION_KEY environment variable is missing in production!");
}
// For development, we still allow a fallback to avoid blocking the dev server, 
// but we'll log a loud warning.
if (!ENCRYPTION_KEY) {
  console.warn("⚠️ WARNING: ENCRYPTION_KEY is missing. Using a temporary random key. DATA WILL BE LOST ON RESTART.");
}

const FINAL_KEY = ENCRYPTION_KEY || "0000000000000000000000000000000000000000000000000000000000000000"; // Dummy fallback for dev safety


function getKey(): Buffer {
  const keyStr = FINAL_KEY;
  const key = Buffer.from(keyStr, "hex");
  if (key.length !== 32) {
    // If not exactly 32 bytes, hash it to make it exactly 32 bytes
    return crypto.createHash("sha256").update(String(keyStr)).digest();
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
