import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Terminal() {
  // State to track current user input
  const [input, setInput] = useState("");
  // State to control visibility of available commands list
  const [showCommands, setShowCommands] = useState(false);
  // Store command history for display
  const [commandHistory, setCommandHistory] = useState([]);
  // Track if input is invalid to show error message
  const [inputError, setInputError] = useState(false);
  // Ref to store timeout ID for delayed command display
  const timerRef = useRef(null);
  // Hook from react-router to navigate programmatically
  const navigate = useNavigate();

  // useEffect to trigger showing available commands after 30 seconds of inactivity
  useEffect(() => {
    // If commands are not showing, set a 30-second timer
    if (!showCommands) {
      timerRef.current = setTimeout(() => {
        setShowCommands(true);
      }, 20000); // 20 seconds delay
    }
    // Cleanup function clears timeout if component unmounts or showCommands changes
    return () => clearTimeout(timerRef.current);
  }, [showCommands]);

  // Handler for form submission (user presses enter)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submit behavior (page reload)
    clearTimeout(timerRef.current); // Clear timeout on submit so it doesn't trigger unexpectedly

    const trimmed = input.trim().toLowerCase(); // Clean and normalize input for command matching

    if (trimmed === "learn more") {
      // If input is recognized, show the commands list and clear any error
      setShowCommands(true);
      setInputError(false);
    } else {
      // For any other input, show an error message
      setInputError(true);
    }

    // Add the input to the command history for display
    setCommandHistory((prev) => [...prev, input]);
    // Clear the input field after submission
    setInput("");
  };

  return (
    <div className="w-full px-4 sm:px-8 py-8 sm:py-30 flex justify-center transition-colors duration-500 bg-background-light dark:bg-background-dark">
      {/* Outer container centering the terminal with padding and responsive design */}

      <div
        className="w-full max-w-6xl rounded-2xl overflow-hidden 
                    shadow-[0_10px_25px_rgba(0,0,0,0.5)] 
                    animate-subtlePop transition-transform duration-300 
                    transition-colors duration-500
                    hover:scale-[1.01] hover:shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
      >
        {/* Terminal window with shadow, rounded corners, and hover animation */}

        {/* Terminal Header */}
        <div
          className="bg-[#8f9a81] px-4 py-2 flex flex-wrap gap-y-2 items-center justify-between text-white font-mono text-xs sm:text-sm md:text-base relative"
        >
          {/* Header styled with background color and flex layout */}
          <div className="flex space-x-2">
            {/* Red, yellow, green circles like typical terminal window controls */}
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          {/* Terminal title centered */}
          <div className="text-center w-full sm:w-auto font-semibold">
            Anahatscorner — -zsh — 101x31
          </div>
          {/* Spacer div to balance layout */}
          <div className="w-6" />
        </div>

        {/* Terminal Body */}
        <div
          className="bg-[#383e30] dark:bg-background-light text-white font-mono p-4 sm:p-6 flex flex-col sm:flex-row w-full"
        >
          {/* Terminal content area with dark background and monospace font */}

          {/* Left Terminal Content */}
          <div className="flex-1 sm:pr-6">
            {/* Simulated terminal command output */}
            <p className="text-green-300 dark:text-[#566246]">
              visitor@anahatscorner:~$ welcome
            </p>
            <br />
            <p className="dark:text-[#566246]">
              &gt; <span className="text-green-400">whoami</span>
            </p>
            <p className="dark:text-black">hi! i'm anahat!</p>
            <p className="dark:text-black">
              cs @ university of waterloo | bba @ wilfrid laurier university
            </p>
            <br />
            <p className="dark:text-[#566246]">
              &gt; <span className="text-green-400">echo</span> "Welcome to my
              corner of the internet 👋"
            </p>
            <p className="dark:text-black">Welcome to my corner of the internet 👋</p>
            <br />
            <p className="dark:text-[#566246]">
              &gt; <span className="text-green-400">cat</span> mission.txt
            </p>
            <p className="dark:text-black">innovating. impacting. empowering.</p>
            <br />
            <p className="dark:text-[#566246]">
              &gt; <span className="text-green-400">contact me —</span>{" "}
              <a href="https://www.linkedin.com/in/anahat-kc/" target="_blank" rel="noopener noreferrer" className="text-blue-300 dark:text-[#0051A8] hover:underline">
                LinkedIn
              </a>
              ,{" "}
              <a href="https://github.com/Anahat07" target="_blank" rel="noopener noreferrer" className="text-blue-300 dark:text-[#0051A8] hover:underline">
                GitHub
              </a>
              ,{" "}
              <a href="mailto:anahat.chhatwal@uwaterloo.ca" className="text-blue-300 dark:text-[#0051A8] hover:underline">
                Email
              </a>
              ,{" "}
              <a href="https://drive.google.com/file/d/1SiuIrTdgwhxA06qCnJUd2WhSJnffn-bz/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-300 dark:text-[#0051A8] hover:underline">
                Download Resume
              </a>
            </p>
            <br />
            <p className="text-gray-400 dark:text-gray-500">
              # Tip: Type "learn more" to see all available commands,
              <br />
              or wait 20 seconds for them to appear automatically.
            </p>
            <br />

            {/* Display all previous commands entered */}
            {commandHistory.map((cmd, i) => (
              <p key={i} className="dark:text-[#566246]">
                &gt; {cmd}
              </p>
            ))}

            {/* Input form shown only if commands list is hidden */}
            {!showCommands && (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <div className="flex">
                    <span className="mr-1 dark:text-[#566246]">&gt;</span>
                    {/* Controlled input bound to input state */}
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="bg-transparent outline-none text-white dark:text-black font-mono w-full caret-white"
                      autoFocus
                    />
                  </div>
                  {/* Show input error or instructions */}
                  <p className="text-gray-500 text-xs italic mt-1">
                    {inputError ? "try again here" : "type here"}
                  </p>
                </div>
              </form>
            )}

            {/* Show available commands once triggered */}
            {showCommands && (
              <>
                <p className="dark:text-[#566246]">Available commands:</p>
                <p className="text-blue-300 dark:text-[#0051A8] flex flex-wrap gap-3">
                  {["about", "projects", "experiences", "contact"].map((cmd) => (
                    <span
                      key={cmd}
                      className="cursor-pointer transition hover:underline hover:animate-flicker"
                      onClick={() => navigate(cmd === "about" ? "/" : `/${cmd}`)}
                    >
                      {cmd}/
                    </span>
                  ))}
                </p>
                <br />
                {/* Blinking cursor animation */}
                <p className="dark:text-[#566246]">&gt; <span className="animate-pulse">_</span></p>
              </>
            )}
          </div>

          {/* Portrait image on right side */}
          <div className="w-full sm:w-1/3 flex justify-center items-start mt-6 sm:mt-0">
            <img
              src="/portrait.png"
              alt="Terminal art"
              className="w-2/3 sm:w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terminal;
