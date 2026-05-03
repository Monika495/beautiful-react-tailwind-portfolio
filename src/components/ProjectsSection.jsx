import { ArrowRight, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: 1,
    title: "GestureSense",
    description:
      "Computer vision-based system for real-time hand gesture detection. Built image processing pipeline using OpenCV and Flask for live recognition feedback.",
    image: "/projects/handgesture.png",
    tags: ["Python", "OpenCV", "Flask", "AI", "Computer Vision"],
    githubUrl: "https://github.com/Monika495/hand_gesture_recognition",
    accent: "#6366f1",
    icon: "👁️",
  },
  {
    id: 2,
    title: "Expense Analyzer",
    description:
      "Python GUI application for expense tracking and analysis. Provides visual breakdowns of income vs spending with database-backed data handling.",
    image: "/projects/expense.png",
    tags: ["Python", "Tkinter", "SQLite", "Data Visualization"],
    githubUrl: "https://github.com/Monika495/expense_analyzer",
    accent: "#06b6d4",
    icon: "📊",
  },
  {
    id: 3,
    title: "Nova QA — AI WebTester",
    description:
      "NLP-based web automation tool that converts natural language commands into automated test actions using Playwright and Gemini AI integration.",
    image: "/projects/automation.jpg",
    tags: ["AI", "NLP", "Flask", "Playwright", "Automation"],
    githubUrl: "https://github.com/Monika495/ai-webtester",
    accent: "#10b981",
    icon: "⚡",
  },
  {
    id: 4,
    title: "Dry Fog Handwashing Machine",
    description:
      "Touchless IoT sanitization system using ESP32 and sensors with piezoelectric energy harvesting for efficient power storage and utilization.",
    image: "/projects/iot.jpg",
    tags: ["IoT", "ESP32", "Sensors", "Embedded", "Python"],
    githubUrl: "#",
    accent: "#f59e0b",
    icon: "🌊",
  },
];

// 3D tilt card
function TiltCard({ project, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setVisible(true), index * 120);
      },
      { threshold: 0.12 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -12;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 12;
    setTilt({ x: rx, y: ry });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="relative group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(48px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="bg-card rounded-2xl overflow-hidden border border-border/50 h-full flex flex-col"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered
            ? "transform 0.1s ease"
            : "transform 0.5s cubic-bezier(.23,1,.32,1)",
          boxShadow: hovered
            ? `0 20px 60px -12px ${project.accent}40, 0 0 0 1px ${project.accent}20`
            : "0 4px 24px rgba(0,0,0,0.15)",
          willChange: "transform",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Project image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${project.accent}55 0%, transparent 60%)`,
            }}
          />
          {/* Icon badge */}
          <div
            className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{
              background: `${project.accent}25`,
              backdropFilter: "blur(10px)",
              border: `1px solid ${project.accent}40`,
            }}
          >
            {project.icon}
          </div>
          {/* Number */}
          <div
            className="absolute top-4 right-4 text-xs font-mono font-bold opacity-60"
            style={{ color: project.accent }}
          >
            0{project.id}
          </div>
        </div>

        {/* Top accent strip */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${project.accent}, ${project.accent}50)` }}
        />

        <div className="p-6 flex flex-col flex-1 gap-4">
          {/* Title */}
          <h3
            className="text-lg font-bold leading-snug transition-colors duration-300"
            style={{ color: hovered ? project.accent : undefined }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  background: `${project.accent}12`,
                  color: project.accent,
                  border: `1px solid ${project.accent}25`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* GitHub link only */}
          <div className="flex items-center justify-between pt-1 border-t border-border/30">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group/link"
            >
              <Github
                size={15}
                className="group-hover/link:rotate-12 transition-transform"
              />
              View Code
            </a>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: hovered ? project.accent : "transparent",
                border: `1px solid ${hovered ? project.accent : "var(--border)"}`,
              }}
            >
              <ArrowRight
                size={14}
                style={{ color: hovered ? "white" : undefined }}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </div>
          </div>
        </div>

        {/* Bottom accent glow line */}
        <div
          className="h-0.5 w-full transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}

export const ProjectsSection = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 space-y-4"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            What I've Built
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Featured{" "}
            <span className="text-primary relative">
              Projects
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                style={{ overflow: "visible" }}
              >
                <path
                  d="M0 6 Q100 0, 200 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-primary"
                  style={{
                    strokeDasharray: 210,
                    strokeDashoffset: headerVisible ? 0 : 210,
                    transition: "stroke-dashoffset 1s ease 0.5s",
                  }}
                />
              </svg>
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            AI, automation, IoT, and software projects built to solve real-world problems.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <TiltCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div
          className="text-center mt-14"
          style={{
            opacity: headerVisible ? 1 : 0,
            transition: "opacity 0.7s ease 0.8s",
          }}
        >
          <a
            href="https://github.com/Monika495"
            target="_blank"
            rel="noopener noreferrer"
            className="cosmic-button inline-flex items-center gap-2 group"
          >
            <Github size={16} />
            View All on GitHub
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
};