import React, { useState } from "react";
import { Menu } from "semantic-ui-react";

export default function AvalonNavigation() {
  const [active, setActive] = useState();

  const handleItemClick = (e, { name }) => {
    setActive(name);
    window.location.href = "/" + name.toLowerCase();
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
        name="Characteres"
        active={active === "Characteres"}
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
