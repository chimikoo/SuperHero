import { Module } from '@nestjs/common';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';

/**
 * The `SuperheroesModule` is responsible for managing superhero-related functionality.
 * 
 * This module organizes the `SuperheroesController` (which handles API requests)
 * and the `SuperheroesService` (which handles business logic and data management).
 */
@Module({
  controllers: [SuperheroesController], // Handles incoming HTTP requests
  providers: [SuperheroesService], // Contains the business logic for superheroes
})
export class SuperheroesModule {}
