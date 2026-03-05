"use client";
import { authClient } from "@/lib/auth-client";
import SignOutButton from "./auth/sign-out-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

const ProfileDropdownMenu = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <Skeleton className="rounded-full size-8 bg-muted border border-border" />
    );
  }

  if (!isPending && !data?.user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="rounded-full p-0 h-fit hover:border hover:border-accent"
      >
        <Button variant="outline" className="cursor-pointer">
          <span className="sr-only">Open navigation profile menu</span>
          <Avatar>
            <AvatarImage src={data?.user.image || ""} />
            {/* This should be replaced later with a random avatar from cloud provider */}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <SignOutButton className="cursor-pointer p-2 py-1.5 text-sm font-normal h-full w-full justify-start transition-none" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdownMenu;
