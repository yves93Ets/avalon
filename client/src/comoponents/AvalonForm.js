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
import socketIOClient from "socket.io-client";
import { ApiContext } from "../context/ContextApi";

export default function AvalonForm(props) {
  const url = "/api/avalon";
  const [card, setCard] = useState(succes);
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [count, setCount] = useContext(ApiContext);
  const socket = socketIOClient({transports:['websocket']});
  //const socket = socketIOClient();

  useEffect(() => {
    socket.on("submit count", (c) => {
      socket.io.opts.transports = ['polling', 'websocket'];

      setCount(c);
    });
  }, []);

  const send = () => {

    const submitCount = count + 1;
    setCount(submitCount);
    socket.emit("submit count", submitCount);
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
