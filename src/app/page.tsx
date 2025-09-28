import { supabase } from "@/lib/supabaseClient";

export default async function Home() {
    const { data: jobs, error } = await supabase.from("jobs").select("*");

    console.log("JOBS:", jobs);
    console.log("ERROR:", error);

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Job Tracker</h1>
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Company</th>
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Link</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs?.map((job: any) => (
                        <tr key={job.id}>
                            <td className="border p-2">{job.company}</td>
                            <td className="border p-2">{job.title}</td>
                            <td className="border p-2">{job.status}</td>
                            <td className="border p-2">
                                <a
                                    href={job.link}
                                    className="text-blue-600 underline"
                                    target="_blank"
                                >
                                    View
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
