import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateCalificacionDto {
  @IsString()
  studentId: string;
  @IsString()
  subjectName: string;
  @IsString()
  gradeName: string;
  @IsNumber()
  @Min(1)
  @Max(7)
  grade: number;
  @IsString()
  @IsOptional()
  comment: string;
}
