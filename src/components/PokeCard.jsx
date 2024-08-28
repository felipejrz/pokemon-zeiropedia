import { Card } from "react-bootstrap";
import { color } from "../data/colors";

function PokeCard({ pokemon, encabezado, tamaño, hidden_id, children }) {
  const bgColor = color[pokemon.types[0].type.name] || "#fff";
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
        {encabezado} {!hidden_id ? null : `#${pokemon.id}`}
      </Card.Header>
      {children}
    </Card>
  );
}

export default PokeCard;
