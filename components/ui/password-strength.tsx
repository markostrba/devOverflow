"use client";

import { CheckIcon, XIcon } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { passwordRequirements } from "@/lib/validations/auth-validations";

function getStrengthColor(score: number) {
  if (score === 0) return "bg-border";
  if (score <= 1) return "bg-destructive";
  if (score <= 2) return "bg-orange-500";
  if (score <= 3) return "bg-amber-500";
  if (score === 4) return "bg-yellow-400";
  return "bg-emerald-500";
}

function getStrengthText(score: number) {
  if (score === 0) return "Enter a password";
  if (score <= 2) return "Weak password";
  if (score <= 3) return "Medium password";
  if (score === 4) return "Strong password";
  return "Very strong password";
}

export function PasswordStrength({ password }: { password: string }) {
  const results = useMemo(
    () =>
      passwordRequirements.map((req) => ({
        label: req.label,
        met: req.regex.test(password),
      })),
    [password],
  );

  const score = useMemo(() => results.filter((r) => r.met).length, [results]);

  return (
    <output
      className="mt-3 animate-in fade-in slide-in-from-bottom-1 duration-300"
      aria-live="polite"
      aria-label={`Password strength: ${score} of ${passwordRequirements.length} requirements met`}
    >
      {/* Strength bars */}
      <div className="mb-3 flex h-1.5 w-full gap-1">
        {results.map((req, i) => (
          <span
            key={req.label}
            className={cn(
              "h-full flex-1 rounded-full transition-all duration-500 ease-out",
              i < score ? getStrengthColor(score) : "bg-border",
            )}
          />
        ))}
      </div>

      {/* Strength label */}
      <p className="mb-3 text-sm font-medium text-foreground">
        {getStrengthText(score)}.{" "}
        <span className="text-muted-foreground font-normal">Must contain:</span>
      </p>

      {/* Requirement checklist */}
      <ul className="space-y-1.5">
        {results.map((req) => (
          <li key={req.label} className="flex items-center gap-2">
            {req.met ? (
              <CheckIcon className="size-4 shrink-0 text-emerald-500" />
            ) : (
              <XIcon className="size-4 shrink-0 text-muted-foreground" />
            )}
            <span
              className={cn(
                "text-xs transition-colors duration-200",
                req.met
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-muted-foreground",
              )}
            >
              {req.label}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </output>
  );
}
