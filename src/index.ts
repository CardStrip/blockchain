import { bootstrap } from './server/app/main';
import { P2pServer } from './server/p2p-server';
import { Blockchain } from 'server/blockchain';
import { AppService } from 'server/app/app.service';

const boot = async () => {
    const app = await bootstrap();
    const service = app.get<AppService>(AppService);
    service.server.listen();
    return service.blockchain;
};

boot()
    .then((blockchain) => {
        for (let i = 0; i < 10; i++) {
            console.info(blockchain.addBlock(`foo ${i + 1}`).toString());
        }
    })
    .catch(err => console.error(err));