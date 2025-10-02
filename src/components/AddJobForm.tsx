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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    function validate() {
        const newErrors: { [key: string]: string } = {};

        if (!company.trim()) newErrors.company = "Company is required";
        if (!title.trim()) newErrors.title = "Title is required";
        if (!link.trim()) newErrors.link = "Link is required";

        try {
            new URL(link);
        } catch {
            if (link.trim()) newErrors.link = "Link must be a valid URL";
        }

        if (date_applied) {
            const selectedDate = new Date(date_applied);
            const today = new Date();

            selectedDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            if (selectedDate > today) {
                newErrors.date_applied = "Date cannot be in the future";
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    return (
        <>
            <h2>Job Form</h2>
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
                        e.preventDefault();
                        setLoading(true);

                        if (!validate()) {
                            setMessage("Please fix errors before submitting");
                            setError(true);
                            return;
                        }

                        setError(false);
                        setMessage("");

                        const newJob = {
                            company: company.trim(),
                            title: title.trim(),
                            status,
                            link: link.trim(),
                            notes: notes.trim(),
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

                            setCompany("");
                            setTitle("");
                            setStatus("Applied");
                            setLink("");
                            setNotes("");
                            setDate_applied(
                                new Date().toISOString().split("T")[0]
                            );
                        }

                        router.refresh();
                    } catch (err) {
                        setError(true);
                        setMessage("An unexpected error occurred!" + err);
                    } finally {
                        setLoading(false);
                        setTimeout(
                            () => {
                                setMessage("");
                                setError(false);
                            },
                            error ? 5000 : 3000
                        );
                    }
                }}
            >
                <input
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                {errors.company && (
                    <div style={{ color: "red" }}>{errors.company}</div>
                )}
                <input
                    type="text"
                    placeholder="Job Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && (
                    <div style={{ color: "red" }}>{errors.title}</div>
                )}
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
                {errors.link && (
                    <div style={{ color: "red" }}>{errors.link}</div>
                )}
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
                {errors.date_applied && (
                    <div style={{ color: "red" }}>{errors.date_applied}</div>
                )}
                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Add Job"}
                </button>
            </form>
        </>
    );
}
