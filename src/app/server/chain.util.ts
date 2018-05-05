import { SHA256 } from 'crypto-js';
import { v1 } from 'uuid';

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

export class ChainUtil {

    public static genKeyPair() {
        return ec.genKeyPair();
    }

    public static id() {
        return v1();
    }

    public static hash(data: any) {
        return SHA256(JSON.stringify(data)).toString();
    }

    public static verifySignature(publicKey: string, signature: string, dataHash: string) {
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
    }

}
