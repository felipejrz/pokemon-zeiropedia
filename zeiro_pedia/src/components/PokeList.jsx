import { useContext } from "react";
import { PokeContext } from "../context/PokeContext";
import PokeMiniCard from "./PokeMiniCard";
import { Container, Row, Col } from "react-bootstrap";
import PokeTypes from "./PokeTypes";
import PokePhoto from "./PokePhoto";

function PokeList() {
  const { allPokemon } = useContext(PokeContext);

  return (
    <Container>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {allPokemon.map((pokemon) => (
          <Col key={pokemon.id}>
            <PokeMiniCard pokemon={pokemon}>
              <PokePhoto pokemon={pokemon} ></PokePhoto>
              <PokeTypes pokemon={pokemon} ></PokeTypes>
            </PokeMiniCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PokeList;
