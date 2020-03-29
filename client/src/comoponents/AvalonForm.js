import React, { useState } from "react";
import { Card, Image, Checkbox, Form } from "semantic-ui-react";

export default function AvalonForm(props) {
  const handleSubmit = async e => {
    e.preventDefault();
    await fetch("/api/avalon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ vote: card.isSuccesfull })
    }).catch(err => {
      console.log(err);
    });
  };

  const { blueSrc, redSrc } = props;

  const [card, setCard] = useState({
    isSuccesfull: true,
    src: blueSrc,
    cssClass: "card-header-blue"
  });

  const handleChecbox = () => {
    card.isSuccesfull
      ? setCard({
          isSuccesfull: false,
          src: redSrc,
          cssClass: "card-header-red"
        })
      : setCard({
          isSuccesfull: true,
          src: blueSrc,
          cssClass: "card-header-blue"
        });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Card centered>
          <Image bordered src={card.src} wrapped ui={false} size="mini" />
          <Card.Header className={card.cssClass}>
            {card.isSuccesfull ? "Succes" : "Fail"}
          </Card.Header>
          <Card.Content extra>
            <Checkbox defaultChecked toggle onChange={handleChecbox} />
          </Card.Content>
        </Card>
      </Form.Group>
      <Form.Button style={marginStyle}>Submit</Form.Button>
    </Form>
  );
}

const marginStyle = {
  marginTop: "10px",
  marginBottom: "10px"
};
