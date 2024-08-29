import { Image } from "react-bootstrap";

function PokePhoto({ pokemon }) {
  // Usar let para permitir la reasignación
  let imagen = "";

  // Verificar la existencia de los objetos antes de acceder a ellos
  if (pokemon.sprites.other.home && pokemon.sprites.other.home.front_default) {
    imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;
  } else {
    imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  }

  return (
    <>
      <Image fluid rounded src={imagen} alt={pokemon.name} className="px-3" />
    </>
  );
}

export default PokePhoto;
