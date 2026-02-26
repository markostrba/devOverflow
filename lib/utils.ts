import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine multiple class name inputs into a single, deduplicated class string.
 *
 * @param inputs - One or more class value inputs (strings, arrays, or objects representing conditional class names)
 * @returns The merged class string with conflicting Tailwind utility classes resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
