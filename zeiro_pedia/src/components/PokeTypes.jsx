import { types } from "../data/number_types";

function PokeTypes({pokemon}) {
  return (
    <>
      {pokemon.types.map((type) => {
        return (
          <img
            key={type.type.name}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/${
              types[type.type.name]
            }.png`}
            alt={type.type.name}
            style={{ marginRight: "5px", width: "80px", height: "19px" }} 
          />
        );
      })}
    </>
  );
}

export default PokeTypes;
