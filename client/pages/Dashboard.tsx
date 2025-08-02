import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Activity, DollarSign, Cloud } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useCryptoData, useWeatherData, useGitHubStats } from "@/hooks/useApi";
import { StatCardSkeleton, ChartCardSkeleton } from "@/components/LoadingSkeletons";

// Mock data for demonstration
const mockCryptoChartData = [
  { name: "Jan", value: 45000 },
  { name: "Feb", value: 52000 },
  { name: "Mar", value: 48000 },
  { name: "Apr", value: 61000 },
  { name: "May", value: 55000 },
  { name: "Jun", value: 67000 },
];

const mockWeatherChartData = [
  { day: "Mon", temp: 22 },
  { day: "Tue", temp: 25 },
  { day: "Wed", temp: 23 },
  { day: "Thu", temp: 27 },
  { day: "Fri", temp: 24 },
  { day: "Sat", temp: 26 },
  { day: "Sun", temp: 28 },
];

const mockGithubChartData = [
  { month: "Jan", commits: 45, issues: 12 },
  { month: "Feb", commits: 52, issues: 8 },
  { month: "Mar", commits: 48, issues: 15 },
  { month: "Apr", commits: 61, issues: 6 },
  { month: "May", commits: 55, issues: 10 },
  { month: "Jun", commits: 67, issues: 4 },
];

export default function Dashboard() {
  const { data: cryptoApiData, isLoading: cryptoLoading } = useCryptoData();
  const { data: weatherApiData, isLoading: weatherLoading } = useWeatherData();
  const { data: githubApiData, isLoading: githubLoading } = useGitHubStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here's what's happening with your data today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
        {cryptoLoading ? (
          <StatCardSkeleton />
        ) : (
          <Card className="card-container cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bitcoin Price</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${cryptoApiData?.bitcoin?.usd?.toLocaleString() || "67,234"}
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                {cryptoApiData?.bitcoin?.usd_24h_change >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={cryptoApiData?.bitcoin?.usd_24h_change >= 0 ? "text-green-500" : "text-red-500"}
                >
                  {cryptoApiData?.bitcoin?.usd_24h_change >= 0 ? "+" : ""}
                  {cryptoApiData?.bitcoin?.usd_24h_change?.toFixed(1) || "2.1"}%
                </span>
                <span>from yesterday</span>
              </div>
            </CardContent>
          </Card>
        )}

        {weatherLoading ? (
          <StatCardSkeleton />
        ) : (
          <Card className="card-container cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <Cloud className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weatherApiData?.main?.temp || 24}°C</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <span>{weatherApiData?.weather?.[0]?.description || "Partly cloudy"}</span>
                <Badge variant="secondary" className="ml-2">
                  {weatherApiData?.name || "London"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {githubLoading ? (
          <StatCardSkeleton />
        ) : (
          <Card className="card-container cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GitHub Repos</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{githubApiData?.public_repos || 156}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <span>public repositories</span>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="card-container cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GitHub Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{githubApiData?.followers?.toLocaleString() || "2,847"}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+12.5%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crypto Chart */}
        <Card className="card-container animate-slide-in-left">
          <CardHeader>
            <CardTitle>Cryptocurrency Trends</CardTitle>
            <CardDescription>Bitcoin price over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="animate-chart">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockCryptoChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Price"]} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weather Chart */}
        <Card className="card-container animate-slide-in-right">
          <CardHeader>
            <CardTitle>Weather Forecast</CardTitle>
            <CardDescription>7-day temperature outlook</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="animate-chart">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockWeatherChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}°C`, "Temperature"]} />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* GitHub Activity Chart */}
      <Card className="card-container animate-fade-in">
        <CardHeader>
          <CardTitle>GitHub Activity</CardTitle>
          <CardDescription>Monthly commits and issues overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-chart">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockGithubChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="commits" fill="#8b5cf6" name="Commits" />
                <Bar dataKey="issues" fill="#f59e0b" name="Issues" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
