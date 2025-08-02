import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-20 mb-2" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  );
}

export function ChartCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-60" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  );
}

export function CryptoCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <Skeleton className="h-4 w-16 mb-1" />
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="h-6 w-6" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-24 mb-2" />
        <div className="flex items-center space-x-1">
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-6" />
        </div>
      </CardContent>
    </Card>
  );
}

export function RepositoryCardSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-3 w-8" />
        </div>
        <div className="flex items-center space-x-1">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-3 w-6" />
        </div>
      </div>
    </div>
  );
}

export function WeatherForecastSkeleton() {
  return (
    <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
      <Skeleton className="h-4 w-16 mx-auto mb-2" />
      <Skeleton className="h-8 w-8 mx-auto mb-2" />
      <Skeleton className="h-3 w-20 mx-auto mb-2" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-8 mx-auto" />
        <Skeleton className="h-3 w-6 mx-auto" />
      </div>
    </div>
  );
}
