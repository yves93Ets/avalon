import React, { useState } from "react";
import { Card, Image, Checkbox, Form, Button } from "semantic-ui-react";
import { isSuccesfullEnum } from "../const/enums";
import { fail, succes, neutral } from "../const/constants";
export default function AvalonForm(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/avalon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vote: card.isSuccesfull }),
    })
      .then((e) => {
        setIsSubmitted(false);
        setCard(neutral);
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      setCard(succes);
      setIsSubmitted(true);
    }, 5000);
  };

  const [card, setCard] = useState(succes);

  const [isSubmitted, setIsSubmitted] = useState(true);

  const handleCheckbox = () => {
    card.isSuccesfull ? setCard(fail) : setCard(succes);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Card centered>
          <Image bordered src={card.src} wrapped ui={false} size="small" />
          <Card.Header className={card.cssClass}>
            {card.isSuccesfull === isSuccesfullEnum.FAIL
              ? "Fail"
              : card.isSuccesfull === isSuccesfullEnum.SUCCES
              ? "Succes"
              : ""}
          </Card.Header>
          <Card.Content extra>
            <Checkbox
              disabled={!isSubmitted}
              checked={card.isSuccesfull}
              toggle
              onChange={handleCheckbox}
            />
          </Card.Content>
        </Card>
      </Form.Group>
      <Button disabled={!isSubmitted} style={marginStyle}>
        Submit
      </Button>
    </Form>
  );
}

const marginStyle = {
  marginTop: "10px",
  marginBottom: "10px",
};
