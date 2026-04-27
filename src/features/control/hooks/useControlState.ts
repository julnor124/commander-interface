import { useState } from "react";

type MatrixSelection = "ON" | "OFF";
type RfSelection = "ON" | "OFF";
type RfOffTarget = null | "RF" | "X RF";

export function useControlState(log: (message: string) => void) {
  const [matrixSelection, setMatrixSelection] = useState<MatrixSelection>("ON");
  const [rfSelection, setRfSelection] = useState<RfSelection>("OFF");
  const [xRfSelection, setXRfSelection] = useState<RfSelection>("OFF");
  const [isMatrixOffDialogOpen, setIsMatrixOffDialogOpen] = useState(false);
  const [rfOffDialogTarget, setRfOffDialogTarget] = useState<RfOffTarget>(null);

  const matrixOptions = [
    { id: "ON", label: "ON" },
    { id: "OFF", label: "OFF" },
  ] as const;

  const handleMatrixOptionSelect = (optionId: MatrixSelection) => {
    if (optionId === "OFF") {
      setIsMatrixOffDialogOpen(true);
      return;
    }
    setMatrixSelection(optionId);
    log(`Matrix set to ${optionId}`);
  };

  const handleRfOn = () => {
    setRfSelection("ON");
    log("RF set to ON");
  };

  const handleXRfOn = () => {
    setXRfSelection("ON");
    log("X RF set to ON");
  };

  const requestRfOff = (target: Exclude<RfOffTarget, null>) => {
    setRfOffDialogTarget(target);
  };

  const confirmMatrixOff = () => {
    setMatrixSelection("OFF");
    log("Matrix was disabled");
    setIsMatrixOffDialogOpen(false);
  };

  const confirmRfOff = () => {
    if (rfOffDialogTarget === "RF") {
      setRfSelection("OFF");
      log("RF was disabled");
    } else if (rfOffDialogTarget === "X RF") {
      setXRfSelection("OFF");
      log("X RF was disabled");
    }
    setRfOffDialogTarget(null);
  };

  return {
    matrixSelection,
    rfSelection,
    xRfSelection,
    isMatrixOffDialogOpen,
    setIsMatrixOffDialogOpen,
    rfOffDialogTarget,
    setRfOffDialogTarget,
    matrixOptions,
    handleMatrixOptionSelect,
    handleRfOn,
    handleXRfOn,
    requestRfOff,
    confirmMatrixOff,
    confirmRfOff,
  };
}
