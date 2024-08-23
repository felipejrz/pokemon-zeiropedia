import { useContext } from "react";
import { PokeContext } from "../context/PokeContext";
import { types } from '../data/number_types';

function Types() {
  const { pokemonData } = useContext(PokeContext);

  return (
    <>
      {pokemonData.types.map((type) => {
        return (
          <img
            key={type.type.name}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/${types[type.type.name]}.png`}
            alt={type.type.name}
            style={{ marginRight: "5px", width: "80px", height: "19px" }}  // Ajusta el tamaño aquí
          />
        );
      })}
    </>
  );
}

export default Types;
