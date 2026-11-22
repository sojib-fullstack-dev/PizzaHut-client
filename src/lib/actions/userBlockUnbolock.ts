// Private API e token header auto attach hoy (jwtAuth helper)
import { authFetch } from "../action/jwtAuth";

export async function userBolokUnbolock(userId: string, isBlocked: boolean) {
  const res = await authFetch(`/users/${userId}/block`, {
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
