import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CalificacionService } from './calificacion.service';
import { CreateCalificacionDto } from './dto/create-calificacion.dto';
import { UpdateCalificacionDto } from './dto/update-calificacion.dto';

@Controller('calificacion')
export class CalificacionController {
  constructor(private readonly calificacionService: CalificacionService) {}

  @Post('asignar')
  asignarCalificacion(
    @Body() createListCalificacionDto: CreateCalificacionDto[],
  ) {
    return this.calificacionService.asignarCalificacion(
      createListCalificacionDto,
    );
  }

  @Get()
  findAll() {
    return this.calificacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calificacionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCalificacionDto: UpdateCalificacionDto,
  ) {
    return this.calificacionService.update(+id, updateCalificacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calificacionService.remove(+id);
  }
}
