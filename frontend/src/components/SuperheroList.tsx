import { useEffect, useState } from "react";
import { fetchSuperheroes, Superhero } from "../api";

const SearchSuperhero = () => {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [filteredHeroes, setFilteredHeroes] = useState<Superhero[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHeroes = async () => {
      try {
        const data = await fetchSuperheroes();
        setSuperheroes(data);
        setFilteredHeroes(data);
      } catch (err) {
        setError("Failed to load Marvel Heroes");
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
  };

  if (loading) return <p className="text-center text-gray-300">Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="mt-6">
      <input
        type="text"
        placeholder="Search for Marvel Super Hero"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-800 text-gray-200 placeholder-gray-400"
      />
      {filteredHeroes.length > 0 ? (
        <ul className="space-y-2">
          {filteredHeroes.map((hero, index) => (
            <li
              key={index}
              className="p-4 bg-gray-600 text-gray-100 rounded-md shadow-md hover:bg-gray-500 transition"
            >
              <strong className="text-yellow-300">{hero.name}</strong> -{" "}
              <span className="text-gray-300">{hero.superpower}</span>{" "}
              <span className="text-gray-400">(Humility: {hero.humilityScore}/10)</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300">No Marvel by that name was found.</p>
      )}
    </div>
  );
};

export default SearchSuperhero;
