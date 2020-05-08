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
      setVoters(results.votersList);
      setVotes(results.voteResultList);
      setId(results._id);
      setVotesForMission(vfm);
    });
  }, [socket]);

  const handleDelete = (e, value) => {
    socket.emit("delete-round", value.value, id);
    socket.emit("game-results");
  };

  return (
    <Table
      style={marginBottomStyle}
      unstackable
      compact
      celled
      textAlign="center"
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Round</Table.HeaderCell>
          <Table.HeaderCell>Names</Table.HeaderCell>
          <Table.HeaderCell>Results</Table.HeaderCell>
          {votesForMission.length <= 0 ? null : (
            <Table.HeaderCell>Votes for mission</Table.HeaderCell>
          )}
        </Table.Row>
      </Table.Header>
      {voters.length === 0 ? (
        <Table.Body>
          <Table.Row></Table.Row>
        </Table.Body>
      ) : (
        <Table.Body>
          {votesForMission.map((vfm, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <Header as="h2" textAlign="center">
                    {index + 1}{" "}
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <List>
                    {votes.length === index
                      ? null
                      : votes[index].map((v, i) => {
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
                    {voters.length === index
                      ? null
                      : voters[index].map((v, i) => {
                          return <List.Item key={i}>{v}</List.Item>;
                        })}
                    {username === "David" &&
                    index === votesForMission.length - 1 ? (
                      <Button
                        color="red"
                        basic
                        icon
                        value={index}
                        onClick={handleDelete}
                      >
                        <Icon name="trash" circular fitted size="small" />
                      </Button>
                    ) : null}
                  </List>
                </Table.Cell>

                {votesForMission.length > 0 ? (
                  <Table.Cell>
                    <AvalonResultsVotesForMissionList
                      votesForMission={votesForMission[index]}
                      round={index}
                      last={index === votesForMission.length - 1}
                    />
                  </Table.Cell>
                ) : null}
              </Table.Row>
            );
          })}
        </Table.Body>
      )}
    </Table>
  );
}

const marginBottomStyle = {
  marginBottom: "20px",
};
