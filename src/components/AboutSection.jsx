import { Briefcase, Code, User, Database } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">

        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6">

            <h3 className="text-2xl font-semibold">
              Aspiring AI & Software Engineer
            </h3>

            <p className="text-muted-foreground">
              Final-year Computer Science student passionate about building real-world
              solutions using AI, software development, and IoT technologies.
            </p>

            <p className="text-muted-foreground">
              Skilled in Python, Java, C, SQL, and web technologies, with hands-on
              experience in automation, computer vision, and full-stack development projects.
            </p>

            <p className="text-muted-foreground">
              Strong leadership experience as a project team lead, with focus on teamwork,
              problem-solving, and delivering projects on time.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              {/* FIXED DOWNLOAD BUTTON */}
              <a
                href="/MyResume.pdf"
                download="Monika_P_Resume.pdf"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition"
              >
                Download Resume
              </a>

            </div>
          </div>

          {/* RIGHT SIDE CARDS */}
          <div className="grid grid-cols-1 gap-6">

            {/* SOFTWARE */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex gap-4">
                <Code className="text-primary" />
                <div>
                  <h4 className="font-semibold">Software Development</h4>
                  <p className="text-muted-foreground text-sm">
                    Building applications using Python, Java, and web technologies.
                  </p>
                </div>
              </div>
            </div>

            {/* AI */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex gap-4">
                <User className="text-primary" />
                <div>
                  <h4 className="font-semibold">AI & Automation</h4>
                  <p className="text-muted-foreground text-sm">
                    Computer vision, automation tools, and intelligent systems.
                  </p>
                </div>
              </div>
            </div>

            {/* DATABASE */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex gap-4">
                <Database className="text-primary" />
                <div>
                  <h4 className="font-semibold">SQL & Data Handling</h4>
                  <p className="text-muted-foreground text-sm">
                    Experience with SQL & SQLite for data-driven applications.
                  </p>
                </div>
              </div>
            </div>

            {/* LEADERSHIP */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex gap-4">
                <Briefcase className="text-primary" />
                <div>
                  <h4 className="font-semibold">IoT & Leadership</h4>
                  <p className="text-muted-foreground text-sm">
                    ESP32-based IoT systems and team project leadership experience.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};