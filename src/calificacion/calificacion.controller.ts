import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CalificacionService } from './calificacion.service';
import { CreateCalificacionDto } from './dto/create-calificacion.dto';
import { UpdateCalificacionDto } from './dto/update-calificacion.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('calificacion')
export class CalificacionController {
  constructor(private readonly calificacionService: CalificacionService) {}

  @Post('asignar')
  @UseGuards(AuthGuard('jwt'))
  asignarCalificacion(
    @Body() createListCalificacionDto: CreateCalificacionDto,
  ) {
    return this.calificacionService.asignarCalificacion(
      createListCalificacionDto,
    );
  }
}
