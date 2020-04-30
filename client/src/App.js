import React, { useContext, useEffect } from "react";
import "./App.css";
import { useRoutes } from "hookrouter";
import AvalonLogin from "./comoponents/AvalonLogin";
import AvalonApp from "./comoponents/AvalonApp";
import AvalonAdmin from "./comoponents/AvalonAdmin";
import AvalonNavigation from "./comoponents/AvalonNavigation";
import AvalonRules from "./comoponents/AvalonRules";
import AvalonResultStats from "./comoponents/AvalonResultStats";

import { UserContext, CountProvider } from "./context";

export default function App() {
  const [username, setUsername] = useContext(UserContext);

  useEffect(() => {
    const itemStr = localStorage.getItem("item");
    const item = JSON.parse(itemStr);
    const name = item && item.expiry > new Date() ? item.name : "";
    const user = !item ? "" : name;
    setUsername(user);
  }, [username, setUsername]);

  const routes = {
    "/": () => <AvalonLogin />,
    "/vote": () => <AvalonApp />,
    "/admin": () => <AvalonAdmin />,
    "/rules": () => <AvalonRules />,
    "/results": () => <AvalonResultStats />,
  };

  const routeResult = useRoutes(routes);
  return (
    <div>
      {username === "" || username === "undefined" ? (
        <AvalonLogin />
      ) : (
        <div>
          <AvalonNavigation />
          <CountProvider>{routeResult || <div>not found</div>}</CountProvider>
        </div>
      )}
    </div>
  );
}
