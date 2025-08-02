import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bitcoin, TrendingUp, TrendingDown, MoreVertical } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock cryptocurrency data
const cryptos = [
  { id: 1, name: "Bitcoin", symbol: "BTC", price: 67234, change: 2.1, positive: true },
  { id: 2, name: "Ethereum", symbol: "ETH", price: 3456, change: -1.2, positive: false },
  { id: 3, name: "Cardano", symbol: "ADA", price: 0.52, change: 5.4, positive: true },
  { id: 4, name: "Polkadot", symbol: "DOT", price: 7.23, change: -0.8, positive: false },
];

const chartData = [
  { time: "00:00", BTC: 65000, ETH: 3200, ADA: 0.48 },
  { time: "04:00", BTC: 66500, ETH: 3350, ADA: 0.49 },
  { time: "08:00", BTC: 67234, ETH: 3456, ADA: 0.52 },
  { time: "12:00", BTC: 66800, ETH: 3400, ADA: 0.51 },
  { time: "16:00", BTC: 67100, ETH: 3420, ADA: 0.52 },
  { time: "20:00", BTC: 67234, ETH: 3456, ADA: 0.52 },
];

export default function Crypto() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cryptocurrency</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track real-time cryptocurrency prices and market trends
          </p>
        </div>
        <Button>
          <Bitcoin className="mr-2 h-4 w-4" />
          Add to Watchlist
        </Button>
      </div>

      {/* Crypto Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cryptos.map((crypto) => (
          <Card key={crypto.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-sm font-medium">{crypto.name}</CardTitle>
                <Badge variant="outline" className="mt-1">
                  {crypto.symbol}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${crypto.price.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1 text-xs">
                {crypto.positive ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={crypto.positive ? "text-green-500" : "text-red-500"}>
                  {crypto.positive ? "+" : ""}{crypto.change}%
                </span>
                <span className="text-muted-foreground">24h</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Price Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Price Chart</CardTitle>
          <CardDescription>24-hour price movements</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="BTC" stroke="#f7931a" strokeWidth={2} name="Bitcoin" />
              <Line type="monotone" dataKey="ETH" stroke="#627eea" strokeWidth={2} name="Ethereum" />
              <Line type="monotone" dataKey="ADA" stroke="#0033ad" strokeWidth={2} name="Cardano" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
