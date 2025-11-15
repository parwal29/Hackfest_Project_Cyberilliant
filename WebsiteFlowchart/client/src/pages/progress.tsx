import { useQuery } from "@tanstack/react-query";
import { Trophy, Star, Target, Zap, Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Achievement, User } from "@shared/schema";

export default function ProgressPage() {
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user/current"],
  });

  const { data: achievements = [] } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

  return (
    <div className="p-6 space-y-6">
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/20 to-pink-500/20 border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold" data-testid="text-user-level">{user?.level || 1}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/20 to-blue-500/20 border-accent/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="w-4 h-4" />
              Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent" data-testid="text-user-points">{user?.points || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-chart-3/20 to-pink-400/20 border-chart-3/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="w-4 h-4" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-chart-3" data-testid="text-achievements-count">{achievements.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-chart-4/20 to-green-400/20 border-chart-4/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-chart-4" data-testid="text-user-rank">#12</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress to Next Level */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Progress to Level {(user?.level || 1) + 1}</span>
            <Badge variant="secondary">{user?.points || 0} / {((user?.level || 1) + 1) * 1000} XP</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={((user?.points || 0) % 1000) / 10} className="h-3" />
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.length > 0 ? (
              achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 hover-elevate transition-all"
                  data-testid={`achievement-${achievement.id}`}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{achievement.description}</p>
                    <Badge variant="secondary" className="mt-2">
                      <Zap className="w-3 h-3 mr-1" />
                      +{achievement.points} XP
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No achievements unlocked yet</p>
                <p className="text-sm mt-1">Complete tasks to earn rewards!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
