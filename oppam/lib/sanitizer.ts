/**
 * Simple sanitization utility to strip HTML tags and prevent basic XSS.
 */
export function sanitize(str: unknown): string {
    if (typeof str !== "string") return "";

    return str
        .replace(/<[^>]*>?/gm, "") // Strip HTML tags
        .replace(/[<>]/g, "")      // Strip any remaining brackets
        .trim();
}

/**
 * Sanitizes all string values in an object.
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
    const sanitized = { ...obj };
    for (const key in sanitized) {
        if (typeof sanitized[key] === "string") {
            sanitized[key] = sanitize(sanitized[key]) as any;
        }
    }
    return sanitized;
}
