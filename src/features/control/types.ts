// Feature type definitions.
export type MatrixState = "ON" | "OFF";
export type RfSelection = "ON" | "OFF";
export type RfOffTarget = null | "RF" | "X RF";

export interface MatrixOption {
  id: MatrixState;
  label: MatrixState;
}
