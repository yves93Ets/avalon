import React from "react";
import "./App.css";
import { useRoutes } from "hookrouter";
import AvalonApp from "./comoponents/AvalonApp";
import AvalonAdmin from "./comoponents/AvalonAdmin";
import AvalonNavigation from "./comoponents/AvalonNavigation";
import AvalonRules from "./comoponents/AvalonRules";
import AvalonChooseCharactere from "./comoponents/AvalonChooseCharactere";

import { CountProvider } from "./context/CountContext";
import { SocketProvider } from "./context/SocketContext";

const routes = {
  ["/"]: () => <AvalonApp />,
  ["/vote"]: () => <AvalonApp />,
  "/admin": () => <AvalonAdmin />,
  "/newgame": () => <AvalonChooseCharactere />,
  "/rules": () => <AvalonRules />,
};

export default function App() {
  const routeResult = useRoutes(routes);

  return (
    <div>
      <AvalonNavigation />
      <CountProvider>
        <SocketProvider>{routeResult || <div>not found</div>}</SocketProvider>
      </CountProvider>
    </div>
  );
}
