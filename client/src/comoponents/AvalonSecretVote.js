import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Image,
  Checkbox,
  Form,
  Button,
  Segment,
  Icon,
  List,
} from "semantic-ui-react";
import { isSuccesfullEnum } from "../const/enums";
import { fail, succes, neutral } from "../const/constants";
import { CountContext, SocketContext, UserContext } from "../context";

export default function AvalonSecretVote(props) {
  const url = "/api/avalon";
  const socket = useContext(SocketContext);
  const [count, setCount] = useContext(CountContext);
  const [card, setCard] = useState(succes);
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [username] = useContext(UserContext);
  const [selectedNames, setSelectedNames] = useState([]);

  useEffect(() => {
    socket.on("submit-count", (c) => {
      setCount(c);
    });
    setSelectedNames(props.names);
  }, [setCount, socket, props]);

  const send = () => {
    const submitCount = count + 1;
    setCount(submitCount);
    socket.emit("submit-count", submitCount);
    socket.emit("clear-show-results", false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vote: card.isSuccesfull, username }),
    })
      .then((e) => {
        send();
        setIsSubmitted(false);
        setCard(neutral);
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      setCard(succes);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleCheckbox = () => {
    card.isSuccesfull ? setCard(fail) : setCard(succes);
  };

  return (
    <>
      {selectedNames.includes(username) ? (
        <Form size="small" onSubmit={handleSubmit}>
          <Form.Group>
            <Card className="width" fluid centered>
              <Image size="small" src={card.src} />
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
      ) : (
        <Form style={marginStyle} size="small">
          <Card centered>
            <Card.Header>
              <List icon="clock" items={selectedNames} />
            </Card.Header>
            <Card.Content>
              Are Votin...
              <Icon name="clock" />
            </Card.Content>
            {username === "David" || username === "Yves" ? (
              <Card.Content extra>
                <Segment>
                  <Icon name="users" /> : {count}
                </Segment>
              </Card.Content>
            ) : null}
          </Card>
        </Form>
      )}
    </>
  );
}

const marginStyle = {
  marginTop: "10px",
  marginBottom: "10px",
};
