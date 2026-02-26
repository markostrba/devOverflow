"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Render a styled separator whose size and layout adapt to `orientation`.
 *
 * Renders a separator element with base utility classes and any additional classes provided via `className`.
 *
 * @param className - Additional CSS classes to merge with the component's base styles
 * @param orientation - Layout orientation of the separator; "horizontal" makes it full width with 1px height, "vertical" makes it full height with 1px width
 * @param decorative - When `true`, the separator is marked as decorative for accessibility
 * @returns The separator React element
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
