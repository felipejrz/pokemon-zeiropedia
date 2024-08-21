import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const PokeContext = createContext();

export function PokeContextProvider({ children, nombrePokemonAPI }) {
  const [pokemonData, setPokemonData] = useState(null);

  function pedirInforPokemon(nombrePokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
        console.log(data)
      })
      .catch((error) => {
        console.error("Error al obtener la información del Pokémon:", error);
      });
  }

  useEffect(() => {
    if (nombrePokemonAPI) {
      pedirInforPokemon(nombrePokemonAPI); // Usamos la prop para buscar el Pokémon
    }
  }, [nombrePokemonAPI]);

  return (
    <PokeContext.Provider value={{ pokemonData, pedirInforPokemon }}>
      {children}
    </PokeContext.Provider>
  );
}
