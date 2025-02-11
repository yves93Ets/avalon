import React, { useContext, useState, useEffect } from "react";
import { List, Table, Header, Icon, Button } from "semantic-ui-react";
import { useTitle } from "hookrouter";
import { SocketContext, UserContext } from "../context";
import AvalonResultsVotesForMissionList from "./AvalonResultsVotesForMissionList";
export default function AvalonResults() {
  useTitle("Results");

  const [voters, setVoters] = useState([[]]);
  const [votes, setVotes] = useState([[]]);
  const [selectedNames, setSelecteNames] = useState([[]]);
  const [votesForMission, setVotesForMission] = useState([[]]);
  const [id, setId] = useState();
  const [currentTurn, setCurentTurn] = useState(1);
  const socket = useContext(SocketContext);
  const [username] = useContext(UserContext);

  useEffect(() => {
    socket.emit("game-results");
    socket.on("game-results", (results, vfm) => {
      setVoters(results.votersList);
      setVotes(results.voteResultList);
      setId(results._id);
      setVotesForMission(vfm);
      setCurentTurn(results.playerTurn);
      setSelecteNames(results.selectedNames);
    });
  }, [socket]);

  const handleDelete = (e, value) => {
    socket.emit("delete-round", value.value, id);
    setTimeout(() => {
      socket.emit("game-results");
    }, 200);
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
          <Table.HeaderCell>Votes for mission</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      {votesForMission.length === 0 ? (
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
                    {index + 1}
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
                    {voters.length !== index &&
                      voters[index].map((v, i) => {
                        return <List.Item key={i}>{v}</List.Item>;
                      })}
                    {username === "David" &&
                      index === votesForMission.length - 1 && (
                        <Button
                          color="red"
                          basic
                          icon
                          value={index}
                          onClick={handleDelete}
                        >
                          <Icon name="trash" circular fitted size="small" />
                        </Button>
                      )}
                  </List>
                </Table.Cell>
                {votesForMission.length > 0 && (
                  <Table.Cell>
                    <AvalonResultsVotesForMissionList
                      votesForMission={vfm}
                      round={index}
                      last={index === votesForMission.length - 1}
                      turn={currentTurn}
                      selectedNames={selectedNames}
                    />
                  </Table.Cell>
                )}
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
