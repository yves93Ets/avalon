import React, { useState, useEffect } from "react";
import { Grid, Segment, List, Table, Divider } from "semantic-ui-react";

export default function AvalonResultsVotesForMissionList(props) {
  const [votesForMission, setVotesForMission] = useState([[]]);

  useEffect(() => {
    setVotesForMission(props.votesForMission);
  }, [props]);

  const createTable = () => {
    if (votesForMission === undefined) return;
    return votesForMission.map((vfm, t) => (
      <List.Item key={t}>
        {`${vfm.username} : ${vfm.vote ? "Accept" : "Decline"}`}

        {t + 1 === votesForMission.length ? null : vfm.playerTurn ===
          votesForMission[t + 1].playerTurn ? null : (
          <Divider />
        )}
      </List.Item>
    ));
  };

  return (
    <List>
      <Segment>{createTable()}</Segment>
    </List>
  );
}
