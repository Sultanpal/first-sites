import { useState, Suspense} from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

// const Home = lazy(() => import('./Home')); // Lazy-loaded component

function App() {
  return (
    <BrowserRouter>
      <div>
        <Bar name={"Balinder"} />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<div><Enter /></div>} />
          <Route path="/home" element={<Home price={"$50000"}/>} />

          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function NavigateButton() {
  const navigate = useNavigate();

  return (
    <div className='setBAR'>
      <div>
        <button onClick={() => navigate("/home")}>Home</button>
      </div>
      <div>
        <button onClick={() => navigate("/about")}>About</button>
      </div>
      <div>
        <button onClick={() => navigate("/contact")}>Contact</button>
      </div>
    </div>
  );
}

function Bar(prop) {
  return (
    <div className='navBar'>
      <div>Payment APP</div>
      <div className=''><NavigateButton /></div>
      <div className='navBar2'>
        <div>Hello, {prop.name}</div>
        <div className='profile'>U</div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className='footer'>Thanks for giving your love</div>
  );
}
function Home(prop) {
  return (
    <div>
      <div>Your Current Balance: {prop.price} <hr /></div>
      <div><ContactList /></div>
    </div>
  );
}


function Signup(){
  return(
    <div className='loginbtn'>signup</div>
  )
}
function Login(){
  return(
    <div className='loginbtn'>login</div>
  )
}
function Enter() {
  const [userfirstname, setuserfirstname] = useState('');
  const [userlastname, setuserlastname] = useState('');
  const [gmailId, setgmailId] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { userfirstname, userlastname, gmailId, password };

    try {
      const response = await fetch('http://localhost:8080/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate('/home');
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>Welcome Sir, Are You Ready to Login.</div>
      <div>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder='Enter Your First Name' 
            value={userfirstname}
            onChange={(e) => setuserfirstname(e.target.value)}
          />
          <input 
            type="text" 
            placeholder='Enter Your Last Name' 
            value={userlastname}
            onChange={(e) => setuserlastname(e.target.value)}
          />
          <input 
            type="email" 
            placeholder='Enter Your Email' 
            value={gmailId}
            onChange={(e) => setgmailId(e.target.value)}
          />
          <input 
            type="password" 
            placeholder='Enter Your Password' 
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button type="submit" className='loginbtn'>Sign Up</button>
          {/* <Signup/>
          <Login/> */}
        </form>
      </div>
    </div>
  );
}

export default App;
