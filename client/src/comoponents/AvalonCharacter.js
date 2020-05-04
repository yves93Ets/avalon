import React, { useState, useContext, useEffect } from "react";
import { Form, Icon, Button } from "semantic-ui-react";
import { options } from "../const/constants";
import { SocketContext } from "../context";

export default function AvalonCharacter() {
  const socket = useContext(SocketContext);
  const [characteresArray, setCharacteresArray] = useState([]);
  const [namesArray, setNamesArray] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [gameIdgameRound, setGameIdgameRound] = useState([]);

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
    socket.on("list", (namesList, characteresList, id, round) => {
      setArray(namesList, setNamesArray, setNameOptions);
      setArray(characteresList, setCharacteresArray);
      setGameIdgameRound({ id, round });
    });

    socket.on("result-id", (id) => {
      setGameIdgameRound({ id, round: 1 });
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

  const handleClickDelete = async (e) => {
    e.preventDefault();

    await fetch("/api/avalon", {
      method: "Delete",
    })
      .then(socket.emit("submit-count", 0))
      .then(
        socket.emit("clear-show-results"),
        false,
        gameIdgameRound.id,
        gameIdgameRound.round
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickRefresh = (e) => {
    e.preventDefault();
    socket.emit(
      "clear-show-results",
      true,
      gameIdgameRound.id,
      gameIdgameRound.round + 1
    );
  };
  return (
    <Form className="margin" onSubmit={handleSubmit}>
      <Form.Group>
        <Button
          negative
          icon="trash"
          content="Clear"
          onClick={handleClickDelete}
          color="red"
          className="vote-red"
        ></Button>
        <Button
          icon="refresh"
          content="Show"
          onClick={handleClickRefresh}
          color="blue"
        ></Button>
      </Form.Group>
      <Form.Group className="margin">
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
      <Form.Group className="margin">
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
      <Form.Button className="margin" type="submit">
        {" "}
        <Icon name="gamepad" />
        play
      </Form.Button>
    </Form>
  );
}
