import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCalificacionDto } from './dto/create-calificacion.dto';
import { UpdateCalificacionDto } from './dto/update-calificacion.dto';
import axios from 'axios';
import { Estudiante } from 'src/interfaces/estudiante.interface';

@Injectable()
export class CalificacionService {
  async asignarCalificacion(createCalificacionDto: CreateCalificacionDto[]) {
    const existeEstudiante = (estudiante, studentId) => {
      return estudiante.id === studentId;
    };

    try {
      const responseEstudiantes = await axios.get(
        `${process.env.USER_SERVICE_HOST}/Estudiantes/Estudiantes`,
      );

      const listaEstudiantes: Estudiante[] = responseEstudiantes.data.data;
      const calificacionesAsignadas = createCalificacionDto.filter(
        (calificacion) => {
          const estudiante = listaEstudiantes.find((estudiante) => {
            return existeEstudiante(estudiante, calificacion.studentId); // Cambia uuid_estudiante por studentId
          });

          //vamos a simular que tenemos una restriccion ()
          // tanto tanto await axios host
          // response.data
          if (estudiante) return estudiante; //esto se cmabia y ya tenido el estudiante debemos de validaro ahora que el estudiante no tenga restricciones,
          //si no tiene restricciones entonces debemos de insertar la calificacion en el search service, y luego ya no hacer nada.
        },
      );

      return calificacionesAsignadas; // Asegúrate de devolver esto
    } catch (error) {
      console.error(error); // Para ver el error en consola
      return { error: error.message }; // Cambiado para asegurarte de que devuelves algo útil
    }
  }

  findAll() {
    return `This action returns all calificacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} calificacion`;
  }

  update(id: number, updateCalificacionDto: UpdateCalificacionDto) {
    return `This action updates a #${id} calificacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} calificacion`;
  }
}
