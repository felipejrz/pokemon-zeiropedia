import React, { useContext } from "react";
import PokeForm from "./components/PokeForm";
import PokeInfo from "./components/PokeInfo";
import PokeStats from "./components/PokeStats";
import { PokeContext } from "./context/PokeContext";
import { Container } from "react-bootstrap";

function App() {
  const { submitted } = useContext(PokeContext);

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
      {!submitted ? (
        <PokeForm />
      ) : (
        <div>
          <PokeInfo />
          <PokeStats />
        </div>
      )}
    </Container>
  );
}

export default App;
