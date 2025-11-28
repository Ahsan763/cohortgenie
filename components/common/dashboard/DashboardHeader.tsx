import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { BellIcon, MenuIcon } from "@/icons";
import { useLogin } from "@/hooks/ApiHooks/useLogin";
import RootUserFlagCheck from "../RootUserFlagCheck";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const DashboardHeader = ({ collapsed, setCollapsed }: any) => {
  const { handleLogout } = useLogin();
  const userData = useSelector((state: RootState) => state.user.user);
  const initials = userData?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  console.log("🚀 ~ DashboardHeader ~ userData:", userData?.name);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-[#E5E7EB] bg-white py-3">
      <RootUserFlagCheck />
      <div className="container-fluid">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            {collapsed && (
              <div
                className={`cursor-pointer`}
                onClick={() => setCollapsed((prev: any) => !prev)}
              >
                <MenuIcon color="#6B7280" />
              </div>
            )}

            <div className="relative border border-[#E5E7EB] rounded-lg py-1 flex items-center px-4 w-[380px]">
              <Search className="text-secondary-text shrink-0" />
              <Input
                type="search"
                placeholder="Search analytics, cohorts, reports..."
                className="text-secondary-text border-none outline-none shadow-none focus-visible:ring-0 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-x-4">
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative cursor-pointer">
                  <span className="absolute right-0 top-0 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3B30]/80 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF3B30]"></span>
                  </span>
                  <BellIcon color="#292D32" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
                <DropdownMenuLabel>Notifications (3 new)</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>New report generated.</DropdownMenuItem>
                <DropdownMenuItem>Account billing updated.</DropdownMenuItem>
                <DropdownMenuItem>Task 'X' is overdue.</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="h-11 w-11 text-lg text-primary-text rounded-full cursor-pointer bg-gray-100 flex items-center justify-center">
                  {initials}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userData?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userData?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
