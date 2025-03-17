import React, { useEffect, useState } from "react";
import gsap from "gsap";

const SwingingCard = () => {
  const frontend = "FRONTEND ".split(""); // Split text into individual characters
  const backend = "BACKEND ".split(""); // Split text into individual characters

  const [isHovered, setIsHovered] = useState(false);
  const [pinOffset, setPinOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePinOffset = () => {
      const pin = document.getElementById("pin");
      if (pin) {
        const { left, top } = pin.getBoundingClientRect();
        const scrollY = window.scrollY;
        setPinOffset({ x: left + pin.offsetWidth / 2, y: top + scrollY });
      }
    };

    updatePinOffset();
    window.addEventListener("resize", updatePinOffset);
    return () => window.removeEventListener("resize", updatePinOffset);
  }, []);

  useEffect(() => {
    const card = document.getElementById("card");

    if (!card) return;

    const swingAnimation = gsap.to(card, {
      rotate: [-10, 10], // Smoother swing
      transformOrigin: "50% 0%", // Swings from top-center
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      onUpdate: updateRope,
    });

    const handleMouseMove = (e) => {
      if (!isHovered) return;
      const { clientX, clientY } = e;
      const deltaX = (clientX - pinOffset.x) / 6;
      const deltaY = (clientY - pinOffset.y) / 6;

      gsap.to(card, {
        x: deltaX,
        y: deltaY,
        rotate: deltaX / 10,
        duration: 0.3,
        ease: "power2.out",
        onUpdate: updateRope,
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(card, {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 1.2,
        ease: "bounce.out",
        onUpdate: updateRope,
      });

      swingAnimation.play();
    };

    window.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered, pinOffset]);

  const updateRope = () => {
    requestAnimationFrame(() => {
      const card = document.getElementById("card");
      const rope = document.getElementById("rope");

      if (!card || !rope) return;

      const cardRect = card.getBoundingClientRect();
      const scrollY = window.scrollY;

      const cardX = cardRect.left + cardRect.width / 2;
      const cardY = cardRect.top + scrollY + 100;

      const rotation = gsap.getProperty(card, "rotate") || 0;
      const controlX = (pinOffset.x + cardX) / 2 + rotation * 2;
      const controlY = pinOffset.y + (cardY - pinOffset.y) * 0.5;

      rope.setAttribute(
        "d",
        `M ${pinOffset.x},${pinOffset.y} Q ${controlX},${controlY} ${cardX},${cardY}`
      );
    });
  };

  return (
    <div className="bg-gray-100 px-4 tablet:px-20 laptop:px-72 desktop:px-96 min-h-[80vh] relative w-full overflow-hidden flex justify-between">
      <div
        id="pin"
        className="absolute top-[5px] left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg z-10"
      ></div>

      <svg className="absolute -top-10 left-0 w-full h-full pointer-events-none z-0">
        <path
          id="rope"
          stroke="#4A90E2"
          strokeWidth="6"
          fill="transparent"
          strokeLinecap="round"
        />
      </svg>

      <div
        id="card"
        className="absolute top-[100px] left-1/2 transform -translate-x-1/2 w-60 h-80 bg-white shadow-xl rounded-xl p-2 text-primary font-bold text-2xl border border-gray-300"
        onMouseEnter={() => setIsHovered(true)}
      >
        <div className="profile">
          <img src="/images/p1.JPG" className="w-full rounded-md" alt="" />
          <div className="p-4">
          <p className="text-base text-center text-secondary">BACHELOR OF SCIENCE AND INFORMATION TECHNOLOGY</p>
          </div>
        </div>
      </div>

      {/* Front End */}
      <div className="flex flex-col">
        {frontend.map((char, index) => (
          <span
            key={index}
            className="text-6xl pe-1 font-extrabold animate-colorChange2 text-white"
            style={{ animationDelay: `${index * 0.2}s` }} // Delayed effect for each letter
          >
            {char}
          </span>
        ))}
      </div>
      {/* Back End */}
      <div className="flex flex-col">
        {backend.map((char, index) => (
          <span
            key={index}
            className="text-6xl pt-2 font-extrabold animate-colorChange2 text-white"
            style={{ animationDelay: `${index * 0.2}s` }} // Delayed effect for each letter
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SwingingCard;
