import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, GitBranch, GitCommit, GitPullRequest, Star, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

// Mock GitHub data
const userStats = {
  username: "johndoe",
  name: "John Doe",
  followers: 1234,
  following: 567,
  publicRepos: 89,
  totalStars: 2456,
  totalCommits: 1567,
  currentStreak: 15,
};

const repositories = [
  { name: "awesome-dashboard", language: "TypeScript", stars: 156, forks: 23, updated: "2 hours ago" },
  { name: "react-components", language: "JavaScript", stars: 89, forks: 12, updated: "1 day ago" },
  { name: "api-server", language: "Node.js", stars: 45, forks: 8, updated: "3 days ago" },
  { name: "mobile-app", language: "React Native", stars: 78, forks: 15, updated: "1 week ago" },
];

const commitData = [
  { month: "Jan", commits: 45, issues: 12, prs: 8 },
  { month: "Feb", commits: 52, issues: 8, prs: 10 },
  { month: "Mar", commits: 48, issues: 15, prs: 6 },
  { month: "Apr", commits: 61, issues: 6, prs: 12 },
  { month: "May", commits: 55, issues: 10, prs: 9 },
  { month: "Jun", commits: 67, issues: 4, prs: 14 },
];

const languageData = [
  { language: "TypeScript", percentage: 35, color: "#3178c6" },
  { language: "JavaScript", percentage: 28, color: "#f7df1e" },
  { language: "Python", percentage: 20, color: "#3776ab" },
  { language: "CSS", percentage: 12, color: "#1572b6" },
  { language: "Other", percentage: 5, color: "#6b7280" },
];

export default function GitHub() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">GitHub Stats</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your GitHub activity and repository statistics
          </p>
        </div>
        <Button>
          <Github className="mr-2 h-4 w-4" />
          Connect GitHub
        </Button>
      </div>

      {/* User Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Repositories</CardTitle>
            <Github className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.publicRepos}</div>
            <p className="text-xs text-muted-foreground">Public repositories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stars</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalStars.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all repositories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commits</CardTitle>
            <GitCommit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalCommits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.currentStreak}</div>
            <p className="text-xs text-muted-foreground">Days in a row</p>
          </CardContent>
        </Card>
      </div>

      {/* Repository List */}
      <Card>
        <CardHeader>
          <CardTitle>Top Repositories</CardTitle>
          <CardDescription>Your most starred repositories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {repositories.map((repo, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{repo.name}</h3>
                    <Badge variant="outline">{repo.language}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Updated {repo.updated}</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitBranch className="h-4 w-4" />
                    <span>{repo.forks}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
            <CardDescription>Commits, issues, and pull requests</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={commitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="commits" fill="#8b5cf6" name="Commits" />
                <Bar dataKey="issues" fill="#f59e0b" name="Issues" />
                <Bar dataKey="prs" fill="#10b981" name="Pull Requests" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Language Usage</CardTitle>
            <CardDescription>Programming languages distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {languageData.map((lang, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-sm font-medium">{lang.language}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          backgroundColor: lang.color, 
                          width: `${lang.percentage}%` 
                        }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{lang.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
