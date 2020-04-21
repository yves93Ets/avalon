import React, { useState } from "react";
import { Menu } from "semantic-ui-react";

export default function AvalonNavigation() {
  const [active, setActive] = useState();

  const handleItemClick = (e, { name }) => {
    setActive(name);
    window.location.href = "/" + name.toLowerCase().split(" ").join("");
  };

  return (
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
        name="New Game"
        active={active === "New Game"}
        onClick={handleItemClick}
      />
      <Menu.Item
        name="Rules"
        active={active === "Rules"}
        onClick={handleItemClick}
      />
    </Menu>
  );
}
