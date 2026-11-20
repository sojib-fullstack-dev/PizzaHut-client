import { Suspense } from "react";
import { MenuDetails } from "@/app/components/MenuDetails";

export const instant = false;

export default function MenuDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fffaf2] py-24 text-center text-sm font-semibold text-[#a87b62]">
          Loading details...
        </div>
      }
    >
      {params.then(({ id }) => (
        <MenuDetails itemId={id} />
      ))}
    </Suspense>
  );
}
