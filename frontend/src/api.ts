export type Superhero = {
    name: string;
    superpower: string;
    humilityScore: number;
  };
  
  const API_URL = "http://localhost:3000/superheroes";

  export const fetchSuperheroes = async (): Promise<Superhero[]> => {
    const response = await fetch(API_URL, {
      credentials: 'same-origin',
    });
    if (!response.ok) throw new Error("Failed to fetch superheroes");
    return response.json();
  };
  
  export const addSuperhero = async (hero: Superhero): Promise<void> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hero),
      credentials: 'same-origin',
    });
    if (!response.ok) throw new Error("Failed to add superhero");
  };
  
  