import React from "react";
import successSrc from "../images/Success.jpeg";
import failSrc from "../images/Fail.jpeg";
import AvalonVoteForm from "./AvalonVoteForm";
import AvalonVoteResult from "./AvalonVoteResult";
import { useTitle } from "hookrouter";

export default function AvalonApp() {
  useTitle("Vote");
  return (
    <div className="avalon App">
      <AvalonVoteForm />
      <AvalonVoteResult
        isAdmin={false}
        successSrc={successSrc}
        failSrc={failSrc}
      />
    </div>
  );
}
