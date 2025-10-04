import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: NextRequest) {
  try {
    const { user_id, repo_id, repo_url } = await req.json();

    if (!user_id || !repo_id || !repo_url) {
      return NextResponse.json(
        { message: "Please provide all the required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("FavRepo")
      .insert([{ user_id, repo_id, repo_url }]);

    if (error) {
      console.error(error);
      throw error;
    }

    console.log(data);

    return NextResponse.json(
      { message: "Favorites Repo added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to add Favorites Repo:", error);
    return NextResponse.json(
      { message: "Failed to add Favorites Repo" },
      { status: 500 }
    );
  }
}
