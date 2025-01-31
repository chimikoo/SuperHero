import { useState } from "react";
import { addSuperhero, Superhero } from "../api";

const AddSuperheroForm = ({ onAdd }: { onAdd: () => void }) => {
  // State variables to manage form inputs and error handling
  const [name, setName] = useState(""); // Stores the superhero's name
  const [superpower, setSuperpower] = useState(""); // Stores the superhero's superpower
  const [humilityScore, setHumilityScore] = useState(5); // Default humility score (range: 1-10)
  const [error, setError] = useState(""); // Error message for validation or API issues

  /**
   * Handles form submission:
   * - Validates user input for required fields and humility score range.
   * - Sends the superhero data to the backend via `addSuperhero`.
   * - Refreshes the list on success or displays an error message on failure.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Input validation: Ensure all fields are filled, and humilityScore is in the correct range
    if (!name || !superpower || humilityScore < 1 || humilityScore > 10) {
      setError("All fields are required, and humility must be between 1-10.");
      return;
    }

    const newHero: Superhero = { name, superpower, humilityScore };

    try {
      // Add the superhero by calling the backend API
      await addSuperhero(newHero);

      // Reset form fields on successful submission
      setName("");
      setSuperpower("");
      setHumilityScore(5);
      setError(""); // Clear error message

      // Trigger a refresh of the superhero list in the parent component
      onAdd();
    } catch (error: any) {
      // Handle backend errors and display user-friendly error messages
      if (error.response?.data?.message) {
        setError(error.response.data.message); // Backend-provided error message
      } else {
        setError("Failed to add a Marvel hero."); // Fallback error message
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-gray-700 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-200 mb-4">Add a Marvel Hero</h2>

      {/* Error message display */}
      {error && <p className="text-red-400 mb-4">{error}</p>}

      {/* Input for superhero's name */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-500 rounded bg-gray-800 text-gray-200 placeholder-gray-400"
      />

      {/* Input for superhero's superpower */}
      <input
        type="text"
        placeholder="Superpower"
        value={superpower}
        onChange={(e) => setSuperpower(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-500 rounded bg-gray-800 text-gray-200 placeholder-gray-400"
      />

      {/* Input for humility score (numeric value) */}
      <input
        type="number"
        placeholder="Humility Score (1-10)"
        value={humilityScore}
        onChange={(e) => setHumilityScore(Number(e.target.value))}
        className="w-full p-3 mb-4 border border-gray-500 rounded bg-gray-800 text-gray-200 placeholder-gray-400"
        min="1"
        max="10"
      />

      {/* Button to submit the form */}
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
