import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import ChooseCharactereButton from "./ChooseCharactereButton";

export default function AvalonChooseCharactere() {
  const [playerCount, setPlayerCount] = useState([1, 2, 3]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const onChange = (e, data) => {
    e.preventDefault();
  };

  return (
    <Button.Group>
      {playerCount.map((p, i) => {
        return (
          <React.Fragment key={p}>
            <ChooseCharactereButton count={p} />
            {playerCount.length - 1 === i ? "" : <Button.Or text="" />}
          </React.Fragment>
        );
      })}
    </Button.Group>
  );
}
