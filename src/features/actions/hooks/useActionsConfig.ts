export type ActionSection = {
  title: string;
  actions: Array<{ label: string; log: string }>;
};

export type ActionMenuName = "Session" | "Utility" | "Macro" | "Mode" | "Color";

export function useActionsConfig() {
  const sections: ActionSection[] = [
    {
      title: "Mission",
      actions: [{ label: "Prepare mission", log: "Action: Prepare mission" }],
    },
    {
      title: "File Transfer",
      actions: [
        { label: "Send Matrix", log: "Action: Send Matrix" },
        { label: "Send Satangle", log: "Action: Send Satangle" },
      ],
    },
    {
      title: "Pass",
      actions: [
        { label: "Prepare pass", log: "Action: Prepare pass" },
        { label: "Acquire", log: "Action: Acquire" },
        { label: "End Pass", log: "Action: End Pass" },
      ],
    },
    {
      title: "Position",
      actions: [
        { label: "Position to", log: "Action: Position to" },
        { label: "Sun", log: "Action: Sun" },
        { label: "Stow", log: "Action: Stow" },
      ],
    },
    {
      title: "Slaving",
      actions: [{ label: "Slave to", log: "Action: Slave to" }],
    },
    {
      title: "Tracking",
      actions: [
        { label: "Enable Autotrack", log: "Action: Enable Autotrack" },
        { label: "Force Autotrack", log: "Action: Force Autotrack" },
      ],
    },
  ];

  const menuOptions: Record<ActionMenuName, string[]> = {
    Session: ["Select Pass", "Graph", "Quit"],
    Utility: ["Satangle", "Time Shift"],
    Macro: ["Macro execution", "Supermacro"],
    Mode: ["Automatic Mode", "Manual Mode"],
    Color: ["Standard color mode", "Color Mode 2"],
  };

  const menuOrder: ActionMenuName[] = ["Session", "Utility", "Macro", "Mode", "Color"];

  const hiddenSectionTitles = new Set(["Tracking", "Position", "Pass", "Mission"]);

  return {
    sections,
    menuOptions,
    menuOrder,
    hiddenSectionTitles,
  };
}
