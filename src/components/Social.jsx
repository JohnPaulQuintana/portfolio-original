import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; // Email icon

const Social = () => {
   const [showModal, setShowModal] = useState(false);
  return (
    <div className="carbon-bg px-4 tablet:px-20 laptop:px-72 desktop:px-96 py-2 flex justify-center">
      <div className="social-media w-full bg-white wide:w-[60%] py-10 rounded-sm">
        <div className="flex items-center justify-center">
          <h1 className="text-4xl font-extrabold animate-colorChange2">DEVELOPER</h1>
        </div>
        <div className="flex gap-2 items-center justify-center space-x-4 mt-2">
          <a
            href="https://www.facebook.com/profile.php?id=100006064309339"
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
            href="www.linkedin.com/in/john-paul-quintana-118145287"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              size="2x"
              className="text-blue-500 hover:text-blue-700"
            />
          </a>

          <a href="mailto:jpquintana2024@gmail.com">
            <FontAwesomeIcon
              icon={faEnvelope}
              size="2x"
              className="text-gray-600 hover:text-gray-800"
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
              className="text-indigo-600 hover:text-indigo-800"
            />
          </a>
        </div>
        <div className="flex gap-2 justify-center w-full p-2">
          <button
            onClick={() => setShowModal(true)}
            className="carbon-bg p-2 animate-colorChange2 rounded-sm font-bold"
          >
            View CV
          </button>
          <a
            href="/cv/jpquintana.pdf"
            download
            className="carbon-bg p-2 animate-colorChange2 rounded-sm font-bold"
          >
            Download CV
          </a>
        </div>

      </div>

      {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 p-4 rounded shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl font-bold"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-2">JOHN PAUL Y. QUINTANA</h2>
              <iframe
                src="/cv/jpquintana.pdf"
                width="100%"
                height="500px"
                className="border"
                title="CV PDF"
              ></iframe>
            </div>
          </div>
        )}
    </div>
  );
};

export default Social;
