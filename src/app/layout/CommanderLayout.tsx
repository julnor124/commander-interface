// CommanderLayout module.
import React from "react";
import CommanderPage from "../../features/commander/components/CommanderPage";
import { useCommanderViewModel } from "../../features/commander/hooks/useCommanderViewModel";
import CommanderErrorBoundary from "./CommanderErrorBoundary";

export default function CommanderLayout() {
  const commanderModel = useCommanderViewModel();
  return (
    <CommanderErrorBoundary>
      <CommanderPage model={commanderModel} />
    </CommanderErrorBoundary>
  );
}
