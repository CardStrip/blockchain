import { bootstrap } from './server/app/main';
import { P2pServer } from './server/p2p-server';
import { Blockchain } from 'server/blockchain';
import { AppService } from 'server/app/app.service';

const boot = async () => {
    const app = await bootstrap();
    const service = app.get<AppService>(AppService);
    service.server.listen();
};

boot().catch(err => console.error(err));