// controlCommandsApi API layer.
import {
  mapCalibrateRfRequest,
  mapCalibrateRfResponse,
  mapSetMatrixStateRequest,
  mapSetMatrixStateResponse,
  mapSetRfStateRequest,
  mapSetRfStateResponse,
} from "./mappers";

export async function setMatrixState(nextState: "ON" | "OFF") {
  const request = mapSetMatrixStateRequest(nextState);
  return mapSetMatrixStateResponse({ state: request.state });
}

export async function setRfState(target: "RF" | "X RF", nextState: "ON" | "OFF") {
  const request = mapSetRfStateRequest(target, nextState);
  return mapSetRfStateResponse({ target: request.target, state: request.state });
}

export async function calibrateRf(target: "RF" | "X RF") {
  const request = mapCalibrateRfRequest(target);
  return mapCalibrateRfResponse({ target: request.target, status: "ok" });
}
