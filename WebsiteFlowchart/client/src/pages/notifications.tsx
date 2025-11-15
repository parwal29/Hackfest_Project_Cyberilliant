import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Trophy, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Notification } from "@shared/schema";

export default function NotificationsPage() {
  const { data: notifications = [] } = useQuery<Notification[]>({
    queryKey: ["/api/notifications"],
  });

  const getIcon = (type: string) => {
    const icons: Record<string, any> = {
      achievement: Trophy,
      reminder: Calendar,
      system: AlertCircle,
    };
    return icons[type] || Bell;
  };

  const getColor = (type: string) => {
    const colors: Record<string, string> = {
      achievement: "from-primary to-pink-500",
      reminder: "from-accent to-blue-500",
      system: "from-chart-5 to-orange-500",
    };
    return colors[type] || "from-secondary to-muted";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            {notifications.filter(n => !n.isRead).length} unread notifications
          </p>
        </div>
        <Button variant="outline" size="sm" data-testid="button-mark-all-read">
          <CheckCircle className="w-4 h-4 mr-2" />
          Mark all as read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            const Icon = getIcon(notification.type);
            const colorClass = getColor(notification.type);

            return (
              <Card
                key={notification.id}
                className={`hover-elevate transition-all ${!notification.isRead ? "border-primary/50" : ""}`}
                data-testid={`notification-${notification.id}`}
              >
                <CardContent className="flex items-start gap-4 p-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold">{notification.title}</h4>
                      {!notification.isRead && (
                        <Badge variant="secondary" className="bg-primary/20 text-primary">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.createdAt || Date.now()), { addSuffix: true })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Bell className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg font-medium">No notifications</p>
              <p className="text-sm mt-1">You're all caught up!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
