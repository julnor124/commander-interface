import { useEffect, useState } from 'react';

interface UsePanelCollapseOptions {
  commanderView: 'commander1' | 'commander2';
  forceCollapsed?: boolean;
  forceExpanded?: boolean;
  collapseByDefaultInCommander2?: boolean;
}

export function usePanelCollapse({
  commanderView,
  forceCollapsed = false,
  forceExpanded = false,
  collapseByDefaultInCommander2 = true,
}: UsePanelCollapseOptions) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (collapseByDefaultInCommander2 && commanderView === 'commander2') {
      setIsCollapsed(true);
    }
  }, [collapseByDefaultInCommander2, commanderView]);

  useEffect(() => {
    if (forceCollapsed) setIsCollapsed(true);
  }, [forceCollapsed]);

  useEffect(() => {
    if (forceExpanded) setIsCollapsed(false);
  }, [forceExpanded]);

  return { isCollapsed, setIsCollapsed };
}
