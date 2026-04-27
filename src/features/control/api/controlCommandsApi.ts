export async function setMatrixState(nextState: "ON" | "OFF") {
  return { state: nextState };
}

export async function setRfState(target: "RF" | "X RF", nextState: "ON" | "OFF") {
  return { target, state: nextState };
}

export async function calibrateRf(target: "RF" | "X RF") {
  return { target, status: "ok" as const };
}
