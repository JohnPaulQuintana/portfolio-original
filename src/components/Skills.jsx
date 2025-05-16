import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; // Email icon

const Skills = () => {
   const [showModal, setShowModal] = useState(false);
  return (
    <div className="px-4 tablet:px-20 laptop:px-72 desktop:px-96 py-2 flex justify-center">
      <div className="social-media bg-white w-full wide:w-[60%] py-10 rounded-sm p-4">
        <div className="flex items-center justify-center">
          <h1 className="text-4xl font-extrabold animate-colorChange2">Skills I Have.</h1>
        </div>
        <h1 className="text-2xl mt-4 text-primary">Frontend Development</h1>
        <div className="grid grid-cols-3 tablet:grid-cols-6 gap-2 mt-2">
            <div className="border p-2 flex flex-col items-center rounded-md">
              <img src="/images/react-logo.svg" alt="REACTJS" className="w-full h-full object-contain" />
              <span>Reactjs</span>
            </div>
            <div className="border p-2 flex flex-col items-center rounded-md">
              <img src="/images/html5-logo.svg" alt="REACTJS" className="w-full h-full object-contain" />
              <span>HTML5</span>
            </div>
            <div className="border p-2 flex flex-col items-center rounded-md">
              <img src="/images/css3-logo.svg" alt="REACTJS" className="w-full h-full object-contain" />
              <span>CSS3</span>
            </div>
            <div className="border p-2 flex flex-col items-center rounded-md">
              <img src="/images/js-logo.svg" alt="REACTJS" className="w-full h-full object-contain" />
              <span>Javascript</span>
            </div>
            <div className="border p-2 flex flex-col items-center rounded-md">
              <img src="/images/tailwind-logo.svg" alt="REACTJS" className="w-full h-full object-contain" />
              <span>Tailwindcss</span>
            </div>
            <div className="border p-2 flex flex-col items-center rounded-md">
              <img src="/images/jquery-logo.svg" alt="REACTJS" className="w-full h-full object-contain" />
              <span>Jquery</span>
            </div>
            <div className="border p-2 flex flex-col items-center rounded-md">
              <img src="/images/vite-logo.svg" alt="REACTJS" className="w-full h-full object-contain" />
              <span>Vite</span>
            </div>
        </div>

        <h1 className="text-2xl mt-8 text-primary">Backend Development / Automation</h1>
        <div className="grid grid-cols-3 tablet:grid-cols-6 gap-2 mt-2">
            <div className="border p-2 flex flex-col items-center rounded-md">
              <img src="/images/nodejs-logo.svg" alt="REACTJS" className="w-full h-full object-contain" />
              <span>Nodejs</span>
            </div>
            <div className="border p-2 flex flex-col items-center rounded-md">
              <img src="/images/laravel-logo.svg" alt="REACTJS" className="w-full h-full object-contain" />
              <span>Laravel</span>
            </div>
            <div className="border p-2 flex flex-col items-center rounded-md">
              <img src="/images/python-logo.svg" alt="REACTJS" className="w-full h-full object-contain" />
              <span>Python</span>
            </div>
        </div>

        <h1 className="text-2xl mt-8 text-primary">CMS / E-commerce</h1>
        <div className="grid grid-cols-3 tablet:grid-cols-6 gap-2 mt-2">
            <div className="border p-2 flex flex-col items-center rounded-md">
              <img src="/images/wordpress-logo.svg" alt="REACTJS" className="w-full h-full object-contain" />
              <span>Wordpress</span>
            </div>
            <div className="border p-2 flex flex-col items-center rounded-md">
              <img src="/images/shopify-logo.svg" alt="REACTJS" className="w-full h-full object-contain" />
              <span>Shopify</span>
            </div>
        </div>

        <h1 className="text-2xl mt-8 text-primary">Database & Hosting</h1>
        <div className="grid grid-cols-3 tablet:grid-cols-6 gap-2 mt-2">
            <div className="border shadow p-2 flex flex-col items-center rounded-md">
              <img src="/images/mysql-logo.svg" alt="REACTJS" className="w-full h-full object-contain" />
              <span>Mysql</span>
            </div>
            <div className="border p-2 flex flex-col items-center rounded-md">
              <img src="/images/hostinger-logo.jpg" alt="REACTJS" className="w-full h-full object-contain" />
              <span>Hostinger</span>
            </div>
            <div className="border p-2 flex flex-col items-center rounded-md">
              <img src="/images/godaddy-logo.svg" alt="REACTJS" className="w-full h-full object-contain" />
              <span>Godaddy</span>
            </div>
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

export default Skills;
