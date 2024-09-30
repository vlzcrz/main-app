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
  async asignarCalificacion(createCalificacionDto: CreateCalificacionDto) {
    const { studentId, grades } = createCalificacionDto;
    const gradesListCommented = grades.map((grade) => {
      if (grade.comment == null) grade.comment = '';
      return grade;
    });
    try {
      const responseEstudiantes = await axios.get(
        `${process.env.USER_SERVICE_HOST}/Estudiantes/Estudiantes`,
      );

      const listaEstudiantes: Estudiante[] = responseEstudiantes.data.data;
      const estudiante = listaEstudiantes.find((estudiante) =>
        this.existeEstudiante(estudiante, studentId),
      );
      if (!estudiante) {
        throw new NotFoundException(
          `No se ha encontrado el estudiante con uuid: ${studentId}`,
        );
      }

      const responseValidateRestriccion = await axios.get(
        `${process.env.RESTRICTION_SERVICE_HOST}/api/restriction/validate/${studentId}`,
      );
      if (responseValidateRestriccion.data.validation)
        throw new BadRequestException(
          `${responseValidateRestriccion.data.message}`,
        );
      // Procedo a formatear la data para ingresar las calificaciones a grades service
      const gradesServiceGrades = gradesListCommented.map((grade) => {
        return {
          ...grade,
          studentId: studentId,
        };
      });
      const responseGradesService =
        await this.enviarCalificacionesGrades(gradesServiceGrades);

      // Procedo a formatear la data para ingresar las calificaciones a search service
      const gradesServiceSearch = responseGradesService.map((grade) => {
        return {
          gradeId: grade.id,
          course: grade.subject,
          gradeName: grade.gradeName,
          gradeValue: grade.gradeValue,
          comment: grade.comment,
        };
      });
      const ejemplo = await this.enviarCalificacionesSearch(
        gradesServiceSearch,
        studentId,
      );
      return {
        ...estudiante,
        gradesServiceSearch,
      };
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  }

  async enviarCalificacionesGrades(gradesServiceGrades) {
    const promises = gradesServiceGrades.map((elemento) =>
      axios
        .post(`${process.env.GRADES_SERVICE_HOST}/api/Grades`, elemento)
        .then((response) => response.data)
        .catch((error) => {
          console.error('Error en la petición:', error);
          return null; // Manejo de errores
        }),
    );

    const respuestas = await Promise.all(promises);
    return respuestas; // Aquí tienes las respuestas
  }

  async enviarCalificacionesSearch(gradesServiceSearch, uuid_estudiante) {
    const promises = gradesServiceSearch.map((elemento) =>
      axios
        .post(
          `${process.env.SEARCH_SERVICE_HOST}/api/manage/student/${uuid_estudiante}/grade`,
          elemento,
        )
        .then((response) => response.data)
        .catch((error) => {
          console.error('Error en la petición:', error);
          return null; // Manejo de errores
        }),
    );

    const respuestas = await Promise.all(promises);

    return respuestas;
  }

  existeEstudiante = (estudiante, studentId) => {
    return estudiante.id === studentId;
  };
}
