import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Get()
  getSuperheroes() {
    return this.superheroesService.getSuperheroes();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  addSuperhero(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.superheroesService.addSuperhero(
      createSuperheroDto.name,
      createSuperheroDto.superpower,
      createSuperheroDto.humilityScore,
    );
  }
}
