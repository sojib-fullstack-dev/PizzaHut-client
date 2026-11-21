


const API_BASE =process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function getVendorCustomerOrders(params?: {
  vendorEmail?: string;
  vendorId?: string;
}) {
  const query = new URLSearchParams();
  if (params?.vendorEmail) query.set("vendorEmail", params.vendorEmail);
  if (params?.vendorId) query.set("vendorId", params.vendorId);

  const url = query.toString()
    ? `${API_BASE}/orders?${query.toString()}`
    : `${API_BASE}/orders`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch customer orders.");
  }

  return res.json();
}

export async function updateOrderStatus(
  orderId: string,
  payload: {
    status: "Accepted" | "Rejected";
    vendorId?: string;
    vendorEmail?: string;
  }
) {
  const res = await fetch(`${API_BASE}/orders/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to update order status.");
  }

  return data;
}