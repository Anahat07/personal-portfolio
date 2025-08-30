import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Star, Globe, Github, Linkedin } from 'lucide-react';
import { Link } from "react-router-dom";
import { experiences } from "../data/Experiences";

const ROAD_HEIGHT = 18;                // thick road
const ROAD_START_OFFSET = 72;          // space on the left for the arrow
const CARD_SPACING = 360;              // spacing between items
const ROAD_EXTRA_END = 600;            // extra room at the end for the chip
const ROAD_END_MARGIN = 150; // space between road end and chip

const ExperiencesPage = ({ isDarkMode }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleExperiences, setVisibleExperiences] = useState(new Set());
  const [carPositionPx, setCarPositionPx] = useState(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  // total width of the road/timeline
  const roadWidth = ROAD_START_OFFSET + experiences.length * CARD_SPACING + ROAD_EXTRA_END - ROAD_END_MARGIN;

  const typeColors = {
    work: "bg-blue-500",
    education: "bg-green-500",
    achievement: "bg-yellow-500",
    project: "bg-purple-500",
    leadership: "bg-red-500"
  };

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;

      const progress = (scrollLeft) / Math.max(1, (scrollWidth - clientWidth));
      setScrollProgress(Math.min(Math.max(progress, 0), 1));

      // how much the content can actually scroll
      const maxScroll = scrollWidth - clientWidth;

      // map scrollLeft directly to road travel
      const roadTravel = roadWidth - ROAD_START_OFFSET - 16; // subtract ~car width tweak
      const carX = ROAD_START_OFFSET + (scrollLeft / maxScroll) * roadTravel;

      setCarPositionPx(carX);

      // visibility of cards (when near viewport)
      const newVisible = new Set();
      const cards = el.querySelectorAll('[data-experience-id]');
      const viewport = el.getBoundingClientRect();
      cards.forEach(node => {
        const r = node.getBoundingClientRect();
        if (r.left < viewport.right - 100) {
          newVisible.add(parseInt(node.dataset.experienceId, 10));
        }
      });
      setVisibleExperiences(newVisible);
    };

    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, [roadWidth]);

  const Car = () => (
    <div className="relative">
      <div className="w-16 h-10 bg-[#566246] dark:bg-[#8F9A81] rounded-lg relative shadow-lg">
        <div className="absolute top-1 left-2 w-3 h-2 bg-[#8F9A81] dark:bg-[#566246] rounded opacity-70"></div>
        <div className="absolute top-1 right-2 w-3 h-2 bg-[#8F9A81] dark:bg-[#566246] rounded opacity-70"></div>
        <div className="absolute -top-1 left-3 right-3 h-4 bg-gray-700 dark:bg-gray-300 rounded-t-lg"></div>
        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
          <div className="w-4 h-4 bg-[#8F9A81] rounded-full"></div>
        </div>
      </div>
      <div className="absolute -bottom-2 left-1 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600">
        <div className="w-2 h-2 bg-gray-600 rounded-full absolute top-1 left-1 animate-spin"></div>
      </div>
      <div className="absolute -bottom-2 right-1 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600">
        <div className="w-2 h-2 bg-gray-600 rounded-full absolute top-1 left-1 animate-spin"></div>
      </div>
    </div>
  );

  const CardContent = ({ experience }) => (
    <div className="bg-[#8F9A81] dark:bg-background-light 
                    rounded-lg p-4 shadow-xl hover:shadow-2xl transition-colors duration-500 transition-shadow duration-300 w-64">
      <div className="flex items-start justify-between mb-2">
        <div className={`p-2 rounded-md ${typeColors[experience.type]} text-white`}>
          {experience.icon}
        </div>
        <div className="text-xs text-[#383E30] dark:text-gray-500 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {experience.date}
        </div>
      </div>
      <h3 className="text-base font-bold text-white dark:text-gray-900 mb-1">
        {experience.title}
      </h3>
      <p className="text-xs text-[#383E30] dark:text-blue-600 font-medium mb-1">{experience.company}</p>
      <p className="text-xs text-[#383E30] dark:text-gray-500 mb-2 flex items-center gap-1">
        <MapPin className="w-3 h-3" />
        {experience.location}
      </p>
      <p className="text-xs text-white dark:text-gray-700 mb-3">{experience.description}</p>
      <div className="p-1 rounded-md bg-[#566246] dark:bg-green-100 mb-2 flex items-center gap-2">
        <Star className="w-4 h-4 text-gray-300 dark:text-green-600" />
        <span className="text-xs text-gray-300 dark:text-green-700">{experience.achievement}</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {experience.skills.map((skill, i) => (
          <span key={i} className="px-2 py-0.5 text-[11px] rounded-full bg-[#566246] dark:bg-gray-100 text-gray-300 dark:text-gray-700">
            {skill}
          </span>
        ))}
      </div>
      {experience.links && experience.links.length > 0 && (
        <div className="flex gap-3 mt-3">
          {experience.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-[#566246] dark:bg-gray-200 hover:scale-110 transition-transform"
            >
              {link.type === "website" && <Globe className="w-4 h-4 text-white dark:text-gray-800" />}
              {link.type === "github" && <Github className="w-4 h-4 text-white dark:text-gray-800" />}
              {link.type === "linkedin" && <Linkedin className="w-4 h-4 text-white dark:text-gray-800" />}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  const ExperienceCard = ({ experience, index, isVisible }) => {
    const isAbove = index % 2 === 0; // alternate above/below
    const verticalOffset = 160;      // distance in px from the road (tweak as needed)

    return (
      <div
        data-experience-id={experience.id}
        className={`absolute flex flex-col items-center shrink-0 transition-[opacity,transform] duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{
          width: CARD_SPACING,
          top: isAbove ? `calc(-${verticalOffset}px)` : `${verticalOffset}px`, // move whole bundle up/down
          position: "relative"
        }}
      >
        {/* Card above */}
        {isAbove && <CardContent experience={experience} />}

        {/* Dot always in middle of the bundle */}
        <div className={`w-6 h-6 rounded-full ${typeColors[experience.type]} border-4 
                       border-[#0b1220] dark:border-gray-100 shadow z-10 my-4`} />

        {/* Card below */}
        {!isAbove && <CardContent experience={experience} />}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-background-light dark:bg-background-dark pb-14">
      {/* NAV */}
      <nav className="w-full flex flex-col items-center pb-4 gap-2 pt-8">
        <div className="w-[95%] max-w-7xl border-b border-[#4f5a3c] flex flex-col items-center pb-4">
          <h1 className="text-2xl font-bold text-foreground dark:text-white font-mono">&gt; experiences</h1>
          <div className="flex justify-center gap-8 text-sm sm:text-base font-mono">
            {["about", "projects", "experiences", "contact"].map((item) => (
              <Link
                key={item}
                to={item === "about" ? "/" : `/${item}`}
                className="text-foreground dark:text-white relative group"
              >
                <span className="group-hover:underline group-hover:animate-flicker transition-colors duration-300">
                  {item}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <div className="relative pt-20 pb-8 px-4 sm:px-8">
        <p className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-foreground dark:text-white font-mono leading-snug">
          Follow the road through my experiences
        </p>
      </div>

      {/* TIMELINE - Fixed background issue */}
      <div className="relative w-full h-[105vh] bg-background-light dark:bg-background-dark">
        <div
          ref={containerRef}
          className="w-full h-full overflow-x-auto relative no-scrollbar pb-36"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* content row that's wider than the viewport */}
          <div
            ref={contentRef}
            className="relative h-full bg-background-light dark:bg-background-dark"
            style={{ width: Math.max(roadWidth, window.innerWidth) }}
          >
            {/* ROAD */}
            <div
              className="absolute left-0 top-[60%] -translate-y-1/2 rounded-full"
              style={{ width: roadWidth, height: ROAD_HEIGHT }}
            >
              {/* asphalt */}
              <div className="absolute inset-0 rounded-full bg-[#3b4454] dark:bg-gray-300" />
              {/* green progress paint (from left offset to car) */}
              <div
                className="absolute top-0 left-0 h-full rounded-l-full bg-[#566246] transition-[width] duration-150"
                style={{ width: Math.max(ROAD_START_OFFSET, carPositionPx) }}
              />
              {/* dashed center line */}
              <div
                className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] opacity-80 rounded"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, rgba(255,255,255,0) 0 22px, rgba(255,255,255,0.9) 22px 44px)',
                }}
              />
              {/* cut the left edge shorter to make room for arrow */}
              <div
                className="absolute left-0 top-0 h-full bg-background-light dark:bg-background-dark"
                style={{ width: ROAD_START_OFFSET - 24, borderTopRightRadius: 9999, borderBottomRightRadius: 9999 }}
              />
            </div>

            {/* CAR */}
            <div
              className="absolute top-[60%] -translate-y-1/2 z-20 transition-[left] duration-100"
              style={{ left: carPositionPx }}
            >
              <Car />
            </div>

            {/* EXPERIENCE CARDS ROW */}
            <div
              className="absolute top-[60%] -translate-y-1/2 flex items-center"
              style={{ left: ROAD_START_OFFSET }}
            >
              {experiences.map((experience, index) => (
                <div key={experience.id} className="mr-[40px]">
                  <ExperienceCard
                    experience={experience}
                    index={index}
                    isVisible={visibleExperiences.has(experience.id)}
                  />
                </div>
              ))}
              {/* END CHIP at right-most end */}
              <div
                className="absolute"
                style={{
                  left: ROAD_START_OFFSET + experiences.length * CARD_SPACING + ROAD_EXTRA_END - 100,
                  top: '60%', // Same as the road
                  transform: 'translateY(-50%)', // Same centering transform as the road
                }}
              >
                <div
                  className={`inline-flex items-center gap-3 px-10 py-4 rounded-full ${isDarkMode
                      ? 'bg-gray-800 text-white border-gray-700'
                      : 'bg-white text-gray-900 border-gray-200'
                    } border shadow-lg`}
                >
                  <span className="font-mono font-medium whitespace-nowrap">My journey continues...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="fixed bottom-4 left-4 z-50">
        <div className={`w-32 h-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
          <div className="h-full bg-[#566246] transition-[width] duration-300" style={{ width: `${scrollProgress * 100}%` }}></div>
        </div>
        <div className="text-xs text-black dark:text-white mt-1 font-mono">
          {Math.round(scrollProgress * 100)}% complete
        </div>
      </div>
    </div>
  );
};

export default ExperiencesPage;