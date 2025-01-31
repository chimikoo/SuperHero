import { useEffect, useState } from "react";
import { fetchSuperheroes, Superhero } from "../api";

const SearchSuperhero = () => {
  // State variables for managing superheroes and user interactions
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]); // Full list of superheroes
  const [filteredHeroes, setFilteredHeroes] = useState<Superhero[]>([]); // Filtered list based on search
  const [searchTerm, setSearchTerm] = useState(""); // User's search input
  const [loading, setLoading] = useState(true); // Loading state for data fetch
  const [error, setError] = useState(""); // Error message if data fetch fails
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const itemsPerPage = 4; // Number of superheroes per page

  /**
   * Fetch superheroes data when the component is mounted.
   * Sets both the full list (`superheroes`) and filtered list (`filteredHeroes`) initially.
   * Handles errors by setting the `error` state.
   */
  useEffect(() => {
    const loadHeroes = async () => {
      try {
        const data = await fetchSuperheroes(); // Fetch data from the backend
        setSuperheroes(data);
        setFilteredHeroes(data); // Initially show all heroes
      } catch (err) {
        setError("Failed to load Marvel Heroes."); // Handle errors during the fetch
      } finally {
        setLoading(false); // Loading is complete regardless of success or failure
      }
    };
    loadHeroes();
  }, []);

  /**
   * Handles real-time search functionality.
   * Filters the full list of superheroes based on the user's input.
   * Resets pagination to the first page when a new search term is entered.
   */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase(); // Convert input to lowercase for case-insensitive search
    setSearchTerm(term);

    const filtered = superheroes.filter((hero) =>
      hero.name.toLowerCase().includes(term)
    );
    setFilteredHeroes(filtered); // Update filtered list based on search
    setCurrentPage(1); // Reset to the first page
  };

  // Calculate pagination indices for displaying the current page of heroes
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHeroes = filteredHeroes.slice(startIndex, endIndex); // Heroes to display on the current page

  // Total number of pages based on filtered heroes
  const totalPages = Math.ceil(filteredHeroes.length / itemsPerPage);

  // Navigate to the next page if it exists
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Navigate to the previous page if it exists
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Display loading message while data is being fetched
  if (loading) return <p className="text-center text-gray-400">Loading...</p>;

  // Display error message if data fetch fails
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-6">
      {/* Search input to filter superheroes by name */}
      <input
        type="text"
        placeholder="Search for a Marvel Hero"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-3 mb-4 border border-gray-500 rounded bg-gray-800 text-gray-200 placeholder-gray-400"
      />

      {/* Display superheroes or a no results message */}
      {paginatedHeroes.length > 0 ? (
        <>
          <ul className="space-y-4 min-h-[300px]">
            {/* List of superheroes for the current page */}
            {paginatedHeroes.map((hero, index) => (
              <li
                key={index}
                className="p-4 bg-gray-700 text-gray-200 rounded-lg shadow-md hover:bg-gray-600 transition"
              >
                <strong className="text-yellow-400">{hero.name}</strong> -{" "}
                <span>{hero.superpower}</span>{" "}
                <span className="text-gray-400">
                  (Humility: {hero.humilityScore}/10)
                </span>
              </li>
            ))}
          </ul>

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1} // Disable if on the first page
              className={`p-2 px-4 rounded ${
                currentPage === 1
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500"
              } text-white`}
            >
              Previous
            </button>
            <span className="text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages} // Disable if on the last page
              className={`p-2 px-4 rounded ${
                currentPage === totalPages
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500"
              } text-white`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-400">No superheroes found.</p>
      )}
    </div>
  );
};

export default SearchSuperhero;
