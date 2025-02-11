import React, { useContext, useState, useEffect } from "react";
import { Form, Button, Card, List, Icon } from "semantic-ui-react";
import { SocketContext, UserContext } from "../context";
import { getTitle } from "hookrouter";
import SelectPlayer from "../comoponents/common/SelectPlayer";
import { questNumbers } from "../const/constants";

export default function AvalonAcceptMission() {
  const socket = useContext(SocketContext);
  const [username] = useContext(UserContext);
  const [isvisible, setIsVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [playersList, setPlayersList] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [nPlayersToselect, setNplayersToselect] = useState(0);

  useEffect(() => {
    socket.emit("mission-vote-count");
    socket.on("mission-vote-count", (c, pl, name, round) => {
      setCount(c);
      setPlayersList(pl);
      const i = pl.length > 9 ? 6 : pl.length - 4;
      round = round > 5 ? round % 5 : round;
      setNplayersToselect(questNumbers[round - 1][i]);
      setName(name);
    });

    socket.emit("get-mission-choices");
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
    }, 10000);

    setTimeout(() => {
      setDisabled(false);
    }, 13000);
  };

  const handleNext = () => {
    socket.emit("show-accept-mission", selectedNames, name);
    setTimeout(() => {
      socket.emit("restart-timer");
      socket.emit("mission-vote-count");
      socket.emit("mission-choices", []);
    }, 75);
    setTimeout(() => {
      socket.emit("view-timer");
    }, 150);
    setTimeout(() => {
      socket.emit("started-at");
      socket.emit("check-acceptance-votes", selectedNames);
    }, 200);
  };

  const handleVote = () => {
    socket.emit("check-acceptance-votes", selectedNames);
  };

  return (
    <>
      <Card centered>
        <Card.Content>
          <Card.Header className={name === username ? "turn" : null}>
            {name === username
              ? `Your turn to choose `
              : `${name} is choosing ... `}
            <Icon className="good" name="male" />
            {` ${nPlayersToselect}`}
          </Card.Header>
          <Card.Meta style={marginStyle}>
            {name === username ? <SelectPlayer names={playersList} /> : null}
          </Card.Meta>
          <Card.Description>
            {selectedNames.length > 0 && <List items={selectedNames}></List>}
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

      {username === "David" && getTitle() === "Admin" ? (
        <Form className="margin">
          <Form.Group grouped>
            <Button
              fluid
              style={marginStyle}
              className="bg-good "
              onClick={handleNext}
            >
              Next
            </Button>
            <Button
              fluid
              style={marginStyle}
              className="bg-evil"
              onClick={handleVote}
            >
              Secret vote
            </Button>
          </Form.Group>
        </Form>
      ) : null}
    </>
  );
}

const marginStyle = { margin: "10px" };
