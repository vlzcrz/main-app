import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRestriccionDto } from './dto/create-restriccion.dto';
import { UpdateRestriccionDto } from './dto/update-restriccion.dto';
import axios from 'axios';
import { Estudiante } from 'src/interfaces/estudiante.interface';

@Injectable()
export class RestriccionService {
  async crearRestriccion(createRestriccionDto: CreateRestriccionDto) {
    const { lista_uuid_estudiantes, razon } = createRestriccionDto;

    const isInEstudiantes = (estudiante, id) => {
      return estudiante.id === id;
    };

    try {
      const responseGetEstudiantes = await axios.get(
        `${process.env.USER_SERVICE_HOST}/Estudiantes/Estudiantes`,
      );
      const listaEstudiantes: Estudiante[] = responseGetEstudiantes.data.data;
      const restricciones_await = lista_uuid_estudiantes.map(
        async (uuid_estudiante) => {
          const existeEstudiante = listaEstudiantes.find((estudiante) =>
            isInEstudiantes(estudiante, uuid_estudiante),
          );
          if (!existeEstudiante) return null;
          const responsePostRestriccion = await axios.post(
            `${process.env.RESTRICTION_SERVICE_HOST}/api/restriction`,
            {
              uuid_estudiante: uuid_estudiante,
              razon: razon,
            },
          );
          return responsePostRestriccion.data;
        },
      );

      const restricciones = await Promise.all(restricciones_await);

      const restricciones_validadas = restricciones.filter(
        (restriccion) => restriccion !== null,
      );

      //agregar la restriccion al search service

      if (restricciones_validadas.length == 0)
        throw new BadRequestException(
          'Las uuid de los estudiantes provistos no son correctos, intentelo nuevamente',
        );
      return restricciones_validadas;
    } catch (error) {
      console.log(error);
      return error.response;
    }
    return;
  }

  create(createRestriccionDto: CreateRestriccionDto) {
    return 'This action adds a new restriccion';
  }

  findAll() {
    return `This action returns all restriccion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restriccion`;
  }

  update(id: number, updateRestriccionDto: UpdateRestriccionDto) {
    return `This action updates a #${id} restriccion`;
  }

  remove(id: number) {
    return `This action removes a #${id} restriccion`;
  }
}
