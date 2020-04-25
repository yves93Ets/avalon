import React, { useState, useContext, useEffect } from "react";
import { Menu, Dropdown, Message } from "semantic-ui-react";
import { UserContext, SocketContext } from "../context";
import PlayerList from "./players/PlayerList";
import { getTitle } from "hookrouter";

export default function AvalonNavigation() {
  const [role, setRole] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState();
  const [username, setUsername] = useContext(UserContext);
  const socket = useContext(SocketContext);
  useEffect(() => {
    setActive(getTitle());
    socket.on("roles", (roles) => {
      console.log("roles", roles);
      roles.map((r) => {
        if (r.username === username) {
          setRole({
            charactere: r.charactere,
            knowledge: setKnowledge(r.knowledge),
          });
        }
      });

      setIsVisible(true);
    });
  });

  const setKnowledge = (knowledge) => {
    return knowledge.length === 0 ? ["nobody"] : knowledge;
  };

  const handleItemClick = (e, { name }) => {
    window.location.href = "/" + name.toLowerCase().split(" ").join("");
  };

  const handleRenameClick = () => {
    window.location.href = "/";
  };

  const handleShuffleListClick = () => {
    socket.emit("shuffle-list");
  };

  const handleLogOutClick = (e, { name }) => {
    socket.emit("logout", name);
    localStorage.removeItem("username");
    setUsername("");
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };
  return (
    <div>
      <Menu pointing>
        <Menu.Item
          name="Vote"
          active={active === "Vote"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Admin"
          active={active === "Admin"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Rules"
          active={active === "Rules"}
          onClick={handleItemClick}
        />
        <Menu.Menu position="right">
          <Dropdown item text={username}>
            <Dropdown.Menu>
              <Dropdown.Item
                icon="user"
                text="change name"
                onClick={handleRenameClick}
              ></Dropdown.Item>
              <PlayerList></PlayerList>
              {active === "AvalonAdmin" ? (
                <Dropdown.Item
                  icon="list alternate outline"
                  text="order"
                  onClick={handleShuffleListClick}
                ></Dropdown.Item>
              ) : null}

              <Dropdown.Item
                name={username}
                icon="log out"
                text="log out"
                onClick={handleLogOutClick}
              ></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
      {isVisible ? (
        <Message onDismiss={handleDismiss} floating size="small">
          <Message.Content style={contentStyle}>
            You are
            <p style={pStyle}> {role.charactere} </p>
            and you know
          </Message.Content>
          <Message.List style={ListStyle}>
            {role.knowledge.map((k) => (
              <Message.Item key={k}>{k}</Message.Item>
            ))}
          </Message.List>
        </Message>
      ) : null}
    </div>
  );
}

const contentStyle = {
  display: "flex",
};

const ListStyle = {
  margin: "15px",
  textTransform: "capitalize",
};

const pStyle = {
  fontWeight: "bold",
  marginLeft: "0.5em",
  marginRight: "0.5em",
  textTransform: "capitalize",
};
