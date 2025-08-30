import React from "react";
import { Briefcase, GraduationCap, Award, Code, Users } from "lucide-react";

export const experiences = [
  {
    id: 1,
    title: "High School Studnet",
    company: "Bur Oak Secondary School",
    location: "Markham, ON",
    date: "Sep 2021 - June 2025",
    type: "education",
    icon: <GraduationCap className="w-5 h-5" />,
    description: "Global Action Council (Co-Director), Breezecode (Co-Director), Energy SHSM",
    skills: [],
    achievement: "Community Involvement Award, Schulich Leaders Nominee"
  },
  {
    id: 2,
    title: "Assistant Punjabi Teacher",
    company: "Gursikh Sabha Canada",
    location: "Markham, ON",
    date: "Sep 2021 - July 2025",
    type: "leadership",
    icon: <Users className="w-5 h-5" />,
    description: "Assisted in teaching Punjabi and Sikhism values",
    skills: ["Teaching", "Cultural Education", "Event Planning", "Mentorship"],
    achievement: "Supported 100+ students"
  },
  {
    id: 3,
    title: "Instructor & FLL Mentor",
    company: "Envision Robotics",
    location: "Markham, ON",
    date: "July 2023 - July 2025",
    type: "work",
    icon: <Briefcase className="w-5 h-5" />,
    description: "Instructed youth in STEM and robotics",
    skills: ["Python", "3D Printing", "Game Dev", "Robotics", "Mentorship", "Coaching"],
    achievement: "Mentored FLL team; enhancing coding, teamwork, & design skills",
    links: [
      { type: "website", url: "https://envisionrobotics.com/" }
    ]
  },
  {
    id: 4,
    title: "AI Scholar",
    company: "Inspirit AI",
    location: "Remote",
    date: "Sep 2023 - Nov 2023",
    type: "education",
    icon: <GraduationCap className="w-5 h-5" />,
    description: "Learned core AI concepts",
    skills: ["Machine Learning", "NLP", "Neural Networks", "LSTMs", "Python"],
    achievement: "Built NLP tweet analyzer to predict stock market trends",
    links: [
      { type: "website", url: "https://www.inspiritai.com/" },
      { type: "linkedin", url: "https://www.linkedin.com/in/anahat-kc/details/experience/" }
    ]
  },
  {
    id: 5,
    title: "Research Fellow",
    company: "University of Toronto",
    location: "Toronto, ON",
    date: "Mar 2024",
    type: "leadership",
    icon: <Users className="w-5 h-5" />,
    description: "Explored computer graphics at DGP",
    skills: ["Computer Animation", "Blender", "Python", "NumPy", "SLERP"],
    achievement: "3D animations using interpolation and transformation techniques",
    links: [
      { type: "website", url: "https://www.dgp.toronto.edu/" }
    ]
  },
  {
    id: 6,
    title: "BudgetBites Project",
    company: "Moral Code Hackathon",
    location: "University of Toronto",
    date: "May 2024",
    type: "project",
    icon: <Code className="w-5 h-5" />,
    description: "Platform for discounted healthy groceries and personalized recipes",
    skills: ["HTML", "CSS", "JavaScript", "Chrome Extensions", "UX/UI Design"],
    achievement: "Top 4 Finalist",
    links: [
      { type: "website", url: "https://drive.google.com/file/d/1hGoxEAZxdoNydfPC5D4T8ZGZIR-wA068/view" },
      { type: "website", url: "https://drive.google.com/file/d/1iJ0l4zLRdTxNOFJd5irDw9XgyyE0WZNh/view" },
      { type: "github", url: "https://github.com/Anahat07/BudgetBites" },
      { type: "linkedin", url: "https://www.linkedin.com/posts/activity-7193799796040634369-Xn27/" }
    ]
  },
  {
    id: 7,
    title: "Co-Founder & Chair",
    company: "EmpowerED",
    location: "Markham, ON",
    date: "Jan 2024 - Present",
    type: "leadership",
    icon: <Users className="w-5 h-5" />,
    description: "Founded global non-profit; accessible STEM education for everyone",
    skills: ["Leadership", "Project Management", "Team Management"],
    achievement: "15+ events; 3000+ students",
    links: [
      { type: "website", url: "https://empower-ed.ca/" },
      { type: "github", url: "https://github.com/empowerEDu/EmpowerED" }
    ]
  },
  {
    id: 8,
    title: "Co-Founder & Writer",
    company: "MIND – The Math Blog",
    location: "Markham, ON",
    date: "May 2024 - Jul 2025",
    type: "leadership",
    icon: <Users className="w-5 h-5" />,
    description: "Articles exploring mathematical topics",
    skills: ["Writing", "Research", "Mathematics", "Blogging", "Community Engagement"],
    achievement: "600+ global readers",
    links: [
      { type: "website", url: "https://mindmathblog.wordpress.com/" }
    ]
  },
  {
    id: 9,
    title: "Youth Bringing Life to Human Rights Award",
    company: "YRP & United for Human Rights Canada",
    location: "Ontario, Canada",
    date: "Nov 2024",
    type: "achievement",
    icon: <Award className="w-5 h-5" />,
    description: "1st-place winner for contributions to human rights and community impact",
    skills: [],
    achievement: "$1,000 Scholarship Awarded",
    links: [
      { type: "linkedin", url: "https://www.linkedin.com/posts/activity-7263260266232979456-HhtA/" }
    ]
  },
  {
    id: 10,
    title: "Website Design Intern",
    company: "Digitera",
    location: "Remote",
    date: "Oct 2024 - Dec 2024",
    type: "work",
    icon: <Briefcase className="w-5 h-5" />,
    description: "Redesigned and optimised Prom Planner’s UI, improving usability and user experience",
    skills: ["React.js", "Laravel", "UX/UI Design", "HTML", "CSS"],
    achievement: "Enhanced platform functionality for high school users",
  },
  {
    id: 11,
    title: "Greg Goff Leadership Scholarship Winner",
    company: "National Society of High School Scholars (NSHSS)",
    location: "USA",
    date: "Dec 2024",
    type: "achievement",
    icon: <Award className="w-5 h-5" />,
    description: "One of 5 students awarded for leadership, community service, and positive impact",
    skills: [],
    achievement: "$2,000 USD scholarship"
  },
  {
    id: 12,
    title: "Aspirations in Computing National Award Winner",
    company: "NCWIT Ontario Affiliate",
    location: "Canada",
    date: "Apr 2025",
    type: "achievement",
    icon: <Award className="w-5 h-5" />,
    description: "Chosen from 300+ applicants for excellence in computing and advocacy for women in tech",
    skills: [],
    achievement: "National trophy at CAN-CWIC '25",
    links: [
      { type: "website", url: "https://www.aspirations.org/people/anahat-c/146307" }
    ]
  },
  {
    id: 13,
    title: "Micro Tech Grant",
    company: "DMZ and myBlueprint",
    location: "Toronto, ON",
    date: "June 2025",
    type: "achievement",
    icon: <Award className="w-5 h-5" />,
    description: "1 of 20 recipients for our NomNom app supporting domestic abuse survivors",
    skills: ["Mobile App Development", "UX/UI Design", "Social Impact"],
    achievement: "$500 Micro Tech Grant",
    links: [
      { type: "website", url: "https://funded-micro-grants-damianstory-damianstorys-projects.vercel.app/" }
    ]
  },
  {
    id: 14,
    title: "Sean Jackson Scholarship Recipient",
    company: "Meridian Credit Union",
    location: "Canada",
    date: "July 2025",
    type: "achievement",
    icon: <Award className="w-5 h-5" />,
    description: "Awarded the Sean Jackson Scholarship, recognizing exceptional innovation, leadership, and community impact",
    skills: [],
    achievement: "Awarded $10,000",
    links: [
      { type: "website", url: "https://www.instagram.com/p/DNGa-L9OIA-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" }
    ]
  },
  {
    id: 15,
    title: "CS/BBA Student",
    company: "University of Waterloo & Wilfrid Laurier University",
    location: "Waterloo, ON",
    date: "Sep 2025 - Present",
    type: "education",
    icon: <GraduationCap className="w-5 h-5" />,
    description: "Computer Science and Business Administration Double Degree",
    skills: [],
    achievement: "President's Scholarship of Distinction ($2000), Ted Rogers Future Leader Scholarship ($26,800)"
  }
];