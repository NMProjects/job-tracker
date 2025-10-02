"use client";
import { useState } from "react";

export default function AddJobForm() {
    const [company, setCompany] = useState("");
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("Applied");
    const [link, setLink] = useState("");
    const [notes, setNotes] = useState("");
    const [date_applied, setDate_applied] = useState(
        new Date().toISOString().split("T")[0]
    );

    return (
        <>
            <h1>Job Form</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // stops page refresh
                    console.log({
                        company,
                        title,
                        status,
                        link,
                        notes,
                        date_applied,
                    });
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
                <input type="submit" />
            </form>
        </>
    );
}
