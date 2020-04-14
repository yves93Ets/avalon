import React from "react";
import { Card, Image } from "semantic-ui-react";

export default function CharactereCard(props) {
  const good = "card-header-blue";
  const evil = "card-header-red";
  const colorClass = props.isGood ? good : evil;
  return (
    <Card>
      <Image
        src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header className={colorClass}>{props.name}</Card.Header>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
    </Card>
  );
}
