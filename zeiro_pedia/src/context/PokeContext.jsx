import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const PokeContext = createContext();

export function PokeContextProvider({ children }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonName, setPokemonName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function pedirInforPokemon(nombrePokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
      })
      .catch((error) => {
        console.error("Error al obtener la información del Pokémon:", error);
      });
  }

  useEffect(() => {
    if (pokemonName) {
      pedirInforPokemon(pokemonName);
    }
  }, [pokemonName]);

  const handleFormSubmit = (name) => {
    setPokemonName(name);
    setSubmitted(true);
  };

  return (
    <PokeContext.Provider value={{ pokemonData, handleFormSubmit, submitted }}>
      {children}
    </PokeContext.Provider>
  );
}
