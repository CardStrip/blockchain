import { Injectable } from '@nestjs/common';

import * as WebSocket from 'ws';

import { Blockchain } from '../blockchain';
import { Transaction, TransactionPool } from '../transaction';
import { MessageTypes } from './message.types';
import { P2P_PEERS, P2P_PORT } from '../config';

@Injectable()
export class MessageServer {
    private sockets: WebSocket[];

    constructor(
        private blockchain: Blockchain,
        private trxPool: TransactionPool,
    ) {
        this.sockets = [];
    }

    public listen() {
        const server = new WebSocket.Server({
            port: P2P_PORT,
        });
        server.on('connection', (socket: WebSocket) => {
            this.connectSocket(socket);
        });

        this.connectToPeers();

        console.info(`Listening for peer-to-peer connection on: ${P2P_PORT}`);
    }

    private connectToPeers() {
        P2P_PEERS.forEach(peer => {
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
                case MessageTypes.chain:
                    this.blockchain.replaceChain(data.chain);
                    break;
                case MessageTypes.transaction:
                    this.trxPool.updateOrAddTransaction(data.transaction);
                    break;
                case MessageTypes.clear:
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
            type: MessageTypes.chain,
            chain: this.blockchain.chain,
        }));
    }

    private sendTransaction(socket: WebSocket, transaction: Transaction) {
        socket.send(JSON.stringify({
            type: MessageTypes.transaction,
            transaction,
        }));
    }

    public broadcastClearTransactions() {
        this.sockets.forEach(socket => socket.send(JSON.stringify({
            type: MessageTypes.clear,
        })));
    }

}
