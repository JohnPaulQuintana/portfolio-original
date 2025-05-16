import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; // Email icon

const Footer = () => {
  const name = "©2025 John Paul. All rights reserved".split(""); // Split text into individual characters

  return (
    <footer className="p-4 text-white px-4 flex flex-col items-center justify-between tablet:px-20 laptop:px-72 desktop:px-96 py-10 font-extrabold bg-white border">
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4 tracking-tighter">
        
        {name.map((char, index) => (
          <span
            key={index}
            className="text-xl pe-1 font-bold animate-colorChange"
            style={{ animationDelay: `${index * 0.2}s` }} // Delayed effect for each letter
          >
            {char}
          </span>
        ))}
       
      </div>
      <div className="flex gap-2 items-center justify-center space-x-4">
        <a
          href="https://www.facebook.com/profile.php?id=100006064309339"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faFacebook}
            size="2x"
            className="text-black hover:text-blue-800"
          />
        </a>

        <a
          href="www.linkedin.com/in/john-paul-quintana-118145287"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            size="2x"
            className="text-black hover:text-blue-800"
          />
        </a>

        <a href="mailto:jpquintana2024@gmail.com">
          <FontAwesomeIcon
            icon={faEnvelope}
            size="2x"
            className="text-black hover:text-blue-800"
          />
        </a>

        <a
          href="https://discord.com/invite/EXOUSIA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faDiscord}
            size="2x"
            className="text-black hover:text-blue-800"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
