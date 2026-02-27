"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { authClient } from "@/lib/auth-client";
import ROUTES from "@/lib/constants/routes";
import { signInSchema } from "@/lib/validations/auth-validations";
import { Button } from "../ui/button";
import { AuthField } from "./auth-field";

const SignInForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsPending(true);

    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message || "Something went wrong. Please try again.");
        return;
      }
      toast.success("Signed in successfully.");
      form.reset();
      router.push(ROUTES.HOME);
    } catch {
      toast.error("Something went wrong. Please try again.");
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
        autoComplete="password"
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

      <Button
        type="submit"
        disabled={isPending}
        className="cursor-pointer group relative mt-2 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 bg-accent text-accent-foreground hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/25 active:translate-y-0 active:shadow-md active:shadow-accent/20 hover:bg-accent"
      >
        {!isPending && (
          <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-background/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        )}
        {isPending ? (
          <>
            <Loader2 className="relative size-4 animate-spin" />
            <span className="relative">Signing In...</span>
          </>
        ) : (
          <span className="relative">Sign In</span>
        )}{" "}
      </Button>
    </form>
  );
};

export default SignInForm;
