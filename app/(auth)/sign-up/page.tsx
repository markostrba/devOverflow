import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { SignUpForm } from "@/components/auth/sign-up-form";

const SignUpPage = () => {
  return (
    <AuthCard
      title="Create account"
      description="Join the DevOverflow community"
      footer={
        <span className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-accent hover:opacity-80"
          >
            Sign In
          </Link>
        </span>
      }
    >
      <SignUpForm />
    </AuthCard>
  );
};

export default SignUpPage;
