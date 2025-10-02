"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddJobForm() {
    const router = useRouter();

    const [company, setCompany] = useState("");
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("Applied");
    const [link, setLink] = useState("");
    const [notes, setNotes] = useState("");
    const [date_applied, setDate_applied] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    return (
        <>
            <h1>Job Form</h1>
            {message && (
                <div
                    style={{
                        color: error ? "red" : "green",
                        marginBottom: "1rem",
                    }}
                >
                    {message}
                </div>
            )}
            <form
                method="POST"
                onSubmit={async (e) => {
                    try {
                        const newJob = {
                            company,
                            title,
                            status,
                            link,
                            notes,
                            date_applied,
                        };
                        const res = await fetch("/api/jobs", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(newJob),
                        });

                        const data = await res.json();

                        if (data.error) {
                            setError(true);
                            setMessage("Failed to add job!");
                        } else {
                            setMessage("Job added successfully!");
                            setError(false);
                            // optional: clear form
                            setCompany("");
                            setTitle("");
                            setStatus("Applied");
                            setLink("");
                            setNotes("");
                            setDate_applied(
                                new Date().toISOString().split("T")[0]
                            );
                        }

                        setTimeout(() => {
                            setMessage("");
                        }, 3000);

                        router.refresh();
                    } catch (err) {
                        setError(true);
                        setMessage("An unexpected error occurred!" + err);
                    } finally {
                        setLoading(false);
                    }
                }}
            >
                <input
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Job Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value={"Applied"}>Applied</option>
                    <option value={"Interviewed"}>Interviewed</option>
                    <option value={"Hired"}>Hired</option>
                </select>
                <input
                    type="text"
                    placeholder="Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                <input
                    type="date"
                    value={date_applied}
                    onChange={(e) => setDate_applied(e.target.value)}
                />
                <input
                    type="submit"
                    value={loading ? "Saving..." : "Add Job"}
                    disabled={loading}
                />
            </form>
        </>
    );
}
