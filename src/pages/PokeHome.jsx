import { useState, useContext, useEffect } from "react";
import { Button, Container, Form, Offcanvas } from "react-bootstrap";
import PokeList from "../components/PokeList";
import { IoFilter } from "react-icons/io5";
import { PokeContext } from "../context/PokeContext";

function PokeHome() {
  const { setColorBar } = useContext(PokeContext);

  useEffect(() => {
    setColorBar("inicio");
  }, [setColorBar]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const pokemonTypes = [
    "Normal",
    "Lucha",
    "Volador",
    "Veneno",
    "Tierra",
    "Roca",
    "Bicho",
    "Fantasma",
    "Acero",
    "Fuego",
    "Agua",
    "Planta",
    "Eléctrico",
    "Psíquico",
    "Hielo",
    "Dragón",
    "Siniestro",
    "Hada",
  ];

  return (
    <Container className="d-flex flex-column align-items-center mb-5">
      {console.log("home")}
      <Button
        className="d-flex align-items-center px-4 my-4 mx-auto"
        variant="danger"
        onClick={handleShow}
      >
        <IoFilter className="me-2" />
        Filtro
      </Button>

      <Offcanvas show={show} onHide={handleClose} style={{ width: "300px" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtro</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <span>Tipo</span>
          <Form>
            {pokemonTypes.map((type) => (
              <Form.Check
                key={type}
                type="checkbox"
                id={type}
                label={type}
                className="m-1"
              />
            ))}
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      <PokeList />
    </Container>
  );
}

export default PokeHome;
