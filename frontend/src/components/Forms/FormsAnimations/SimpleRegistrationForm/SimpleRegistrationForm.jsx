import './SimpleRegistrationForm.css';

function SimpleRegistrationForm() {
  return (
     <div className="login-container">
      <form className="login">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button disabled>Login</button>
      </form>
    </div>
  );
}

export default SimpleRegistrationForm;