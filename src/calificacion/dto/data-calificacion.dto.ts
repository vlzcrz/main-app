import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class DataCalificacion {
  @IsString()
  subject: string;
  @IsString()
  gradeName: string;
  @IsNumber()
  @Min(1)
  @Max(7)
  gradeValue: number;
  @IsString()
  @IsOptional()
  comment: string;
}
