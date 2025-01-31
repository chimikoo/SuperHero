import { Injectable } from '@nestjs/common';
import { Superhero } from './superheroes.model';
import { superheroes } from './superheroes.data';

@Injectable()
export class SuperheroesService {
  private superheroes: Superhero[] = [...superheroes];

  addSuperhero(name: string, superpower: string, humilityScore: number): Superhero {
    const newHero: Superhero = { name, superpower, humilityScore };
    this.superheroes.push(newHero);
    return newHero;
  }

  getSuperheroes(): Superhero[] {
    return [...this.superheroes].sort((a, b) => b.humilityScore - a.humilityScore);
  }
}
