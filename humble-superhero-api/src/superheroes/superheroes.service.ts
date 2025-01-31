import { Injectable } from '@nestjs/common';
import { Superhero } from './superheroes.model';
import { superheroes } from './superheroes.data';

@Injectable()
export class SuperheroesService {
  /**
   * In-memory array of superheroes. Initially populated with predefined heroes.
   * This array acts as a simple in-memory database.
   */
  private superheroes: Superhero[] = [...superheroes];

  /**
   * Adds a new superhero to the list.
   * 
   * @param name - The name of the superhero.
   * @param superpower - The superhero's unique ability.
   * @param humilityScore - A score (1-10) representing the hero's humility.
   * @returns The newly added superhero.
   */
  addSuperhero(name: string, superpower: string, humilityScore: number): Superhero {
    // Create a new superhero object
    const newHero: Superhero = { name, superpower, humilityScore };
    
    // Add the new hero to the list
    this.superheroes.push(newHero);
    
    return newHero; // Return the created superhero
  }

  /**
   * Retrieves all superheroes, sorted by humility score in descending order.
   * 
   * @returns A sorted list of superheroes, with the most humble heroes first.
   */
  getSuperheroes(): Superhero[] {
    return [...this.superheroes].sort((a, b) => b.humilityScore - a.humilityScore);
  }
}
