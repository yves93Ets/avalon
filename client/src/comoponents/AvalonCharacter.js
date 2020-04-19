import React, { useState } from "react";
import { Form } from "semantic-ui-react";

const options = [
  { key: "Assassin", text: "Assassin", value: "Assassin" },
  { key: "Mordred", text: "Mordred", value: "Mordred" },
  { key: "Morgana", text: "Morgana", value: "Morgana" },
  { key: "Oberon", text: "Oberon", value: "Oberon" },

  { key: "Merlin", text: "Merlin", value: "Merlin" },
  { key: "Percival", text: "Percival", value: "Percival" },
  { key: "Good Guy 1", text: "Good Guy 1", value: "Good Guy 1" },
  { key: "Good Guy 2", text: "Good Guy 2", value: "Good Guy 2" },
  { key: "Good Guy 3", text: "Good Guy 3", value: "Good Guy 3" },
  { key: "Good Guy 4", text: "Good Guy 4", value: "Good Guy 4" },
  { key: "Bad Guy 1", text: "Bad Guy 1", value: "Bad Guy 1" },
];
export default function AvalonCharacter() {
  const [value, setvalue] = useState([
    "Assassin",
    "Mordred",
    "Merlin",
    "Good Guy 1",
    "Good Guy 2",
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const onChange = (e, data) => {
    e.preventDefault();
    setvalue(data.value);
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
          value={value}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Button type="submit">Play</Form.Button>
    </Form>
  );
}
