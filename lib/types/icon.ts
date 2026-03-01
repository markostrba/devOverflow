import type { ForwardRefExoticComponent, RefAttributes } from "react";

export interface SidebarIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export interface SidebarIconProps {
  size?: number;
  className?: string;
}

export type SidebarIconComponent = ForwardRefExoticComponent<
  SidebarIconProps & RefAttributes<SidebarIconHandle>
>;
