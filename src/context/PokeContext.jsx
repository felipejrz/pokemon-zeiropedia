import { createContext, useState, useEffect } from "react";
import { useForm } from "../hook/useForm";
import { useLocation } from "react-router-dom";


export const PokeContext = createContext();

export function PokeContextProvider({ children }) {
  const [offset, setOffset] = useState(0);
  const [allPokemon, setAllPokemon] = useState([]);
  const [globalPokemon, setGlobalPokemon] = useState([]);
  const [colorBar, setColorBar] = useState("inicio");
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState([]);
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: "",
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

  // Llamar 52 Pokémon a la API
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

  // Llamar a todos los Pokémon (Cargar nombres y URLs)
  const getGlobalPokemon = async () => {
    setLoading(true);
    //localStorage.removeItem("globalPokemon");
    const cachedPokemon = localStorage.getItem("globalPokemon");
    if (cachedPokemon) {
      console.log("Carga de datos");
      setGlobalPokemon(JSON.parse(cachedPokemon));
    } else {
      console.log("Se hace la llamada a la API");
      const url = `${baseUrl}pokemon?limit=100000&offset=0`;
      const data = await fetchPokemonData(url);
      if (data) {
        const essentialData = data.results.map((pokemon) => ({
          name: pokemon.name,
          url: pokemon.url,
        }));
        localStorage.setItem("globalPokemon", JSON.stringify(essentialData));
        setGlobalPokemon(essentialData);
      }
    }
    setLoading(false);
  };

  // Obtener detalles de un Pokémon por ID o nombre
  const getPokemonByIdOrName = async (idOrName) => {
    const url = `${baseUrl}pokemon/${idOrName}`;
    const data = await fetchPokemonData(url);
    if (data) {
      setColorBar(data.types[0].type.name);
    }
    return data;
  };

  // Obtener detalles de un arreglo de Pokémon
  const getSelectedPokemonDetails = async (pokemonList) => {
    setLoading(true);
    const pokemonDetails = await fetchPokemonDetails(pokemonList);
    setSelectedPokemonDetails(pokemonDetails);
    setLoading(false);
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
        colorBar, //Color de la navbar
        setColorBar,//Cambiar el color
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemon,
        globalPokemon,
        getPokemonByIdOrName,
        getSelectedPokemonDetails,
        selectedPokemonDetails,
        loading,
      }}
    >
      {children}
    </PokeContext.Provider>
  );
}
