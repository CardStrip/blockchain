import { Block } from './block';

describe('Block', () => {
    let data: any, lastBlock: Block, block: Block;
    beforeEach(() => {
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });
    it('should match `data` input', () => {
        expect(block.data).toEqual(data);
    });
    it('should match `lastHash` input', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });
});