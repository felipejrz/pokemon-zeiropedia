import { createContext, useState, useEffect } from "react";
import { useForm } from "../hook/useForm";

export const PokeContext = createContext();

export function PokeContextProvider({ children }) {
  const [offset, setOffset] = useState(0);
  const [allPokemon, setAllPokemon] = useState([]);
  const [globalPokemon, setGlobalPokemon] = useState([]);
  const [colorBar, setColorBar] = useState("inicio");
  const { valueSearch, onInputChange, onResetForm } = useForm({
		valueSearch: '',
	});

  const [loading, setLoading] = useState(true);

  const baseUrl = "https://pokeapi.co/api/v2/";

  // Función genérica para obtener datos de Pokémon
  const fetchPokemonData = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
      return null;
    }
  };

  // Obtener detalles de los Pokémon desde sus URLs
  const fetchPokemonDetails = async (pokemonList) => {
    const promises = pokemonList.map(async (pokemon) => {
      const data = await fetchPokemonData(pokemon.url);
      return data;
    });
    return Promise.all(promises);
  };

  // Llamar 50 Pokémon a la API
  const getAllPokemon = async (limit = 52) => {
    setLoading(true);
    const url = `${baseUrl}pokemon?limit=${limit}&offset=${offset}`;
    const data = await fetchPokemonData(url);
    if (data) {
      const pokemonDetails = await fetchPokemonDetails(data.results);
      setAllPokemon([...allPokemon, ...pokemonDetails]);
    }
    setLoading(false);
  };

  // Llamar a todos los Pokémon
  const getGlobalPokemon = async () => {
    setLoading(true);
    const url = `${baseUrl}pokemon?limit=100000&offset=1000`;
    const data = await fetchPokemonData(url);
    if (data) {
      const pokemonDetails = await fetchPokemonDetails(data.results);
      setGlobalPokemon(pokemonDetails);
    }
    setLoading(false);
  };

  // Obtener Pokémon por ID
  const getPokemonById = async (id) => {
    const url = `${baseUrl}pokemon/${id}`;
    const data = await fetchPokemonData(url);
    setColorBar(data.types[0].type.name);
    return data;
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
        colorBar,
        setColorBar,
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
