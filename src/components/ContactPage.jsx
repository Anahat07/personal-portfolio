            import React, { useState, useEffect, useRef, useCallback } from 'react';
            import { Github, Linkedin, Mail, Download, Terminal, Trophy, Target, Zap } from 'lucide-react';
            import { Link } from "react-router-dom";

            const ContactPage = () => {
              const [gameActive, setGameActive] = useState(false);
              const [score, setScore] = useState(0);
              const [attempts, setAttempts] = useState(0);
              const [ballPosition, setBallPosition] = useState({ x: 20, y: 85 });
              const [ballVelocity, setBallVelocity] = useState({ x: 0, y: 0 });
              const [ballRotation, setBallRotation] = useState(0);
              const [isShootingAnimating, setIsShootingAnimating] = useState(false);
              const [showScore, setShowScore] = useState(false);
              const [playerName, setPlayerName] = useState('');
              const [netSwaying, setNetSwaying] = useState(0);
              const [playerMessage, setPlayerMessage] = useState('');
              // const [leaderboard, setLeaderboard] = useState([]);
              // const API_URL = process.env.REACT_APP_API_URL || "";

              //   const deleteEntry = (index) => {
              //   setLeaderboard(prev => prev.filter((_, i) => i !== index));
              // };

              const gameRef = useRef(null);
              const animationRef = useRef(null);

              // // Persist leaderboard on change
              // useEffect(() => {
              //   fetch(`${API_URL}/api/leaderboard`)
              //     .then(res => res.json())
              //     .then(data => setLeaderboard(data));
              // }, []);

              // const submitScore = async () => {
              //   if (!playerName.trim()) return;

              //   const finalScore = score;
              //   const message = playerMessage.trim() || "> echo 'No message entered.'";
              //   const newEntry = { name: playerName, score: finalScore, message };

              //   try {
              //     console.log("Submitting score to /api/submitScore");

              //     // Use the proxy path (without localhost:4000)
              //     const res = await fetch(`${API_URL}/api/submitScore`, {
              //       method: "POST",
              //       headers: { "Content-Type": "application/json" },
              //       body: JSON.stringify(newEntry)
              //     });

              //     console.log("Response status:", res.status);

              //     if (!res.ok) {
              //       const errText = await res.text();
              //       console.error("❌ Server error response:", errText);
              //       throw new Error(`Server returned ${res.status}: ${errText}`);
              //     }

              //     const data = await res.json();
              //     console.log("✅ Score submitted successfully:", data);

              //     if (data.leaderboard) {
              //       setLeaderboard(data.leaderboard);
              //     }
              //   } catch (err) {
              //     console.error("❌ Full error details:", err);

              //     // Fallback: Update UI locally if backend fails
              //     const updatedLeaderboard = [...leaderboard, newEntry]
              //       .sort((a, b) => b.score - a.score);

              //     setLeaderboard(updatedLeaderboard);
              //     alert("Score saved locally (backend not available)");
              //   }

              //   setShowScore(false);
              //   setPlayerName('');
              //   setPlayerMessage('');
              //   setScore(0);
              //   setAttempts(0);
              // };

              const resetBall = useCallback(() => {
                setBallPosition({ x: 20, y: 85 });
                setBallVelocity({ x: 0, y: 0 });
                setBallRotation(0);
                setIsShootingAnimating(false);
              }, []);

              const checkScore = useCallback((x, y) => {
                if (x > 78 && x < 88 && y > 28 && y < 38) {
                  setScore(prev => prev + 1);
                  setNetSwaying(1);
                  setTimeout(() => setNetSwaying(0), 800);
                  return true;
                }
                return false;
              }, []);

              const animateBall = useCallback(() => {
                setBallPosition(prev => {
                  const newX = prev.x + ballVelocity.x;
                  const newY = prev.y + ballVelocity.y;

                  if (newX < 0 || newX > 95 || newY > 90) {
                    setTimeout(() => resetBall(), 200);
                    return prev;
                  }

                  if (checkScore(newX, newY)) {
                    setTimeout(() => resetBall(), 800);
                  }

                  if (newY < 0) {
                    setTimeout(() => resetBall(), 500);
                  }

                  return { x: newX, y: newY };
                });

                setBallVelocity(prev => ({
                  x: prev.x * 0.985,
                  y: prev.y + 0.6
                }));

                setBallRotation(prev => prev + Math.abs(ballVelocity.x) * 8);
              }, [ballVelocity.x, ballVelocity.y, checkScore, resetBall]);

              useEffect(() => {
                if (isShootingAnimating) {
                  animationRef.current = setInterval(animateBall, 50);
                } else {
                  clearInterval(animationRef.current);
                }

                return () => clearInterval(animationRef.current);
              }, [isShootingAnimating, animateBall]);

              const shootBall = (e) => {
                if (isShootingAnimating) return;

                const rect = gameRef.current.getBoundingClientRect();
                const clickX = ((e.clientX - rect.left) / rect.width) * 100;
                const clickY = ((e.clientY - rect.top) / rect.height) * 100;

                const velocityX = (clickX - ballPosition.x) * 0.12;
                const velocityY = (clickY - ballPosition.y) * 0.12;

                setBallVelocity({ x: velocityX, y: velocityY });
                setIsShootingAnimating(true);
                setAttempts(prev => prev + 1);
              };

              const resetGame = () => {
                setScore(0);
                setAttempts(0);
                resetBall();
                setGameActive(false);
                setShowScore(false);
              };

              const contactLinks = [
                { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/anahat-kc/', command: 'open -a "LinkedIn"' },
                { icon: <Github className="w-5 h-5" />, label: 'GitHub', url: 'https://github.com/Anahat07', command: 'git clone github.com/yourprofile' },
                { icon: <Mail className="w-5 h-5" />, label: 'Email', url: 'mailto:anahat.chhatwal@uwaterloo.ca', command: 'mail -s "Hello" anahat.chhatwal@uwaterloo.ca' },
                { icon: <Download className="w-5 h-5" />, label: 'Resume', url: 'https://drive.google.com/file/d/1Aen7bmxN66EUNmmL-9ETTXZfbU5giEa1/view?usp=sharing', command: 'curl -O /path/to/resume.pdf' }
              ];

              return (
                <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500 text-gray-800 dark:text-green-400">
                  {/* NAV */}
                  <nav className="w-full flex flex-col items-center pb-4 gap-2 pt-8">
                    <div className="w-full border-b border-[#4f5a3c] flex flex-col items-center pb-4">
                      <h1 className="text-2xl font-bold text-foreground dark:text-white font-mono">&gt; contact</h1>
                      <div className="flex justify-center gap-8 text-sm sm:text-base font-mono">
                        {["about", "projects", "experiences", "contact"].map(item => (
                          <Link key={item} to={item === "about" ? "/" : `/${item}`} className="text-foreground dark:text-white relative group">
                            <span className="group-hover:underline group-hover:animate-flicker transition-colors duration-300">{item}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </nav>

                  <div className="container mx-auto px-4 py-8 lg:py-16">
                    {/* Terminal Header */}
                    <div className="mb-8 p-6 rounded-lg bg-[#383E30] dark:bg-background-light font-mono shadow-lg">
                      <div className="flex items-center mb-4">
                        <Terminal className="text-green-300 dark:text-[#566246] w-5 h-5 mr-2" />
                        <span className="text-sm text-green-300 dark:text-[#566246] opacity-75">user@portfolio:~/contact$</span>
                      </div>
                      <div className="text-2xl lg:text-4xl text-green-400 font-bold mb-2">
                        <span className="animate-pulse">$</span> whoami --contact
                      </div>
                      <div className="text-sm text-white dark:text-black opacity-75">
                        Establishing connection to social networks...
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Contact Section */}
                      <div className="p-6 rounded-lg bg-[#383E30] dark:bg-background-light font-mono">
                        <h2 className="text-xl lg:text-2xl font-bold mb-6 flex items-center text-green-400">
                          <Zap className="w-6 h-6 mr-2 text-green-400" />
                          ./connect_with_me.sh
                        </h2>

                        <div className="space-y-4">
                          {contactLinks.map((link, index) => (
                            <div key={index} className="group">
                              <div className="text-xs mb-1 opacity-60 text-white dark:text-black">
                                $ {link.command}
                              </div>
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-white dark:text-black space-x-3 p-3 rounded transition-colors duration-500 transition-transform duration-300 hover:bg-background-light hover:text-[#383E30] dark:hover:bg-[#383E30] dark:hover:text-white border border-gray-200 dark:border-[#383E30] group-hover:scale-105"
                              >
                                <span className="transition-transform duration-300 group-hover:scale-110">
                                  {link.icon}
                                </span>
                                <span className="font-semibold">{link.label}</span>
                                <span className="text-xs opacity-50 ml-auto">
                                  [{link.label.toLowerCase()}_established]
                                </span>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Basketball Game Section */}
                      <div className="p-6 rounded-lg bg-[#383E30] dark:bg-background-light font-mono">
                        <h2 className="text-lg lg:text-xl font-bold mb-4 flex items-center text-green-400">
                          <Target className="w-6 h-6 mr-2 text-green-400" />
                          ./basketball_game.exe
                        </h2>

                        <p className="mb-6 text-sm text-green-400 dark:text-black">
                          I love basketball, so I couldn’t resist adding this mini-game 🏀. Launch the ball, make every shot count, and see if you can climb the leaderboard higher than me!
                        </p>

                        {!gameActive ? (
                          <button
                            onClick={() => setGameActive(true)}
                            className="w-full py-3 px-6 rounded font-semibold transition-colors duration-500 transition-transform duration-300 bg-green-400 hover:bg-green-300 dark:bg-green-600 dark:hover:bg-green-500 hover:scale-105"
                          >
                            START GAME
                          </button>
                        ) : (
                          <div className="space-y-4">
                            {/* Game Stats */}
                            <div className="flex justify-between text-sm text-white dark:text-black">
                              <span>Score: {score}</span>
                              <span>Shots: {attempts}</span>
                            </div>

                            {/* Game Canvas */}
                            <div
                              ref={gameRef}
                              onClick={shootBall}
                              className="relative w-full h-80 rounded border-2 cursor-crosshair bg-gradient-to-b from-sky-200 to-green-300 dark:from-gray-700 dark:to-green-900 border-green-400 overflow-hidden"
                            >
                              {/* Court Floor */}
                              <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-amber-600 to-amber-500 dark:from-amber-800 dark:to-amber-700"></div>

                              {/* Court Lines */}
                              <div className="absolute inset-0 text-white dark:text-green-200">
                                <div className="absolute bottom-16 right-20 w-16 h-0.5 bg-current opacity-80"></div>
                                <div className="absolute right-8 bottom-12 w-20 h-20 border-2 border-current rounded-full opacity-60" style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }}></div>
                              </div>

                              {/* Backboard */}
                              <div className="absolute right-8 top-16 w-1 h-16 bg-white dark:bg-gray-300 shadow-md"></div>

                              {/* Basketball Hoop Ring */}
                              <div className="absolute right-12 top-24">
                                <div className="w-12 h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 rounded-full shadow-lg relative">
                                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-600 to-red-500 rounded-full opacity-30"></div>
                                  <div className="absolute -top-0.5 left-1 w-2 h-3 bg-gray-700 rounded-sm"></div>
                                  <div className="absolute -top-0.5 right-1 w-2 h-3 bg-gray-700 rounded-sm"></div>
                                </div>

                                {/* Basketball Net */}
                                <div className="relative w-12 h-8 overflow-hidden">
                                  {[...Array(8)].map((_, i) => (
                                    <div
                                      key={i}
                                      className="absolute w-0.5 bg-white dark:bg-gray-200 shadow-sm"
                                      style={{
                                        left: `${12 + i * 10}%`,
                                        height: '32px',
                                        transformOrigin: 'top center',
                                        transform: `rotate(${netSwaying * (i % 2 === 0 ? 5 : -5)}deg)`,
                                        transition: 'transform 0.8s ease-out',
                                        opacity: 0.9
                                      }}
                                    />
                                  ))}
                                  <div className="absolute top-2 left-1 w-10 h-0.5 bg-white dark:bg-gray-200 opacity-60 transform rotate-12"></div>
                                  <div className="absolute top-4 left-1 w-10 h-0.5 bg-white dark:bg-gray-200 opacity-60 transform -rotate-12"></div>
                                  <div className="absolute top-6 left-1 w-10 h-0.5 bg-white dark:bg-gray-200 opacity-60 transform rotate-12"></div>
                                </div>
                              </div>

                              {/* Basketball */}
                              <div
                                className="absolute w-6 h-6 transition-transform duration-75 shadow-xl z-10"
                                style={{
                                  left: `${ballPosition.x}%`,
                                  top: `${ballPosition.y}%`,
                                  transform: `translate(-50%, -50%) rotate(${ballRotation}deg)`,
                                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                                }}
                              >
                                <div className="w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700 rounded-full relative">
                                  <div className="absolute inset-0 rounded-full border-2 border-gray-800 opacity-40"></div>
                                  <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-800 opacity-60 transform -translate-x-1/2"></div>
                                  <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-800 opacity-60 transform -translate-y-1/2"></div>
                                  <div className="absolute top-1 left-1 w-2 h-2 bg-orange-200 rounded-full opacity-70"></div>
                                </div>
                              </div>

                              {!isShootingAnimating && (
                                <div className="absolute bottom-4 left-4 text-xs opacity-60 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                                  Click to aim and shoot!
                                </div>
                              )}
                            </div>

                            {/* Game Controls */}
                            <div className="flex gap-2">
                              <button
                                onClick={resetGame}
                                className="flex-1 py-2 px-4 rounded text-sm transition-colors duration-500 bg-green-400 hover:bg-green-300 dark:bg-green-500 dark:hover:bg-green-400 text-black"
                              >
                                RESET
                              </button>
                              {/* <button
                                onClick={() => setShowScore(true)}
                                disabled={score === 0}
                                className={`flex-1 py-2 px-4 rounded text-sm transition-colors duration-500 ${score > 0
                                  ? 'bg-green-400 hover:bg-green-300 dark:bg-green-500 dark:hover:bg-green-400 text-black'
                                  : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                                  }`}
                              >
                                SUBMIT SCORE
                              </button> */}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
  <footer className="w-full py-4 text-center text-sm text-[#383E30] dark:text-[#EEE2DC] mt-8">
    <div className="flex items-center justify-center gap-3 mb-3 font-mono text-sm">
      <a
        href="https://cs.uwatering.com/https://anahat-chhatwal.vercel.app/?nav=prev"
        className="hover:opacity-70 transition"
        aria-label="Previous site"
      >
        ←
      </a>

      <a
        href="https://cs.uwatering.com/https://anahat-chhatwal.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="CS Webring"
      >
        <img
          src="https://cs.uwatering.com/icon.white.svg"
          alt="CS Webring"
          className="w-5 opacity-80 hover:opacity-100 transition"
        />
      </a>

      <a
        href="https://cs.uwatering.com/https://anahat-chhatwal.vercel.app/?nav=next"
        className="hover:opacity-70 transition"
        aria-label="Next site"
      >
        →
      </a>
    </div>

    © 2025 — made with <span className="text-[#383E30]">❤️</span> by Anahat
  </footer>

                    {/* Leaderboard
                    <div className="mt-8 p-6 rounded-lg bg-[#383E30] dark:bg-background-light font-mono">
                      <h3 className="text-green-400 dark:text-green-400 font-bold mb-4 flex items-center">
                        <Trophy className="w-5 h-5 mr-2" />
                        High Scores Database
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-300 dark:border-green-700">
                              <th className="text-left py-2 text-white dark:text-black">Rank</th>
                              <th className="text-left py-2 text-white dark:text-black">Player</th>
                              <th className="text-left py-2 text-white dark:text-black">Score</th>
                              <th className="text-left py-2 text-white dark:text-black">Message</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leaderboard.map((entry, index) => (
                              <tr key={index} className="border-b border-gray-200 dark:border-green-800">
                                <td className="py-2 text-white dark:text-black">#{index + 1}</td>
                                <td className="py-2 text-white dark:text-black">{entry.name}</td>
                                <td className="py-2 text-white dark:text-black">{entry.score}</td>
                                <td className="py-2 text-white dark:text-black">{entry.message}</td>
                                {/* <td>
                                  <button 
                                    onClick={() => deleteEntry(index)}
                                    className="text-red-500 hover:underline text-xs"
                                  >
                                    Delete
                                  </button>
                                </td> */}
                    {/* </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div> */}

                    {/* Score Submission Modal
                    {showScore && (
                      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                        <div className="p-6 rounded-lg bg-[#383E30] dark:bg-background-light font-mono max-w-sm w-full">
                          <h3 className="text-white dark:text-black font-bold mb-4">Submit Your Score</h3>
                          <p className="mb-4 text-white dark:text-black">Score: {score} baskets made from {attempts} shots</p>
                          <input
                            type="text"
                            placeholder="Enter your name"
                            value={playerName}
                            onChange={e => setPlayerName(e.target.value)}
                            className="w-full p-3 rounded border mb-4 bg-gray-50 border-gray-300 text-gray-800 font-mono"
                          />
                          <div className="mb-4">
                            <input
                              type="text"
                              placeholder="Optional: Add a message"
                              value={playerMessage}
                              onChange={e => setPlayerMessage(e.target.value)}
                              className="w-full p-3 rounded border mb-2 bg-gray-50 border-gray-300 text-gray-800 font-mono"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setShowScore(false)} className="flex-1 py-2 px-4 rounded transition-colors duration-500 bg-green-400 hover:bg-green-300 dark:bg-green-500 dark:hover:bg-green-400 text-black">Cancel</button>
                            <button onClick={submitScore} disabled={!playerName.trim()} className={`flex-1 py-2 px-4 rounded transition-colors duration-500 ${playerName.trim() ? 'bg-green-400 hover:bg-green-300 dark:bg-green-500 dark:hover:bg-green-400 text-black' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}>Submit</button>
                          </div>
                        </div>
                      </div>
                    )} */}
                  </div>
                </div>

              );
            };

            export default ContactPage;