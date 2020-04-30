import React, { useContext, useState, useEffect } from "react";
import { Step } from "semantic-ui-react";
import { useTitle } from "hookrouter";
import { SocketContext } from "../context";

export default function AvalonResults() {
  useTitle("Results");

  const [voters, setVoters] = useState([1, 2, 3]);
  const [votes, setVotes] = useState([1, 2, 3]);
  const [round, setRound] = useState(2);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("game-results");
    socket.on("game-results", (results) => {
      console.log(results);
    });
  });

  return (
    <Step.Group>
      {votes.map((n) => {
        return (
          <Step key={n} link active={round === n ? true : false}>
            <Step.Title>{n}</Step.Title>
          </Step>
        );
      })}
    </Step.Group>
  );
}
