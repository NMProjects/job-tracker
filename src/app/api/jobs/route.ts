import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
    const body = await req.json();

    const { company, title, status, link, notes, date_applied } = body;

    const { data, error } = await supabase
        .from("jobs")
        .insert([{ company, title, status, link, notes, date_applied }])
        .select();

    if (error) {
        console.error("Supabase Insert Error:", error);
        return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, data }), {
        status: 200,
    });
}

export async function GET(req: Request) {}
