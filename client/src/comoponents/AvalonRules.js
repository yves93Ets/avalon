import React from "react";
import PlayersTable from "./game/PlayersTable";
import PlayersQuest from "./game/PlayersQuest";
import CharactereView from "./game/CharactereView";

export default function AvalonRules() {
  return (
    <div>
      <PlayersTable />
      <PlayersQuest />
      <CharactereView />
    </div>
  );
}
