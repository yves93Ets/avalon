import React from "react";
import { Card } from "semantic-ui-react";
import CharactereCard from "./CharactereCard";

export default function CharactereView() {
  return (
    <Card.Group style={cardStyle} itemsPerRow={4}>
      <CharactereCard isGood={true} name="Merlin" description="knows evil" />
      <CharactereCard
        isGood={false}
        name="Mordred"
        description="Unknow by Merlin"
      />
    </Card.Group>
  );
}

const cardStyle = {
  margin: "15px",
};
