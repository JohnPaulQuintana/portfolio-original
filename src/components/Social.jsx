import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; // Email icon

const Social = () => {
  return (
    <div className="carbon-bg px-4 tablet:px-20 laptop:px-72 desktop:px-96 py-2">
      <div className="social-media bg-white py-10 rounded-sm">
        <div className="flex items-center justify-center">
          <h1 className="text-4xl font-extrabold animate-colorChange2">DEVELOPER</h1>
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
        <div className="flex justify-center w-full p-2">
          <a
            href="#"
            className="carbon-bg p-2 animate-colorChange2 rounded-sm font-bold"
          >
            Download CV
          </a>
        </div>
      </div>
    </div>
  );
};

export default Social;
