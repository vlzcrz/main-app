import { IsArray, IsString } from 'class-validator';
import { DataCalificacion } from './data-calificacion.dto';

export class CreateCalificacionDto {
  @IsString()
  studentId: string;

  @IsArray()
  grades: DataCalificacion[];
}
