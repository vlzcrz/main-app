import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CalificacionModule } from './calificacion/calificacion.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { RestriccionModule } from './restriccion/restriccion.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    CalificacionModule,
    EstudianteModule,
    RestriccionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
