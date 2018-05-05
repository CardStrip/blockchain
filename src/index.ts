import { bootstrap } from './server/app/main';
import { P2pServer } from './server/p2p-server';
import { Blockchain } from 'server/blockchain';
import { AppService } from 'server/app/app.service';
import { Wallet } from 'server/wallet';

const boot = async () => {
    const app = await bootstrap();
    const service = app.get<AppService>(AppService);
    service.server.listen();
    return service.blockchain;
};

boot()
    .then((blockchain) => {
        const wallet = new Wallet();
        console.info(wallet.toString());
    })
    .catch(err => console.error(err));