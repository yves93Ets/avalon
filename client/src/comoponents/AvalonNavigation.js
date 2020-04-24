import React, { useState, useContext, useEffect } from "react";
import { Menu, Dropdown, Message } from "semantic-ui-react";
import { UserContext, SocketContext } from "../context";
import PlayerList from "./players/PlayerList";

export default function AvalonNavigation(props) {
  const [role, setRole] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [active] = useState(props.active);
  const [username, setUsername] = useContext(UserContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("roles", (roles) => {
      console.log(1111, roles);
      roles.map((r) => {
        if (r.username === username) {
          setRole({
            charactere: r.charactere,
            knowledge: setKnowledge(r.knowledge),
          });
        }
      });
      console.log(2222, role);
      console.log(333333333, props.active);

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
          active={active === "AvalonApp"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Admin"
          active={active === "AvalonAdmin"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Rules"
          active={active === "AvalonRules"}
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
            You are <p style={pStyle}>{role.charactere}</p> and you know
          </Message.Content>
          <Message.List style={ListStyle}>
            {role.knowledge.map((k) => (
              <Message.Item>{k}</Message.Item>
            ))}
          </Message.List>
        </Message>
      ) : null}
    </div>
  );
}

const contentStyle = {
  display: "ruby",
};

const ListStyle = {
  margin: "15px",
};

const pStyle = {
  fontWeight: "bold",
};
