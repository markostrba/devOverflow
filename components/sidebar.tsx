"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ROUTES, { AUTH_LINKS, SIDEBAR_LINKS } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import SidebarItem from "./sidebar-item";

const Sidebar = () => {
  const pathname = usePathname();
  console.log("pathname", pathname);

  return (
    <aside className="hidden lg:flex flex-col lg:w-64 bg-card/80 border-r border-border h-full">
      <div className="h-16.25 border-b border-border flex items-center px-3.5 mb-5 shrink-0">
        <Link href={ROUTES.HOME} className="flex items-center gap-3">
          <Image
            src="/images/site-logo.svg"
            width={32}
            height={32}
            alt="DevOverflow Logo"
          />
          <p className="font-bold text-2xl font-space-grotesk text-black dark:text-white">
            Dev<span className="text-accent">Overflow</span>
          </p>
        </Link>
      </div>

      <nav className="h-full flex flex-col justify-between">
        {/* Main Links */}
        <ul className="flex flex-col gap-4 px-3.5">
          {SIDEBAR_LINKS.map((link) => (
            <SidebarItem
              key={link.route}
              link={link}
              icon={link.icon}
              className={cn(
                pathname === link.route &&
                  "bg-accent/10 text-foreground hover:bg-accent/10 dark:bg-accent/25 dark:hover:bg-accent/25",
                link.route === ROUTES.ASK_A_QUESTION &&
                  "mt-7.5 bg-accent hover:bg-accent text-white hover:text-white hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/25 dark:hover:bg-accent",
              )}
            />
          ))}
        </ul>

        {/* Auth Links (Justified at the bottom) */}
        <div className="flex flex-col gap-4 px-3.5 mt-auto border-t border-border py-4">
          {AUTH_LINKS.map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className={cn(
                "flex justify-center items-center px-4 py-3 rounded-lg text-sm font-bold border border-accent text-accent hover:bg-accent hover:text-white transition-colors",
                link.route === ROUTES.SIGN_UP
                  ? "bg-secondary border border-stone-400 text-foreground hover:border-stone-500 dark:hover:border-stone-300  hover:bg-stone-200/90 dark:hover:bg-white/5 hover:text-foreground"
                  : "hover:bg-background hover:bg-[radial-gradient(ellipse_200%_160%_at_top_right,#e8740c14_0%,transparent_80%)] hover:text-accent",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
