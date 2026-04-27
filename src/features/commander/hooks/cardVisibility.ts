// cardVisibility hook logic.
export function buildVisibleIds(params: {
  activeIds: string[];
  openIds: string[];
  dismissedIds?: string[];
}): string[] {
  const { activeIds, openIds, dismissedIds = [] } = params;
  const dismissed = new Set(dismissedIds);
  return Array.from(new Set([...activeIds, ...openIds])).filter((id) => !dismissed.has(id));
}
