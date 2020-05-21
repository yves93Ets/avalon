import React, { useState, useEffect, useContext } from "react";

import AvalonAcceptMission from "./AvalonAcceptMission";
import AvalonSecretVote from "./AvalonSecretVote";
import { SocketContext } from "../context";

export default function AvalonVoteForm() {
  const socket = useContext(SocketContext);
  const [isSecretVote, setIsSecretVote] = useState(false);
  const [selectedNames, setSelectedNames] = useState([]);

  useEffect(() => {
    socket.on("secret-vote", (isv) => {
      setIsSecretVote(isv);
    });

    socket.on("acceptance-votes-results", (names) => {
      setSelectedNames(names);
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("players-mission");
    socket.on("player", (isv) => {
      setIsSecretVote(isv);
    });
  }, [socket]);

  return (
    <>
      {isSecretVote ? (
        <AvalonSecretVote names={selectedNames} />
      ) : (
        <AvalonAcceptMission />
      )}
    </>
  );
}
