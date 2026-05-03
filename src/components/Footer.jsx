import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

const socials = [
  {
    icon: Github,
    href: "https://github.com/Monika495",
    label: "GitHub",
    color: "#6366f1",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/monika-p-70a2b3293",
    label: "LinkedIn",
    color: "#06b6d4",
  },
  {
    icon: Mail,
    href: "mailto:monikaselvam0409@gmail.com",
    label: "Email",
    color: "#10b981",
  },
];

export const Footer = () => {
  return (
    <footer className="relative py-12 px-4 border-t border-border/50 overflow-hidden">
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)",
        }}
      />

      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Name / brand */}
          <a
            href="#hero"
            className="text-xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            Monika P
          </a>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground max-w-xs">
            Building real-world solutions with AI, automation & computer vision.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group relative w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.background = `${color}15`;
                  e.currentTarget.style.boxShadow = `0 4px 16px ${color}30`;
                  e.currentTarget.querySelector("svg").style.color = color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.background = "";
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.querySelector("svg").style.color = "";
                }}
              >
                <Icon size={16} className="text-muted-foreground transition-colors duration-300" />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-border/50" />

          {/* Copyright + scroll up */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Monika P · Built with React & Tailwind
            </p>

            <a
              href="#hero"
              className="group flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowUp
                size={14}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};