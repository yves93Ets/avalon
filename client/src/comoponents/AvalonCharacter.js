import React, { useState, useContext } from "react";
import { Form } from "semantic-ui-react";
import { options } from "../const/constants";
import { SocketContext } from "../context";

export default function AvalonCharacter() {
  const socket = useContext(SocketContext);

  const [rolesArr, setRolesArr] = useState([
    "Assassin",
    "Mordred",
    "Merlin",
    "Loyal Servant of Arthur 1",
    "Loyal Servant of Arthur 2",
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.emit("distribute", rolesArr);
  };
  const onChange = (e, data) => {
    e.preventDefault();
    setRolesArr(data.value);
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
          value={rolesArr}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Button type="submit">Distribute roles</Form.Button>
    </Form>
  );
}
