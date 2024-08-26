import { useContext } from "react";
import { PokeContext } from "../context/PokeContext";
import { Card } from "react-bootstrap";
import { color } from "../data/colors";
import PokeError from "./PokeError";
import PokeSpinner from "./PokeSpinner";

function PokeCard({ encabezado, tamaño, children, hidden_id }) {
  const { pokemonData, loading, hasError } = useContext(PokeContext);

  if (loading) {
    return <PokeSpinner />;
  }

  if (hasError || !pokemonData) {
    return <PokeError />;
  }

  const bgColor = color[pokemonData.types[0].type.name] || "#fff";
  const textColor = [
    "darkblue",
    "darkred",
    "black",
    "navy",
    "#4f4747",
    "#6e4570",
  ].includes(bgColor)
    ? "white"
    : "black";

  return (
    <Card className="mb-4 shadow-sm" style={{ borderColor: bgColor }}>
      <Card.Header
        as={tamaño}
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {encabezado} {!hidden_id ? null : `#${pokemonData.id}`}
      </Card.Header>
      {children}
    </Card>
  );
}

export default PokeCard;
