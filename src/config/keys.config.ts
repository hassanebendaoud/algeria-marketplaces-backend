import path from "path";

export const keysConfig = {
  publicKeyPath: path.join(__dirname, "keys", "id_rsa_pub.pem"),
  privateKeyPath: path.join(__dirname, "keys", "id_rsa_priv.pem"),
};
