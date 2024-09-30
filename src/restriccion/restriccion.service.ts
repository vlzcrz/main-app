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

      const restricciones_search_await = restricciones_validadas.map(
        async (restriccion) => {
          const responsePostRestriccion = await axios.post(
            `${process.env.SEARCH_SERVICE_HOST}/api/manage/student/${restriccion.uuid_estudiante}/restriction`,
            {
              restrictionId: restriccion.uuid_restriccion,
              reason: restriccion.razon,
              creationDate: restriccion.fecha_creacion,
            },
          );
          return responsePostRestriccion.data;
        },
      );

      const resp = await Promise.all(restricciones_search_await);
      console.log(resp);
      return restricciones_validadas;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
}
