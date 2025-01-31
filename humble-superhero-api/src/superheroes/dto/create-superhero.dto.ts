import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  @IsNotEmpty({ message: 'name must not be empty' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'superpower must not be empty' })
  superpower: string;

  @IsInt()
  @Min(1, { message: 'humilityScore must not be less than 1' })
  @Max(10, { message: 'humilityScore must not be greater than 10' })
  humilityScore: number;
}
