import { IsString, IsInt, IsOptional, Min, MaxLength } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @MaxLength(50)
  name!: string;  // ← Agrega ! para decirle a TS que se inicializará después

  @IsInt()
  @Min(0)
  age!: number;

  @IsString()
  breed!: string;

  @IsOptional()
  @IsString()
  color?: string;
}