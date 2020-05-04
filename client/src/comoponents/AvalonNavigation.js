import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { UserContext, SocketContext } from "../context";
import { getTitle } from "hookrouter";
import CountdownCircleTimer from "./MyCountdownCircleTimer";
import PlayerList from "./players/PlayerList";
import PlayerRoleMessage from "./players/PlayerRoleMessage";

export default function AvalonNavigation() {
  const [active, setActive] = useState();

  const [username, setUsername] = useContext(UserContext);
  const [seconds, setSeconds] = useState();

  const socket = useContext(SocketContext);
  useEffect(() => {
    setActive(getTitle());

    socket.emit("started-at");

    socket.on("started-at", (s) => {
      setSeconds(s);
    });
  }, []);

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
    localStorage.removeItem("item");
    setUsername("");
  };

  const handleRoleClick = () => {
    socket.emit("my-role", username);
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
          disabled={username === "David" || username === "Yves" ? false : true}
          name="Admin"
          active={active === "Admin"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Rules"
          active={active === "Rules"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Results"
          active={active === "Results"}
          onClick={handleItemClick}
        />
        <CountdownCircleTimer seconds={seconds} />
        <Menu.Menu position="right">
          <Dropdown item text={username}>
            <Dropdown.Menu>
              <Dropdown.Item
                icon="user"
                text="change name"
                onClick={handleRenameClick}
              ></Dropdown.Item>
              <PlayerList></PlayerList>
              <Dropdown.Item
                name={username}
                icon="pied piper alternate"
                text="your role"
                onClick={handleRoleClick}
              ></Dropdown.Item>
              {active === "Admin" ? (
                <>
                  <Dropdown.Item
                    icon="list alternate outline"
                    text="order"
                    onClick={handleShuffleListClick}
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
