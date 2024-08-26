import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState, useContext } from "react";
import { PokeContext } from "../context/PokeContext";
import { Button, Card, Form } from "react-bootstrap";

function PokeForm() {
  const [nombrePokemon, setNombrePokemon] = useState("");
  const { handleFormSubmit } = useContext(PokeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(nombrePokemon);
    setNombrePokemon("");
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4 text-center">Búsqueda de Pokémon</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre del Pokémon</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del Pokémon"
              value={nombrePokemon}
              onChange={(e) => setNombrePokemon(e.target.value)}
              autoFocus
              isInvalid={!nombrePokemon} // Red border for invalid input
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese el nombre del Pokémon.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Ingrese el nombre completo del Pokémon para buscar.
            </Form.Text>
          </Form.Group>
          <Button
            variant="warning"
            type="submit"
            className="mt-3"
            disabled={!nombrePokemon} // Disable button if no input
          >
            <FaMagnifyingGlass className="me-2" />
            Buscar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default PokeForm;
