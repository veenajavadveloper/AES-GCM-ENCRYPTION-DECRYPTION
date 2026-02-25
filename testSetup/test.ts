import { generateKey, encrypt, decrypt } from "../src/index.ts";

console.log("=== AES-GCM Test Start ===");

// Step 1: Generate key
const key = generateKey();
console.log("Key:", key.toString("hex"));


// Step 2: Encrypt message
const message = "Hello AES-GCM encryption and decryption!";
const encrypted = encrypt(message, key);
console.log("Encrypted:", encrypted);

// Step 3: Decrypt message
const decrypted = decrypt(encrypted, key);
console.log("Decrypted:", decrypted);

// Step 4: Verify
console.log(decrypted === message ? "✅ Success!" : "❌ Failure!");