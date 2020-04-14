import React, { useState } from "react";
import { Button } from "semantic-ui-react";

export default function ChooseCharactereButton(props) {
  const onClick = (e, data) => {
    e.preventDefault();
    console.log(data);
  };

  return <Button onClick={onClick}>{props.count}</Button>;
}
