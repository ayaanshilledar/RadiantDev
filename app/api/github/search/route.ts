import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const topic = searchParams.get("topic") || "";
  const stars = searchParams.get("stars") || "";
  const issues = searchParams.get("issues") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  let query = q;
  if (!query) {
    if (topic) query += `topic:${topic} `;
    if (stars) query += `stars:>=${stars} `;
    if (issues) query += `issues:>=${issues} `;
    query = query.trim() || "stars:>1000";
  }

  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
    query
  )}&sort=stars&order=desc&per_page=20&page=${page}`;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "RadiantDev-App",
      },
    });
    if (!res.ok) {
      return NextResponse.json({ error: "GitHub API error" }, { status: 500 });
    }
    const data = await res.json();
    const repos = (data.items || []).map((repo: any) => ({
      name: repo.full_name,
      url: repo.html_url,
      description: repo.description,
      stars: repo.stargazers_count,
      issues: repo.open_issues_count,
      last_update: repo.updated_at,
    }));
    return NextResponse.json({ repos, total_count: data.total_count });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch from GitHub" },
      { status: 500 }
    );
  }
}
