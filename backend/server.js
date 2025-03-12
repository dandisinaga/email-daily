const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const HOST = "192.168.4.117"; // Change this to your actual IP
const PORT = 4000;

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/send-email", async (req, res) => {
  const { email, password, to, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "mail.psn.co.id",
      port: 587,
      secure: false,
      auth: { user: email, pass: password },
    });

    await transporter.sendMail({
      from: email,
      to,
      subject,
      text: message,
    });

    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ message: "Failed to send email", error });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});