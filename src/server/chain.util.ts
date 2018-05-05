const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const uuidV1 = require('uuid/v1');
export class ChainUtil {

    public static GenKeyPair() {
        return ec.genKeyPair();
    }

    public static id() {
        return uuidV1();
    }

    constructor() {}
}
