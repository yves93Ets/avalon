import React, { useState, useEffect } from "react";
import { Header, Image, Table, Button } from "semantic-ui-react";
import socketIOClient from "socket.io-client";

export default function AvalonResultTable(props) {
  const [votes, setVotes] = useState([]);
  const { blueSrc, redSrc } = props;

  useEffect(() => {
    getVotes();
  }, []);

  const getVotes = async () => {
    await fetch("/api/avalon")
      .then((res) => {
        res.json().then((v) => {
          var shuffled = v
            .map((a) => [Math.random(), a])
            .sort((a, b) => a[0] - b[0])
            .map((a) => a[1]);
          setVotes(shuffled);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickDelete = async (e) => {
    e.preventDefault();
    setVotes([]);
    await fetch("/api/avalon", {
      method: "Delete",
    })
      .then(socketIOClient().emit("submit count", 0))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickRefresh = (e) => {
    e.preventDefault();
    getVotes();
  };

  return (
    <div>
      <Table>
        <Table.Header>
          <Table.Row>
            {votes.map((vote, i) => {
              return (
                <Table.HeaderCell key={i}>
                  <Header image textAlign="center">
                    <Image src={vote ? blueSrc : redSrc} rounded size="big" />

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
        content="Refresh"
        onClick={handleClickRefresh}
        color="blue"
      ></Button>
    </div>
  );
}
