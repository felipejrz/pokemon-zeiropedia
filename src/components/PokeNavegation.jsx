import { useContext } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { color } from "../data/colors";
import { PokeContext } from "../context/PokeContext";

function PokeNavegation() {
  const { colorBar, onInputChange, valueSearch, onResetForm } =
    useContext(PokeContext);
  const bgColor = color[colorBar] || "#fff";
  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/search", {
      state: valueSearch,
    });
    onResetForm();
  };

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: bgColor }}>
        <Container fluid>
          <Navbar.Brand href="">
            <Link to="/">
              <img
                alt="Pokémon Logo"
                src="https://1000marcas.net/wp-content/uploads/2020/01/Logo-Pokemon-640x400.png"
                width="120"
                height="75"
                className="d-inline-block align-top"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-center">
            <Form className="d-flex m-2" onSubmit={onSearchSubmit}>
              <Form.Control
                className="me-2"
                type="search"
                name = "valueSearch"
                value={valueSearch}
                onChange={onInputChange}
                placeholder="Pokémon"
              />
              <Button
                type="submit"
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
