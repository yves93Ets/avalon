import React, { useState, useEffect, useContext } from "react";
import { List, Divider, Button, Icon } from "semantic-ui-react";
import { SocketContext, UserContext } from "../context";

export default function AvalonResultsVotesForMissionList(props) {
  const [votesForMission, setVotesForMission] = useState([[]]);
  const [last, setLast] = useState();
  const [round, setRound] = useState(0);
  const [turn, setTurn] = useState(1);
  const [selectedNames, setSelecteNames] = useState([[]]);
  const socket = useContext(SocketContext);
  const [username] = useContext(UserContext);

  useEffect(() => {
    setVotesForMission(props.votesForMission);
    setLast(props.last);
    setRound(props.round);
    setTurn(props.turn);
    setSelecteNames(props.selectedNames);
  }, [props]);

  const handleDelete = (e, obj) => {
    socket.emit("delete-acceptance-round", obj.value);
    socket.emit("game-results");
  };

  const createTable = () => {
    if (votesForMission === undefined) return;

    return votesForMission.map((vfm, t) =>
      vfm.round !== round + 1 || turn === vfm.playerTurn ? null : (
        <List.Item key={t} className={vfm.vote ? "good" : "evil"}>
          {`${vfm.username} : ${vfm.vote ? "Accept" : "Decline"}`}

          {t + 1 === votesForMission.length ? (
            <>
              {selectedNames.map((sn, i) =>
                sn.round === round + 1 && vfm.playerTurn === sn.playerTurn ? (
                  <p className="normal" key={i}>
                    {`${sn.selector} : ${sn.selectedNames}`}
                  </p>
                ) : null
              )}
            </>
          ) : (
            vfm.playerTurn !== votesForMission[t + 1].playerTurn && (
              <>
                {selectedNames.map(
                  (sn, i) =>
                    sn.round === round + 1 &&
                    vfm.playerTurn === sn.playerTurn && (
                      <p className="normal" key={i}>
                        {`${sn.selector} : ${sn.selectedNames}`}
                      </p>
                    )
                )}
                <Divider />
              </>
            )
          )}

          {last === true &&
          username === "David" &&
          t === votesForMission.length - 1 &&
          votesForMission.length !== 1 ? (
            <div style={style}>
              <br></br>
              <Button
                size="tiny"
                compact
                color="red"
                basic
                icon
                value={vfm}
                onClick={handleDelete}
              >
                <Icon name="trash" circular fitted size="tiny" />
              </Button>
            </div>
          ) : null}
        </List.Item>
      )
    );
  };

  return <List>{createTable()}</List>;
}

const style = {
  display: "block",
};
