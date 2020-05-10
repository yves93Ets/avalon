import React, { useState, useContext, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import { SocketContext } from "../../context";

export default function SelectPlayer(props) {
  const socket = useContext(SocketContext);
  const [namesArray, setNamesArray] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [gameRound, setGameRound] = useState(1);
  const [resultId, setResultId] = useState(0);

  useEffect(() => {
    const setArray = (array, optionSetter = null) => {
      const o = array.map((n) => {
        return { key: n, text: n, value: n };
      });
      if (optionSetter) {
        optionSetter(o);
      }
    };

    setArray(props.names, setNameOptions);
  }, [props]);

  const onChangeNames = (e, data) => {
    e.preventDefault();
    setNamesArray(data.value);
    socket.emit("mission-choices", data.value);
  };

  return (
    <Dropdown
      fluid
      placeholder="Names"
      multiple
      selection
      options={nameOptions}
      value={namesArray}
      onChange={onChangeNames}
    />
  );
}
