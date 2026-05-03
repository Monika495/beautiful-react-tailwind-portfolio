import { useEffect, useRef, useState } from "react";

function useTypewriter(words, speed = 75, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setCharIdx(0);
          setWordIdx((w) => (w + 1) % words.length);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

function MagneticBtn({ children, href, className }) {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
    el.style.transform = `translate(${dx}px,${dy}px)`;
  };
  const handleMouseLeave = () => {
    ref.current.style.transform = "translate(0,0)";
    ref.current.style.transition = "transform 0.5s cubic-bezier(.23,1,.32,1)";
  };
  const handleMouseEnter = () => {
    ref.current.style.transition = "transform 0.1s ease";
  };
  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </a>
  );
}

function DotGrid() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let mouse = { x: -1000, y: -1000 };
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    window.addEventListener("mousemove", onMove);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const sp = 36;
      const cols = Math.ceil(canvas.width / sp) + 1;
      const rows = Math.ceil(canvas.height / sp) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * sp;
          const y = r * sp;
          const dist = Math.hypot(mouse.x - x, mouse.y - y);
          const force = Math.max(0, 1 - dist / 120);
          const angle = Math.atan2(y - mouse.y, x - mouse.x);
          const ox = Math.cos(angle) * force * 14;
          const oy = Math.sin(angle) * force * 14;
          ctx.beginPath();
          ctx.arc(x + ox, y + oy, 1.2 + force * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99,102,241,${0.15 + force * 0.5})`;
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.65 }}
    />
  );
}

function AnimatedAvatar() {
  return (
    <div className="relative flex items-center justify-center w-full h-full select-none">

      <div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          border: "1.5px dashed rgba(99,102,241,0.25)",
          animation: "avatarSpin 24s linear infinite",
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: 268,
          height: 268,
          border: "1px solid rgba(6,182,212,0.18)",
          animation: "avatarSpin 16s linear infinite reverse",
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: 236,
          height: 236,
          border: "2px solid rgba(99,102,241,0.15)",
          animation: "avatarPulseRing 3s ease-in-out infinite",
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: 210,
          height: 210,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(6,182,212,0.10) 55%, transparent 80%)",
          animation: "avatarGlow 4s ease-in-out infinite",
        }}
      />

      <div
        className="relative z-10 rounded-full overflow-hidden"
        style={{
          width: 192,
          height: 192,
          border: "3px solid rgba(99,102,241,0.55)",
          boxShadow:
            "0 0 0 6px rgba(99,102,241,0.08), 0 0 40px rgba(99,102,241,0.28), 0 0 80px rgba(6,182,212,0.10)",
          animation: "avatarFloat 5s ease-in-out infinite",
        }}
      >
        <img
          src="/profile.jpg"
          alt="Monika P"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
          }}
        />
      </div>

      <div
        className="absolute rounded-full"
        style={{
          width: 10,
          height: 10,
          background: "rgba(99,102,241,0.85)",
          boxShadow: "0 0 8px rgba(99,102,241,0.7)",
          top: "50%",
          left: "50%",
          transformOrigin: "0 0",
          animation: "orbitA 8s linear infinite",
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: 7,
          height: 7,
          background: "rgba(6,182,212,0.85)",
          boxShadow: "0 0 8px rgba(6,182,212,0.6)",
          top: "50%",
          left: "50%",
          transformOrigin: "0 0",
          animation: "orbitB 12s linear infinite reverse",
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: 6,
          height: 6,
          background: "rgba(244,114,182,0.8)",
          boxShadow: "0 0 6px rgba(244,114,182,0.6)",
          top: "50%",
          left: "50%",
          transformOrigin: "0 0",
          animation: "orbitC 10s linear infinite",
        }}
      />

      <style>{`
        @keyframes avatarSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes avatarPulseRing {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.04); }
        }
        @keyframes avatarGlow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.06); }
        }
        @keyframes avatarFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes orbitA {
          from { transform: rotate(0deg)   translateX(150px) translateY(-5px); }
          to   { transform: rotate(360deg) translateX(150px) translateY(-5px); }
        }
        @keyframes orbitB {
          from { transform: rotate(0deg)   translateX(134px) translateY(-3.5px); }
          to   { transform: rotate(360deg) translateX(134px) translateY(-3.5px); }
        }
        @keyframes orbitC {
          from { transform: rotate(60deg)  translateX(118px) translateY(-3px); }
          to   { transform: rotate(420deg) translateX(118px) translateY(-3px); }
        }
        @keyframes scrollDot {
          0%   { transform: translateY(0);    opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export const HeroSection = () => {
  const roles = useTypewriter(
    ["AI Engineer", "Software Developer", "Computer Vision Dev", "IoT Builder", "Problem Solver"],
    75,
    2000
  );
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
    >
      <DotGrid />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="container max-w-5xl mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          <div className="space-y-6 order-2 md:order-1">

            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-semibold tracking-widest uppercase"
              style={{
                background: "rgba(99,102,241,0.07)",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.1s",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for Internships
            </div>

            <div
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.7s ease 0.2s",
              }}
            >
              <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                Hi, I'm{" "}
                <span className="text-primary relative inline-block">
                  Monika P
                  <svg
                    viewBox="0 0 200 12"
                    className="absolute -bottom-2 left-0 w-full"
                    style={{ overflow: "visible" }}
                  >
                    <path
                      d="M0 8 Q50 2,100 8 Q150 14,200 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: 220,
                        strokeDashoffset: revealed ? 0 : 220,
                        transition: "stroke-dashoffset 1s ease 0.9s",
                      }}
                    />
                  </svg>
                </span>
              </h1>
            </div>

            <div
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease 0.4s",
              }}
            >
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                Final Year CSE Student &{" "}
                <span className="text-primary font-semibold">
                  {roles}
                  <span
                    className="inline-block w-0.5 h-6 bg-primary align-middle ml-0.5 animate-pulse"
                    style={{ verticalAlign: "middle" }}
                  />
                </span>
              </p>
            </div>

            <p
              className="text-muted-foreground leading-relaxed max-w-md"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease 0.5s",
              }}
            >
              Reliance Foundation & Aditya Birla Scholar. Building real-world
              solutions with AI, automation & computer vision. Passionate about
              turning complex problems into elegant software.
            </p>

            <div
              className="flex flex-wrap gap-4"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease 0.7s",
              }}
            >
              <MagneticBtn href="#projects" className="cosmic-button">
                View My Work
              </MagneticBtn>
              <MagneticBtn
                href="#contact"
                className="px-6 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
              >
                Get In Touch
              </MagneticBtn>
            </div>

            <div
              className="flex gap-8 pt-2"
              style={{
                opacity: revealed ? 1 : 0,
                transition: "all 0.7s ease 0.9s",
              }}
            >
              {[
                { num: "4+",   label: "Projects"   },
                { num: "2",    label: "Internships" },
                { num: "8.97", label: "CGPA"        },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-primary">{s.num}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative flex items-center justify-center h-80 md:h-96 order-1 md:order-2"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "scale(1)" : "scale(0.9)",
              transition: "all 0.8s ease 0.3s",
            }}
          >
            <AnimatedAvatar />
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-primary/40 flex items-start justify-center p-1">
          <div
            className="w-1 h-2 rounded-full bg-primary"
            style={{ animation: "scrollDot 1.5s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
};