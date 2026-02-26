"use client";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

export function SocialAuth() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        className="group relative flex h-11 hover:bg-card hover:text-foreground w-full items-center justify-center gap-2.5 overflow-hidden rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-border/80 hover:shadow-lg hover:shadow-foreground/4 active:translate-y-0 active:shadow-sm"
        onClick={() => authClient.signIn.social({ provider: "github" })}
      >
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-foreground/3 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
        <Image src="/icons/github.svg" alt="github" width={16} height={16} />{" "}
        GitHub
      </Button>
      <Button
        variant="outline"
        className="group relative flex h-11 w-full hover:bg-card hover:text-foreground items-center justify-center gap-2.5 overflow-hidden rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-border/80 hover:shadow-lg hover:shadow-foreground/4 active:translate-y-0 active:shadow-sm"
        onClick={() => authClient.signIn.social({ provider: "google" })}
      >
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-foreground/3 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
        <Image src="/icons/google.svg" alt="github" width={16} height={16} />{" "}
        Google
      </Button>
    </div>
  );
}
