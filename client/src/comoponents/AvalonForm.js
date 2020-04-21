import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Image,
  Checkbox,
  Form,
  Button,
  Segment,
  Icon,
} from "semantic-ui-react";
import { isSuccesfullEnum } from "../const/enums";
import { fail, succes, neutral } from "../const/constants";
import { CountContext } from "../context/CountContext";
import { SocketContext } from "../context/SocketContext";
export default function AvalonForm() {
  const url = "/api/avalon";
  const socket = useContext(SocketContext);
  const [count, setCount] = useContext(CountContext);
  const [card, setCard] = useState(succes);
  const [isSubmitted, setIsSubmitted] = useState(true);

  useEffect(() => {
    socket.on("submit-count", (c) => {
      setCount(c);
    });
  }, [setCount, socket]);

  const send = () => {
    const submitCount = count + 1;
    setCount(submitCount);
    socket.emit("submit-count", submitCount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vote: card.isSuccesfull }),
    })
      .then((e) => {
        setIsSubmitted(false);
        setCard(neutral);
        send();
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      setCard(succes);
      setIsSubmitted(true);
    }, 3000);
  };

  const handleCheckbox = () => {
    card.isSuccesfull ? setCard(fail) : setCard(succes);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Card centered>
          <Image bordered src={card.src} wrapped ui={false} />
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
              checked={card.isSuccesfull !== 0 ? true : false}
              toggle
              onChange={handleCheckbox}
            />
            <Segment>
              <Icon name="users" /> : {count}
            </Segment>
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
