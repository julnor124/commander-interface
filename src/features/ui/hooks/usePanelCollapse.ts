import { useEffect, useState } from 'react';

interface UsePanelCollapseOptions {
  forceCollapsed?: boolean;
  forceExpanded?: boolean;
}

export function usePanelCollapse({
  forceCollapsed = false,
  forceExpanded = false,
}: UsePanelCollapseOptions) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (forceCollapsed) setIsCollapsed(true);
  }, [forceCollapsed]);

  useEffect(() => {
    if (forceExpanded) setIsCollapsed(false);
  }, [forceExpanded]);

  return { isCollapsed, setIsCollapsed };
}
