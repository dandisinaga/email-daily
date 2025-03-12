import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function SendEmail() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const recipientEmail = "group.nmc@psn.co.id"; // Fixed recipient email

  useEffect(() => {
    if (!localStorage.getItem("email") || !localStorage.getItem("password")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");

      await axios.post("http://localhost:5050/send-email", {
        email,
        password,
        to: recipientEmail,
        subject,
        message,
      });

      // ✅ Clear input fields
      setSubject("");
      setMessage("");

      // ✅ Show success message
      setStatus("✅ Email sent successfully!");

      // ✅ Hide success message after 3 seconds
      setTimeout(() => setStatus(""), 3000);
    } catch (err) {
      setStatus("❌ Failed to send email.");
      console.error("Email sending error:", err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg w-50">
        <h2 className="text-center">Daily Activity</h2>
        {status && <div className="alert alert-success text-center">{status}</div>}
        <form onSubmit={handleSendEmail}>
          <div className="mb-3">
            <label className="form-label">Recipient Email</label>
            <input type="email" className="form-control" value={recipientEmail} readOnly />
          </div>
          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input
              type="text"
              className="form-control"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Send Email</button>
          <button className="btn btn-danger w-100 mt-3" onClick={() => navigate("/logout")}>Logout</button>
        </form>
      </div>
    </div>
  );
}

export default SendEmail;
