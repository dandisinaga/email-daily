import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5050/login", { email, password });
      setMessage(res.data.message);
      localStorage.setItem("token", res.data.token); // Save JWT Token
    } catch (err) {
      setMessage(err.response.data.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login with mail.psn.co.id</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Your email (mail.psn.co.id)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
