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
import { CountContext, SocketContext, UserContext } from "../context";

export default function AvalonAcceptMission() {
  const url = "/api/avalon";
  const socket = useContext(SocketContext);
  const [count, setCount] = useContext(CountContext);
  const [card, setCard] = useState(succes);
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [username] = useContext(UserContext);

  useEffect(() => {
    socket.on("submit-count", (c) => {
      setCount(c);
    });
  }, [setCount, socket]);

  const handleAccept = () => {
    socket.emit("accept-mission", username, true);
  };

  const handleDecline = () => {
    socket.emit("accept-mission", username, false);
  };

  return (
    <Form size="small">
      <Button.Group>
        <Button onSubmit={handleAccept} className="bg-good">
          Accept
        </Button>
        <Button.Or />
        <Button onSubmit={handleDecline} className="bg-evil">
          Decline
        </Button>
      </Button.Group>
    </Form>
  );
}

const marginStyle = {
  marginTop: "10px",
  marginBottom: "10px",
};
