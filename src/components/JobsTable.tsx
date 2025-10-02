import { Job } from "@/types/jobs";

export default function JobsTable({ jobs }: { jobs: Job[] }) {
    if (!jobs.length)
        return <p className="text-gray-500">No Jobs Yet -- add one.</p>;
    return (
        <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border p-2">Company</th>
                    <th className="border p-2">Title</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Link</th>
                    <th className="border p-2">Notes</th>
                    <th className="border p-2">Date Applied</th>
                </tr>
            </thead>
            <tbody>
                {jobs.map((job: Job) => (
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
                        <td className="border p-2">{job.notes}</td>
                        <td className="border p-2">{job.date_applied}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
