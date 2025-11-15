import { useState } from "react";
import { Home, TrendingUp, FileText, Users, Calendar, Bell, Grid, Zap } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { GetPrimeModal } from "./get-prime-modal";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Progress", url: "/progress", icon: TrendingUp },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Contacts", url: "/contacts", icon: Users },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Notification", url: "/notifications", icon: Bell },
  { title: "Integration", url: "/integrations", icon: Grid },
];

export function AppSidebar() {
  const [location] = useLocation();
  const [showPrimeModal, setShowPrimeModal] = useState(false);

  return (
    <>
      <Sidebar>
        <SidebarContent className="py-6">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {menuItems.map((item) => {
                  const isActive = location === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        data-active={isActive}
                        className="data-[active=true]:bg-gradient-to-r data-[active=true]:from-primary data-[active=true]:to-pink-500 data-[active=true]:text-white"
                        data-testid={`sidebar-link-${item.title.toLowerCase()}`}
                      >
                        <Link href={item.url}>
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <Button
            onClick={() => setShowPrimeModal(true)}
            className="w-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 text-white font-semibold"
            data-testid="button-get-prime"
            aria-label="Upgrade to PRIME membership"
          >
            <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
            GET PRIME
          </Button>
        </SidebarFooter>
      </Sidebar>
      <GetPrimeModal open={showPrimeModal} onOpenChange={setShowPrimeModal} />
    </>
  );
}
