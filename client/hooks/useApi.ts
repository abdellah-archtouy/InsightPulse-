import { useQuery } from "@tanstack/react-query";

// CoinGecko API for cryptocurrency data
export function useCryptoData() {
  return useQuery({
    queryKey: ["crypto"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,polkadot&vs_currencies=usd&include_24hr_change=true"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch crypto data");
      }
      return response.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 25000,
  });
}

// OpenWeatherMap API (requires API key)
export function useWeatherData(city = "Marrakesh") {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: async () => {
      // Note: In a real app, you'd need to add your OpenWeatherMap API key
      // For demo purposes, we'll return mock data
      return {
        main: {
          temp: 37,
          humidity: 40,
        },
        weather: [
          {
            main: "Clouds",
            description: "partly cloudy",
          },
        ],
        wind: {
          speed: 12,
        },
        visibility: 10000,
        name: city,
      };
    },
    refetchInterval: 300000, // Refetch every 5 minutes
    staleTime: 240000,
  });
}

// GitHub API for user stats
export function useGitHubStats(username = "octocat") {
  return useQuery({
    queryKey: ["github", username],
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("Failed to fetch GitHub data");
      }
      return response.json();
    },
    refetchInterval: 600000, // Refetch every 10 minutes
    staleTime: 540000,
  });
}

// GitHub repositories
export function useGitHubRepos(username = "octocat") {
  return useQuery({
    queryKey: ["github-repos", username],
    queryFn: async () => {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch GitHub repos");
      }
      return response.json();
    },
    refetchInterval: 600000,
    staleTime: 540000,
  });
}
