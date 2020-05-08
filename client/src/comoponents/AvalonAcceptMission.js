import React, { useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { SocketContext, UserContext } from "../context";

export default function AvalonAcceptMission() {
  const socket = useContext(SocketContext);
  const [username] = useContext(UserContext);

  const handleAccept = () => {
    socket.emit("accept-mission", username, true);
  };

  const handleDecline = () => {
    socket.emit("accept-mission", username, false);
  };

  const handleNext = () => {
    socket.emit("show-accept-mission", username, false);
    setTimeout(() => {
      socket.emit("restart-timer");
    }, 50);
    setTimeout(() => {
      socket.emit("view-timer");
    }, 100);
    setTimeout(() => {
      socket.emit("started-at");
    }, 150);
  };

  return (
    <>
      <Form style={marginStyle} size="small">
        <Button.Group>
          <Button onClick={handleAccept} className="bg-good">
            Accept
          </Button>
          <Button.Or />
          <Button onClick={handleDecline} className="bg-evil">
            Decline
          </Button>
        </Button.Group>
      </Form>
      {username === "David" ? (
        <Button style={marginStyle} onClick={handleNext}>
          Next
        </Button>
      ) : null}
    </>
  );
}

const marginStyle = { margin: "10px" };
