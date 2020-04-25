import React from "react";
import PlayersTable from "./gameRules/PlayersTable";
import PlayersQuest from "./gameRules/PlayersQuest";
import CharactereView from "./gameRules/CharactereView";
import { useTitle } from "hookrouter";

export default function AvalonRules() {
  useTitle("Rules");

  return (
    <div>
      <PlayersTable />
      <PlayersQuest />
      <CharactereView />
    </div>
  );
}
