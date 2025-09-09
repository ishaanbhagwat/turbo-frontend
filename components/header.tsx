'use client';
import { ThemeToggleButton } from "./theme-toggle-button";
import { useAuth } from "../app/context/authContext";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "./ui/dropdown-menu";

export function Header() {
    const handleSignOut = () => {
        signOut();
        console.log('Logged Out...')
      };

    const { user, signOut } = useAuth();

    return(
        <header className="w-full border-b">
            <div className="mx-auto flex h-14  items-center justify-end gap-3 px-4">
                <ThemeToggleButton />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="rounded-full outline-none ring-0">
                            <Avatar className="w-8 h-8">
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-60">
                        <DropdownMenuLabel className="flex flex-row justify-ends items-center gap-1">
                            <Avatar className="w-5 h-5">
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <h1>{user?.name!}</h1>
                        </DropdownMenuLabel>
                        <DropdownMenuItem>
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                            <LogOut className="h-4 w-4" />
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}