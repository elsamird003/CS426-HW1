import './App.css'
import logo from '../public/sm_5afb13ab8b839.jpg'
//import CarbonChart from './components/chart';
function App() {
  return (
      <>
      <div className="top-nav">

        <ul>
        <img src={logo} alt='Logo' className="logo"/>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
       
        </ul>
      </div>
      <div className="title">
      <h1>Carbon Tracker</h1>
      </div>
     
     
    </>
  );
}

export default App;
