import React, { useState, useContext, useEffect } from "react";
import { Form, Icon } from "semantic-ui-react";
import { options } from "../const/constants";
import { SocketContext } from "../context";

export default function AvalonCharacter() {
  const socket = useContext(SocketContext);

  const [characteresArray, setCharacteresArray] = useState([
    "Assassin",
    "Mordred",
    "Merlin",
    "Loyal Servant of Arthur 1",
    "Loyal Servant of Arthur 2",
  ]);

  const [namesArray, setNamesArray] = useState();
  const [nameOptions, setNameOptions] = useState([]);

  useEffect(() => {
    socket.emit("player-list");
    socket.on("player-list", (namesList) => {
      setNamesArray(namesList);
      const o = namesList.map((n) => {
        return { key: n, text: n, value: n };
      });
      setNameOptions(o);
    });
  }, [socket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.emit("distribute", characteresArray, namesArray);
  };

  const onChange = (e, data) => {
    e.preventDefault();
    setCharacteresArray(data.value);
  };

  const onChangeNames = (e, data) => {
    e.preventDefault();
    setNamesArray(data.value);
  };

  return (
    <Form className="margin" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Dropdown
          fluid
          placeholder="Characteres"
          multiple
          selection
          options={options}
          value={characteresArray}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Dropdown
          fluid
          placeholder="Names"
          multiple
          selection
          options={nameOptions}
          value={namesArray}
          onChange={onChangeNames}
        />
      </Form.Group>
      <Form.Button type="submit">
        {" "}
        <Icon name="play circle" />
        play
      </Form.Button>
    </Form>
  );
}
