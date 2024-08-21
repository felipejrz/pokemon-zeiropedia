import { createContext, useState, useEffect } from "react";

let nombrePokemonAPI = "riulu";
let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

const PokeContext = createContext();

export function PokeContextProvider() {
  function pedirInforPokemon() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Aquí puedes manejar la data que recibas, mostrarla en tu app, etc.
      })
      .catch((error) => {
        console.error("Error al obtener la información del Pokémon:", error);
      });
  }
  return 0;
}
