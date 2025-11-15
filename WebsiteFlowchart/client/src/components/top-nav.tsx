import { Search, RefreshCw, Plus, Languages, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6 gap-4">
        <SidebarTrigger data-testid="button-sidebar-toggle" aria-label="Toggle sidebar navigation" />
        
        {/* Logo */}
        <div className="flex items-center gap-2 mr-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight">LOQUOAIT</h1>
            <p className="text-xs text-muted-foreground">Powered By <span className="text-accent font-semibold">aqora</span></p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-1">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full"
            data-testid="button-update"
            aria-label="Update data and refresh dashboard"
          >
            <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
            Update
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full"
            data-testid="button-create"
            aria-label="Create new lead or contact"
          >
            <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
            Create
          </Button>

          {/* Search */}
          <div className="relative ml-4 flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              placeholder="Search"
              className="pl-10 rounded-full bg-secondary border-0"
              data-testid="input-search"
              aria-label="Search leads and contacts"
            />
          </div>

          <Button
            variant="secondary"
            size="sm"
            className="rounded-full"
            data-testid="button-language"
            aria-label="Change language between Hindi and Japanese"
          >
            <Languages className="w-4 h-4 mr-2" aria-hidden="true" />
            Hin-Jpn
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90"
            data-testid="button-xyroai"
            aria-label="Open XyroAi assistant"
          >
            <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
            XyroAi
          </Button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 ml-4">
          <span className="text-sm font-medium" data-testid="text-username">Suyoshi R.</span>
          <Avatar className="w-9 h-9" data-testid="avatar-user">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-pink-500 text-white">SR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
