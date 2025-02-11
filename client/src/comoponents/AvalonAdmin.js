import React from "react";
import successSrc from "../images/Success.jpeg";
import failSrc from "../images/Fail.jpeg";
import AvalonVoteForm from "./AvalonVoteForm";
import AvalonVoteResult from "./AvalonVoteResult";
import AvalonCharacter from "./AvalonCharacter";
import { useTitle } from "hookrouter";

export default function AvalonAdmin() {
  useTitle("Admin");

  return (
    <div className="advalon-admin App">
      <AvalonVoteForm />
      <AvalonVoteResult successSrc={successSrc} failSrc={failSrc} />
      <AvalonCharacter />
    </div>
  );
}
