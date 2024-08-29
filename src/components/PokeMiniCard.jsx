import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function PokeMiniCard({ pokemon, children }) {
  const unwantedWords = ["resolute"];

  const formattedName = pokemon.name
    .split("-")
    .filter((word) => !unwantedWords.includes(word))
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <Card
        as={Link}
        to={`/pokemon/${pokemon.id}`}
        className="border-danger shadow-lg text-decoration-none"
      >
        <Card.Header
          as="h5"
          className="p-3"
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            position: "relative",
          }}
        >
          <Row className="align-items-center">
            <Col xs="auto" className="d-flex align-items-center">
              {/* Cámara grande simulada */}
              <div
                className="p-0"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#2C3E50",
                  borderRadius: "50%",
                  border: "3px solid white",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: "#3498DB",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "5px",
                    left: "5px",
                  }}
                ></div>
              </div>
            </Col>
            <Col xs="auto" className="d-flex align-items-center p-0">
              {/* Puntos Rojo, Amarillo, Verde */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    border: "2px solid black",
                    marginRight: "5px",
                  }}
                ></div>
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: "yellow",
                    borderRadius: "50%",
                    border: "2px solid black",
                    marginRight: "5px",
                  }}
                ></div>
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: "green",
                    borderRadius: "50%",
                    border: "2px solid black",
                  }}
                ></div>
              </div>
            </Col>
            <Col className="">
              {formattedName} #{pokemon.id}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          {children}
        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default PokeMiniCard;
