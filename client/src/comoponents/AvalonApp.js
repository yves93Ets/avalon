import React from "react";
import successSrc from "../images/Success.jpeg";
import failSrc from "../images/Fail.jpeg";
import AvalonForm from "./AvalonForm";
import AvalonResult from "./AvalonResults";

export default function AvalonApp() {
  return (
    <div className="avalon App">
      <AvalonForm />
      <AvalonResult isAdmin={false} successSrc={successSrc} failSrc={failSrc} />
    </div>
  );
}
