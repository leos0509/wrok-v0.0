export async function fetchUserInfo(): Promise<UserInfo> {
  const res = await fetch("/api/user/info", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error("Failed to create task");
  }
  return res.json();
}
