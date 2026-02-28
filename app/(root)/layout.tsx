import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 h-full">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-background bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--accent)_4%,transparent)_0%,transparent_50%)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
