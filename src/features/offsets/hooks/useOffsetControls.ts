import { useMemo, useState } from 'react';
import {
  decrementOffsetValue,
  incrementOffsetValue,
  INITIAL_OFFSET_STATE,
  OffsetKey,
  resetOffsetState,
} from '../api/offsetsMockApi';

interface UseOffsetControlsOptions {
  onIncrement?: (key: OffsetKey) => void;
  onDecrement?: (key: OffsetKey) => void;
  onReset?: () => void;
}

export function useOffsetControls(options: UseOffsetControlsOptions = {}) {
  const { onIncrement, onDecrement, onReset } = options;
  const [offsetValues, setOffsetValues] = useState(INITIAL_OFFSET_STATE);

  const controls = useMemo(
    () => [
      { label: 'Time' as const, value: offsetValues.Time },
      { label: 'El' as const, value: offsetValues.El },
      { label: 'Az' as const, value: offsetValues.Az },
      { label: 'Step' as const, value: offsetValues.Step },
    ],
    [offsetValues],
  );

  const increment = (key: OffsetKey) => {
    setOffsetValues((prev) => ({
      ...prev,
      [key]: incrementOffsetValue(prev[key]),
    }));
    onIncrement?.(key);
  };

  const decrement = (key: OffsetKey) => {
    setOffsetValues((prev) => ({
      ...prev,
      [key]: decrementOffsetValue(prev[key]),
    }));
    onDecrement?.(key);
  };

  const reset = () => {
    setOffsetValues(resetOffsetState());
    onReset?.();
  };

  return { controls, increment, decrement, reset };
}
