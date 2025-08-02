import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye, Thermometer } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// Mock weather data
const currentWeather = {
  location: "London, UK",
  temperature: 24,
  condition: "Partly Cloudy",
  humidity: 65,
  windSpeed: 12,
  visibility: 10,
  uvIndex: 6,
};

const forecast = [
  { day: "Today", high: 24, low: 16, condition: "Partly Cloudy", icon: Cloud },
  { day: "Tomorrow", high: 26, low: 18, condition: "Sunny", icon: Sun },
  { day: "Wednesday", high: 22, low: 14, condition: "Rainy", icon: CloudRain },
  { day: "Thursday", high: 25, low: 17, condition: "Sunny", icon: Sun },
  { day: "Friday", high: 23, low: 15, condition: "Cloudy", icon: Cloud },
];

const hourlyData = [
  { time: "00:00", temp: 18, humidity: 70 },
  { time: "03:00", temp: 16, humidity: 75 },
  { time: "06:00", temp: 17, humidity: 72 },
  { time: "09:00", temp: 20, humidity: 68 },
  { time: "12:00", temp: 24, humidity: 65 },
  { time: "15:00", temp: 26, humidity: 60 },
  { time: "18:00", temp: 25, humidity: 62 },
  { time: "21:00", temp: 22, humidity: 66 },
];

export default function Weather() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Weather</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Current weather conditions and forecasts
          </p>
        </div>
        <Button>
          <Cloud className="mr-2 h-4 w-4" />
          Change Location
        </Button>
      </div>

      {/* Current Weather */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cloud className="h-5 w-5" />
            <span>Current Weather</span>
          </CardTitle>
          <CardDescription>{currentWeather.location}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Temperature</p>
              <p className="text-3xl font-bold">{currentWeather.temperature}°C</p>
              <Badge variant="secondary">{currentWeather.condition}</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <p className="text-sm text-muted-foreground">Humidity</p>
              </div>
              <p className="text-2xl font-semibold">{currentWeather.humidity}%</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Wind className="h-4 w-4 text-gray-500" />
                <p className="text-sm text-muted-foreground">Wind Speed</p>
              </div>
              <p className="text-2xl font-semibold">{currentWeather.windSpeed} km/h</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-green-500" />
                <p className="text-sm text-muted-foreground">Visibility</p>
              </div>
              <p className="text-2xl font-semibold">{currentWeather.visibility} km</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
          <CardDescription>Extended weather outlook</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                <p className="font-medium text-sm">{day.day}</p>
                <day.icon className="h-8 w-8 mx-auto my-2 text-blue-500" />
                <p className="text-xs text-muted-foreground mb-2">{day.condition}</p>
                <div className="space-y-1">
                  <p className="font-semibold">{day.high}°</p>
                  <p className="text-sm text-muted-foreground">{day.low}°</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hourly Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hourly Temperature</CardTitle>
            <CardDescription>Temperature changes throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Humidity Levels</CardTitle>
            <CardDescription>Humidity percentage throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, "Humidity"]} />
                <Bar dataKey="humidity" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
