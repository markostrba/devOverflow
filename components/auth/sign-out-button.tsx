"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

const SignOutButton = ({ className }: { className?: string }) => {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    if (isPending) return;
    setIsPending(true);

    try {
      await authClient.signOut();
    } catch {
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button variant="ghost" className={className} onClick={handleClick}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
