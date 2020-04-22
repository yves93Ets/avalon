import React, { useState, useContext } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { UserContext, SocketContext } from "../context";

export default function AvalonNavigation(props) {
  const [active] = useState(props.active);
  const [username, setUsername] = useContext(UserContext);
  const socket = useContext(SocketContext);

  const handleItemClick = (e, { name }) => {
    window.location.href = "/" + name.toLowerCase().split(" ").join("");
  };

  const handleRenameClick = (e, { name }) => {
    window.location.href = "/";
  };

  const handleLogOutClick = (e, { name }) => {
    socket.emit("disconnecting", name);
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
            <Dropdown.Item
              icon="ordered list"
              text="list of players"
              onClick={handleRenameClick}
            ></Dropdown.Item>
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
