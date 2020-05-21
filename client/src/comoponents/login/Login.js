import React, { useState, useContext } from "react";
import { Form, Input, Grid, Header, Button } from "semantic-ui-react";
import { UserContext, SocketContext } from "../../context";
import { useTitle } from "hookrouter";

export default function Login({ roomName }) {
  const [username, setUsername] = useContext(UserContext);
  const [name, setName] = useState("");
  const socket = useContext(SocketContext);
  useTitle("Login");

  const handleSubmit = (e) => {
    e.preventDefault();
    username === ""
      ? socket.emit("login", name)
      : socket.emit("rename", name, username);
    const now = new Date().getHours();
    const expiry = new Date().setHours(now + 4);
    const item = { name, expiry };
    localStorage.setItem("item", JSON.stringify(item));
    setUsername(name);
    window.location.href = "/vote";
  };

  const handleChange = (e, { value }) => setName(value);
  return (
    <Grid.Row centered style={style}>
      <Header as="h2" className="card-blue-header" textAlign="center">
        {roomName}
      </Header>
      <Form onSubmit={handleSubmit} style={cardStyle}>
        <Form.Field required>
          <Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="User name"
            value={name}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Button
            fluid
            className="bg-good"
            content={username === "" ? "Login" : "Rename"}
          />
        </Form.Field>
      </Form>
    </Grid.Row>
  );
}

const cardStyle = {
  margin: "10px",
};

const style = {
  marginTop: "50px",
};
