import React, { useContext, useState, useEffect } from "react";
import { Modal, Step, Dropdown } from "semantic-ui-react";
import { SocketContext } from "../../context";

const PlayerList = () => {
  const [names, setNames] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("player-list", (namesList) => {
      console.log(namesList);
      setNames(namesList);
    });
  });

  const handlePlayersListClick = () => {
    socket.emit("player-list");
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
          <Step.Group link ordered>
            {names.map((n) => {
              return <Step>{n}</Step>;
            })}
          </Step.Group>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default PlayerList;
