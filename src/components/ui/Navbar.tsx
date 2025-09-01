import Link from "next/link";
import { Button } from "./button";
import { HomeIcon, LogOut, Sprout } from "lucide-react";
import { Binoculars } from "lucide-react";
import ModeToggle from "./ModeToggle";
import { LogIn } from "lucide-react";
import { stackServerApp } from "@/stack";
import { getUserDetails } from "@/app/actions/user.actions";
import { UserButton } from "@stackframe/stack";

const Navbar = async () => {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  const userProfile = await getUserDetails(user?.id);

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex gap-2 text-xl font-bold text-primary font-mono tracking-wider"
            >
              <Binoculars />
              庫存管理系統
            </Link>
          </div>
          {/* Navbar components */}

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/stock">
                <Sprout className="w-4 h-4" />
                <span className="hidden lg:inline">庫存</span>
              </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                <span className="hidden lg:inline">首頁</span>
              </Link>
            </Button>

            <ModeToggle />

            {user ? (
              <>
                {/* sign out Button */}
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={app.signOut}>
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">登出</span>
                  </Link>
                </Button>

                <UserButton />
              </>
            ) : (
              <>
                {/* sign Button */}
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={app.signIn}>
                    <LogIn className="w-4 h-4" />
                    <span className="hidden lg:inline">登入</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
