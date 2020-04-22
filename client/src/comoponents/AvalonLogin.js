import React, { useState, useContext } from "react";
import { Form, Input, Grid, Header, Image } from "semantic-ui-react";
import { UserContext, SocketContext } from "../context";
import merlinSrc from "../images/Merlin.jpg";

export default function AvalonLogin() {
  const [username, setUsername] = useContext(UserContext);
  const [name, setName] = useState("");
  const socket = useContext(SocketContext);

  const handleSubmit = () => {
    socket.emit("send-name", name);
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
          <Grid.Column width={4}>
            <Form size="small" success onSubmit={handleSubmit}>
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
              <Form.Button
                fluid
                color="blue"
                content={username === "" ? "Login" : "Rename"}
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}
