import React from "react";
import blueSrc from "./images/lancelot.png";
import redSrc from "./images/mordred.png";
import "./App.css";
import AvalonForm from "./comoponents/AvalonForm";
import AvalonResult from "./comoponents/AvalonResults";

export default function App() {
  return (
    <div className="App">
      <AvalonForm blueSrc={blueSrc} redSrc={redSrc} />
      <AvalonResult blueSrc={blueSrc} redSrc={redSrc} />
    </div>
  );
}
