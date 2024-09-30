import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RestriccionService } from './restriccion.service';
import { CreateRestriccionDto } from './dto/create-restriccion.dto';
import { UpdateRestriccionDto } from './dto/update-restriccion.dto';

@Controller('restriccion')
export class RestriccionController {
  constructor(private readonly restriccionService: RestriccionService) {}

  @Post('crear')
  crearRestriccion(@Body() createRestriccionDto: CreateRestriccionDto) {
    return this.restriccionService.crearRestriccion(createRestriccionDto);
  }
}
