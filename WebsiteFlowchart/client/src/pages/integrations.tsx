import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Settings } from "lucide-react";
import { SiGooglecalendar, SiGooglemeet, SiWhatsapp, SiStripe } from "react-icons/si";
import type { Integration } from "@shared/schema";

export default function IntegrationsPage() {
  const { data: integrations = [] } = useQuery<Integration[]>({
    queryKey: ["/api/integrations"],
  });

  const availableIntegrations = [
    {
      name: "Google Calendar",
      description: "Sync your calendar and schedule meetings automatically",
      icon: SiGooglecalendar,
      color: "text-blue-500",
    },
    {
      name: "Google Meet",
      description: "Start video calls directly from the platform",
      icon: SiGooglemeet,
      color: "text-green-500",
    },
    {
      name: "WhatsApp Business",
      description: "Send messages and updates to leads via WhatsApp",
      icon: SiWhatsapp,
      color: "text-green-600",
    },
    {
      name: "UPI Payment",
      description: "Accept payments through UPI (BHIM)",
      icon: SiStripe,
      color: "text-purple-500",
    },
  ];

  const isConnected = (name: string) => {
    return integrations.some(
      (int) => int.name.toLowerCase() === name.toLowerCase() && int.isConnected
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Integrations</h1>
        <p className="text-sm text-muted-foreground">
          Connect your favorite tools and services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableIntegrations.map((integration) => {
          const connected = isConnected(integration.name);
          
          return (
            <Card
              key={integration.name}
              className="hover-elevate transition-all"
              data-testid={`card-integration-${integration.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center ${integration.color}`}>
                      <integration.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{integration.name}</CardTitle>
                      {connected ? (
                        <Badge className="mt-1 bg-green-500/20 text-green-500">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="mt-1">
                          <XCircle className="w-3 h-3 mr-1" />
                          Not Connected
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {integration.description}
                </p>
                <div className="flex gap-2">
                  {connected ? (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Button variant="destructive" size="sm">
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-pink-500"
                      size="sm"
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Integration Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{integrations.filter(i => i.isConnected).length}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">4</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-chart-3">0</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-chart-4">100%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
