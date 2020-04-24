import React, { useState, useContext } from "react";
import { Form } from "semantic-ui-react";
import { options } from "../const/constants";
import { SocketContext } from "../context";

export default function AvalonCharacter() {
  const socket = useContext(SocketContext);

  const [namesArray, setNamesArray] = useState([
    "Assassin",
    "Mordred",
    "Merlin",
    "Loyal Servant of Arthur 1",
    "Loyal Servant of Arthur 2",
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.emit("distribute", namesArray);
  };
  const onChange = (e, data) => {
    e.preventDefault();
    console.log(1, data);
    console.log(3, data.options);
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
          value={namesArray}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Button type="submit">Distribute roles</Form.Button>
    </Form>
  );
}
