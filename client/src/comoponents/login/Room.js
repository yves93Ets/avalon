import React, { useState, useContext, useEffect } from "react";

import { Form, Button, Input, Grid, Header } from "semantic-ui-react";
import Login from "./Login";
import { SocketContext } from "../../context";

export default function Room() {
  const [rooms, setRooms] = useState(["avalon", "avalon2"]);
  const socket = useContext(SocketContext);
  const [roomName, setRoomName] = useState("");
  const [isjoinRoom, setIsjoinRoom] = useState(false);

  useEffect(() => {
    socket.on("rooms", (r) => {
      setRooms(r);
    });

    socket.on("new-room", (isValid) => {
      setIsjoinRoom(isValid);
    });
  }, [socket]);

  const handleChange = (e, { value }) => setRoomName(value);

  const handleCreate = (e) => {
    e.preventDefault();
    socket.emit("create-room", roomName);
  };

  const handleJoin = (e) => {
    e.preventDefault();
    socket.emit("get-rooms");
  };

  const handleSelectRoom = (e, { value }) => {
    e.preventDefault();
    setRoomName(value);
    setIsjoinRoom(true);
  };

  return (
    <>
      <Grid style={style} textAlign="center">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" className="card-blue-header" textAlign="center">
            Avalon
          </Header>
          <Grid.Row centered>
            <Form>
              <Form.Field>
                <Input
                  fluid
                  placeholder="Create Room"
                  onChange={handleChange}
                />
              </Form.Field>
              <Button
                onClick={handleCreate}
                style={style}
                fluid
                className="bg-evil"
                type="submit"
              >
                Create Room
              </Button>
              <Button
                onClick={handleJoin}
                style={style}
                fluid
                className="bg-good"
                type="submit"
              >
                Join Room
              </Button>
              {rooms.map((r, i) => {
                return (
                  <Button
                    key={i}
                    onClick={handleSelectRoom}
                    style={style}
                    circular
                    className="bg-evil"
                    type="submit"
                    value={r}
                  >
                    {r}
                  </Button>
                );
              })}
            </Form>
          </Grid.Row>
        </Grid.Column>
      </Grid>
      {isjoinRoom && <Login />}
    </>
  );
}

const style = {
  marginTop: "10px",
};
