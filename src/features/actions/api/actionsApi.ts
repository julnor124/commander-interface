export async function runAction(actionName: string) {
  return { actionName, status: "ok" as const };
}
