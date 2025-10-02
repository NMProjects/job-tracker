import { supabase } from "@/lib/supabaseClient";
import JobsTable from "@/components/JobsTable";
import AddJobForm from "@/components/AddJobForm";

export const revalidate = 0;

export default async function Home() {
    const { data: jobs, error } = await supabase
        .from("jobs")
        .select("*")
        .order("id", { ascending: false });

    if (error) console.error(error);

    return (
        <main className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">My Job Tracker</h1>
            <AddJobForm />
            <div className="mt-6">
                <JobsTable jobs={jobs ?? []} />
            </div>
        </main>
    );
}
