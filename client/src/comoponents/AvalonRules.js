import React from "react";
import PlayersTable from "./gameRules/PlayersTable";
import PlayersQuest from "./gameRules/PlayersQuest";
import CharactereView from "./gameRules/CharactereView";

export default function AvalonRules() {
  return (
    <div>
      <PlayersTable />
      <PlayersQuest />
      <CharactereView />
    </div>
  );
}
