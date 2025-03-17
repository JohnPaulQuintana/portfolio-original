import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import SwingingCard from "./components/SwingingCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; // Email icon

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-background relative">
      {/* header */}
      <Header />
      <SwingingCard />
      <div className="social-media border">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-600">DEVELOPER</h1>
        </div>
        <div className="flex gap-2 items-center justify-center space-x-4 mt-2">
          <a
            href="https://facebook.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              size="2x"
              className="text-blue-600 hover:text-blue-800"
            />
          </a>

          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              size="2x"
              className="text-blue-500 hover:text-blue-700"
            />
          </a>

          <a href="mailto:your.email@example.com">
            <FontAwesomeIcon
              icon={faEnvelope}
              size="2x"
              className="text-gray-600 hover:text-gray-800"
            />
          </a>

          <a
            href="https://discord.com/invite/yourserver"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faDiscord}
              size="2x"
              className="text-indigo-600 hover:text-indigo-800"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
