// Order er status dekhay - 4 ta option er moddhe konta ekhon active
// seita highlighted, baki gula muted (image er timeline er moto)
type Props = {
  status?: string;
};

// 4 ta allowed status (server o same gula accept kore)
const ORDER_STATUSES = ["Pending", "Accepted", "Rejected", "Cancelled"];

// Active status er color (MenuItemCard er statusColors er sathe same vibe)
const activeStyles: Record<string, string> = {
  Pending: "border-amber-300 bg-amber-100 text-amber-700",
  Accepted: "border-green-300 bg-green-100 text-green-700",
  Rejected: "border-red-300 bg-red-100 text-red-600",
  Cancelled: "border-gray-300 bg-gray-100 text-gray-600",
};

export function OrderTimeline({ status }: Props) {
  // Purano order e status na thakle Pending dhoray
  const current = status || "Pending";

  return (
    <div>
      <p className="text-[13px] font-semibold text-[#3d211a]">
        Order timeline
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {ORDER_STATUSES.map((step) => {
          const isActive = current === step;

          return (
            <span
              key={step}
              className={
                isActive
                  ? `rounded-full border px-3 py-1 text-xs font-bold ${activeStyles[step]}`
                  : "rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-400"
              }
            >
              {step}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default OrderTimeline;
