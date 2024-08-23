import { createContext, useState, useEffect } from "react";

export const PokeContext = createContext();

export function PokeContextProvider({ children }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonName, setPokemonName] = useState("");

  function pedirInforPokemon(nombrePokemon) {
    let formattedName = nombrePokemon.toLowerCase().replace(/\s+/g, '-');
    let url = `https://pokeapi.co/api/v2/pokemon/${formattedName}`;
    
    setLoading(true);
    setHasError(false);
    setPokemonData(null);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Pokemon no encontrado");
        }
        return response.json();
      })
      .then((data) => {
        setPokemonData(data);
        setHasError(false);
      })
      .catch((error) => {
        console.error("Error al obtener la información del Pokémon:", error);
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
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
    <PokeContext.Provider
      value={{
        pokemonData,
        handleFormSubmit,
        submitted,
        loading,
        hasError,
      }}
    >
      {children}
    </PokeContext.Provider>
  );
}
