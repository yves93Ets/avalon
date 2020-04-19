import React from "react";
import { Card } from "semantic-ui-react";
import CharactereViewCard from "./CharactereViewCard";
import { characteres } from "../../const/constants";


export default function CharactereView() {
  
  return (
    <Card.Group    style={cardStyle} itemsPerRow={3}>
      {
        characteres.map(c => {
         return <CharactereViewCard  charactere={c} />
        })
      }
          
    </Card.Group>
  );
}

const cardStyle = {
  margin: "15px",
};
