import React, { useState, useContext } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { UserContext, SocketContext } from "../context";
import PlayerList from "./players/PlayerList";

export default function AvalonNavigation(props) {
  const [active] = useState(props.active);
  const [username, setUsername] = useContext(UserContext);
  const socket = useContext(SocketContext);

  const handleItemClick = (e, { name }) => {
    console.log(name);
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

  return (
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
  );
}
