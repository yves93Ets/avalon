import React from "react";
import blueSrc from "../images/lancelot.jpg";
import redSrc from "../images/mordred.jpg";
import { Header, Image, Table, Button } from "semantic-ui-react";

export default function TableExampleCollapsing(props) {
  const votes = [true, false, true, true, false];
  const handleClick = async e => {
    e.preventDefault();
    await fetch("/api/avalon", {
      method: "Delete",
      headers: {
        "Content-Type": "application/json"
      }
    }).catch(err => {
      console.log(err);
    });
  };
  return (
    <div>
      <Table>
        <Table.Header>
          <Table.Row>
            {votes.map(vote => {
              return (
                <Table.HeaderCell>
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
      <Button onClick={handleClick} fluid>
        Clear
      </Button>
    </div>
  );
}
