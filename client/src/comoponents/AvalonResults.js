import React, { useState, useEffect } from "react";
import blueSrc from "../images/lancelot.jpg";
import redSrc from "../images/mordred.jpg";
import { Header, Image, Table, Button } from "semantic-ui-react";

export default function TableExampleCollapsing() {
  const [votes, setVotes] = useState([]);

  useEffect(async => {
    getVotes();
    console.log("useeffect");
  }, []);

  const getVotes = async () => {
    await fetch("/api/avalon")
      .then(res => {
        res.json().then(v => {
          console.log(v);
          setVotes(v);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleClickDelete = async e => {
    e.preventDefault();
    await fetch("/api/avalon", {
      method: "Delete",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(setVotes([]))
      .catch(err => {
        console.log(err);
      });
  };

  const handleClickRefresh = async e => {
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
