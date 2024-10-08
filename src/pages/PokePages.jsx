import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PokeContext } from "../context/PokeContext";
import { Container, Row, Col } from "react-bootstrap";
import PokeSpinner from "../components/PokeSpinner";
import PokeStats from "../components/PokeStats";
import PokeInfo from "../components/PokeInfo";

function PokePages() {
  const { getPokemonByIdOrName } = useContext(PokeContext);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});

  const { id } = useParams();

  const fetchPokemon = async (id) => {
    const data = await getPokemonByIdOrName(id);
    setPokemon(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon(id);
  }, [id]);

  return (
    <Container fluid className="p-0 m-0">
      {console.log("Pages")}
      {loading ? (
        <PokeSpinner />
      ) : (
        <Container
          fluid
          className="p-4"
          style={{
            backgroundColor: "#f0f0f0",
            paddingTop: "75px", // Deja espacio para la Navbar fija
          }}
        >
          <Row>
            <Col xs={12} md={12} lg={7}>
              <PokeInfo pokemonData={pokemon} />
            </Col>
            <Col xs={12} md={12} lg={5}>
              <PokeStats pokemonData={pokemon} />
            </Col>
          </Row>
          <Row>
            <Col>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
}

export default PokePages;
