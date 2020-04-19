import React from "react";
import "./App.css";
import { useRoutes } from "hookrouter";
import AvalonApp from "./comoponents/AvalonApp";
import AvalonAdmin from "./comoponents/AvalonAdmin";
import AvalonNavigation from "./comoponents/AvalonNavigation";
import AvalonRules from "./comoponents/AvalonRules";
import AvalonChooseCharactere from "./comoponents/AvalonChooseCharactere";

import { ApiProvider } from "./context/ContextApi";

const routes = {
  ["/"]: () => <AvalonApp />,
  ["/vote"]: () => <AvalonApp />,
  "/admin": () => <AvalonAdmin />,
  "/characteres": () => <AvalonChooseCharactere />,
  "/rules": () => <AvalonRules />,
};

export default function App() {
  const routeResult = useRoutes(routes);

  return (
    <div>
      <AvalonNavigation />
      <ApiProvider>{routeResult || <div>not found</div>}</ApiProvider>
    </div>
  );
}
