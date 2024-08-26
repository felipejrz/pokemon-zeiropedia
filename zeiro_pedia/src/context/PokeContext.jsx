import { createContext, useState, useEffect } from "react";
import { useForm } from "../hook/useForm";

export const PokeContext = createContext();

export function PokeContextProvider({ children }) {
  const [offset, setOffset] = useState(0);
  const [allPokemon, setAllPokemon] = useState([]);
  const [globalPokemon, setGlobalPokemon] = useState([]);
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: "",
  });

  const [loading, setLoading] = useState(true);

  const baseUrl = "https://pokeapi.co/api/v2/";

  // Función fetchWithRetry
  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
      } catch (error) {
        if (i === retries - 1) throw error; // Reintentar después del último intento
        await new Promise(resolve => setTimeout(resolve, delay)); // Esperar antes de reintentar
      }
    }
  };

  const fetchPokemonData = async (url) => {
    try {
      const { results } = await fetchWithRetry(url);

      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          try {
            return await fetchWithRetry(pokemon.url);
          } catch (error) {
            console.error(`Error fetching Pokémon data: ${error.message}`);
            return null;
          }
        })
      );

      return pokemonData.filter(pokemon => pokemon !== null); // Filtrar resultados nulos
    } catch (error) {
      console.error("Error al obtener datos de Pokémon:", error);
      return [];
    }
  };

  const getAllPokemon = async (limit = 50) => {
    setLoading(true);
    try {
      const url = `${baseUrl}pokemon?limit=${limit}&offset=${offset}`;
      const pokemonData = await fetchPokemonData(url);
      setAllPokemon(prevState => [...prevState, ...pokemonData]);
    } finally {
      setLoading(false);
    }
  };

  const getGlobalPokemon = async () => {
    setLoading(true);
    try {
      const url = `${baseUrl}pokemon?limit=1000&offset=0`;
      const pokemonData = await fetchPokemonData(url);
      setGlobalPokemon(pokemonData);
    } finally {
      setLoading(false);
    }
  };

  const getPokemonById = async (id) => {
    try {
      return await fetchWithRetry(`${baseUrl}pokemon/${id}`);
    } catch (error) {
      console.error(`Error fetching Pokémon with ID ${id}:`, error);
      return null;
    }
  };

  useEffect(() => {
    getAllPokemon();
  }, [offset]);

  useEffect(() => {
    getGlobalPokemon();
  }, []);

  return (
    <PokeContext.Provider
      value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemon,
        globalPokemon,
        getPokemonById,
        loading,
      }}
    >
      {children}
    </PokeContext.Provider>
  );
}
