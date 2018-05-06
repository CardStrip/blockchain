import { NestFactory } from '@nestjs/core';

import { BlockchainModule } from './blockchain.module';
import { HTTP_PORT } from './config';
import { BlockchainService } from './blockchain.service';

export async function main() {
  const app = await NestFactory.create(BlockchainModule);
  await app.listen(HTTP_PORT);
  const service = app.get<BlockchainService>(BlockchainService);
  service.server.listen();
  return app;
}
