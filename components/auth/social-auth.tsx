"use client";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

export function SocialAuth() {
  const [pending, setPending] = useState<"github" | "google" | null>(null);

  const handleSocialSignIn = async (provider: "github" | "google") => {
    setPending(provider);
    try {
      const { error } = await authClient.signIn.social({ provider });

      if (error) {
        toast.error(error.message || "Failed to sign in. Please try again.");
        return;
      }
    } catch {
      toast.error("Failed to sign in. Please try again.");
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        disabled={pending !== null}
        onClick={() => handleSocialSignIn("github")}
        className="group relative flex h-11 hover:bg-card hover:text-foreground w-full items-center justify-center gap-2.5 overflow-hidden rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-border/80 hover:shadow-lg hover:shadow-foreground/4 active:translate-y-0 active:shadow-sm"
      >
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-foreground/3 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
        <SiGithub width={16} height={16} />
        GitHub
      </Button>
      <Button
        variant="outline"
        disabled={pending !== null}
        onClick={() => handleSocialSignIn("google")}
        className="group relative flex h-11 w-full hover:bg-card hover:text-foreground items-center justify-center gap-2.5 overflow-hidden rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-border/80 hover:shadow-lg hover:shadow-foreground/4 active:translate-y-0 active:shadow-sm"
      >
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-foreground/3 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
        <SiGoogle width={16} height={16} />
        Google
      </Button>
    </div>
  );
}
