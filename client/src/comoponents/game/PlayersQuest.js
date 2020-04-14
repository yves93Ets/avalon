import React from "react";
import { Table } from "semantic-ui-react";
import PlayersHeaderTable from "./PlayersHeaderTable";
import QuestTableRow from "./QuestTableRow";

export default function PlayersQuest() {
  const questNumbers = [
    ["1st Quest", 2, 2, 2, 3, 3, 3],
    ["2nd Quest", 3, 3, 3, 4, 4, 4],
    ["3nd Quest", 2, 4, 3, 4, 4, 4],
    ["4nd Quest", 3, 3, "4*", "5*", "5*", "5*"],
    ["5nd Quest", 3, 4, 4, 5, 5, 5],
  ];
  return (
    <div>
      <Table compact>
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
