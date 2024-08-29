import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PokeContext } from "../context/PokeContext";
import { Container, Row, Col } from "react-bootstrap";
import PokeMiniCard from "../components/PokeMiniCard";
import PokeTypes from "../components/PokeTypes";
import PokePhoto from "../components/PokePhoto";

function PokeSearch() {
  const location = useLocation();
  const {
    globalPokemon,
    setColorBar,
    getSelectedPokemonDetails,
    selectedPokemonDetails,
  } = useContext(PokeContext);

  useEffect(() => {
    if (globalPokemon.length > 0 && location.state) {
      const filtered = globalPokemon.filter((pokemon) =>
        pokemon.name.includes(location.state.toLowerCase())
      );

      if (filtered.length > 0) {
        getSelectedPokemonDetails(filtered);
      }
    }
  }, [globalPokemon, location.state]);

  useEffect(() => {
    setColorBar("inicio");
  }, [setColorBar]);

  return (
    <Container className="my-5">
      {console.log("Search")}
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {selectedPokemonDetails.map((pokemon) => (
          <Col key={pokemon.id}>
            <PokeMiniCard pokemon={pokemon}>
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
