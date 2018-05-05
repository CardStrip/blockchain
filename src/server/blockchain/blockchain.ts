import { Block } from '../block';

export class Blockchain {
    public chain: Block[];

    public static isValid(chain: Block[]): boolean {
        let isValid = true;
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            isValid = false;
        }

        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i - 1];

            if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) {
                isValid = false;
            }
        }
        return isValid;
    }

    constructor() {
        this.chain = [Block.genesis()];
    }

    public getLastBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    public  getFirstBlock(): Block {
        return this.chain[0];
    }

    public addBlock(data: any) {
        const block = Block.mineBlock(this.getLastBlock(), data);
        this.chain.push(block);

        return block;
    }

    public replaceChain(newChain: Block[]) {
        if (newChain.length <= this.chain.length) {
            console.warn('Received chain the is not longer than the current chain');
            return;
        } else if (!Blockchain.isValid(newChain)) {
            console.warn('The received chain is not valid');
            return;
        }

        console.info('Replacing blockchain with longer valid chain');
        this.chain = newChain;
    }
}