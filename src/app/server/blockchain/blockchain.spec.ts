import { Blockchain } from './blockchain';
import { Block } from '../block';

describe('Blockchain', () => {
    let blockchain1: Blockchain;
    let blockchain2: Blockchain;

    beforeEach(() => {
        blockchain1 = new Blockchain();
        blockchain2 = new Blockchain();
    });
    it('should start with genesis block', () => {
        expect(blockchain1.chain[0]).toEqual(Block.genesis());
    });

    it('should add new block', () => {
        const data = 'foo';
        blockchain1.addBlock(data);
        expect(blockchain1.chain[blockchain1.chain.length - 1].data).toEqual(data);
    });

    it('should validate a valid chain', () => {
        blockchain2.addBlock('bar');

        expect(Blockchain.isValid(blockchain2.chain)).toBe(true);
    });

    it('should invalidate a chain with an invalid genesis block', () => {
        blockchain2.chain[0].data = 'foo';

        expect(Blockchain.isValid(blockchain2.chain)).toBe(false);
    });

    it('should invalidate a chain with a invalid chain', () => {
        blockchain2.addBlock('foo');
        blockchain2.chain[1].data = 'not foo';

        expect(Blockchain.isValid(blockchain2.chain)).toBe(false);
    });

    it('should replace current chan with valid and longer new chain', () => {
        blockchain2.addBlock('boo');
        blockchain1.replaceChain(blockchain2.chain);

        expect(blockchain1.chain).toEqual(blockchain2.chain);
    });

    it('should not replace chain with invalid or shorter new chain', () => {
        blockchain1.addBlock('foo');
        blockchain1.replaceChain(blockchain2.chain);

        expect(blockchain1.chain).not.toEqual(blockchain2.chain);
    });
});

// it('', () => {});