import React, { useContext } from "react";
import { PokeContext } from "../context/PokeContext";
import { Card, Table, Container } from "react-bootstrap";
import PokeError from "./PokeError";
import { data } from "../data/estadisticas_base";
import PokeCard from "./PokeCard";
import { color } from "../data/colors";

function PokeStats() {
  const { pokemonData } = useContext(PokeContext);
  if (!pokemonData) {
    return <PokeError />;
  }
  const bgColor = color[pokemonData.types[0].type.name];

  const getColor = (statValue) => {
    const percentage = statValue / 255;
    let red, green, blue;
  
    if (percentage < 0.33) {
      red = 250;
      green = Math.floor(88 + (170 - 88) * (percentage / 0.33));
      blue = 88;
    } else if (percentage < 0.66) {
      red = 250;
      green = Math.floor(170 + (246 - 170) * ((percentage - 0.33) / 0.33));
      blue = Math.floor(88 + (88 - 88) * ((percentage - 0.33) / 0.33));
    } else {
      red = Math.floor(250 - (192 * ((percentage - 0.66) / 0.34)));
      green = 246;
      blue = Math.floor(88 + (170 - 88) * ((percentage - 0.66) / 0.34));
    }
    return `rgb(${red}, ${green}, ${blue})`;
  };

  function calculateStat(base, iv, ev, nivel, naturaleza) {
    return Math.floor(
      (((2 * base + iv + ev / 4) * nivel) / 100 + 5) * naturaleza
    );
  }

  function calculateStatPS(base, iv, ev, nivel) {
    return Math.floor(((2 * base + iv + ev / 4) * nivel) / 100 + nivel + 10);
  }

  return (
    <PokeCard tamaño={"h5"} encabezado={"Características base"}>
      <Card.Body>
        <Container fluid>
          <div className="table-responsive">
            <Table
              bordered
              className="m-0 table-striped text-center"
              responsive="sm"
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                borderColor: bgColor,
                maxWidth: '100%',
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: bgColor,
                      borderTopLeftRadius: "10px",
                    }}
                  ></th>
                  <th colSpan={2} style={{ backgroundColor: bgColor }}>
                    Características base
                  </th>

                  <th colSpan={2} style={{ backgroundColor: bgColor }}>
                    Nivel-50
                  </th>
                  <th colSpan={2} style={{ backgroundColor: bgColor }}>
                    Nivel-100
                  </th>
                </tr>
              </thead>
              <tbody>
                {pokemonData.stats.map((x) => (
                  <tr key={x.stat.name}>
                    <td>
                      <strong style={{ fontSize: '0.9rem' }}>{data[x.stat.name]}</strong>
                    </td>
                    <td>{x.base_stat}</td>
                    <td style={{ minWidth: "90px"}}>
                      <div
                        style={{
                          backgroundColor: "#f0f0f0",
                          borderRadius: "5px",
                          overflow: "hidden",
                          position: "relative",
                          height: "15px",
                          marginTop: "5px",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: getColor(x.base_stat),
                            width: `${(x.base_stat / 255) * 100}%`,
                            height: "100%",
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      {x.stat.name !== "hp"
                        ? calculateStat(x.base_stat, 0, 0, 50, 0.9)
                        : calculateStatPS(x.base_stat, 0, 0, 50)}
                    </td>
                    <td>
                      {x.stat.name !== "hp"
                        ? calculateStat(x.base_stat, 31, 252, 50, 1.1)
                        : calculateStatPS(x.base_stat, 31, 252, 50)}
                    </td>
                    <td>
                      {x.stat.name !== "hp"
                        ? calculateStat(x.base_stat, 0, 0, 100, 0.9)
                        : calculateStatPS(x.base_stat, 0, 0, 100)}
                    </td>
                    <td>
                      {x.stat.name !== "hp"
                        ? calculateStat(x.base_stat, 31, 252, 100, 1.1)
                        : calculateStatPS(x.base_stat, 31, 252, 100)}
                    </td>
                  </tr>
                ))}

                <tr>
                  <td
                    style={{
                      borderBottomLeftRadius: "10px",
                      backgroundColor: bgColor
                    }}
                  >
                    <strong style={{ fontSize: '0.9rem' }}>Total</strong>
                  </td>
                  <td style={{ backgroundColor: bgColor }}>
                    {pokemonData.stats.reduce((total, x) => total + x.base_stat, 0)}
                  </td>
                  <td style={{ backgroundColor: bgColor }}/>
                  <td style={{ backgroundColor: bgColor }}>Mín</td>
                  <td style={{ backgroundColor: bgColor }}>Máx</td>
                  <td style={{ backgroundColor: bgColor }}>Mín</td>
                  <td style={{ backgroundColor: bgColor }}>Máx</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Container>
        <Card.Text
          as="p"
          style={{ fontSize: "0.8rem" }}
          className="text-center"
        >
          Valores mínimos (Mín) calculados asumiendo naturaleza desfavorable, 0
          EVs y 0 IVs. Valores máximos (Máx) calculados asumiendo naturaleza
          favorable, 252 EVs y 31 IVs.
        </Card.Text>
      </Card.Body>
    </PokeCard>
  );
}

export default PokeStats;
