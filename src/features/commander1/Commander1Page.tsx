import React from "react";
import CommanderPage, { CommanderPageModel } from "../commander/CommanderPage";

export default function Commander1Page({
  model,
}: {
  model: CommanderPageModel;
}) {
  return <CommanderPage model={model} />;
}
