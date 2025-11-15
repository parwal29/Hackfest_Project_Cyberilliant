import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface LeadScoreWidgetProps {
  score: number;
  change?: number;
}

export function LeadScoreWidget({ score, change }: LeadScoreWidgetProps) {
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card 
      className="bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border-accent/30 overflow-visible" 
      data-testid="card-lead-score"
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Lead SCORE</CardTitle>
          {change !== undefined && (
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">+{change}%</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pb-6 pt-4">
        <div className="relative w-44 h-44">
          <svg 
            className="w-full h-full -rotate-90" 
            viewBox="0 0 160 160"
            aria-label={`Lead score: ${score}%`}
          >
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              className="text-muted/10"
            />
            {/* Progress circle with gradient */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#leadScoreGradient)"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
            />
            <defs>
              <linearGradient id="leadScoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(280 85% 65%)" />
                <stop offset="50%" stopColor="hsl(305 80% 65%)" />
                <stop offset="100%" stopColor="hsl(330 75% 65%)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold bg-gradient-to-br from-primary to-pink-500 bg-clip-text text-transparent" data-testid="text-score-percentage">
              {score}%
            </span>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground uppercase tracking-wide font-medium">
          Average Lead Quality
        </p>
      </CardContent>
    </Card>
  );
}
