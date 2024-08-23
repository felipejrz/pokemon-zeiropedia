import { useEffect, useContext, useState } from "react";
import { PokeContext } from "../context/PokeContext";
import { ListGroup, Card } from "react-bootstrap";

function PokeAbilities() {
  const { pokemonData } = useContext(PokeContext);
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        const abilitiesData = await Promise.all(
          pokemonData.abilities.map(async (abilityInfo) => {
            const url_response = await fetch(abilityInfo.ability.url);
            const data = await url_response.json();

            const spanishName = data.names.find(
              (x) => x.language.name === "es"
            )?.name;
            const englishName = data.names.find(
              (x) => x.language.name === "en"
            )?.name;

            return {
              name: spanishName || abilityInfo.ability.name,
              englishName: englishName || abilityInfo.ability.name,
              hidden: abilityInfo.is_hidden,
            };
          })
        );
        setAbilities(abilitiesData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchAbilities();
  }, [pokemonData]);

  return (
    <>
      <Card.Subtitle className="mb-1 text-capitalize ">
        <strong>Habilidades</strong>
      </Card.Subtitle>
      <ListGroup variant="flush">
        {abilities.map((ability, index) => (
          <ListGroup.Item key={index} className="border-0">
            <strong>{ability.name}</strong> {ability.hidden ? "(Oculta)" : ""}
            <div style={{ fontSize: "0.85rem", color: "gray" }}>
              {ability.englishName}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default PokeAbilities;
