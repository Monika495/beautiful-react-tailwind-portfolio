import { Linkedin, Mail, MapPin, Phone, Send, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I will get back to you soon.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "monikaselvam0409@gmail.com",
      href: "mailto:monikaselvam0409@gmail.com",
      color: "#6366f1",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8122945171",
      href: "tel:+918122945171",
      color: "#06b6d4",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Chennai, Tamil Nadu, India",
      href: null,
      color: "#10b981",
    },
  ];

  const socials = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Monika495",
      color: "#6366f1",
      username: "Monika495",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/monika-p-70a2b3293",
      color: "#06b6d4",
      username: "monika-p-70a2b3293",
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)" }}
      />

      <div
        ref={ref}
        className="container mx-auto max-w-5xl relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease",
        }}
      >
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            Say Hello
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Get In{" "}
            <span className="text-primary relative">
              Touch
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 8" style={{ overflow: "visible" }}>
                <path
                  d="M0 6 Q60 0,120 6"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  className="text-primary"
                  style={{
                    strokeDasharray: 130,
                    strokeDashoffset: visible ? 0 : 130,
                    transition: "stroke-dashoffset 0.9s ease 0.4s",
                  }}
                />
              </svg>
            </span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Feel free to reach out for internships or professional collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT — Contact info */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold">Contact Information</h3>

            {/* Contact items */}
            <div className="space-y-4">
              {contactItems.map(({ icon: Icon, label, value, href, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-card/50 group hover:border-transparent transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 4px 20px ${color}20`;
                    e.currentTarget.style.borderColor = `${color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.borderColor = "";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-semibold hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Professional Profiles — CENTERED */}
            <div>
              <h4 className="text-sm font-bold mb-5 text-center">
                Professional Profiles
              </h4>
              {/* Centered social buttons */}
              <div className="flex items-center justify-center gap-4">
                {socials.map(({ icon: Icon, label, href, color, username }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-border/50 bg-card hover:border-transparent transition-all duration-300 group"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 6px 24px ${color}30`;
                      e.currentTarget.style.borderColor = `${color}40`;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "";
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground leading-none mb-0.5">{label}</p>
                      <p className="text-sm font-semibold leading-none">
                        {username.length > 14 ? label : username}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Send a Message</h3>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-shadow"
                  placeholder="Write your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn("cosmic-button w-full flex items-center justify-center gap-2")}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};