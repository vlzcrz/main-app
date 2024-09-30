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
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post('crear')
  @UseGuards(AuthGuard('jwt'))
  crearEstudiante(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudianteService.crearEstudiante(createEstudianteDto);
  }
}
