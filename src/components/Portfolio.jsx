import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const portfolioItems = [
  {
    id: 1,
    title: "Motorsport Growth",
    image: "/images/mtsport.PNG",
    url: "https://johnpaulquintana.github.io/ui/",
    tags: ["UI", "Landing Page"],
    logo: "/images/MG-LOGO.svg",
  },
  {
    id: 2,
    title: "Stage 4 Tuning",
    image: "/images/s4t.webp",
    url: "https://pw8j8t-99.myshopify.com/",
    tags: ["Shopify", "E-commerce"],
    logo: "/images/S4T-LOGO.png",
  },
  {
    id: 3,
    title: "Breakform",
    image: "/images/breakform.webp",
    url: "https://c5ejq3rs2w.wpdns.site/",
    tags: ["Wordpress", "Architecture"],
    logo: "/images/BR-LOGO.PNG",
  },
  {
    id: 4,
    title: "SOFREG SOLUTIONS",
    image: "/images/sofreg.jpg",
    url: "https://sofreg-solution-test.netlify.app/",
    tags: ["React", "Company Website"],
    logo: "/images/SF-LOGO.png",
  },
  {
    id: 4,
    title: "Sport Science",
    image: "/images/sport.PNG",
    url: "https://sport-science-app.netlify.app/",
    tags: ["React", "Analytics"],
    logo: "/images/SF-LOGO.png",
  },
  {
    id: 4,
    title: "Navigation Kiosk",
    image: "/images/kiosk.PNG",
    url: "https://exousianavi.netlify.app/",
    tags: ["React", "Kiosk", "Indoor Navigation"],
    logo: "/images/KIOSK-LOGO.png",
  },
];

const Portfolio = () => {
  return (
    <div className="carbon-bg px-4 tablet:px-20 laptop:px-72 desktop:px-96">
      <div className="bg-white w-full px-4 py-10 rounded-sm">
        <h1 className="text-4xl text-center font-bold animate-colorChange2 mb-2 pt-2">PORTFOLIO</h1>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-2">
          {portfolioItems.map((item) => (
            <PortfolioCard
              key={item.id}
              title={item.title}
              image={item.image}
              url={item.url}
              tags={item.tags}
              logo={item.logo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PortfolioCard = ({ title, image, url, tags, logo }) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const numParticles = 10;

  useEffect(() => {
    const overlay = overlayRef.current;

    // Create the particle grid dynamically
    overlay.innerHTML = ""; // Ensure previous particles are cleared
    for (let i = 0; i < numParticles; i++) {
      for (let j = 0; j < numParticles; j++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        overlay.appendChild(particle);

        gsap.set(particle, {
          width: `${100 / numParticles}%`,
          height: `${100 / numParticles}%`,
          backgroundColor: "#3E3F5B",
          position: "absolute",
          left: `${(i * 100) / numParticles}%`,
          top: `${(j * 100) / numParticles}%`,
          opacity: 0,
        });
      }
    }

    const handleMouseEnter = () => {
      gsap.killTweensOf(overlay.children); // Stop any running animations

      gsap.to(overlay.children, {
        opacity: 1,
        duration: 0.5,
        stagger: {
          amount: 0.3,
          grid: [numParticles, numParticles],
          from: "center",
        },
      });

      gsap.to(contentRef.current, { opacity: 1, duration: 0.3, delay: 0.5 });
    };

    const handleMouseLeave = () => {
      // Kill any ongoing animations
      gsap.killTweensOf(overlayRef.current.children);
      gsap.killTweensOf(contentRef.current);

      gsap.to(overlay.children, {
        opacity: 0,
        duration: 0.3,
        stagger: {
          amount: 0.2,
          grid: [numParticles, numParticles],
          from: "center",
        },
      });

      gsap.to(contentRef.current, { opacity: 0, duration: 0.2 });
    };

    const container = containerRef.current;
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(overlay.children); // Cleanup GSAP animations
    };
  }, []);

  return (
    <div className="mb-4">
      <div
        ref={containerRef}
        className="relative w-full flex items-center justify-center tablet:w-[17rem] h-64 border overflow-hidden"
      >
        <div className="absolute flex items-center justify-center">
          <div className="w-20 h-fit p-2 bg-gray-700/70">
            <img
              src={logo}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <img src={image} alt={title} className="w-full h-full object-cover" />

        <div ref={overlayRef} className="absolute inset-0"></div>
        <div
          ref={contentRef}
          className="absolute inset-0 flex flex-col gap-4 items-center justify-center text-white text-lg font-semibold bg-black/50 opacity-0"
        >
          <h1 className="text-2xl font-bold animate-colorChange2">{title}</h1>
          <div className="flex items-center gap-1">
            <a href="#" className="border p-1">
              <FontAwesomeIcon icon={faInfoCircle} /> Details
            </a>
            <a href={url} className="border p-1">
              <FontAwesomeIcon icon={faEye} /> Preview
            </a>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        {tags.map((tag, index) => (
          <span key={index} className="carbon-bg animate-colorChange2 text-sm p-1 px-2 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
