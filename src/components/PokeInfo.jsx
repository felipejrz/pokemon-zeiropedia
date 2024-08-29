import { Card, Row, Col, Image, ListGroup } from "react-bootstrap";
import PokeTypes from "./PokeTypes";
import PokeAbilities from "./PokeAbilities";
import PokeCard from "./PokeCard";
import PokePhoto from "./PokePhoto";

function PokeInfo({ pokemonData }) {
  const formattedName = pokemonData.name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "); 

  return (
    <PokeCard
      pokemon={pokemonData}
      tamaño={"h2"}
      encabezado={
        formattedName
      }
      hidden_id={true}
    >
      <Row>
        <Col
          md={4}
          className="d-flex justify-content-center align-items-center"
        >
          <PokePhoto pokemon={pokemonData} />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title as="h4" className="mb-4 text-capitalize">
              Información Pokémon
            </Card.Title>
            <Card.Subtitle>
              <strong>Tipos: </strong>{" "}
              <PokeTypes pokemon={pokemonData}></PokeTypes>
            </Card.Subtitle>
            <hr className="my-3 border-warning" />

            <ListGroup variant="flush">
              <Card.Subtitle className="mb-1 text-capitalize ">
                <strong>Medidas Pokémon</strong>
              </Card.Subtitle>
              <ListGroup.Item className="border-0">
                <strong>Peso:</strong> {pokemonData.weight / 10} kg
              </ListGroup.Item>
              <ListGroup.Item className="border-0 pb-0">
                <strong>Altura:</strong> {pokemonData.height / 10} m
              </ListGroup.Item>
            </ListGroup>

            <hr className="my-3 border-warning" />
            <PokeAbilities pokemon={pokemonData} />
          </Card.Body>
        </Col>
      </Row>
    </PokeCard>
  );
}

export default PokeInfo;
