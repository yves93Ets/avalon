import React from "react";
import successSrc from "../images/Success.jpeg";
import failSrc from "../images/Fail.jpeg";
import AvalonForm from "./AvalonForm";
import AvalonResult from "./AvalonResults";
import AvalonCharacter from "./AvalonCharacter";
import { useTitle } from "hookrouter";

export default function AvalonAdmin() {
  useTitle("Admin");

  return (
    <div className="advalon-admin App">
      <AvalonForm />
      <AvalonResult isAdmin={true} successSrc={successSrc} failSrc={failSrc} />
      <AvalonCharacter />
    </div>
  );
}
