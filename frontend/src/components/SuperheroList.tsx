import { useEffect, useState } from "react";
import { fetchSuperheroes, Superhero } from "../api";

const SearchSuperhero = () => {
  // State variables for handling superhero data and user interactions
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]); // Stores the full list of superheroes
  const [filteredHeroes, setFilteredHeroes] = useState<Superhero[]>([]); // Stores the filtered list based on the search term
  const [searchTerm, setSearchTerm] = useState(""); // Tracks the user's search input
  const [loading, setLoading] = useState(true); // Tracks the loading state while fetching data
  const [error, setError] = useState(""); // Tracks any errors during the fetch process

  /**
   * Fetches the list of superheroes from the backend when the component mounts.
   * Sets both `superheroes` and `filteredHeroes` to the fetched data.
   * Handles any errors gracefully by updating the `error` state.
   */
  useEffect(() => {
    const loadHeroes = async () => {
      try {
        const data = await fetchSuperheroes(); // Fetch data from the backend API
        setSuperheroes(data); // Update the full list of superheroes
        setFilteredHeroes(data); // Initialize the filtered list with all heroes
      } catch (err) {
        setError("Failed to load Marvel Heroes"); // Set error message if fetch fails
      } finally {
        setLoading(false); // Mark loading as complete
      }
    };
    loadHeroes();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  /**
   * Filters the list of superheroes based on the user's search input.
   * Converts both the input and hero names to lowercase for case-insensitive matching.
   * Updates the `filteredHeroes` state with the matching results.
   */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase(); // Normalize the search term to lowercase
    setSearchTerm(term);

    const filtered = superheroes.filter((hero) =>
      hero.name.toLowerCase().includes(term)
    ); // Filter heroes whose names include the search term
    setFilteredHeroes(filtered); // Update the filtered list
  };

  // Render a loading message if the data is still being fetched
  if (loading) return <p className="text-center text-gray-300">Loading...</p>;

  // Render an error message if the data fetch fails
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="mt-6">
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search for Marvel Super Hero"
        value={searchTerm}
        onChange={handleSearch} // Trigger the search function on input change
        className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-800 text-gray-200 placeholder-gray-400"
      />
      {filteredHeroes.length > 0 ? (
        <ul className="space-y-2">
          {/* Map over filtered heroes and display them as list items */}
          {filteredHeroes.map((hero, index) => (
            <li
              key={index} // Use index as a key since hero names are unique
              className="p-4 bg-gray-600 text-gray-100 rounded-md shadow-md hover:bg-gray-500 transition"
            >
              <strong className="text-yellow-300">{hero.name}</strong> -{" "}
              <span className="text-gray-300">{hero.superpower}</span>{" "}
              <span className="text-gray-400">
                (Humility: {hero.humilityScore}/10)
              </span>
            </li>
          ))}
        </ul>
      ) : (
        // Message displayed if no heroes match the search term
        <p className="text-gray-300">No Marvel by that name was found.</p>
      )}
    </div>
  );
};

export default SearchSuperhero;
