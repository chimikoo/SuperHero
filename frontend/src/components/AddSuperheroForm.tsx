import { useState } from "react";
import { addSuperhero, Superhero } from "../api";

const AddSuperheroForm = ({ onAdd }: { onAdd: () => void }) => {
  const [name, setName] = useState("");
  const [superpower, setSuperpower] = useState("");
  const [humilityScore, setHumilityScore] = useState(5);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !superpower || humilityScore < 1 || humilityScore > 10) {
      setError("All fields are required, and humility must be between 1-10.");
      return;
    }

    const newHero: Superhero = { name, superpower, humilityScore };
    try {
      await addSuperhero(newHero);
      setName("");
      setSuperpower("");
      setHumilityScore(5);
      setError("");
      onAdd();
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to add a Marvel hero.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-gray-700 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-200 mb-4">Add a Marvel Hero</h2>
      {error && <p className="text-red-400 mb-4">{error}</p>}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-500 rounded bg-gray-800 text-gray-200 placeholder-gray-400"
      />
      <input
        type="text"
        placeholder="Superpower"
        value={superpower}
        onChange={(e) => setSuperpower(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-500 rounded bg-gray-800 text-gray-200 placeholder-gray-400"
      />
      <input
        type="number"
        placeholder="Humility Score (1-10)"
        value={humilityScore}
        onChange={(e) => setHumilityScore(Number(e.target.value))}
        className="w-full p-3 mb-4 border border-gray-500 rounded bg-gray-800 text-gray-200 placeholder-gray-400"
        min="1"
        max="10"
      />

      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-500 transition"
      >
        Add a Marvel Hero
      </button>
    </form>
  );
};

export default AddSuperheroForm;
