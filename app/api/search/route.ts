import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError } from 'zod';

//Supabase for cilent creating
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

//Github API Key
const GithubToken = process.env.GITHUB_TOKEN;

// validation for query
const querySchema = z.object({
  topic: z.string().min(1),
  stars: z.string().optional().transform(val => val ? parseInt(val) : undefined),
  issues: z.string().optional().transform(val => val ? parseInt(val) : undefined),
});

export async function GET(req: NextRequest) {
 //TODO: Help me get the user id using session/oauth
  
  const { searchParams } = new URL(req.url);
  const params = {
    topic: searchParams.get('topic') ?? '',
    stars: searchParams.get('stars') ?? undefined,
    issues: searchParams.get('issues') ?? undefined,
  };

  try {
    const query = querySchema.parse(params);
    //encoded the query and url for Github REGEX
    const searchTerm = [
      `topic:${query.topic}`,
      'is:public',
      'archived:false',
      query.stars !== undefined ? `stars:>${query.stars}` : '',
      query.issues !== undefined ? `open_issues:>${query.issues}` : ''
    ].filter(Boolean).join(' ');


    const encodedUrl = encodeURIComponent(searchTerm);
    const finalUrl = `https://api.github.com/search/repositories?q=${encodedUrl}`;

    //Fetching the finalurl
    const response = await fetch(finalUrl, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${GithubToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
      }
    });
    
    //Rate limiting so user cannot request continously
    if (!response.ok) {
      if (response.status === 429) {
        const resetTime = response.headers.get('X-RateLimit-Reset');
        const retryAfter = response.headers.get('Retry-After');

        return NextResponse.json({
          Error: 'GitHub API rate limit exceeded',
          Message: 'Too many requests. Please try again later.',
          ResetTime: resetTime ? new Date(parseInt(resetTime) * 1000).toISOString() : null,
          RetryAfter: retryAfter ? `${retryAfter} seconds` : null
        }, { status: 429 });
      }

      const errorText = await response.text();
      return NextResponse.json({
        Error: `GitHub API error: ${response.status}`,
        Message: response.statusText,
        Details: errorText
      }, { status: response.status });
    }

    const data = await response.json();

    // Map repos from API response
    const repos = data.items.map((repo: any) => ({
      name: repo.full_name,
      url: repo.html_url,
      description: repo.description,
      stars: repo.stargazers_count,
      issues: repo.open_issues_count,
      last_update: repo.pushed_at,
    }));

    // Insert repos into Supabase table 'SearchQuery'
    const { error: supabaseError } = await supabase.from('SearchQuery').insert(repos);

    if (supabaseError) {
      return NextResponse.json({
        Error: 'Failed to save data in Supabase',
        Details: supabaseError.message
      }, { status: 500 });
    }

    return NextResponse.json({ repos });

  } catch (error: any) {
    console.error('Error:', error);
    if (error instanceof ZodError) {
      return NextResponse.json({
        Error: 'Invalid query parameters',
        Details: error.issues
      }, { status: 400 });
    }
    return NextResponse.json({
      Error: 'Query parse failed or API error',
      Details: error.message
    }, { status: 500 });
  }
}
