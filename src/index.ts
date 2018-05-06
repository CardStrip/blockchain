import { main, BlockchainService } from 'app/server';

const bootstrap = async () => {
    return await main();
};

bootstrap()
    .then((app) => {
        console.info('app booted');
    })
    .catch(err => console.error(err));