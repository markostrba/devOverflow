"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod/v4";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import ROUTES from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import { signUpSchema } from "@/lib/validations/auth-validations";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { PasswordStrength } from "./ui/password-strength";

interface AuthFormProps {
  title: string;
  description: string;
  mode: "SIGN_UP";
}

const getModeSchema = ({ mode }: { mode: "SIGN_UP" }) => {
  if (mode === "SIGN_UP") return signUpSchema;

  throw new Error(`Unsupported auth mode: ${mode}`);
};
const getModeFields = ({ mode }: { mode: "SIGN_UP" }) => {
  if (mode === "SIGN_UP")
    return {
      username: "",
      name: "",
      email: "",
      password: "",
    };

  throw new Error(`Unsupported auth mode: ${mode}`);
};

export default function AuthForm({ mode, title, description }: AuthFormProps) {
  const schema = getModeSchema({ mode });
  const fields = getModeFields({ mode });
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: fields,
  });
  const passwordValue = form.watch("password");

  async function onSubmit(data: z.infer<typeof schema>) {
    if (mode !== "SIGN_UP") return;

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
  }

  return (
    <Card className="w-full sm:max-w-md py-6 px-4 sm:py-10 sm:px-8 shadow-2xl">
      <CardHeader className="flex flex-row justify-between px-0">
        <div>
          <CardTitle className="font-bold text-xl sm:text-2xl">
            {title}
          </CardTitle>
          <CardDescription className="font-normal text-base text-[#3F4354] pt-1.5">
            {description}
          </CardDescription>
        </div>
        <Image
          src={"/images/site-logo.svg"}
          width={50}
          height={50}
          alt="DevOverflow logo"
        />
      </CardHeader>
      <CardContent className="px-0 flex flex-col gap-6.5">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6.5"
        >
          <FieldGroup className="gap-4">
            {mode === "SIGN_UP" && (
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="auth-email">Email address</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        id="auth-email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        disabled={isPending}
                        className={cn(
                          "h-11 pl-10",
                          fieldState.error && "border-destructive",
                        )}
                        aria-invalid={!!fieldState.error}
                        aria-describedby={
                          fieldState.error ? "email-error" : undefined
                        }
                      />
                    </div>
                    {fieldState.error && (
                      <p
                        id="email-error"
                        className="animate-in fade-in slide-in-from-bottom-1 duration-200 text-xs text-destructive"
                        role="alert"
                      >
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            )}
            {mode === "SIGN_UP" && (
              <>
                <Controller
                  name={"username"}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <Label htmlFor="auth-username">Username</Label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-muted-foreground">
                          @
                        </span>
                        <Input
                          {...field}
                          id="auth-username"
                          type="text"
                          placeholder="your_username"
                          autoComplete="new-username"
                          disabled={isPending}
                          className={cn(
                            "h-11 pl-9",
                            fieldState.error && "border-destructive",
                          )}
                          aria-invalid={!!fieldState.error}
                          aria-describedby={
                            fieldState.error ? "username-error" : undefined
                          }
                        />
                      </div>
                      {fieldState.error && (
                        <p
                          id="username-error"
                          className="animate-in fade-in slide-in-from-bottom-1 duration-200 text-xs text-destructive"
                          role="alert"
                        >
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name={"name"}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-75">
                      <Label htmlFor="auth-fullname">Full name</Label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          {...field}
                          id="auth-fullname"
                          type="text"
                          placeholder="John Doe"
                          autoComplete="name"
                          disabled={isPending}
                          className={cn(
                            "h-11 pl-10",
                            fieldState.error && "border-destructive",
                          )}
                          aria-invalid={!!fieldState.error}
                          aria-describedby={
                            fieldState.error ? "fullname-error" : undefined
                          }
                        />
                      </div>
                      {fieldState.error && (
                        <p
                          id="fullname-error"
                          className="animate-in fade-in slide-in-from-bottom-1 duration-200 text-xs text-destructive"
                          role="alert"
                        >
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </>
            )}
            {mode === "SIGN_UP" && (
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auth-password">Password</Label>
                    </div>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        id="auth-password"
                        type={showPassword ? "text" : "password"}
                        placeholder={"Create a strong password"}
                        autoComplete={"new-password"}
                        disabled={isPending}
                        className={cn(
                          "h-11 pl-10 pr-11",
                          fieldState.error && "border-destructive",
                        )}
                        aria-invalid={!!fieldState.error}
                        aria-describedby={
                          fieldState.error
                            ? "password-error"
                            : mode === "SIGN_UP"
                              ? "password-strength"
                              : undefined
                        }
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 top-1/2 -translate-y-1/2 rounded-l-none text-muted-foreground hover:bg-transparent hover:text-foreground focus-visible:ring-ring/50"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </Button>
                    </div>
                    {fieldState.error && (
                      <p
                        id="password-error"
                        className="animate-in fade-in slide-in-from-bottom-1 duration-200 text-xs text-destructive"
                        role="alert"
                      >
                        {fieldState.error.message}
                      </p>
                    )}
                    {mode === "SIGN_UP" &&
                      passwordValue &&
                      passwordValue.length > 0 && (
                        <div id="password-strength">
                          <PasswordStrength password={passwordValue} />
                        </div>
                      )}
                  </div>
                )}
              />
            )}
          </FieldGroup>
          <Field orientation="responsive">
            <button
              type="submit"
              disabled={isPending}
              className="group relative mt-2 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 bg-accent text-accent-foreground hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/25 active:translate-y-0 active:shadow-md active:shadow-accent/20"
            >
              {!isPending && (
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-background/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              )}

              {isPending ? (
                <>
                  <Loader2 className="relative size-4 animate-spin" />
                  <span className="relative">
                    {mode === "SIGN_UP"
                      ? "Creating account..."
                      : "Signing in..."}
                  </span>
                </>
              ) : (
                <span className="relative">
                  {mode === "SIGN_UP" ? "Create account" : "Sign in"}
                </span>
              )}
            </button>
          </Field>
        </form>
        <span className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={ROUTES.SIGN_IN}
            className="font-semibold text-accent hover:opacity-80"
          >
            Sign in
          </Link>
        </span>
      </CardContent>
    </Card>
  );
}
