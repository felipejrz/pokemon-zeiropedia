import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PokeContext } from "../context/PokeContext";
import { Container, Row, Col } from "react-bootstrap";
import PokeMiniCard from "../components/PokeMiniCard";
import PokeTypes from "../components/PokeTypes";
import PokePhoto from "../components/PokePhoto";


function PokeSearch() {
  const location = useLocation();
  const { globalPokemon, setColorBar } = useContext(PokeContext);

  useEffect(() => {
    setColorBar("inicio");
  }, [setColorBar]);

  const filteredPokemon = globalPokemon.filter((pokemon) => pokemon.name.includes(location.state.toLowerCase()));

  return (
    <Container className="my-5">
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {filteredPokemon.map((pokemon) => (
          <Col key={pokemon.id}>
            <PokeMiniCard pokemon={pokemon} key={pokemon.id}>
              <PokePhoto pokemon={pokemon}></PokePhoto>
              <PokeTypes pokemon={pokemon}></PokeTypes>
            </PokeMiniCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PokeSearch;
