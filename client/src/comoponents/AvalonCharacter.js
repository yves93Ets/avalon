import React, { useState, useContext, useEffect } from "react";
import { Form, Icon, Button } from "semantic-ui-react";
import { options } from "../const/constants";
import { SocketContext } from "../context";

export default function AvalonCharacter() {
  const socket = useContext(SocketContext);
  const [characteresArray, setCharacteresArray] = useState([]);
  const [namesArray, setNamesArray] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [gameRound, setGameRound] = useState(1);
  const [resultId, setResultId] = useState(0);

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
      setResultId(id);
      setGameRound(round);
    });

    socket.on("result-id", (id, round) => {
      setResultId(id);
      setGameRound(round);
    });
  }, [socket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.emit("distribute", characteresArray, namesArray);
    setTimer();
  };

  const onChange = (e, data) => {
    e.preventDefault();
    console.log(1111, data.value);
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
      .then(socket.emit("clear-show-results"), false, resultId, gameRound)

      .catch((err) => {
        console.log(err);
      });
  };

  const setTimer = () => {
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

  const handleClickShowVotes = (e) => {
    e.preventDefault();
    socket.emit("clear-show-results", true, resultId, gameRound);
    setGameRound(gameRound + 1);
    setTimer();
  };
  return (
    <Form className="margin" onSubmit={handleSubmit}>
      <Form.Group grouped>
        <Button
          negative
          icon="trash"
          content="Clear"
          onClick={handleClickDelete}
          className="bg-evil"
        ></Button>
        <Button
          icon="refresh"
          content="Show"
          onClick={handleClickShowVotes}
          className="bg-good "
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
        <Icon name="gamepad" />
        play
      </Form.Button>
    </Form>
  );
}
