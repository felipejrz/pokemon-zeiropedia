import React, { useContext } from "react";
import { PokeContext } from "../context/PokeContext";
import { Card, Table } from "react-bootstrap";
import PokeError from "./PokeError";
import { data } from "../data/estadisticas_base";

function PokeStats() {
  const { pokemonData } = useContext(PokeContext);

  if (!pokemonData) {
    return <PokeError />;
  }

  // Función para obtener el color basado en el valor de la estadística
  const getColor = (statValue) => {
    const percentage = statValue / 255;
    const red = Math.floor(255 * (1 - percentage));
    const green = Math.floor(255 * percentage);
    return `rgb(${red}, ${green}, 0)`; // Color en formato RGB
  };

  return (
    <Card border="warning" className="mb-4 shadow-sm">
      <Card.Header as="h5" className="bg-warning">
        Características base
      </Card.Header>
      <Card.Body className="">
        <Table
          bordered
          className="m-0 table-striped"
          style={{ borderRadius: "10px", overflow: "hidden" }}
        >
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: "#ffc107",
                  borderTopLeftRadius: "10px",
                }}
              >
                Stat
              </th>
              <th style={{ backgroundColor: "#ffc107" }}>Value</th>
              <th
                style={{
                  backgroundColor: "#ffc107",
                  borderTopRightRadius: "10px",
                }}
              >
                Progress
              </th>
            <th style={{ backgroundColor: "#ffc107" }}>Nivel-50</th>
            <th>Nivel - 100</th>
            </tr>
          </thead>
          <tbody>
            {pokemonData.stats.map((x) => (
              <tr key={x.stat.name}>
                <td>
                  <strong>{data[x.stat.name]}</strong>
                </td>
                <td>{x.base_stat}</td>
                <td>
                  <div
                    style={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: "5px",
                      overflow: "hidden",
                      position: "relative",
                      height: "15px",
                      marginTop: "5px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: getColor(x.base_stat),
                        width: `calc(100% * ${x.base_stat} / 255)`,
                        height: "100%",
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td
                style={{
                  borderBottomLeftRadius: "10px",
                }}
              >
                <strong>Total</strong>
              </td>
              <td>
                {pokemonData.stats.reduce((total, x) => total + x.base_stat, 0)}
              </td>
              <td
                style={{
                  borderBottomRightRadius: "10px",
                }}
              />
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default PokeStats;
