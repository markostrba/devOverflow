"use client";

import Link from "next/link";
import { useRef } from "react";
import type { SidebarIconComponent, SidebarIconHandle } from "@/lib/types/icon";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  link: {
    route: string;
    label: string;
  };
  icon?: SidebarIconComponent;
  className?: string;
}

const SidebarItem = ({ link, icon: Icon, className }: SidebarItemProps) => {
  const iconRef = useRef<SidebarIconHandle | null>(null);

  return (
    <li>
      <Link
        href={link.route}
        onMouseEnter={() => iconRef.current?.startAnimation()}
        onMouseLeave={() => iconRef.current?.stopAnimation()}
        className={cn(
          "flex gap-3 hover:bg-accent/5 dark:hover:bg-accent/15  items-center px-4 py-3.5 rounded-lg text-sm font-semibold cursor-pointer transition-all group text-muted-foreground hover:text-foreground",
          className,
        )}
      >
        {Icon && <Icon ref={iconRef} size={24} className="shrink-0" />}
        <span>{link.label}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
