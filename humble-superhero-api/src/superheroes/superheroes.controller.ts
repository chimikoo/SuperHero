import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

/**
 * Controller for handling superhero-related requests.
 * It defines routes to retrieve and add superheroes.
 */
@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  /**
   * GET /superheroes
   * Retrieves a list of superheroes sorted by humility score.
   * 
   * @returns {Superhero[]} - Array of superheroes sorted in descending order.
   */
  
  @Get()
  getSuperheroes() {
    return this.superheroesService.getSuperheroes();
  }

  /**
   * POST /superheroes
   * Adds a new superhero to the database.
   * Uses ValidationPipe to ensure that the input data follows the expected format.
   * 
   * @param {CreateSuperheroDto} createSuperheroDto - The superhero data (name, superpower, humility score).
   * @returns {Superhero | { error: string }} - The added superhero or an error message if validation fails.
   */

  @Post()
  @UsePipes(new ValidationPipe()) // Applies automatic validation based on DTO rules
  addSuperhero(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.superheroesService.addSuperhero(
      createSuperheroDto.name,
      createSuperheroDto.superpower,
      createSuperheroDto.humilityScore,
    );
  }
}
