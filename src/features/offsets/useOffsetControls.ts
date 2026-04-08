import { useMemo, useState } from 'react';

type OffsetKey = 'Time' | 'El' | 'Az' | 'Step';

interface UseOffsetControlsOptions {
  onIncrement?: (key: OffsetKey) => void;
  onDecrement?: (key: OffsetKey) => void;
  onReset?: () => void;
}

export function useOffsetControls(options: UseOffsetControlsOptions = {}) {
  const { onIncrement, onDecrement, onReset } = options;
  const [timeValue, setTimeValue] = useState(0);
  const [elValue, setElValue] = useState(0);
  const [azValue, setAzValue] = useState(0);
  const [stepValue, setStepValue] = useState(0);

  const controls = useMemo(
    () => [
      { label: 'Time' as const, value: timeValue, setter: setTimeValue },
      { label: 'El' as const, value: elValue, setter: setElValue },
      { label: 'Az' as const, value: azValue, setter: setAzValue },
      { label: 'Step' as const, value: stepValue, setter: setStepValue },
    ],
    [timeValue, elValue, azValue, stepValue],
  );

  const increment = (key: OffsetKey) => {
    const control = controls.find((item) => item.label === key);
    if (!control) return;
    control.setter((prev) => prev + 1);
    onIncrement?.(key);
  };

  const decrement = (key: OffsetKey) => {
    const control = controls.find((item) => item.label === key);
    if (!control) return;
    control.setter((prev) => Math.max(0, prev - 1));
    onDecrement?.(key);
  };

  const reset = () => {
    setTimeValue(0);
    setElValue(0);
    setAzValue(0);
    setStepValue(0);
    onReset?.();
  };

  return { controls, increment, decrement, reset };
}
