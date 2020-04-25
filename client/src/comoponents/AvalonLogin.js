import React, { useState, useContext } from "react";
import { Form, Input, Grid, Header, Image } from "semantic-ui-react";
import { UserContext, SocketContext } from "../context";
import merlinSrc from "../images/Merlin.jpg";
import { useTitle } from "hookrouter";

export default function AvalonLogin() {
  const [username, setUsername] = useContext(UserContext);
  const [name, setName] = useState("");
  const socket = useContext(SocketContext);
  useTitle("Rules");

  const handleSubmit = (e) => {
    e.preventDefault();
    username === ""
      ? socket.emit("login", name)
      : socket.emit("rename", name, username);
    localStorage.setItem("username", name);
    setUsername(name);
    window.location.href = "/vote";
  };

  const handleChange = (e, { value }) => setName(value);
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Image centered size="small" src={merlinSrc} />
        <Header as="h2" color="blue" textAlign="center">
          Choose a player name
        </Header>
        <Grid.Row centered>
          <Form onSubmit={handleSubmit} style={cardStyle}>
            <Form.Field required>
              <label>User name</label>
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
              <Form.Button
                fluid
                color="blue"
                content={username === "" ? "Login" : "Rename"}
              />
            </Form.Field>
          </Form>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}

const cardStyle = {
  margin: "10px",
};
