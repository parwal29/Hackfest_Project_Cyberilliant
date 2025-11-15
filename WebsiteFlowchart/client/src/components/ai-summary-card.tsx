import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, TrendingUp, TrendingDown } from "lucide-react";
import type { DashboardStats } from "@shared/schema";

interface AISummaryCardProps {
  stats?: DashboardStats;
  isLoading?: boolean;
}

export function AISummaryCard({ stats, isLoading }: AISummaryCardProps) {
  const statItems = stats ? [
    { 
      label: "Total Leads", 
      value: stats.totalLeads, 
      color: "text-foreground",
      bgColor: "bg-secondary/50",
      trend: "+12%",
      trendUp: true
    },
    { 
      label: "Qualified Leads", 
      value: stats.qualifiedLeads, 
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: "+8%",
      trendUp: true
    },
    { 
      label: "Avg Score", 
      value: `${stats.averageScore}%`, 
      color: "text-accent",
      bgColor: "bg-accent/10",
      trend: "+5%",
      trendUp: true
    },
    { 
      label: "Conversion", 
      value: `${stats.conversionRate}%`, 
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
      trend: "-2%",
      trendUp: false
    },
  ] : [];

  return (
    <Card className="col-span-full border-border/50" data-testid="card-ai-summary">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Ai Based Summary</CardTitle>
        {isLoading && <Loader2 className="w-5 h-5 animate-spin text-primary" aria-label="Loading stats" />}
      </CardHeader>
      <CardContent>
        {stats ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statItems.map((item, index) => (
              <div 
                key={item.label}
                className={`p-4 rounded-lg ${item.bgColor} space-y-2`}
                data-testid={`stat-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {item.label}
                  </p>
                  <div className={`flex items-center gap-1 text-xs ${item.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                    {item.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {item.trend}
                  </div>
                </div>
                <p className={`text-3xl font-bold ${item.color}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin opacity-50" />
              <p className="text-sm">Loading dashboard stats...</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
