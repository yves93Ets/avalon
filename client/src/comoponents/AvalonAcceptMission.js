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

  const handleShow = () => {
    socket.emit("show-accept-mission", username, false);
  };

  return (
    <>
      <Form size="small">
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
      <Button onClick={handleShow}>Next</Button>
    </>
  );
}
