import { useContext } from "react";
import { PokeContext } from "../context/PokeContext";
import { Card, Row, Col, Image, ListGroup } from "react-bootstrap";
import Types from "./Types";
import PokeError from "./PokeError";
import PokeAbilities from "./PokeAbilities";

function PokeInfo() {
  const { pokemonData } = useContext(PokeContext);

  if (!pokemonData) {
    return <PokeError />;
  }

  return (
    <Card border="warning" className="mb-4 shadow-sm">
      <Card.Header as="h2" className="bg-warning">
        {pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1)} #
        {pokemonData.id}
      </Card.Header>
      <Row>
        <Col
          md={4}
          className="d-flex justify-content-center align-items-center"
        >
          <Image
            fluid
            rounded
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonData.id}.png`}
            alt={pokemonData.name}
            className="m-3"
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title as="h4" className="mb-4 text-capitalize">
              Información Pokémon
            </Card.Title>
            <Card.Subtitle>
              <strong>Tipos: </strong> <Types />
            </Card.Subtitle>
            <hr className="my-3 border-warning"/>

            <ListGroup variant="flush" >
              <Card.Subtitle className="mb-1 text-capitalize ">
                <strong>Medidas Pokémon</strong>
              </Card.Subtitle>
              <ListGroup.Item className="border-0">
                <strong>Peso:</strong> {pokemonData.weight / 10} kg
              </ListGroup.Item>
              <ListGroup.Item className="border-0">
                <strong>Altura:</strong> {pokemonData.height / 10} m
              </ListGroup.Item>
            </ListGroup>

            <hr className="my-3 border-warning"/>
            <PokeAbilities />

            {console.log(pokemonData)}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default PokeInfo;
