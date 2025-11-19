import { Search, HelpCircle, User, Droplets } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  activeLeaksCount: number;
}

export const Header = ({ activeLeaksCount }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <Droplets className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold text-smart-dark">Smartvatten</h1>
            <span className="text-xs font-semibold text-muted-foreground">HUB</span>
          </div>
        </div>
        
        <div className="flex flex-1 items-center gap-4 ml-8">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search premises by name, address, city, property manager..."
              className="pl-10 bg-background"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {activeLeaksCount > 0 && (
            <Badge variant="destructive" className="gap-1.5 px-3 py-1">
              <span className="font-semibold">{activeLeaksCount}</span>
              <span className="text-xs">Active Leak{activeLeaksCount !== 1 ? 's' : ''}</span>
            </Badge>
          )}
          
          <Button variant="ghost" size="icon" asChild>
            <a href="https://docs.lovable.dev" target="_blank" rel="noopener noreferrer">
              <HelpCircle className="h-5 w-5" />
            </a>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
