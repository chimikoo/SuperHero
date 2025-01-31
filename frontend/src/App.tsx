import { useState } from "react";
import SearchSuperhero from "./components/SearchSuperhero";
import AddSuperheroForm from "./components/AddSuperheroForm";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white font-sans lg:py-2">
      <div className="w-full max-w-screen-md bg-gray-800 shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-extrabold text-center mb-8">
          Humble Marvel Super Hero Database
        </h1>
        <AddSuperheroForm onAdd={() => setRefresh(!refresh)} />
        <SearchSuperhero key={refresh.toString()} />
      </div>
    </div>
  );
};

export default App;
