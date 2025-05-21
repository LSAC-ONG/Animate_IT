import './SignupModal.css';

function SignupModal() {
  return (
    <div className="signup-modal">
      <form className="signup-form">
        <h2>Sign Up</h2>
        <div className="input-box">
          <input type="text" required />
          <label>Username</label>
        </div>
        <div className="input-box">
          <input type="email" required />
          <label>Email</label>
        </div>
        <div className="input-box">
          <input type="password" required />
          <label>Password</label>
        </div>
        <button type="submit" className="btn">Create Account</button>
      </form>
      {Array.from({ length: 50 }, (_, i) => (
        <span key={i} style={{ "--i": i }} />
      ))}
    </div>
  );
}

export default SignupModal;