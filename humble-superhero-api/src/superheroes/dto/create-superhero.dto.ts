import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

/**
 * DTO (Data Transfer Object) for creating a new Superhero.
 * 
 * - Ensures **input validation** before reaching the service layer.
 * - Provides **clear error messages** when validation fails.
 */
export class CreateSuperheroDto {
  /**
   * Superhero's name (required).
   * 
   * - Must be a **string**.
   * - Cannot be **empty**.
   */
  @IsString()
  @IsNotEmpty({ message: 'name must not be empty' })
  name: string;

  /**
   * Superhero's superpower (required).
   * 
   * - Must be a **string**.
   * - Cannot be **empty**.
   */
  @IsString()
  @IsNotEmpty({ message: 'superpower must not be empty' })
  superpower: string;

  /**
   * Superhero's humility score (required).
   * 
   * - Must be an **integer**.
   * - Minimum value: **1** (Most arrogant hero).
   * - Maximum value: **10** (Most humble hero).
   * - Provides specific error messages when the value is out of range.
   */
  @IsInt()
  @Min(1, { message: 'humilityScore must not be less than 1' })
  @Max(10, { message: 'humilityScore must not be greater than 10' })
  humilityScore: number;
}
