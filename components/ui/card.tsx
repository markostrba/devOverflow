import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders the outer card container used to assemble card UI pieces.
 *
 * @param className - Additional CSS class names to merge with the component's default styling
 * @param props - Additional props spread onto the outer div (e.g., event handlers, aria attributes)
 * @returns A div element configured as the card container with default layout, spacing, and visual styles
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the card header container with responsive grid layout and a `data-slot="card-header"` attribute.
 *
 * @param className - Additional class names to merge with the header's default layout and spacing styles
 * @returns A div element configured as the card header with composed `className` and all other div props spread through
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the card title area with title typography and a `data-slot` attribute.
 *
 * @returns A div element with `data-slot="card-title"` and the typography classes `leading-none font-semibold`, merged with any provided `className`
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Renders the card's description area.
 *
 * @returns A div element with `data-slot="card-description"`, default muted small-text styling, and any provided `className` and props merged onto it.
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Renders the card's action area for placing controls (e.g., buttons) aligned with the header.
 *
 * @returns The card action slot element — a div with `data-slot="card-action"` used to position action controls within the card.
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the main content area of a Card.
 *
 * The element is a div with data-slot="card-content", applies horizontal padding, and accepts additional class names and div props.
 *
 * @returns A div element representing the card's content area.
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * Renders the card footer container with default horizontal padding and center-aligned layout.
 *
 * @returns A div element with `data-slot="card-footer"`, default footer classes (flex, items-center, px-6, and top padding for bordered state) and any provided `className` and props
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
