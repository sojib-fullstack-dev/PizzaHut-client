import {
  BookOpen,
  Home,
  Info,
  LayoutGrid,
  Phone,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Browse Menu", href: "/menu", icon: BookOpen },
  // { label: "Categories", href: "/categories", icon: LayoutGrid },
  // { label: "About Us", href: "/about", icon: Info },
  // { label: "Contact", href: "/contact", icon: Phone },
]

export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/"

  return pathname === href || pathname.startsWith(`${href}/`)
}
