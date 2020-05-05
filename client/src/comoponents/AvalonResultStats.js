import React, { useContext, useState, useEffect } from "react";
import { List, Table, Header, Icon, Button } from "semantic-ui-react";
import { useTitle } from "hookrouter";
import { SocketContext, UserContext } from "../context";
import AvalonResultsVotesForMissionList from "./AvalonResultsVotesForMissionList";
export default function AvalonResults() {
  useTitle("Results");

  const [voters, setVoters] = useState([[]]);
  const [votes, setVotes] = useState([[]]);
  const [votesForMission, setVotesForMission] = useState([[]]);
  const socket = useContext(SocketContext);
  const [username] = useContext(UserContext);
  const [id, setId] = useState();

  useEffect(() => {
    socket.emit("game-results");
    socket.on("game-results", (results, vfm) => {
      if (results) {
        setVoters(results.votersList);
        setVotes(results.voteResultList);
        setId(results._id);
        setVotesForMission(vfm);
      }
    });
  }, [socket]);

  const handleDelete = (e, value) => {
    socket.emit("delete-round", value.value, id);
  };

  return (
    <Table unstackable compact celled textAlign="center">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Round</Table.HeaderCell>
          <Table.HeaderCell>Names</Table.HeaderCell>
          <Table.HeaderCell>Results</Table.HeaderCell>
          <Table.HeaderCell>Votes for mission</Table.HeaderCell>
          {username === "David" ? (
            <Table.HeaderCell>Delete</Table.HeaderCell>
          ) : null}
        </Table.Row>
      </Table.Header>
      {voters.length === 0 ? (
        <Table.Body>
          <Table.Row></Table.Row>
        </Table.Body>
      ) : (
        <Table.Body>
          {votes.map((vote, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <Header as="h2" textAlign="center">
                    {index + 1}{" "}
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
                {votesForMission.length > 0 ? (
                  <Table.Cell>
                    {console.log(222, index, votesForMission)}
                    <AvalonResultsVotesForMissionList
                      votesForMission={votesForMission[index]}
                    />
                  </Table.Cell>
                ) : null}

                {username === "David" && index === votes.length - 1 ? (
                  <Table.Cell>
                    <Button
                      color="red"
                      basic
                      icon
                      value={index}
                      onClick={handleDelete}
                    >
                      <Icon name="trash" circular fitted size="small" />
                    </Button>
                  </Table.Cell>
                ) : username === "David" ? (
                  <Table.Cell></Table.Cell>
                ) : null}
              </Table.Row>
            );
          })}
        </Table.Body>
      )}
    </Table>
  );
}
