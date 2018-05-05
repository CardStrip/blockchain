import { Blockchain } from './blockchain';
import * as WebSocket from 'ws';
import { TransactionPool, Transaction } from './transaction';

enum MESSAGE_TYPES {
    chain = 'CHAIN',
    transaction = 'TRANSACTION',
    clear = 'CLEAR',
}

export class P2pServer {
    private sockets: WebSocket[];
    private P2P_PORT = Number(process.env.P2P_PORT || 5001);
    private peers: string[] = process.env.PEERS ? process.env.PEERS.split(',') : [];

    constructor(
        private blockchain: Blockchain,
        private trxPool: TransactionPool,
    ) {
        this.sockets = [];
    }

    public listen() {
        const server = new WebSocket.Server({
            port: this.P2P_PORT,
        });
        server.on('connection', (socket: WebSocket) => {
            this.connectSocket(socket);
        });

        this.connectToPeers();

        console.info(`Listening for peer-to-peer connection on: ${this.P2P_PORT}`);
    }

    private connectToPeers() {
        this.peers.forEach(peer => {
            const socket = new WebSocket(peer);

            socket.addEventListener('open', () => this.connectSocket(socket));
            // socket.addEventListener('disconnect', () => this.sockets.splice(this.sockets.indexOf(socket), 1));
            // socket.addEventListener('error', () => this.sockets.splice(this.sockets.indexOf(socket), 1));
        });
    }

    private connectSocket(socket: WebSocket) {
        this.sockets.push(socket);
        console.info('Socket connected');

        this.messageHandler(socket);
        this.sendChain(socket);
    }

    private messageHandler(socket: WebSocket) {
        socket.addEventListener('message', (message) => {
            const data =  JSON.parse(message.data);

            switch (data.type) {
                case MESSAGE_TYPES.chain:
                    this.blockchain.replaceChain(data.chain);
                    break;
                case MESSAGE_TYPES.transaction:
                    this.trxPool.updateOrAddTransaction(data.transaction);
                    break;
                case MESSAGE_TYPES.clear:
                    this.trxPool.clear();
                    break;
                default:
                    console.warn('Unknown message type');
                    break;
            }
        });
    }

    public sync() {
        this.sockets.forEach(socket => this.sendChain(socket));
    }

    public broadcast(trx: Transaction) {
        this.sockets.forEach(socket => this.sendTransaction(socket, trx));
    }

    private sendChain(socket: WebSocket) {
        socket.send(JSON.stringify({
            type: MESSAGE_TYPES.chain,
            chain: this.blockchain.chain,
        }));
    }

    private sendTransaction(socket: WebSocket, transaction: Transaction) {
        socket.send(JSON.stringify({
            type: MESSAGE_TYPES.transaction,
            transaction,
        }));
    }

    public broadcastClearTransactions() {
        this.sockets.forEach(socket => socket.send(JSON.stringify({
            type: MESSAGE_TYPES.clear,
        })));
    }

}
