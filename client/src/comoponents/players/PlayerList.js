import React, { useContext, useState, useEffect } from "react";
import { Modal, Step, Dropdown } from "semantic-ui-react";
import { SocketContext } from "../../context";

const PlayerList = () => {
  const [names, setNames] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(0);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("player-list", (namesList, turn) => {
      setNames(namesList);
      setPlayerTurn(turn);
    });
  }, [socket]);

  const handlePlayersListClick = () => {
    socket.emit("player-list");
  };

  const handleDelete = (e, name) => {
    console.log(1111, name);
    socket.emit("delete-name", name);
  };
  return (
    <Modal
      trigger={
        <Dropdown.Item
          onClick={handlePlayersListClick}
          icon="ordered list"
          text="players list"
        ></Dropdown.Item>
      }
    >
      <Modal.Header>Players List</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Step link>
            <Step.Group fluid vertical ordered>
              {names.map((n, i) => {
                return (
                  <Step key={i} active={i === (playerTurn - 1) % names.length}>
                    {n}
                  </Step>
                );
              })}
            </Step.Group>
          </Step>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default PlayerList;

const myStyle = {
  margin: "10px",
};
