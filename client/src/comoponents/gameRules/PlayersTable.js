import React from "react";
import { Table } from "semantic-ui-react";
import PlayersHeaderTable from "./PlayersHeaderTable";

export default function PlayersTable() {
  const goodNumbers = [3, 4, 4, 5, 6, 6];
  const evilNumbers = [2, 2, 3, 3, 3, 4];

  return (
    <Table unstackable={true}>
      <PlayersHeaderTable />

      <Table.Body>
        <Table.Row>
          <Table.Cell>Good</Table.Cell>
          {goodNumbers.map((n, i) => {
            return <Table.Cell key={i}>{n}</Table.Cell>;
          })}
        </Table.Row>
        <Table.Row>
          <Table.Cell>Evil</Table.Cell>
          {evilNumbers.map((n, i) => {
            return <Table.Cell key={i}>{n}</Table.Cell>;
          })}
        </Table.Row>
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="10"></Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}
