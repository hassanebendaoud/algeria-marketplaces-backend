import path from 'path';

const keysConfig = {
    publicKeyPath: path.join(__dirname, 'keys', 'id_rsa_pub.pem'),
    privateKeyPath: path.join(__dirname, 'keys', 'id_rsa_priv.pem'),
};

export default keysConfig;
