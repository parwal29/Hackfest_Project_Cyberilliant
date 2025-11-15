import { useQuery } from "@tanstack/react-query";
import type { DashboardStats } from "@shared/schema";
import { AISummaryCard } from "@/components/ai-summary-card";
import { LeadScoreWidget } from "@/components/lead-score-widget";
import { IntegrationIcons } from "@/components/integration-icons";
import { BottomActionBar } from "@/components/bottom-action-bar";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/stats"],
  });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 space-y-6">
        <AISummaryCard stats={stats} isLoading={isLoading} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <IntegrationIcons />
          </div>
          <div>
            <LeadScoreWidget score={stats?.averageScore || 73} change={2} />
          </div>
        </div>
      </div>

      <BottomActionBar />

      {/* Version Footer */}
      <footer className="text-center py-3 text-xs text-muted-foreground border-t border-border">
        <p>Version 0.0.0.0 | All RIGHT Reserved</p>
        <p>National Forensics Sciences University Delhi Campus</p>
      </footer>
    </div>
  );
}
