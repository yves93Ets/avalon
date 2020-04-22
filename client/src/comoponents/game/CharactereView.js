import React from "react";
import { Card } from "semantic-ui-react";
import CharactereViewCard from "./CharactereViewCard";
import { characteres } from "../../const/constants";

export default function CharactereView() {
  return (
    <Card.Group doubling style={cardStyle} itemsPerRow={4}>
      {characteres.map((c, key) => {
        return <CharactereViewCard key={key} charactere={c} />;
      })}
    </Card.Group>
  );
}

const cardStyle = {
  margin: "15px",
};
