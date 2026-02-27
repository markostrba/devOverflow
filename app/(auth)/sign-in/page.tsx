import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import SignInForm from "@/components/auth/sign-in-form";
import { SocialAuth } from "@/components/auth/social-auth";
import { Separator } from "@/components/ui/separator";
import ROUTES from "@/lib/constants/routes";

const SignInPage = () => {
  return (
    <AuthCard
      title="Welcome Back"
      description="Sign In to continue to DevOverflow"
      footer={
        <span className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href={ROUTES.SIGN_UP}
            className="font-semibold text-accent hover:opacity-80"
          >
            Sign Up
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
      <SignInForm />
    </AuthCard>
  );
};

export default SignInPage;
