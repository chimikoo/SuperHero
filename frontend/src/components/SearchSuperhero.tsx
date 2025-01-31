import { useEffect, useState } from "react";
import { fetchSuperheroes, Superhero } from "../api";

const SearchSuperhero = () => {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [filteredHeroes, setFilteredHeroes] = useState<Superhero[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const loadHeroes = async () => {
      try {
        const data = await fetchSuperheroes();
        setSuperheroes(data);
        setFilteredHeroes(data);
      } catch (err) {
        setError("Failed to load Marvel Heroes.");
      } finally {
        setLoading(false);
      }
    };
    loadHeroes();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = superheroes.filter((hero) =>
      hero.name.toLowerCase().includes(term)
    );
    setFilteredHeroes(filtered);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHeroes = filteredHeroes.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredHeroes.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-6">
      <input
        type="text"
        placeholder="Search for a Marvel Hero"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-3 mb-4 border border-gray-500 rounded bg-gray-800 text-gray-200 placeholder-gray-400"
      />
      {paginatedHeroes.length > 0 ? (
        <>
          <ul className="space-y-4 min-h-[300px]">
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
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
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
              disabled={currentPage === totalPages}
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
