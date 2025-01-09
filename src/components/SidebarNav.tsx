import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { Separator } from "@/components/ui/separator";

type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavItem[];
    }
);

interface SidebarNavProps {
  items: SidebarNavItem[];
  showLogout?: boolean;
}

const SidebarNav = ({ items, showLogout }: SidebarNavProps) => {
  const { pathname } = useLocation();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return (
          item.href && (
            <Link key={index} to={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-slate-300" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
      <Separator className="my-4" />
      {showLogout && <LogoutButton />}
    </nav>
  );
};

export default SidebarNav;
