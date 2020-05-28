import React from "react";
import { Table } from "semantic-ui-react";
import PlayersHeaderTable from "./PlayersHeaderTable";
import QuestTableRow from "./QuestTableRow";
import { questNumbers } from "../../const/constants";

export default function PlayersQuest() {
  return (
    <div>
      <Table unstackable={true}>
        <PlayersHeaderTable />
        <Table.Body>
          {questNumbers.map((q, i) => {
            return <QuestTableRow key={i} row={q} />;
          })}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="10">
              * requires two fails
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}
