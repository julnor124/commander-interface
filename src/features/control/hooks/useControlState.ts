// useControlState hook logic.
import { useState } from "react";
import { MatrixOption, MatrixState, RfOffTarget, RfSelection } from "../types";
import {
  calibrateRf,
  setMatrixState,
  setRfState,
} from "../api/controlCommandsApi";
import { publishActivity } from "../../activityLog/api/activityLogApi";

export function useControlState() {
  const [matrixSelection, setMatrixSelection] = useState<MatrixState>("ON");
  const [rfSelection, setRfSelection] = useState<RfSelection>("OFF");
  const [xRfSelection, setXRfSelection] = useState<RfSelection>("OFF");
  const [isMatrixOffDialogOpen, setIsMatrixOffDialogOpen] = useState(false);
  const [rfOffDialogTarget, setRfOffDialogTarget] = useState<RfOffTarget>(null);

  const matrixOptions: MatrixOption[] = [
    { id: "ON", label: "ON" },
    { id: "OFF", label: "OFF" },
  ];

  const handleMatrixOptionSelect = async (optionId: MatrixState) => {
    if (optionId === "OFF") {
      setIsMatrixOffDialogOpen(true);
      return;
    }
    const response = await setMatrixState(optionId);
    setMatrixSelection(response.state);
    publishActivity(`Matrix set to ${response.state}`);
  };

  const handleRfOn = async () => {
    const response = await setRfState("RF", "ON");
    setRfSelection(response.state);
    publishActivity("RF set to ON");
  };

  const handleXRfOn = async () => {
    const response = await setRfState("X RF", "ON");
    setXRfSelection(response.state);
    publishActivity("X RF set to ON");
  };

  const requestRfOff = (target: Exclude<RfOffTarget, null>) => {
    setRfOffDialogTarget(target);
  };

  const confirmMatrixOff = async () => {
    const response = await setMatrixState("OFF");
    setMatrixSelection(response.state);
    publishActivity("Matrix was disabled");
    setIsMatrixOffDialogOpen(false);
  };

  const confirmRfOff = async () => {
    if (rfOffDialogTarget === "RF") {
      const response = await setRfState("RF", "OFF");
      setRfSelection(response.state);
      publishActivity("RF was disabled");
    } else if (rfOffDialogTarget === "X RF") {
      const response = await setRfState("X RF", "OFF");
      setXRfSelection(response.state);
      publishActivity("X RF was disabled");
    }
    setRfOffDialogTarget(null);
  };

  const runRfCalibration = async (target: "RF" | "X RF") => {
    await calibrateRf(target);
    publishActivity(
      target === "RF" ? "RF Calibrate pressed" : "RF Calibrate Xb pressed",
    );
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
    runRfCalibration,
  };
}
