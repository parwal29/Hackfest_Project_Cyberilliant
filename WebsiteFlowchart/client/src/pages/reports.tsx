import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Phone, Target, DollarSign, Clock } from "lucide-react";
import type { DashboardStats } from "@shared/schema";

export default function ReportsPage() {
  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["/api/stats"],
  });

  const reports = [
    {
      title: "Total Leads",
      value: stats?.totalLeads || 0,
      icon: Users,
      trend: "+12%",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Qualified Leads",
      value: stats?.qualifiedLeads || 0,
      icon: Target,
      trend: "+8%",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Total Calls",
      value: stats?.totalCalls || 0,
      icon: Phone,
      trend: "+15%",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Avg Call Duration",
      value: `${stats?.avgCallDuration || 0}m`,
      icon: Clock,
      trend: "+5%",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Conversion Rate",
      value: `${stats?.conversionRate || 0}%`,
      icon: TrendingUp,
      trend: "+3%",
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Revenue Impact",
      value: "$0",
      icon: DollarSign,
      trend: "+0%",
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <p className="text-sm text-muted-foreground">Track your performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <Card key={report.title} className="hover-elevate transition-all" data-testid={`card-${report.title.toLowerCase().replace(/\s+/g, '-')}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{report.title}</CardTitle>
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${report.color} flex items-center justify-center`}>
                <report.icon className="w-5 h-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold">{report.value}</p>
                <span className="text-sm text-green-500">{report.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Charts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <p>Charts and detailed analytics will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
