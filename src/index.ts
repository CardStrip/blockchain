import { bootstrap } from './server/app/main';
import { P2pServer } from './server/p2p-server';
import { Blockchain } from 'server/blockchain';
import { BlockchainService } from 'server/app/services/blockchain.service';

const boot = async () => {
    const app = await bootstrap();
    const service = app.get<BlockchainService>(BlockchainService);
    const p2p = new P2pServer(service.blockchain);
};

boot().catch(err => console.error(err));