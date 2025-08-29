import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For animations
import { Link } from "react-router-dom"; // For navigation links

// Importing project data arrays categorized by type
import { personalProjects } from "../data/PersonalProjects";
import { schoolProjects } from "../data/SchoolProjects";
import { communityProjects } from "../data/CommunityProjects";
import { hackathonProjects } from "../data/HackathonProjects";

// Define project categories shown in drawer
const categories = ["Personal", "School", "Hackathons", "Community"];

// Map category names to corresponding project data arrays
const projectCategories = {
  Personal: personalProjects,
  School: schoolProjects,
  Community: communityProjects,
  Hackathons: hackathonProjects
};

// Animation variants for folder hover effect
const folderVariants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -10,
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 },
  },
};

const ProjectsPage = () => {
  // State to track which category is currently active/open
  const [activeCategory, setActiveCategory] = useState(null);
  // Currently selected project for modal display
  const [selectedProject, setSelectedProject] = useState(null);
  // Index of the current image shown in project image carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Advance to next image, cycling back to start
  const nextImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedProject.images.length
      );
    }
  };

  // Go to previous image, cycling to end if at first
  const prevImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length
      );
    }
  };

  return (
    <div className="min-h-screen w-full px-4 sm:px-8 py-8 sm:py-12 bg-background-light dark:bg-background-dark transition-colors duration-500">
      {/* Main container with responsive padding and dark mode support */}

      {/* Navigation Bar */}
      <nav className="w-[90%] flex flex-col items-center border-b border-[#4f5a3c] pb-4 mb-8 gap-2 mx-auto">
        {/* Page title */}
        <h1 className="text-2xl font-bold text-foreground dark:text-white font-mono">
          &gt; projects
        </h1>

        {/* Navigation links */}
        <div className="flex-1 flex justify-center gap-8 text-sm sm:text-base font-mono">
          {["about", "projects", "experiences", "contact"].map((item) => (
            <Link
              key={item}
              to={item === "about" ? "/" : `/${item}`}
              className="text-foreground dark:text-white relative group"
            >
              {/* Underline and flicker effect on hover */}
              <span className="group-hover:underline group-hover:animate-flicker transition-all duration-300">
                {item}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex flex-col items-center justify-center">
        {/* Page subtitle */}
        <p className="text-center font-bold text-2xl sm:text-3xl font-mono mb-10 text-foreground dark:text-white">
          Crafted with Code and Curiosity
        </p>

        {/* Drawer and Folder Window Container */}
        <div className="w-full flex flex-col sm:flex-row sm:justify-center sm:items-start gap-0 transition-all duration-500">

          {/* Drawer Section */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: activeCategory ? -20 : 0 }} // Slight slide left when a category is active
            transition={{ type: "spring", stiffness: 80 }}
            className="relative w-full sm:w-[400px] mx-auto"
          >
            {/* Drawer shadow for depth */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-5 bg-black/30 rounded-full blur-md z-0" />

            {/* Drawer body styled with perspective transform for 3D effect */}
            <div
              className="relative bg-[#3a3f30] dark:bg-background-light border-[6px] border-[#262b20] rounded-b-[12px] rounded-t-[4px] overflow-hidden shadow-[8px_12px_20px_rgba(0,0,0,0.4)] dark:shadow-[8px_12px_20px_rgba(255,255,255,0.08)] z-10"
              style={{
                transform: 'perspective(1000px) rotateX(10deg)',
                transformOrigin: 'top',
              }}
            >
              {/* Top gradient face for styling */}
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-b from-[#4c5140] to-transparent rounded-t-md z-20" />

              {/* Folder buttons for each project category */}
              <div className="p-12 pt-12 flex flex-col gap-4 items-center">
                {categories.map((category) => (
                  <motion.div
                    key={category}
                    className={`relative w-full max-w-[400px] px-6 py-3 rounded-t-lg cursor-pointer text-center font-mono text-lg bg-[#6b7b58] dark:bg-[#a9b79c] text-white dark:text-[#383e30] shadow-md hover:shadow-lg ${
                      activeCategory === category
                        ? "ring-2 ring-white dark:ring-[#383e30]"
                        : ""
                    }`}
                    variants={folderVariants}
                    initial="initial"
                    whileHover="hover"
                    onClick={() => {
                      // Toggle category open/close, reset selected project when toggling
                      setActiveCategory(activeCategory === category ? null : category);
                      setSelectedProject(null);
                    }}
                  >
                    {/* Top styling highlight */}
                    <div className="absolute -top-2 left-0 w-1/3 h-2 rounded-t-md bg-[#4f5a3c] dark:bg-[#c0d1b2]" />
                    <span>{category}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Folder Window Section */}
          {activeCategory && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: -120 }} // Slide in and fade in on open
              transition={{ type: "spring", stiffness: 50, damping: 14 }}
              className="mt-10 sm:mt-0 w-full sm:w-[650px] rounded-xl shadow-lg bg-white dark:bg-[#2f3327] overflow-hidden"
            >
              {/* Mac-style window control bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#8f9a81]">
                <div className="flex space-x-2">
                  {/* Close, minimize, maximize buttons */}
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                {/* Window title showing active category */}
                <span className="font-mono text-sm text-white">
                  {activeCategory.toLowerCase()}_projects — anahat.dev
                </span>
                <div className="w-6" /> {/* Spacer */}
              </div>

              {/* Projects grid */}
              <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 bg-[#383e30] dark:bg-background-light">
                {projectCategories[activeCategory]?.map((project, idx) => (
                  <div
                    key={idx}
                    className="relative flex flex-col items-center justify-center text-center bg-[#6b7b58] dark:bg-[#a9b79c] text-white dark:text-[#2f3327] font-mono rounded-t-[12px] rounded-b-[6px] shadow-md px-2 py-6 cursor-pointer hover:scale-105 transition"
                    onClick={() => {
                      // Select project and reset image carousel index on click
                      setSelectedProject(project);
                      setCurrentImageIndex(0);
                    }}
                  >
                    {/* Decorative top band */}
                    <div className="absolute -top-2 left-0 w-10 h-3 rounded-t-[6px] bg-[#4f5a3c] dark:bg-[#c0d1b2]" />
                    <span className="text-sm font-semibold">{project.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal for displaying selected project details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-[#383e30] text-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto font-mono"
            >
              {/* Modal content container */}
              <div className="relative">

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-0 right-4 text-2xl sm:text-3xl text-white dark:text-white hover:text-[#383E30] focus:outline-none z-50"
                  aria-label="Close Modal"
                >
                  ✕
                </button>

                {/* Terminal-style header for modal */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#8f9a81]">
                  <div className="flex space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm text-white">
                    {selectedProject.title}.dev — terminal
                  </span>
                  <div className="w-6" /> {/* Spacer */}
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-4">
                  {/* Image carousel for project screenshots */}
                  {selectedProject.images?.length > 0 && (
                    <div className="relative">
                      <img
                        src={selectedProject.images[currentImageIndex]}
                        alt={selectedProject.title}
                        className="max-w-[400px] max-h-[250px] mx-auto object-contain rounded"
                      />
                      {/* Carousel controls if multiple images */}
                      {selectedProject.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 px-2 py-1 rounded-full hover:bg-black"
                          >
                            ◀
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 px-2 py-1 rounded-full hover:bg-black"
                          >
                            ▶
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* List key features of the project */}
                  {selectedProject.features && (
                    <div className="bg-[#383e30] p-4 rounded border border-white">
                      <h3 className="text-lg text-[#8f9a81] font-bold mb-2">Key Features</h3>
                      <ul className="list-disc list-inside">
                        {selectedProject.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Show tech stack used in the project */}
                  {selectedProject.techStack && (
                    <div className="bg-[#383e30] p-4 rounded border border-white">
                      <h3 className="text-lg text-[#8f9a81] font-bold mb-2">Tech Stack</h3>
                      <p>{selectedProject.techStack.join(", ")}</p>
                    </div>
                  )}

                  {/* External links section */}
                  {(selectedProject.links?.github ||
                    selectedProject.links?.website ||
                    selectedProject.links?.devpost ||
                    selectedProject.links?.demo) && (
                    <div className="flex flex-wrap gap-4">
                      {selectedProject.links.github && (
                        <a
                          href={selectedProject.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#8f9a81] text-white rounded hover:bg-[#566246]"
                        >
                          GitHub
                        </a>
                      )}
                      {selectedProject.links.devpost && (
                        <a
                          href={selectedProject.links.devpost}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#8f9a81] text-white rounded hover:bg-[#566246]"
                        >
                          Devpost
                        </a>
                      )}
                      {selectedProject.links.website && (
                        <a
                          href={selectedProject.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#8f9a81] text-white rounded hover:bg-[#566246]"
                        >
                          Website
                        </a>
                      )}
                      {selectedProject.links.demo && (
                        <a
                          href={selectedProject.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#8f9a81] text-white rounded hover:bg-[#566246]"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;
