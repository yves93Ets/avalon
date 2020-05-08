import React from "react";
import successSrc from "../images/Success.jpeg";
import failSrc from "../images/Fail.jpeg";
import AvalonAcceptMission from "./AvalonAcceptMission";
import AvalonVoteForm from "./AvalonVoteForm";
import AvalonVoteResult from "./AvalonVoteResult";
import { useTitle } from "hookrouter";

export default function AvalonApp() {
  useTitle("Vote");
  return (
    <div className="avalon App">
      <AvalonAcceptMission />
      <AvalonVoteForm />
      <AvalonVoteResult
        isAdmin={false}
        successSrc={successSrc}
        failSrc={failSrc}
      />
    </div>
  );
}
