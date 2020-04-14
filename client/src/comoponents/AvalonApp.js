import React from "react";
import blueSrc from "../images/lancelot.png";
import redSrc from "../images/mordred.png";
import AvalonForm from "./AvalonForm";
import AvalonResult from "./AvalonResults";

export default function AvalonApp() {
  return (
    <div className="avalon App">
      <AvalonForm />
      <AvalonResult isAdmin={false} blueSrc={blueSrc} redSrc={redSrc} />
    </div>
  );
}
