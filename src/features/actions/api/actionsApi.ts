// actionsApi API layer.
import { mapRunActionRequest, mapRunActionResponse } from "./mappers";

export async function runAction(actionName: string) {
  const request = mapRunActionRequest(actionName);
  return mapRunActionResponse({ actionName: request.actionName, status: "ok" });
}
