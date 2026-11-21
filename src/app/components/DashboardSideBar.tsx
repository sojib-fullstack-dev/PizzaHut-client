"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import {
  CirclePlus,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Pizza,
  Settings,
  ShoppingBag,
  UtensilsCrossed,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

type Role = "customer" | "vendor" | "admin";
type DashboardMenuItem = {
  label: string;
  icon: LucideIcon;
  url?: string;
};

// Menu items for each role
const menuItemsByRole: Record<Role, DashboardMenuItem[]> = {
  customer: [
    { label: "Overview", url: "/dashboard/customer", icon: LayoutDashboard },
    { label: "My Orders",url: "/dashboard/customer/orders", icon: ShoppingBag },
    { label: "Profile Settings",url: "/profile", icon: Settings },
  ],
  vendor: [
    { label: "Overview", url: "/dashboard/vendor", icon: LayoutDashboard },
    {
      label: "My Menu Items",
      url: "/dashboard/vendor/menu",
      icon: UtensilsCrossed,
    },
    {
      label: "Add Menu Item",
      url: "/dashboard/vendor/menu/addmenu",
      icon: CirclePlus,
    },
    { label: "Customer Orders",url:"/dashboard/vendor/customerOrders" ,icon: ClipboardList },
    { label: "Subscription",url:"/dashboard/vendor/subscription" , icon: CreditCard },
    { label: "Profile Settings", url: "/profile", icon: Settings },
  ],
  admin: [
    { label: "Overview", url: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Manage Users", url: "/dashboard/admin/users", icon: Users },
    { label: "Manage Menu Items", url: "/dashboard/admin/menus", icon: Pizza },
    { label: "Transactions", url: "/dashboard/admin/transactions", icon: Wallet },
  ],
};

export function DashboardSideBar() {
  const { data: session, isPending } = useSession();
  const [activeItem, setActiveItem] = useState("Overview");
  const router = useRouter();
  const pathname = usePathname();

  const sessionRole = session?.user.role;
  const role: Role =
    sessionRole === "vendor" || sessionRole === "admin"
      ? sessionRole
      : "customer";
  const menuItems = menuItemsByRole[role];

  const userName = session?.user.name || session?.user.email || "Guest";
  const userImage = session?.user.image || "";
  const userInitial = userName.split(" ")[0].charAt(0).toUpperCase();

  // Sign out the user and go back to home page
  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("Sign out failed. Please try again.");
      return;
    }

    toast.success("Signed out successfully");
    router.replace("/");
  };

  return (
    <Sidebar
      collapsible="icon"
      className="absolute! inset-y-0 left-0 h-full! border-r border-[#a4161a]/10"
    >
      {/* PizzaHut brand at the top */}
      <SidebarHeader className="border-b border-[#a4161a]/10">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#8f1116] via-[#b3202a] to-[#ea580c] text-[#fff8ee] shadow-[0_8px_16px_-10px_rgba(143,17,22,0.8)]">
            <Pizza className="size-[18px]" strokeWidth={2.2} />
          </span>
          <span className="flex min-w-0 flex-col leading-none group-data-[collapsible=icon]:hidden">
            <span className="truncate text-[17px] font-extrabold tracking-tight text-[#3d211a]">
              Pizza
              <span className="bg-gradient-to-r from-[#a4161a] to-[#ea580c] bg-clip-text text-transparent">
                Hut
              </span>
            </span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#a87b62]">
              Dashboard
            </span>
          </span>
        </div>
      </SidebarHeader>

      {/* Menu items */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {menuItems.map((item) => {
              const isActive = item.url
                ? pathname === item.url
                : !menuItems.some((menuItem) => menuItem.url === pathname) &&
                  activeItem === item.label;

              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    render={item.url ? <Link href={item.url} /> : undefined}
                    isActive={isActive}
                    onClick={() => setActiveItem(item.label)}
                    tooltip={item.label}
                    className={cn(
                      "h-10 rounded-xl px-3 font-medium",
                      isActive
                        ? "bg-[#a4161a]! text-white! shadow-[0_8px_16px_-10px_rgba(164,22,26,0.85)]"
                        : "text-[#5f3b2c] hover:bg-[#a4161a]/[0.07] hover:text-[#a4161a]"
                    )}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Profile at the bottom */}
      <SidebarFooter className="border-t border-[#a4161a]/10">
        {isPending ? (
          <div className="flex items-center gap-2 px-2 py-2 text-sm text-[#a87b62]">
            <LoaderCircle className="size-4 animate-spin text-[#a4161a]" />
            <span className="group-data-[collapsible=icon]:hidden">
              Loading...
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 rounded-xl bg-white/70 px-2 py-2 ring-1 ring-[#a4161a]/10 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:ring-0">
            <Avatar className="size-8 shrink-0 ring-2 ring-[#ea580c]/40">
              {userImage ? (
                <AvatarImage src={userImage} alt={userName} />
              ) : null}
              <AvatarFallback className="bg-[#a4161a] text-xs font-bold text-white">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-sm font-semibold text-[#3d211a]">
                {userName}
              </p>
              <p className="truncate text-xs font-medium capitalize text-[#a4161a]">
                {role}
              </p>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              title="Sign out"
              className="flex shrink-0 items-center justify-center rounded-lg border border-[#a4161a]/15 bg-white p-2 text-[#a4161a] transition-all duration-200 hover:border-[#a4161a]/40 hover:bg-[#a4161a] hover:text-white group-data-[collapsible=icon]:hidden"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
