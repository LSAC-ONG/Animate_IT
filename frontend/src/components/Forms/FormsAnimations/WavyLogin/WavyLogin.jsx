import './WavyLogin.css';

function WavyLogin() {
  return (
    <div className="signin-container" onClick={() => {}}>
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="center">
        <h2>Please Sign In</h2>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <h2>&nbsp;</h2>
      </div>
    </div>
  );
}

export default WavyLogin;