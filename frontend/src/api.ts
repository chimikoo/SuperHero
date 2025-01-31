// TypeScript type definition for a Superhero object
export type Superhero = {
  name: string; // The name of the superhero
  superpower: string; // The unique superpower of the superhero
  humilityScore: number; // The humility score of the superhero (between 1-10)
};

// The base API URL for the backend service
const API_URL = "http://localhost:3000/superheroes";

/**
 * Fetches the list of superheroes from the backend API.
 * Includes credentials ('same-origin') to ensure cookies or authentication headers are sent if needed.
 * @returns {Promise<Superhero[]>} A promise resolving to an array of superheroes.
 * @throws An error if the fetch request fails.
 */
export const fetchSuperheroes = async (): Promise<Superhero[]> => {
  const response = await fetch(API_URL, {
    credentials: 'same-origin', // Include same-origin credentials like cookies
  });

  // Throw an error if the response is not OK (status code outside 200-299)
  if (!response.ok) throw new Error("Failed to fetch superheroes");

  // Parse and return the JSON response body
  return response.json();
};

export const addSuperhero = async (hero: Superhero): Promise<void> => {
  const response = await fetch(API_URL, {
    method: "POST", // HTTP POST method to create a new resource
    headers: { "Content-Type": "application/json" }, // Specify JSON content type
    body: JSON.stringify(hero), // Convert the superhero object to JSON string
    credentials: 'same-origin', // Include same-origin credentials like cookies
  });

  // Throw an error if the response is not OK
  if (!response.ok) throw new Error("Failed to add superhero");
};
