import crypto from "crypto";
import fs from "fs";
import { keysConfig } from "../config/keys.config";

const generateKeyPair = () => {
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1", // Public Key Cryptography Standards 1
      format: "pem", // Privacy Enhanced Mail
    },
    privateKeyEncoding: {
      type: "pkcs1", // Public Key Cryptography Standards 1
      format: "pem", // Privacy Enhanced Mail
    },
  });

  // Path to the public key file
  const publicKeyPath = keysConfig.publicKeyPath;
  // Create the public key file
  fs.writeFileSync(publicKeyPath, keyPair.publicKey);
  console.log(`Public key is saved to ${publicKeyPath}`);

  // Path to the private key file
  const privateKeyPath = keysConfig.privateKeyPath;
  // Create the private key file
  fs.writeFileSync(privateKeyPath, keyPair.privateKey);
  console.log(`Private key is saved to ${privateKeyPath}`);
};

export default generateKeyPair;
