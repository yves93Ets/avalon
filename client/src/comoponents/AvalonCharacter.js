import React, { useState, useContext, useEffect } from "react";
import { Form, Icon } from "semantic-ui-react";
import { options } from "../const/constants";
import { SocketContext } from "../context";

export default function AvalonCharacter() {
  const socket = useContext(SocketContext);
  const [characteresArray, setCharacteresArray] = useState([]);
  const [namesArray, setNamesArray] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);

  useEffect(() => {
    const setArray = (array, arraySetter, optionSetter = null) => {
      arraySetter(array);
      const o = array.map((n) => {
        return { key: n, text: n, value: n };
      });
      if (optionSetter) {
        optionSetter(o);
      }
    };
    socket.emit("list");
    socket.on("list", (namesList, characteresList) => {
      setArray(namesList, setNamesArray, setNameOptions);
      setArray(characteresList, setCharacteresArray);
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
        <Icon name="gamepad" />
        play
      </Form.Button>
    </Form>
  );
}
