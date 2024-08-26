import React, { useContext } from "react";
import PokeForm from "./components/PokeForm";
import PokeInfo from "./components/PokeInfo";
import PokeStats from "./components/PokeStats";
import PokeSpinner from "./components/PokeSpinner";
import PokeError from "./components/PokeError";
import PokeCard from './components/PokeCard'
import { PokeContext } from "./context/PokeContext";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const { submitted, loading, hasError } = useContext(PokeContext);

  return (
    <Container
      fluid
      className="m-0 p-4"
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {loading && <PokeSpinner />}
      {!loading && !submitted && !hasError && <PokeForm />}
      {!loading && hasError && <PokeError />}
      {!loading && submitted && !hasError && (
        <>
          <Row className="mt-4">
            <Col xs={12} md={12} lg={7}>
              <PokeInfo />
            </Col>
            <Col xs={12} md={12} lg={5}>
              <PokeStats />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs={12}>
              <PokeCard />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default App;
