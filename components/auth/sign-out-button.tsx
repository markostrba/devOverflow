"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

const SignOutButton = ({ className }: { className?: string }) => {
  const handleClick = async () => {
    await authClient.signOut();
  };

  return (
    <Button variant="ghost" className={className} onClick={handleClick}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
