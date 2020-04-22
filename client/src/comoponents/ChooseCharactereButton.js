import React, { useState } from "react";
import { Button } from "semantic-ui-react";

export default function ChooseCharactereButton(props) {
  const onClick = (e, data) => {
    e.preventDefault();
  };

  return <Button onClick={onClick}>{props.count}</Button>;
}
