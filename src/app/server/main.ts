import { NestFactory } from '@nestjs/core';
import { BlockchainModule } from './blockchain.module';

const  HTTP_PORT = process.env.HTTP_PORT || 3001;
export async function bootstrap() {
  const app = await NestFactory.create(BlockchainModule);
  await app.listen(HTTP_PORT);
  return app;
}
