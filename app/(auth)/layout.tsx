import type React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-[url(/images/auth-light.png)] flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4">
      {children}
    </main>
  );
};

export default Layout;
