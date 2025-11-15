import { Calendar, Video, Gamepad2, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const integrations = [
  { icon: Calendar, label: "calenders", color: "from-blue-500 to-blue-600" },
  { icon: Video, label: "meet", color: "from-green-500 to-green-600" },
  { icon: Gamepad2, label: "gamify", color: "from-purple-500 to-purple-600" },
  { icon: BarChart3, label: "CRM score", color: "from-pink-500 to-pink-600" },
];

export function IntegrationIcons() {
  return (
    <Card data-testid="card-integrations">
      <CardHeader>
        <CardTitle className="text-base font-medium">Actual Details & Pie Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {integrations.map((integration) => (
            <div
              key={integration.label}
              className="flex flex-col items-center gap-2"
              data-testid={`integration-${integration.label}`}
            >
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${integration.color} flex items-center justify-center hover-elevate transition-transform`}>
                <integration.icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs text-muted-foreground text-center">{integration.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
