/**
 * Represents a superhero entity.
 * This model defines the structure of a superhero object.
 */
export class Superhero {
  /**
   * The name of the superhero (e.g., "Spider-Man", "Iron Man").
   */
  name: string;

  /**
   * The primary superpower of the superhero (e.g., "Web-Slinging", "Technology").
   */
  superpower: string;

  /**
   * The humility score of the superhero, rated from 1 to 10.
   * This determines how humble a superhero is, where 10 is the most humble.
   */
  humilityScore: number;
}
