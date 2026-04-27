// useControlOperations hook logic.
export function useControlOperations() {
  return [
    {
      title: "Mission",
      actions: [{ label: "Prepare mission", log: "Action: Prepare mission" }],
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
      title: "Tracking",
      actions: [
        { label: "Enable Autotrack", log: "Action: Enable Autotrack" },
        { label: "Force Autotrack", log: "Action: Force Autotrack" },
      ],
    },
  ] as const;
}
