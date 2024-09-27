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

  @Post()
  create(@Body() createRestriccionDto: CreateRestriccionDto) {
    return this.restriccionService.create(createRestriccionDto);
  }

  @Get()
  findAll() {
    return this.restriccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restriccionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestriccionDto: UpdateRestriccionDto,
  ) {
    return this.restriccionService.update(+id, updateRestriccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restriccionService.remove(+id);
  }
}
