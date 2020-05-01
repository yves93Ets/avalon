import React, { useContext, useState, useEffect } from "react";
import { List, Table, Header } from "semantic-ui-react";
import { useTitle } from "hookrouter";
import { SocketContext } from "../context";

export default function AvalonResults() {
  useTitle("Results");

  const [voters, setVoters] = useState([[]]);
  const [votes, setVotes] = useState([[]]);
  const [round, setRound] = useState();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("game-results");
    socket.on("game-results", (results) => {
      setVoters(results.votersList);
      setVotes(results.voteResultList);
      setRound(results.round);
    });
  }, [socket]);

  return (
    <Table unstackable compact celled textAlign="center">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Round</Table.HeaderCell>
          <Table.HeaderCell>Names</Table.HeaderCell>
          <Table.HeaderCell>Results</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {votes.map((vote, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>
                <Header as="h2" textAlign="center">
                  {index + 1}
                </Header>
              </Table.Cell>
              <Table.Cell>
                <List>
                  {vote.map((v, i) => {
                    return (
                      <List.Item key={i} className={v ? "good" : "evil"}>
                        {v ? "Success" : "Fail"}
                      </List.Item>
                    );
                  })}
                </List>
              </Table.Cell>
              <Table.Cell>
                <List>
                  {voters[index].map((v, i) => {
                    return <List.Item key={i}>{v}</List.Item>;
                  })}
                </List>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
