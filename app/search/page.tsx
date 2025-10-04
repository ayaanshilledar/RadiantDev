'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SearchPage() {
  const [topic, setTopic] = useState('');
  const [stars, setStars] = useState('');
  const [issues, setIssues] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      if (topic) params.append('topic', topic);
      if (stars) params.append('stars', stars);
      if (issues) params.append('issues', issues);
      
      const response = await fetch(`/api/github/search?${params.toString()}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }
      
      setResults(data.repos || []);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">GitHub Repository Search</h1>
        
        <form onSubmit={handleSearch} className="mb-8 p-6 bg-card rounded-lg border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium mb-1">Topic</label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., react, javascript"
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="stars" className="block text-sm font-medium mb-1">Minimum Stars</label>
              <Input
                id="stars"
                type="number"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                placeholder="e.g., 100"
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="issues" className="block text-sm font-medium mb-1">Minimum Open Issues</label>
              <Input
                id="issues"
                type="number"
                value={issues}
                onChange={(e) => setIssues(e.target.value)}
                placeholder="e.g., 5"
                className="w-full"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Searching...' : 'Search Repositories'}
          </Button>
        </form>
        
        {error && (
          <div className="mb-8 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive">Error: {error}</p>
          </div>
        )}
        
        {results.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Search Results ({results.length})</h2>
            <div className="grid grid-cols-1 gap-4">
              {results.map((repo: any) => (
                <div key={repo.url} className="p-4 bg-card border border-border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">
                    <a 
                      href={repo.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {repo.name}
                    </a>
                  </h3>
                  <p className="text-muted-foreground mb-3">{repo.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center">
                      <span className="mr-1">⭐</span>
                      {repo.stars} stars
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">⚠️</span>
                      {repo.issues} open issues
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">⏱️</span>
                      Updated: {new Date(repo.last_update).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}