import { bootstrap } from './app/server/main';
import { MessageServer } from './app/server/websocket';
import { Blockchain } from './app/server/blockchain';
import { AppService } from './app/server/blockchain.service';
import { Wallet } from './app/server/wallet';

const boot = async () => {
    const app = await bootstrap();
    const service = app.get<AppService>(AppService);
    service.server.listen();
    return service;
};

boot()
    .then((service) => {
        console.info(service.wallet.toString());
    })
    .catch(err => console.error(err));