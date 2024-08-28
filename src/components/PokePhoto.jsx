import { Image } from "react-bootstrap";

function PokePhoto({ pokemon }) {
  return (
    <>
      <Image
        fluid
        rounded
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
        alt={pokemon.name}
        className="m-3"
      />
    </>
  );
}

export default PokePhoto;
