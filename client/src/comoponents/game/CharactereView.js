import React from "react";
import { Card } from "semantic-ui-react";
import CharactereCard from "./CharactereCard";
import { characteres } from "../../const/constants";

export default function CharactereView() {
  return (
    <Card.Group    style={cardStyle} itemsPerRow={4}>
      <CharactereCard  charactere={characteres.mordred} />
      <CharactereCard  charactere={characteres.merlin} />
      <CharactereCard  charactere={characteres.assassin} />
      <CharactereCard charactere={characteres.lancelot}/>
    </Card.Group>
  );
}

const cardStyle = {
  margin: "15px",
};
