import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class CreateRestriccionDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  lista_uuid_estudiantes: string[];

  @IsString()
  razon: string;
}
