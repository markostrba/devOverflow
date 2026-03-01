"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-md py-6 px-4 sm:py-10 sm:px-8 shadow-2xl rounded-none sm:rounded-xl">
      <CardHeader className="flex flex-row justify-between px-0">
        <div>
          <CardTitle className="font-bold text-xl sm:text-2xl">
            {title}
          </CardTitle>
          <CardDescription className="font-normal text-sm pt-1.5">
            {description}
          </CardDescription>
        </div>
        <Image src="/images/site-logo.svg" width={50} height={50} alt="Logo" />
      </CardHeader>
      <CardContent className="px-0 flex flex-col gap-6">
        {children}
        {footer && (
          <div className="text-center text-sm text-muted-foreground mt-2">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
