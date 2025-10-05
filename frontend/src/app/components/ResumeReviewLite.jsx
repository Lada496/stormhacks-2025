"use client";
import { useState } from "react";
import RRLCSS from './ResumeReviewLiteCSS.css'

const ResumeReviewLite = () => {

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
  
    return(
        <div style={styles.container}>
            <h3 style={styles.subHeader}>Upload your resume for AI-powered feedback!</h3>
            <form style={styles.submitForm} onSubmit={(e) => callAgent}>
                <textarea style={styles.textarea}
                    placeholder="Paste your resume here..."
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                ></textarea>
                <textarea style={styles.textarea}
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                />
                <button className="btn" type="submit">
                    Submit!
                </button>
            </form>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh', // Centralize vertically
        padding: '50px',
        backgroundColor: '#1a1a2e',
        borderRadius: '15px', // Rounded border
        border: '5px solid rgb(73, 181, 221)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle shadow
        width: '100%', // Responsive width
        maxWidth: '800px', // Limit the maximum width
        margin: '0 auto', // Center horizontally
    },
    subHeader: {
        fontSize: '3rem',
        textAlign: 'center',
        margin: '10px',
        padding: '15px',
        color: '#ffffff',
    },
    textarea: {
        width: '100%',
        height: '200px', // Make the input forms bigger
        padding: '15px',
        margin: '20px',
        fontSize: '1.2rem',
        borderRadius: '10px',
        border: '5px solid #cccccc',
        backgroundColor: '#1e1e1e',
        color: '#ffffff',
        marginBottom: '15px', // Add spacing between inputs
    },
    submitForm: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',   
    },
}

export default ResumeReviewLite;

