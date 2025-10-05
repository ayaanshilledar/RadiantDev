"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Star, GitFork, Clock } from "lucide-react";

export default function SearchPage() {
  const [searchTopic, setSearchTopic] = useState("");
  const [minStars, setMinStars] = useState("");
  const [minIssues, setMinIssues] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    "stars" | "issues" | "recent" | null
  >(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async (e?: React.FormEvent, customPage?: number) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const params = new URLSearchParams();
      const pageToFetch = customPage || page;
      // If only topic is set, use 'q' for direct search (e.g. 'react')
      if (searchTopic && !minStars && !minIssues) {
        params.append("q", searchTopic);
      } else {
        if (searchTopic) params.append("topic", searchTopic);
        if (minStars) params.append("stars", minStars);
        if (minIssues) params.append("issues", minIssues);
      }
      params.append("page", pageToFetch.toString());
      const response = await fetch(`/api/github/search?${params.toString()}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Search failed");
      }
      setResults(data.repos || []);
      setTotalCount(data.total_count || 0);
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setResults([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Debounce searchTopic, minStars, minIssues
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    // Only search if user has typed something (not on mount)
    if (!searchTopic && !minStars && !minIssues) {
      setResults([]);
      setTotalCount(0);
      setHasSearched(false);
      return;
    }
    debounceRef.current = setTimeout(() => {
      setPage(1);
      handleSearch(undefined, 1);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTopic, minStars, minIssues]);

  // Filter badge click handlers
  const handleFilter = (type: "stars" | "issues" | "recent") => {
    setActiveFilter(type);
    setPage(1);
    if (type === "stars") {
      setMinStars("1000");
      setMinIssues("");
    } else if (type === "issues") {
      setMinIssues("10");
      setMinStars("");
    } else if (type === "recent") {
      setMinStars("");
      setMinIssues("");
    }
  };

  return (
    <section className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto mb-8">
        <Card className="border-border bg-card shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search by topic (e.g., react, machine-learning)"
                    className="pl-10 bg-background border-border"
                    value={searchTopic}
                    onChange={(e) => setSearchTopic(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Min stars"
                    className="pl-9 w-32 bg-background border-border"
                    value={minStars}
                    onChange={(e) => setMinStars(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="relative">
                  <GitFork className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Min issues"
                    className="pl-9 w-32 bg-background border-border"
                    value={minIssues}
                    onChange={(e) => setMinIssues(e.target.value)}
                    type="number"
                  />
                </div>
                <Button
                  className="bg-[#3ECF8E] hover:bg-[#2db377] text-white"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge
                variant="secondary"
                className={`cursor-pointer hover:bg-accent ${
                  activeFilter === "stars" ? "bg-accent" : ""
                }`}
                onClick={() => handleFilter("stars")}
              >
                <Star className="w-3 h-3 mr-1" /> Stars: 1000+
              </Badge>
              <Badge
                variant="secondary"
                className={`cursor-pointer hover:bg-accent ${
                  activeFilter === "issues" ? "bg-accent" : ""
                }`}
                onClick={() => handleFilter("issues")}
              >
                <GitFork className="w-3 h-3 mr-1" /> Active Issues
              </Badge>
              <Badge
                variant="secondary"
                className={`cursor-pointer hover:bg-accent ${
                  activeFilter === "recent" ? "bg-accent" : ""
                }`}
                onClick={() => handleFilter("recent")}
              >
                <Clock className="w-3 h-3 mr-1" /> Recently Updated
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className="mb-8 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive">Error: {error}</p>
          </div>
        )}
        {loading && (
          <div className="flex flex-col items-center justify-center my-12">
            <svg
              className="animate-spin h-10 w-10 text-primary mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span className="text-muted-foreground">
              Loading repositories...
            </span>
          </div>
        )}
        {!loading && hasSearched && results.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center my-12">
            <svg
              className="h-10 w-10 text-muted-foreground mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 15h8M9 9h.01M15 9h.01"
              />
            </svg>
            <span className="text-muted-foreground">
              No repositories found.
            </span>
          </div>
        )}
        {results.length > 0 && !loading && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Search Results ({results.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((repo: any) => (
                <Card
                  key={repo.url}
                  className="border-border bg-card shadow-md hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-5">
                    <div className="flex flex-col gap-2">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-primary hover:underline mb-1"
                      >
                        {repo.name}
                      </a>
                      <p className="text-muted-foreground mb-2 line-clamp-2 min-h-[40px]">
                        {repo.description}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm mt-2">
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Star className="w-3 h-3" /> {repo.stars}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <GitFork className="w-3 h-3" /> {repo.issues} issues
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Clock className="w-3 h-3" />{" "}
                          {new Date(repo.last_update).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                disabled={page === 1 || loading}
                onClick={() => {
                  setPage((p) => p - 1);
                  handleSearch(undefined, page - 1);
                }}
              >
                Previous
              </Button>
              <span className="self-center text-muted-foreground">
                Page {page} of {Math.ceil(totalCount / 20) || 1}
              </span>
              <Button
                variant="outline"
                disabled={
                  results.length < 20 ||
                  loading ||
                  page >= Math.ceil(totalCount / 20)
                }
                onClick={() => {
                  setPage((p) => p + 1);
                  handleSearch(undefined, page + 1);
                }}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
