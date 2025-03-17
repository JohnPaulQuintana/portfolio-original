import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const name = "JP QUINTANA ".split(""); // Split text into individual characters

  return (
    <header className="p-4 text-white flex justify-center font-extrabold tracking-wider bg-background sticky top-0 z-20">
      <div className="contents flex gap-2">
      <FontAwesomeIcon icon={faPlay} size="2x" className="text-primary" />;
        {name.map((char, index) => (
          <span
            key={index}
            className="text-xl pe-1 font-bold animate-colorChange"
            style={{ animationDelay: `${index * 0.2}s` }} // Delayed effect for each letter
          >
            {char}
          </span>
        ))}
        <FontAwesomeIcon icon={faPlay} size="2x" className="text-primary rotate-180" />;
      </div>
    </header>
  );
};

export default Header;
