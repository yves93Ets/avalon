import React, { useState, useEffect, useContext } from "react";
import { Header, Image, Table, Button } from "semantic-ui-react";
import { CountContext, SocketContext } from "../context";

export default function AvalonResultTable(props) {
  const socket = useContext(SocketContext);
  const [count, setCount] = useContext(CountContext);
  const [votes, setVotes] = useState([]);
  const [isVisible, setIsVisible] = useState();

  const { successSrc, failSrc } = props;

  useEffect(() => {
    const getVotes = async () => {
      await fetch("/api/avalon")
        .then((res) => {
          res.json().then((v) => {
            var shuffled = v
              .map((a) => [Math.random(), a])
              .sort((a, b) => a[0] - b[0])
              .map((a) => a[1]);
            setVotes(shuffled);
            setCount(shuffled.length);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getVotes();

    socket.on("clear-show-results", (isVisible) => {
      setIsVisible(isVisible);
      getVotes();
    });
  }, [count, setCount, socket]);

  const handleClickDelete = async (e) => {
    e.preventDefault();
    setIsVisible(false);
    setVotes([]);
    await fetch("/api/avalon", {
      method: "Delete",
    })
      .then(socket.emit("submit-count", 0), setCount(0))
      .then(socket.emit("clear-show-results"), false)
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickRefresh = (e) => {
    e.preventDefault();
    socket.emit("clear-show-results", true);
  };

  return (
    <div>
      <Table className={isVisible ? "" : "hidden"}>
        <Table.Header>
          <Table.Row>
            {votes.map((vote, i) => {
              return (
                <Table.HeaderCell key={i}>
                  <Header image textAlign="center">
                    <Image
                      src={vote ? successSrc : failSrc}
                      rounded
                      size="big"
                    />

                    <Header.Content className={vote ? "vote-blue" : "vote-red"}>
                      {vote ? "Succesfull" : "Fail"}
                    </Header.Content>
                  </Header>
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
      </Table>
      {props.isAdmin ? (
        <div>
          <Button
            negative
            icon="trash"
            content="Clear"
            onClick={handleClickDelete}
            color="red"
            className="vote-red"
          ></Button>
          <Button
            icon="refresh"
            content="Show"
            onClick={handleClickRefresh}
            color="blue"
          ></Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
