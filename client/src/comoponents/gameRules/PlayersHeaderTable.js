import React from "react";
import { Table } from "semantic-ui-react";

export default function PlayersTable() {
  const playerNumbers = [5, 6, 7, 8, 9, 10];

  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Players</Table.HeaderCell>
        {playerNumbers.map((n, i) => {
          return <Table.HeaderCell key={i}>{n}</Table.HeaderCell>;
        })}
      </Table.Row>
    </Table.Header>
  );
}
