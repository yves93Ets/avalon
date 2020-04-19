import React from "react";
import { Card, Image } from "semantic-ui-react";

export default function CharactereViewCard(props) {
  const good = "card-header-blue";
  const evil = "card-header-red";
  const   {src , name ,description, isGood} = props.charactere;
  const colorClass = isGood ? good : evil;

  return (
    <Card  >
      <Image
        src={src}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header className={colorClass}>{name}</Card.Header>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  );
}
