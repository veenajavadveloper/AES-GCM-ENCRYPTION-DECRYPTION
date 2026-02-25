import * as crypto from "crypto";

// Generate AES-256-GCM key
export function generateKey(): Buffer {
  return crypto.randomBytes(32);
}

// Encrypt a string
export function encrypt(plaintext: string, key: Buffer) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
    authTag: authTag.toString("hex")
  };
}

// Decrypt AES-256-GCM payload
export function decrypt(
  payload: { iv: string; content: string; authTag: string },
  key: Buffer
) {
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(payload.iv, "hex")
  );
  decipher.setAuthTag(Buffer.from(payload.authTag, "hex"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(payload.content, "hex")),
    decipher.final()
  ]);
  return decrypted.toString("utf8");
}