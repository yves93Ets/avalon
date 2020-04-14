import React from "react";
import blueSrc from "../images/lancelot.png";
import redSrc from "../images/mordred.png";
import AvalonForm from "./AvalonForm";
import AvalonResult from "./AvalonResults";
import AvalonCharacter from "./AvalonCharacter";

export default function AvalonAdmin() {
  return (
    <div className="advalon-admin App">
      <AvalonForm />
      <AvalonResult isAdmin={true} blueSrc={blueSrc} redSrc={redSrc} />
      <AvalonCharacter />
    </div>
  );
}
