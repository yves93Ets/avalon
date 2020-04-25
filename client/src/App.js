import React, { useContext, useEffect } from "react";
import "./App.css";
import { useRoutes } from "hookrouter";
import AvalonLogin from "./comoponents/AvalonLogin";
import AvalonApp from "./comoponents/AvalonApp";
import AvalonAdmin from "./comoponents/AvalonAdmin";
import AvalonNavigation from "./comoponents/AvalonNavigation";
import AvalonRules from "./comoponents/AvalonRules";

import { UserContext, CountProvider } from "./context";

export default function App() {
  const [username, setUsername] = useContext(UserContext);

  useEffect(() => {
    const user = localStorage.getItem("username") || "";
    setUsername(user);
  }, [username, setUsername]);

  const routes = {
    "/": () => <AvalonLogin />,
    "/vote": () => <AvalonApp />,
    "/admin": () => <AvalonAdmin />,
    "/rules": () => <AvalonRules />,
  };

  const routeResult = useRoutes(routes);
  const active = routeResult.type.name;
  console.log("routeResult", routeResult);
  console.log("routeResult.type", routeResult.type);
  console.log("routeResult.type.name", routeResult.type.name);
  return (
    <div>
      {username === "" || username === "undefined" ? (
        <AvalonLogin />
      ) : (
        <div>
          <AvalonNavigation active={active} />
          <CountProvider>{routeResult || <div>not found</div>}</CountProvider>
        </div>
      )}
    </div>
  );
}
