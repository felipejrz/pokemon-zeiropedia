import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState, useContext } from "react";
import { PokeContext } from "../context/PokeContext";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  Row,
  Col,
} from "react-bootstrap";

function PokeForm() {
  const [nombrePokemon, setnombrePokemon] = useState("");
  const { pedirInforPokemon } = useContext(PokeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    pedirInforPokemon(
      nombrePokemon
    );
    setnombrePokemon("");
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-4">Busqueda de Pokémon</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre Pokémon</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre Pokémon"
              value={nombrePokemon}
              onChange={(e) => setnombrePokemon(e.target.value)}
              autoFocus
            />
            <Form.Text className="text-muted">
              Ingrese el nombre completo del Pokémon.
            </Form.Text>
          </Form.Group>
          <Button variant="warning" type="submit" className="mt-3">
            <FaMagnifyingGlass className="me-2" />
            Guardar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default PokeForm;
