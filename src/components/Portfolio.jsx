import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const portfolioItems = [
  {
    id: 1,
    title: "Project 1",
    image: "https://themewagon.github.io/meyawo/assets/imgs/folio-1.jpg",
  },
  {
    id: 2,
    title: "Project 2",
    image: "https://themewagon.github.io/meyawo/assets/imgs/folio-1.jpg",
  },
  {
    id: 3,
    title: "Project 3",
    image: "https://themewagon.github.io/meyawo/assets/imgs/folio-1.jpg",
  },
  {
    id: 4,
    title: "Project 4",
    image: "https://themewagon.github.io/meyawo/assets/imgs/folio-1.jpg",
  },
];

const Portfolio = () => {
  return (
    <div className="bg-gray-100 p-10 px-4 tablet:px-20 laptop:px-72 desktop:px-96">
      <h1 className="text-2xl font-bold text-gray-600 mb-5">PORTFOLIO</h1>
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
        {portfolioItems.map((item) => (
          <PortfolioCard key={item.id} title={item.title} image={item.image} />
        ))}
      </div>
    </div>
  );
};

const PortfolioCard = ({ title, image }) => {
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
    <div
      ref={containerRef}
      className="relative w-full tablet:w-72 h-64 border overflow-hidden"
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div ref={overlayRef} className="absolute inset-0"></div>
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col gap-4 items-center justify-center text-white text-lg font-semibold bg-black/50 opacity-0"
      >
        <h1 className="text-2xl font-bold text-gray-300">{title}</h1>
        <div className="flex items-center gap-1">
          <a href="#" className="border p-1">
            <FontAwesomeIcon icon={faInfoCircle} /> Details
          </a>
          <a href="#" className="border p-1">
            <FontAwesomeIcon icon={faEye} /> Preview
          </a>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
