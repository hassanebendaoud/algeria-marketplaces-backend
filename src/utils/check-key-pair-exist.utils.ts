import fs from 'fs';

import { keysConfig } from '@config/index';
import utils from '@utils/index';

const checkKeyPairExist = () => {
    // Path to the public key file
    const publicKeyPath = keysConfig.publicKeyPath;

    // Path to the private key file
    const privateKeyPath = keysConfig.privateKeyPath;

    try {
        // Check if the public key exists
        if (!fs.existsSync(publicKeyPath)) {
            throw new Error('Public key pair not found');
        } else {
            console.log(`Public key is found at ${publicKeyPath}`);
        }

        // Check if the private key exists
        if (!fs.existsSync(privateKeyPath)) {
            throw new Error('Private key pair not found');
        } else {
            console.log(`Private key is found at ${privateKeyPath}`);
        }
    } catch (error: unknown) {
        utils.handleCatchError(error);
    }
};

export default checkKeyPairExist;
