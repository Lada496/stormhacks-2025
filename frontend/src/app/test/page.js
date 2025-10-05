"use client";
import { useState } from "react";

export default function Home() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const callAgent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/call-resume-analyzer-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription }),
      });
      const data = await res.json();
      setResponse(data.response || data.error);
      console.log({ data });
    } catch (err) {
      setResponse("Error calling agent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Resume Evaluator</h1>

      <label className="block mb-2">Resume:</label>
      <textarea
        className="w-full h-32 border p-2 mb-4"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <label className="block mb-2">Job Description:</label>
      <textarea
        className="w-full h-32 border p-2 mb-4"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={callAgent}
      >
        {loading ? "Loading..." : "Evaluate"}
      </button>

      <div className="mt-4 p-2 border whitespace-pre-wrap">{response}</div>
    </div>
  );
}
