import Image from "next/image";
import Link from "next/link";
import ROUTES from "@/lib/constants/routes";
import { DarkModeToggle } from "./ui/dark-mode-toggle";

const Navbar = () => {
  return (
    <header className="px-6 lg:px-8 border-b border-border bg-card/80">
      <div className="flex gap-8 justify-between h-16 items-center ">
        <Link href={ROUTES.HOME} className="lg:hidden shrink-0">
          <Image
            src="/images/site-logo.svg"
            alt="DevOverflow logo"
            width={36}
            height={36}
          />
        </Link>
        <div className="border max-w-xl w-full rounded-lg h-9 hidden md:block">
          search
        </div>

        <div className="flex gap-3.5">
          <DarkModeToggle />
          <div className="border size-7 rounded-full text-center md:hidden">
            MS
          </div>
          <div className="size-7 border rounded-full text-center">I</div>
          <div className="size-7 border rounded-full text-center">P</div>
          <div className="size-7 border rounded-full text-center">H</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
