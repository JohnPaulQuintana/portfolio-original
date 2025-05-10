import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import Header from "./components/Header";
import SwingingCard from "./components/SwingingCard";


import Social from "./components/Social";
import Portfolio from "./components/Portfolio";
import About from "./components/About";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-black relative">
      {/* header */}
      <Header />
      <SwingingCard />
      <Social />
      <About />
      <Portfolio />
    </div>
  );
}

export default App;
