import React, { useState, useContext, useEffect } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { UserContext, SocketContext } from "../context";
import { getTitle } from "hookrouter";
import PlayerList from "./players/PlayerList";
import PlayerRoleMessage from "./players/PlayerRoleMessage";

export default function AvalonNavigation() {
  const [active, setActive] = useState();
  const [username, setUsername] = useContext(UserContext);
  const socket = useContext(SocketContext);
  useEffect(() => {
    setActive(getTitle());
  });

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

  const handleRemoveNamesClick = (e, { name }) => {
    socket.emit("remove-names", name);
  };

  return (
    <>
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
              {active === "Admin" ? (
                <>
                  <Dropdown.Item
                    icon="list alternate outline"
                    text="order"
                    onClick={handleShuffleListClick}
                  ></Dropdown.Item>
                  <Dropdown.Item
                    name={username}
                    icon="eraser"
                    text="empty list"
                    onClick={handleRemoveNamesClick}
                  ></Dropdown.Item>
                </>
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
      <PlayerRoleMessage username={username} />
    </>
  );
}
