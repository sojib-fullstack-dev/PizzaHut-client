const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export async function userBolokUnbolock(userId: string, isBlocked: boolean) {
  const res = await fetch(`${API_BASE}/users/${userId}/block`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isBlocked }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      data?.error || data?.message || "Failed to update user block status."
    );
  }

  return data;
}

export const userBlockUnblock = userBolokUnbolock;
