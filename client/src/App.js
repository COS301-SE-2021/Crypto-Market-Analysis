// import splash from '/public/SplashpageMedia/Splash.mp4';
import './App.css';

function App() {
  return (
      <section className="header">
      <video autoPlay loop className="video-background" muted plays-inline>
          <source src="/SplashpageMedia/Splash.mp4" type="video/mp4"/>
      </video>
      <div className="welcome-message">
          <h1>Welcome to Crypto</h1>
          <h2>Crypto is the easiest place to track cryptocurrency.</h2>
          <br/>
          <br/>
          <a href="#" className="btn btn-login">Login</a>
          <a href="#" className="btn btn-register">Sign Up</a>
      </div>
      </section>
  );
}

export default App;
