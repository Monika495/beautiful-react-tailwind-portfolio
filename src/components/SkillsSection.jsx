import { useEffect, useRef, useState } from "react";

const skillGroups = [
  {
    label: "Languages",
    color: "#6366f1",
    icon: "💻",
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", dots: 5 },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", dots: 4 },
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", dots: 4 },
    ],
  },
  {
    label: "Web Development",
    color: "#06b6d4",
    icon: "🌐",
    skills: [
      { name: "HTML & CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", dots: 5 },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", dots: 4 },
      { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", dots: 4 },
    ],
  },
  {
    label: "AI & Automation",
    color: "#10b981",
    icon: "🤖",
    skills: [
      { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg", dots: 4 },
      { name: "Playwright", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg", dots: 4 },
      { name: "SQL / SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", dots: 4 },
    ],
  },
  {
    label: "Tools & Platforms",
    color: "#f59e0b",
    icon: "🛠️",
    skills: [
      { name: "Git & GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", dots: 5 },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", dots: 5 },
    ],
  },
];

// Dot level indicator (5 dots, filled = proficiency)
function DotLevel({ dots, color, animate }) {
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((d) => (
        <div
          key={d}
          className="rounded-full transition-all duration-500"
          style={{
            width: 7,
            height: 7,
            background: animate && d <= dots ? color : "var(--border)",
            boxShadow: animate && d <= dots ? `0 0 5px ${color}80` : "none",
            transitionDelay: animate ? `${d * 80}ms` : "0ms",
            transform: animate && d <= dots ? "scale(1)" : "scale(0.7)",
          }}
        />
      ))}
    </div>
  );
}

// Individual skill card
function SkillCard({ skill, color, index, groupVisible }) {
  return (
    <div
      className="bg-card border border-border/50 rounded-xl p-4 flex items-center gap-4 group cursor-default"
      style={{
        opacity: groupVisible ? 1 : 0,
        transform: groupVisible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 24px ${color}25, 0 0 0 1px ${color}25`;
        e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
        e.currentTarget.style.borderColor = `${color}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.borderColor = "";
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          background: `${color}15`,
          border: `1px solid ${color}25`,
        }}
      >
        <img
          src={skill.icon}
          alt={skill.name}
          className="w-6 h-6 object-contain"
          onError={(e) => { e.target.style.opacity = "0.3"; }}
        />
      </div>

      {/* Name + dots */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm mb-1.5 truncate">{skill.name}</p>
        <DotLevel dots={skill.dots} color={color} animate={groupVisible} />
      </div>

      {/* Label */}
      <span
        className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
        style={{ color }}
      >
        {["", "Beginner", "Basic", "Good", "Strong", "Expert"][skill.dots]}
      </span>
    </div>
  );
}

// Group block
function SkillGroup({ group }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-3">
      {/* Group label */}
      <div
        className="flex items-center gap-3 mb-5"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-16px)",
          transition: "all 0.5s ease",
        }}
      >
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg text-base"
          style={{ background: `${group.color}18`, border: `1px solid ${group.color}25` }}
        >
          {group.icon}
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: group.color }}>
            {group.label}
          </p>
          <div className="w-16 h-0.5 rounded-full mt-1" style={{ background: `${group.color}40` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {group.skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} color={group.color} index={i} groupVisible={visible} />
        ))}
      </div>
    </div>
  );
}

export const SkillsSection = () => {
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
    <section id="skills" className="py-24 px-4 relative bg-secondary/30 overflow-hidden">
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">
            Tools & Technologies
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Tech <span className="text-primary">Arsenal</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-sm mx-auto">
            Hover a card to see proficiency level
          </p>
        </div>

        <div className="space-y-12">
          {skillGroups.map((group) => (
            <SkillGroup key={group.label} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
};