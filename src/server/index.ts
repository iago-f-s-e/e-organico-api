import { NestFactory } from '@nestjs/core';
import { Modules } from '@src/modules';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import { PORT } from './settings';
import { ContainerInterceptor } from './interceptors';

async function bootstrap(): Promise<any> { // eslint-disable-line 
  const app = await NestFactory.create(Modules);

  app.useGlobalInterceptors(new ContainerInterceptor());

  app.use(express.text());
  app.use(cors());
  app.use(helmet());

  return app.listen(PORT, () => {
    console.log('==============================');
    console.log(`Server running on port: ${PORT} =`);
    console.log('==============================');
  });
}

const server = { bootstrap };

export default server;
