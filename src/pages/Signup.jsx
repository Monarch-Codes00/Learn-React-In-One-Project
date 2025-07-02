import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { login } = useUserContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState(null);

  const isValidAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 16;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password.trim() || !dob) {
      setError("Please fill in all fields");
      return;
    }
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!isValidAge(dob)) {
      setError("You must be at least 16 years old to sign up");
      return;
    }
    // Simulate signup success
    login({ username, email, dob });
    navigate("/profile");
  };

  return (
    <div className="auth-container" style={{ width: "500px", margin: "0 auto", height:"500px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <h2 style={{marginLeft:"-30px" ,marginBottom:'30px'}}>Sign Up Here</h2>
      {error && <div className="error-message" style={{color: "red", marginBottom: "10px"}}>{error}</div>}
      <form onSubmit={handleSubmit} className="auth-form" style={{width: "100%"}}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          style={{width: "80%", padding: "10px", marginBottom: "10px", marginLeft:'50px'}}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          style={{width: "80%", padding: "10px", marginBottom: "10px", marginLeft:'50px'}}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          style={{width: "80%", padding: "10px", marginBottom: "10px", marginLeft:'50px'}}
        />
        <label htmlFor="dob" style={{marginLeft:'50px', color: 'white'}}>Date of Birth (You must be at least 16 years old)</label>
        <input
          type="date"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          style={{width: "80%", padding: "10px", marginBottom: "20px", marginLeft:'50px'}}
        />
        <button type="submit" style={{width:'30%',marginLeft:'160px'}}>Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
