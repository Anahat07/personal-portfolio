import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Routes, Route } from "react-router-dom";
import Terminal from "./components/Terminal";
import ProjectsPage from "./components/ProjectsPage";
import ContactPage from "./components/ContactPage";
import ExperiencesPage from "./components/ExperiencesPage";

function App() {
  const [isDark, setIsDark] = useState(false);


  useEffect(() => {
    const defaultTitle = "Anahat Chhatwal";
    const awayTitle = ">  return() pls :(";

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = awayTitle;
      } else {
        document.title = defaultTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500 flex flex-col items-center justify-center relative"
      style={{ cursor: 'url("/cursors/cursor.png") 0 0, auto' }}>
        
        {/* Toggle Button - top right */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="fixed top-4 right-4 z-50 bg-primary-dark dark:bg-primary-light text-white p-2 rounded-full shadow-md transition duration-300 hover:scale-105"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Terminal />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;