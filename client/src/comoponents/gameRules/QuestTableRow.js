import React from "react";
import { Table } from "semantic-ui-react";

export default function QuestTableRow(props) {
  return (
    <Table.Row>
      {props.row.map((n, i) => {
        return <Table.Cell key={i}>{n}</Table.Cell>;
      })}
    </Table.Row>
  );
}
