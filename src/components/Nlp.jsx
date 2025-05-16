import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

// Bad words list (can be expanded)
const BAD_WORDS = ["fuck", "shit", "asshole", "bitch", "damn", "crap", "idiot"];

const ParticlePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const buttonRef = useRef(null);
  const popupRef = useRef(null);
  const overlayRef = useRef(null);
  const modalContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const numParticles = 5;

  const socialLinks = {
    facebook: {
      text: "Connect with me on Facebook",
      url: "https://www.facebook.com/profile.php?id=100006064309339",
    },
    linkedin: {
      text: "View my professional profile on LinkedIn",
      url: "www.linkedin.com/in/john-paul-quintana-118145287",
    },
    resume: {
      text: "View my professional resume/cv",
      url: "/cv/jpquintana.pdf",
    },
    email: { text: "Send me an email", url: "mailto:jpquintana2024@gmail.com" },
  };

  // Enhanced conversational responses
  const staticResponses = {
    greetings: [
      "Hello! I'm your AI assistant. Here's what I can help with:\n\n• Ask about my skills\n• Request my resume\n• Learn about my projects\n• Connect via social media\n\nWhat would you like to know?",
    ],
    skills: `My technical skills include:
  
        1. Frontend Development:
        - React, JavaScript, TypeScript, WordPress, Shopify
        - HTML, CSS, Tailwind CSS
        - Custom theme development
        - GSAP animations
        - Responsive design

        2. Backend Development:
        - Node.js, Express, Laravel, Python, Playwright
        - REST API design
        - Database integration

        3. Data Automation:
        - Facebook Insights integration
        - Web Scraping
        - Spreadsheet automation
        - Data visualization with Echart.js
        - Custom reporting
        - Python scripting
        - Telegram bot development

        After reviewing my skills, you might want to ask about:
        Available on version:1.1
        • My experience with specific technologies
        • How I've applied these skills in projects
        • My learning approach for new technologies
        
        Here's what I can help with:\n\n• Ask about my skills\n• Request my resume\n• Learn about my projects\n• Connect via social media\n\nWhat would you like to know?
        `,
    projects: `Here are some featured projects:

        1. [Motorsport Growth](https://johnpaulquintana.github.io/ui/) - WordPress/UI
        - Custom theme development
        - Landing Page

        2. [S4T Stage 4 Tuning](https://pw8j8t-99.myshopify.com/) - Shopify
        - Custom theme development
        - Payment
        - E-commerce

        3. [BreakForm](https://c5ejq3rs2w.wpdns.site/) - Wordpress
        - Contructions
        - Fabrications
        - Architectures

        4. [Sofreg Solutions](https://sofreg-solution-test.netlify.app/) - Reactjs/Fullstack
        - Company Website
        - Services Offered
        - Employee Attendance Monitoring
        - Camera Access
        - Job Listing Management
        - Admin and Employee Dashboard
        - Backend is on hold due to hosting expired.

        5. [Sport Science](https://sport-science-app.netlify.app/) - Reactjs/Fullstack
        - Coach and Athletes Monitoring Performance
        - Analytics
        - Recommendations
        - Linear Regression Algorithm
        - Backend is on hold due to hosting expired.

        6. [On-Campus Navigational Kiosk](https://exousianavi.netlify.app/) - Reactjs/Fullstack
        - Campus Navigation
        - Email Notification
        - Interractable Map
        - Custom Map Supported
        - Backend is on hold due to hosting expired.

        You can ask about:
        Available on version:1.1
        • Specific project challenges
        • Technologies used
        • Project outcomes and results
        
        Here's what I can help with:\n\n• Ask about my skills\n• Request my resume\n• Learn about my projects\n• Connect via social media\n\nWhat would you like to know?
        `,

    contact: `You can connect with me through:

        1. [LinkedIn Profile](${socialLinks.linkedin.url}) - Professional network
        2. [GitHub Profile](https://github.com/JohnPaulQuintana) - Code repositories
        3. [Email Me](${socialLinks.email.url}) - Direct contact

        After connecting, you might want to:
        Available on version:1.1
        • Ask about my availability
        • Discuss collaboration opportunities
        • Request references
        
        Here's what I can help with:\n\n• Ask about my skills\n• Request my resume\n• Learn about my projects\n• Connect via social media\n\nWhat would you like to know?
        `,

    resume: `Access my resume through:

        1. [Download PDF](${socialLinks.resume.url}) - Full resume
        2. [View Online](#) - Web version
        3. [Request via Email](${socialLinks.email.url}) - Email copy

        After reviewing, you can ask about:
        Available on version:1.1
        • Specific work experiences
        • Education background
        • Professional certifications
        Here's what I can help with:\n\n• Ask about my skills\n• Request my resume\n• Learn about my projects\n• Connect via social media\n\nWhat would you like to know?
        `,

    help: `Here's how I can assist you:

        1. Skills & Experience:
        - Technical capabilities
        - Professional background

        2. Project Portfolio:
        - Completed works

        3. Contact Information:
        - Professional networks
        - Direct communication

        4. Resume Access:
        - Download options
        - Work history

        What would you like to explore first?`,

    default: `I can help with these topics:

        1. Professional Skills
        2. Project Portfolio
        3. Resume/CV Access
        4. Contact Information

        Try asking about any of these areas or say "help" for more guidance.`,
  };

  // Helper functions
  const containsBadWords = (message) => {
    return BAD_WORDS.some((word) => message.toLowerCase().includes(word));
  };

  const isGreeting = (message) => {
    return /^(hi|hello|hey|greetings|what's up|good (morning|afternoon|evening)|yo)\b/i.test(
      message
    );
  };

  const isThanks = (message) => {
    return /(thank|thanks|appreciate|grateful)\b/i.test(message);
  };

  const containsKeywords = (message, keywords) => {
    return keywords.some((keyword) => message.toLowerCase().includes(keyword));
  };

  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Update the getResponse function
  const getResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();

    if (containsBadWords(message)) {
      return "I maintain professional conversations. Let me know if you'd like information about my professional background.";
    }

    if (isGreeting(message)) {
      return staticResponses.greetings[0]; // Use the single greeting format
    }

    if (isThanks(message)) {
      return "You're welcome! Let me know if you need anything else.";
    }

    if (
      containsKeywords(message, ["skill", "experience", "technology", "stack"])
    ) {
      return staticResponses.skills;
    }

    if (containsKeywords(message, ["project", "work", "portfolio"])) {
      return staticResponses.projects;
    }

    if (containsKeywords(message, ["resume", "cv", "curriculum vitae"])) {
      return staticResponses.resume;
    }

    if (
      containsKeywords(message, ["contact", "connect", "reach", "social media"])
    ) {
      return staticResponses.contact;
    }

    if (containsKeywords(message, ["help", "support"])) {
      return staticResponses.help;
    }

    return staticResponses.default;
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Typewriter effect for messages
  const typeWriter = (messageIndex, text, index, callback) => {
    if (index < text.length) {
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[messageIndex].text = text.substring(0, index + 1);
        return newMessages;
      });
      setTimeout(
        () => typeWriter(messageIndex, text, index + 1, callback),
        20 + Math.random() * 20
      );
    } else if (callback) {
      callback();
    }
  };

  // Create clickable links from markdown-style links
  const renderMessageWithLinks = (text) => {
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      // Add the link
      parts.push(
        <a
          key={match[2]}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {match[1]}
        </a>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after last link
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  // Create particles animation
  const createParticles = () => {
    const overlay = overlayRef.current;
    overlay.innerHTML = "";

    if (!modalContainerRef.current) return;

    const modalRect = modalContainerRef.current.getBoundingClientRect();
    const centerX = modalRect.left + modalRect.width / 2;
    const centerY = modalRect.top + modalRect.height / 2;

    for (let i = 0; i < numParticles; i++) {
      for (let j = 0; j < numParticles; j++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        overlay.appendChild(particle);

        const finalLeft = modalRect.left + (i * modalRect.width) / numParticles;
        const finalTop = modalRect.top + (j * modalRect.height) / numParticles;

        gsap.set(particle, {
          position: "fixed",
          width: `${modalRect.width / numParticles}px`,
          height: `${modalRect.height / numParticles}px`,
          //   backgroundColor: "#3E3F5B",
          left: centerX,
          top: centerY,
          x: "-50%",
          y: "-50%",
          opacity: 0,
          scale: 0,
          borderRadius: "4px",
        });

        // Apply Tailwind background class instead of setting backgroundColor
        particle.classList.add("carbon-bg");
        particle.dataset.finalLeft = finalLeft;
        particle.dataset.finalTop = finalTop;
      }
    }
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
    setMessages([]);
    setTimeout(() => {
      createParticles();
      const particles = Array.from(overlayRef.current.children);

      gsap.set(modalContainerRef.current, { opacity: 0 });

      gsap.to(particles, {
        duration: 1.2,
        left: (i, target) => parseFloat(target.dataset.finalLeft),
        top: (i, target) => parseFloat(target.dataset.finalTop),
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "power3.out",
        stagger: {
          amount: 0.8,
          grid: [numParticles, numParticles],
          from: "center",
        },
        onComplete: () => {
          gsap.to(modalContainerRef.current, {
            opacity: 1,
            duration: 0.3,
            onComplete: () => {
              scrollToBottom();
              // Add welcome message after opening
              setTimeout(() => {
                const welcomeIndex = messages.length;
                setMessages((prev) => [
                  ...prev,
                  {
                    type: "bot",
                    text: "",
                    profile: "/bot/chatbot.png",
                  },
                ]);
                typeWriter(
                  welcomeIndex,
                  getRandomResponse(staticResponses.greetings),
                  0,
                  scrollToBottom
                );
              }, 500);
            },
          });
          overlayRef.current.innerHTML = "";
        },
      });
    }, 0);
  };

  const handleClosePopup = () => {
    setMessages([]);
    const modalRect = modalContainerRef.current.getBoundingClientRect();
    const centerX = modalRect.left + modalRect.width / 2;
    const centerY = modalRect.top + modalRect.height / 2;

    gsap.to(modalContainerRef.current, { opacity: 0, duration: 0.3 });

    createParticles();
    const particles = Array.from(overlayRef.current.children);

    gsap.set(particles, {
      left: (i, target) => parseFloat(target.dataset.finalLeft),
      top: (i, target) => parseFloat(target.dataset.finalTop),
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
    });

    gsap.to(particles, {
      duration: 1,
      left: centerX,
      top: centerY,
      x: "-50%",
      y: "-50%",
      opacity: 0,
      scale: 0,
      ease: "power3.in",
      stagger: {
        amount: 0.8,
        grid: [numParticles, numParticles],
        from: "edges",
      },
      onComplete: () => {
        setShowPopup(false);
        overlayRef.current.innerHTML = "";
      },
    });
  };

  // Enhanced handleSendMessage with conversation context
  const handleSendMessage = (e) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage || isTyping) return;

    // Add user message with typewriter effect
    const userMessageIndex = messages.length;
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: "",
      },
    ]);

    // Start typing user message
    typeWriter(userMessageIndex, userMessage, 0, () => {
      // After user message completes, show typing indicator
      const botMessageIndex = userMessageIndex + 1;
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "",
          isTyping: true,
          profile: "/bot/chatbot.png",
        },
      ]);
      setIsTyping(true);

      // Simulate processing delay
      setTimeout(() => {
        const response = getResponse(userMessage, messages);

        // Replace typing indicator with empty bot message
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[botMessageIndex] = {
            type: "bot",
            text: "",
            isTyping: false,
            profile: "/bot/chatbot.png",
          };
          return newMessages;
        });

        // Start typewriter effect for bot response
        typeWriter(botMessageIndex, response, 0, () => {
          setIsTyping(false);
          scrollToBottom();
        });
      }, 800 + Math.random() * 400); // Add some natural variation to response time
    });

    setInput("");
    // inputRef.current.focus();
  };

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when popup opens
  useEffect(() => {
    if (showPopup) {
      setTimeout(() => {
        // inputRef.current?.focus();
      }, 1500);
    }
  }, [showPopup]);

  return (
    <div>
      {/* Floating Button */}
      {!showPopup && (
        <button
          ref={buttonRef}
          onClick={handleOpenPopup}
          className="fixed bottom-6 right-6 laptop:right-80 wide:right-[25%] bg-white hover:bg-blue-700 text-white p-4 rounded-full border border-primary shadow-lg z-50 transition-all transform hover:scale-110"
          aria-label="Open Chat"
        >
          <img
            src={"/bot/chatbot.png"}
            alt="Assistant"
            className="w-8 h-8 rounded-full object-cover self-end"
          />
        </button>
      )}

      {/* Popup Container */}
      {showPopup && (
        <div
          ref={popupRef}
          className="fixed inset-0 bg-black border-white bg-opacity-70 z-40 flex justify-center items-center p-4"
        >
          {/* Particle Overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 z-30 pointer-events-none"
          />

          {/* Modal Content */}
          <div
            ref={modalContainerRef}
            className="border border-white w-full max-w-lg h-full max-h-[80vh] flex flex-col justify-between relative z-40 rounded-lg overflow-hidden shadow-xl"
            style={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-white hover:text-red-500 text-2xl font-bold z-50 transition-colors"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Header */}
            <div className="p-4 border-0 font-bold text-lg carbon-bg animate-colorChange2">
              EXOUSIA NAVI
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.type === "bot" && (
                    <img
                      src={msg.profile}
                      alt="Assistant"
                      className="w-8 h-8 rounded-full object-cover mr-2 self-end"
                    />
                  )}
                  <div
                    className={`p-3 rounded-lg max-w-xs lg:max-w-md ${
                      msg.type === "user"
                        ? "carbon-bg text-white rounded-br-none"
                        : "bg-black/10 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.isTyping ? (
                      <div className="flex space-x-1 items-center">
                        <div className="w-2 h-2 carbon-bg rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 carbon-bg rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 carbon-bg rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    ) : (
                      <div className="whitespace-pre-line">
                        {renderMessageWithLinks(msg.text)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="border-t p-4 bg-gray-50">
              <form onSubmit={handleSendMessage} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full border rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                  disabled={!input.trim() || isTyping}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 rotate-90 animate-colorChange2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticlePopup;
