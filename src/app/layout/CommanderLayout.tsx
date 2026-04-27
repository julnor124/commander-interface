import React from "react";
import CommanderPage from "../../features/commander/components/CommanderPage";
import { useCommanderViewModel } from "../../features/commander/hooks/useCommanderViewModel";

export default function CommanderLayout() {
  const commanderModel = useCommanderViewModel();
  return <CommanderPage model={commanderModel} />;
}
