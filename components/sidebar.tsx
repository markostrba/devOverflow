import Image from "next/image";
import Link from "next/link";
import ROUTES, { AUTH_LINKS, SIDEBAR_LINKS } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col lg:w-64 bg-card/80 border-r border-border h-full pb-11">
      <div className="h-16.25 border-b border-border flex items-center px-3.5 mb-5 shrink-0">
        <Link href={ROUTES.HOME}>
          <Image
            src="/images/logo-light.svg"
            alt="DevOverflow logo"
            width={186}
            height={36}
          />
        </Link>
      </div>
      <nav className="h-full flex flex-col justify-between">
        <ol className="flex flex-col h-full gap-7">
          {SIDEBAR_LINKS.map((link) => (
            <li
              key={link.route}
              className={cn(
                "px-3.5",
                link.route === ROUTES.ASK_A_QUESTION && "mt-10",
              )}
            >
              {link.label}
            </li>
          ))}
        </ol>
        <div className="flex flex-col gap-6">
          {AUTH_LINKS.map((link) => (
            <div key={link.route} className={cn("px-3.5")}>
              {link.label}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
