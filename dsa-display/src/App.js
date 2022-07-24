import logo from './logo.svg';
import './App.css'
import { Routes, Route } from "react-router-dom";
import HuffmanCompTree from './components/HuffmanCompTree';

function App() {
  return (
    <>

    {/* // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a 
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div> */}
    <Routes>
    <Route
      exact
      path="/"
      element={<HuffmanCompTree/>}
    />
    </Routes>

  </>  
  );
}

export default App;
