import React from "react";

const About = () => {
  return (
    <div id="about-card" className="carbon-bg px-4 tablet:px-20 laptop:px-72 desktop:px-96 pb-2 flex justify-center">
      <div className="social-media bg-white w-full wide:w-[60%] py-10 rounded-sm">
        <div className="about-me px-4 desktop:px-10">
          <h1 className="text-4xl text-center font-bold animate-colorChange2">ABOUT ME</h1>
          <p class="text-gray-600 text-lg mb-6">
            Full-Stack Developer with 5 years of freelance experience building
            custom web solutions for local clients. I also specialize in data
            automation—integrating Facebook Insights and ad platform data
            directly into dynamic spreadsheet reports. On the frontend, I’ve
            worked with Shopify, WordPress, and React to create responsive,
            high-performing interfaces.
          </p>
          <div class="bg-gray-100 p-6 rounded-xl shadow-sm">
            <p class="text-gray-700 font-medium italic animate-colorChange2">
              “Web Developer & Data Automation Specialist — turning Facebook Ads
              and spreadsheets into streamlined reports, and building full
              websites from backend to frontend.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
