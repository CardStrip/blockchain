export const INITIAL_BALANCE = 500;
export const DIFFICULITY = 1;
export const MINING_RATE = 3000;
export const MINING_REWARD = 50;
export const HTTP_PORT = process.env.HTTP_PORT || 3001;
export const P2P_PORT = Number(process.env.P2P_PORT || 5001);
export const P2P_PEERS: string[] = process.env.PEERS ? process.env.PEERS.split(',') : [];
