"use client";
import { useState, useEffect } from "react";
import ResultView from "./ResultView";
import styles from "./ResumeReviewLite.module.css";

const ResumeReviewLite = ({ setUserStats }) => {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const callAgent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/call-resume-analyzer-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      console.log({ data });
      setResponse(data);
      setUserStats((prev) => ({
        ...prev,
        xp: data.overallScore || 0,
      }));
      setShow(true);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <p>Something went wrong!</p>}
      {show && !loading ? (
        <ResultView response={response} />
      ) : (
        <div className={styles.container}>
          <h3 className={styles.subHeader}>
            Upload your resume for AI-powered feedback!
          </h3>
          <form className={styles.submitForm} onSubmit={callAgent}>
            <textarea
              className={styles.textarea}
              placeholder="Paste your resume here..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            ></textarea>
            <textarea
              className={styles.textarea}
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <button
              className={styles.btn}
              type="submit"
              disabled={!jobDescription || !resume}
            >
              {loading ? "Loading..." : "Submit!"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ResumeReviewLite;
