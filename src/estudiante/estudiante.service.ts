import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import axios from 'axios';
import { Estudiante } from 'src/interfaces/estudiante.interface';

@Injectable()
export class EstudianteService {
  async crearEstudiante(createEstudianteDto: CreateEstudianteDto) {
    const { nombre, apellido, email } = createEstudianteDto;
    const isInEstudiantes = (estudiante) => {
      return estudiante.email === email;
    };
    try {
      const response = await axios.get(
        `${process.env.USER_SERVICE_HOST}/Estudiantes/Estudiantes`,
      );
      const listaEstudiantes: Estudiante[] = response.data.data;
      const existeEstudiante = listaEstudiantes.find(isInEstudiantes);

      if (existeEstudiante)
        throw new BadRequestException(
          'El estudiante con los datos enviados ya existe',
        );

      const postEstudiante = await axios.post(
        `${process.env.USER_SERVICE_HOST}/Estudiantes/Estudiantes`,
        createEstudianteDto,
      );

      //falta agregar al estudiante al search
      return postEstudiante.data;
    } catch (error) {
      return error.response;
    }
  }

  findAll() {
    return `This action returns all estudiante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estudiante`;
  }

  update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
