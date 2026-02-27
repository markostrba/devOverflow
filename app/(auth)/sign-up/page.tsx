import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { SocialAuth } from "@/components/auth/social-auth";
import { Separator } from "@/components/ui/separator";
import { authIsNotRequired } from "@/lib/auth-utils";
import ROUTES from "@/lib/constants/routes";

const SignUpPage = async () => {
  await authIsNotRequired();

  return (
    <AuthCard
      title="Create account"
      description="Join the DevOverflow community"
      footer={
        <span className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={ROUTES.SIGN_IN}
            className="font-semibold text-accent hover:opacity-80"
          >
            Sign In
          </Link>
        </span>
      }
    >
      <SocialAuth />

      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-xs">
          or continue with email
        </span>
        <Separator className="flex-1" />
      </div>
      <SignUpForm />
    </AuthCard>
  );
};

export default SignUpPage;
