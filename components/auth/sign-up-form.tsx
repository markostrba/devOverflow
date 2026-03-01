"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import ROUTES from "@/lib/constants/routes";
import { signUpSchema } from "@/lib/validations/auth-validations";
import { PasswordStrength } from "../ui/password-strength";
import { AuthField } from "./auth-field";

export function SignUpForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", username: "", email: "", password: "" },
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsPending(true);

    try {
      const { error } = await authClient.signUp.email({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
          toast.error("Account already exists, sign in instead.");
          return;
        } else if (error.code === "USERNAME_ALREADY_EXISTS") {
          toast.error("Username already taken.");
          return;
        }

        toast.error(
          "We’re having trouble creating your account. Please try again in a moment.",
        );
        return;
      }
      toast.success("Your account has been created successfully.");
      form.reset();
      router.push(ROUTES.HOME);
    } catch {
      toast.error("Unexpected error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <AuthField
        control={form.control}
        name="name"
        label="Full Name"
        autoComplete="name"
        placeholder="John Doe"
        iconBefore={User}
        disabled={isPending}
      />
      <AuthField
        control={form.control}
        name="username"
        label="Username"
        autoComplete="nickname"
        placeholder="johndoe"
        iconBefore={User}
        disabled={isPending}
      />
      <AuthField
        control={form.control}
        name="email"
        label="Email"
        autoComplete="email"
        placeholder="you@example.com"
        iconBefore={Mail}
        disabled={isPending}
      />
      <AuthField
        control={form.control}
        name="password"
        label="Password"
        autoComplete="new-password"
        type={showPassword ? "text" : "password"}
        placeholder="Create a strong password"
        iconBefore={Lock}
        iconAfter={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="h-full px-3 text-muted-foreground hover:bg-transparent hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </Button>
        }
        disabled={isPending}
      />

      {form.watch("password") && (
        <PasswordStrength password={form.watch("password")} />
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="cursor-pointer group relative mt-2 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 bg-accent text-accent-foreground hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/25 active:translate-y-0 active:shadow-md active:shadow-accent/20 hover:bg-accent"
      >
        {!isPending && (
          <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        )}
        {isPending ? (
          <>
            <Loader2 className="relative size-4 animate-spin" />
            <span className="relative">Creating account...</span>
          </>
        ) : (
          <span className="relative">Create account</span>
        )}{" "}
      </Button>
    </form>
  );
}
