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

const DashboardHeader = ({ collapsed, setCollapsed }: any) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-[#E5E7EB] bg-white py-3">
      <div className="container-fluid">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            {collapsed && (
              <div
                className={`cursor-pointer`}
                onClick={() => setCollapsed((prev:any) => !prev)}
              >
                <MenuIcon color="#6B7280" />
              </div>
            )}

            <div className="relative border border-[#E5E7EB] rounded-lg py-1 flex items-center px-4 w-full max-w-[380px]">
              <Search className="text-secondary-text" />
              <Input
                type="search"
                placeholder="Search analytics, cohorts, reports..."
                className="text-secondary-text border-none outline-none shadow-none focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="flex items-center gap-x-4">
            <DropdownMenu>
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
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="h-8 w-8 rounded-full cursor-pointer">
                  <Image
                    src="/images/profile.png"
                    width={32}
                    height={32}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Jane Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      jane@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
