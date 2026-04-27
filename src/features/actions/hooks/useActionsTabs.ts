// useActionsTabs hook logic.
import { useMemo, useState } from "react";
import { ActionMenuName, ActionSection } from "./useActionsConfig";

export function useActionsTabs(params: {
  sections: ActionSection[];
  menuOptions: Record<ActionMenuName, string[]>;
  hiddenSectionTitles: Set<string>;
}) {
  const { sections, menuOptions, hiddenSectionTitles } = params;
  const [activeActionTab, setActiveActionTab] = useState<string>("File Transfer");

  const visibleSections = useMemo(
    () => sections.filter((section) => !hiddenSectionTitles.has(section.title)),
    [sections, hiddenSectionTitles],
  );

  const activeSection = visibleSections.find((section) => section.title === activeActionTab);
  const activeMenuOptions = menuOptions[activeActionTab as ActionMenuName];

  return {
    activeActionTab,
    setActiveActionTab,
    visibleSections,
    activeSection,
    activeMenuOptions,
  };
}
