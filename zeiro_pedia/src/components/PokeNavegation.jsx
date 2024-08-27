import { useContext } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Outlet } from "react-router-dom";
import { color } from "../data/colors";
import {PokeContext} from '../context/PokeContext'

function PokeNavegation({ pokemonType = "danger" }) {
  const {colorBar} = useContext(PokeContext)
  const bgColor = color[colorBar] || "#fff";

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: bgColor }}>
        <Container fluid>
          <Navbar.Brand href="">
            <img
              alt="Pokémon Logo"
              src="https://1000marcas.net/wp-content/uploads/2020/01/Logo-Pokemon-640x400.png"
              width="120"
              height="75"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-center">
            <Form className="d-flex m-2">
              <Form.Control
                type="text"
                placeholder="Pokémon"
                className="me-2"
              />
              <Button
                variant="outline-light"
                className="d-flex align-items-center px-4 btn-md"
              >
                <FaMagnifyingGlass className="me-2" />
                Buscar
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default PokeNavegation;
