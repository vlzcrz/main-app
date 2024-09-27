import { Module } from '@nestjs/common';
import { RestriccionService } from './restriccion.service';
import { RestriccionController } from './restriccion.controller';

@Module({
  controllers: [RestriccionController],
  providers: [RestriccionService],
})
export class RestriccionModule {}
