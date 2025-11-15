import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Video, Phone } from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";
import type { Event } from "@shared/schema";

export default function CalendarPage() {
  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  const getEventIcon = (type: string | null) => {
    if (type === "meeting") return Video;
    if (type === "call") return Phone;
    return Clock;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-sm text-muted-foreground">{format(today, "MMMM yyyy")}</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-pink-500" data-testid="button-add-event">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Event
        </Button>
      </div>

      {/* Week View */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => {
          const isToday = format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
          const dayEvents = events.filter(
            (event) => format(new Date(event.startTime), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
          );

          return (
            <Card key={day.toISOString()} className={isToday ? "border-primary" : ""}>
              <CardHeader className="pb-2">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">{format(day, "EEE")}</p>
                  <p className={`text-lg font-bold ${isToday ? "text-primary" : ""}`}>
                    {format(day, "d")}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-1 min-h-24">
                {dayEvents.map((event) => {
                  const Icon = getEventIcon(event.type);
                  return (
                    <div
                      key={event.id}
                      className="p-2 rounded bg-primary/20 text-xs hover-elevate"
                      data-testid={`event-${event.id}`}
                    >
                      <div className="flex items-start gap-1">
                        <Icon className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{event.title}</p>
                          <p className="text-muted-foreground">
                            {format(new Date(event.startTime), "HH:mm")}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Upcoming Events List */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.length > 0 ? (
              events.slice(0, 5).map((event) => {
                const Icon = getEventIcon(event.type);
                return (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover-elevate"
                    data-testid={`upcoming-event-${event.id}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(event.startTime), "PPp")}
                      </p>
                    </div>
                    <Badge variant="secondary">{event.type || "event"}</Badge>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No upcoming events</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
