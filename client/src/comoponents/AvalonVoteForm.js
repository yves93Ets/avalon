import React, { useState, useEffect, useContext } from "react";

import AvalonAcceptMission from "./AvalonAcceptMission";
import AvalonSecretVote from "./AvalonSecretVote";
import { SocketContext } from "../context";

export default function AvalonVoteForm() {
  const socket = useContext(SocketContext);
  const [isSecretVote, setIsSecretVote] = useState(false);
  useEffect(() => {
    socket.emit("get-secret-vote");
    socket.on("secret-vote", (isv) => {
      setIsSecretVote(isv);
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("players-mission");
    socket.on("player", (isv) => {
      setIsSecretVote(isv);
    });
  }, [socket]);

  // return <>{isSecretVote ? <AvalonSecretVote /> : <AvalonAcceptMission />}</>;
  return (
    <>
      <AvalonAcceptMission /> <AvalonSecretVote />
    </>
  );
}
