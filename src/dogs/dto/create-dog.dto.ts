import { IsString, IsInt, IsOptional, Min, Max, IsBoolean, IsNumber } from 'class-validator';

export class CreateDogDto {
  @IsString()
  name!: string;

  @IsInt()
  @Min(0)
  @Max(30)
  age!: number;

  @IsString()
  breed!: string;

  @IsNumber()
  @Min(1)
  @Max(150)
  weight!: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsBoolean()
  vaccinated?: boolean;
}