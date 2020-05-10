import React, { useContext, useState, useEffect } from "react";
import { Button, Card, List } from "semantic-ui-react";
import { SocketContext, UserContext } from "../context";
import SelectPlayer from "../comoponents/common/SelectPlayer";
export default function AvalonAcceptMission() {
  const socket = useContext(SocketContext);
  const [username] = useContext(UserContext);
  const [isvisible, setIsVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [playersList, setPlayersList] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);

  useEffect(() => {
    socket.emit("mission-vote-count");
    socket.on("mission-vote-count", (c, pl, name) => {
      setCount(c);
      setPlayersList(pl);
      setName(name);
    });

    socket.on("mission-choices-names", (names) => {
      setSelectedNames(names);
    });
  }, [socket]);

  const handleClick = (e, v) => {
    socket.emit("accept-mission", username, v.value, selectedNames);
    sendCount();
  };

  const sendCount = () => {
    socket.emit("mission-vote-count");
    setIsVisible(false);
    setDisabled(true);
    setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    setTimeout(() => {
      setDisabled(false);
    }, 5000);
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
      <Card centered>
        <Card.Content>
          <Card.Header>
            {name === username
              ? "Your turn to choose"
              : `${name} is choosing ...`}
          </Card.Header>
          <Card.Meta style={marginStyle}>
            <SelectPlayer names={playersList} />
          </Card.Meta>
          <Card.Description>
            <List items={selectedNames}></List>
          </Card.Description>
        </Card.Content>
        {isvisible ? (
          <Card.Content extra>
            <Button.Group fluid>
              <Button
                value={true}
                disabled={disabled}
                onClick={handleClick}
                className="bg-good"
              >
                Accept
              </Button>
              <Button.Or text={count} />
              <Button
                value={false}
                disabled={disabled}
                onClick={handleClick}
                className="bg-evil"
              >
                Decline
              </Button>
            </Button.Group>
          </Card.Content>
        ) : null}
      </Card>

      {username === "David" ? (
        <Button style={marginStyle} onClick={handleNext}>
          Next
        </Button>
      ) : null}
    </>
  );
}

const marginStyle = { margin: "10px" };
