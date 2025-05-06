import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SwingingCard = () => {
  const frontend = "FRONTEND ".split("");
  const backend = "BACKEND ".split("");

  const [isInteracting, setIsInteracting] = useState(false);
  const pinOffset = useRef({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const pinRef = useRef(null);
  const ropeRef = useRef(null);
  const swingAnimation = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const updatePinPosition = () => {
      if (pinRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const pinRect = pinRef.current.getBoundingClientRect();

        pinOffset.current = {
          x:
            containerRect.left +
            (pinRect.left - containerRect.left) +
            pinRect.width / 2,
          y: pinRect.top + window.scrollY + pinRect.height / 2,
        };
      }
    };

    updatePinPosition();
    window.addEventListener("resize", updatePinPosition);
    return () => window.removeEventListener("resize", updatePinPosition);
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;

    swingAnimation.current = gsap.fromTo(
      cardRef.current,
      {
        rotation: -8,
        y: 5,
      },
      {
        rotation: 8,
        y: 5,
        transformOrigin: "50% 0%",
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        paused: isInteracting,
        onUpdate: updateRope,
      }
    );

    return () => {
      swingAnimation.current?.kill();
    };
  }, []);

  const handleInteractionStart = () => {
    setIsInteracting(true);
    swingAnimation.current?.pause();
  };

  const handleInteractionEnd = () => {
    setIsInteracting(false);
    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
      onUpdate: updateRope,
      onComplete: () => {
        swingAnimation.current?.restart();
      },
    });
  };

  const handleMove = (clientX, clientY) => {
    if (!isInteracting || !cardRef.current) return;

    const deltaX = (clientX - pinOffset.current.x) / 8;
    const deltaY = (clientY - pinOffset.current.y) / 12;

    gsap.to(cardRef.current, {
      x: deltaX,
      y: deltaY,
      rotation: deltaX / 8,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: updateRope,
    });
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
      e.preventDefault(); // Prevent scrolling when interacting with the card
    }
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Mouse events
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleInteractionEnd);

    // Touch events
    card.addEventListener("touchstart", handleInteractionStart);
    card.addEventListener("touchmove", handleTouchMove, { passive: false });
    card.addEventListener("touchend", handleInteractionEnd);

    return () => {
      // Cleanup mouse events
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleInteractionEnd);

      // Cleanup touch events
      card.removeEventListener("touchstart", handleInteractionStart);
      card.removeEventListener("touchmove", handleTouchMove);
      card.removeEventListener("touchend", handleInteractionEnd);
    };
  }, [isInteracting]);

  const updateRope = () => {
    requestAnimationFrame(() => {
      if (!cardRef.current || !ropeRef.current || !pinRef.current) return;

      const cardRect = cardRef.current.getBoundingClientRect();
      const cardX = cardRect.left + cardRect.width / 2;
      const cardY = cardRect.top + window.scrollY + 20;

      const rotation = gsap.getProperty(cardRef.current, "rotate") || 0;
      const controlX = (pinOffset.current.x + cardX) / 2 + rotation * 1.5;
      const controlY =
        pinOffset.current.y + (cardY - pinOffset.current.y) * 0.4;

      ropeRef.current.setAttribute(
        "d",
        `M ${pinOffset.current.x},${pinOffset.current.y} Q ${controlX},${controlY} ${cardX},${cardY}`
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className="carbon-bg px-4 tablet:px-20 laptop:px-72 desktop:px-96 desktop:min-h-[80vh] relative"
    >
      <div className="w-full overflow-hidden flex justify-between touch-none bg-white p-2 rounded-sm">
        <div
          ref={pinRef}
          className="absolute top-[16px] left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg z-10"
        ></div>

        <svg className="absolute -top-10 left-0 w-full h-full pointer-events-none z-0">
          <path
            ref={ropeRef}
            stroke="#4A90E2"
            strokeWidth="4"
            fill="transparent"
            strokeLinecap="round"
          />
        </svg>

        <div
          ref={cardRef}
          className="absolute top-[100px] left-1/2 transform -translate-x-1/2 w-60 h-80 bg-white shadow-xl rounded-xl p-2 text-primary font-bold text-2xl border border-gray-300 cursor-pointer touch-none"
          onMouseEnter={handleInteractionStart}
        >
          <div className="profile">
            <img src="/images/p1.JPG" className="w-full rounded-md" alt="" />
            <div className="p-4">
              <p className="text-base text-center text-secondary">
                BACHELOR OF SCIENCE AND INFORMATION TECHNOLOGY
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          {frontend.map((char, index) => (
            <span
              key={index}
              className="text-6xl pe-1 font-extrabold animate-colorChange2 text-white"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="flex flex-col">
          {backend.map((char, index) => (
            <span
              key={index}
              className="text-6xl pt-2 font-extrabold animate-colorChange2 text-white"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwingingCard;
