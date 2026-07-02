import {
  SiReact,
  SiFastapi,
  SiPython,
  SiPandas,
  SiTailwindcss,
  SiAxios,
  SiVite,
  SiGithub,
  SiGoogle,
  SiGit,
} from "react-icons/si";

function About() {
  const techStack = [
    { name: "React", icon: <SiReact size={34} /> },
    { name: "FastAPI", icon: <SiFastapi size={34} /> },
    { name: "Python", icon: <SiPython size={34} /> },
    { name: "Pandas", icon: <SiPandas size={34} /> },
    { name: "Gemini", icon: <SiGoogle size={34} /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={34} /> },
    { name: "Axios", icon: <SiAxios size={34} /> },
    { name: "Vite", icon: <SiVite size={34} /> },
    { name: "Git", icon: <SiGit size={34} /> },
    { name: "GitHub", icon: <SiGithub size={34} /> },
  ];

  const modules = [
    "Dashboard",
    "Drug Explorer",
    "Compare Drugs",
    "AI Center",
    "Market Intelligence",
    "Reports",
  ];

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* HERO */}
        <section className="relative overflow-hidden pt-24 pb-12 px-6 md:px-10">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-cyan-500/10 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 mb-8">
            🚀 AI Powered Pharmaceutical Intelligence
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
            PharmaInsight AI
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-8">
            Enterprise-grade pharmaceutical analytics platform powered by
            Artificial Intelligence, patient review mining, and real-world
            healthcare insights.
          </p>
        </div>
      </section>
      {/* ================= KEY CAPABILITIES ================= */}

<section className="px-6 md:px-10 pb-20">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-14">
      Key Capabilities
    </h2>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          title: "AI-Powered Drug Insights",
          description:
            "Analyze thousands of patient reviews using AI to identify treatment effectiveness, satisfaction, and emerging trends.",
        },
        {
          title: "Interactive Analytics",
          description:
            "Explore intuitive dashboards with dynamic charts, KPIs, and real-time pharmaceutical market insights.",
        },
        {
          title: "Market Intelligence",
          description:
            "Track drug performance, therapeutic trends, and patient feedback to support data-driven decisions.",
        },
        {
          title: "Review Sentiment Analysis",
          description:
            "Leverage AI to understand patient opinions, identify positive and negative experiences, and uncover hidden patterns.",
        },
        {
          title: "Drug Comparison",
          description:
            "Compare medications based on ratings, effectiveness, review count, and overall patient satisfaction.",
        },
        {
          title: "AI Report Generation",
          description:
            "Generate concise AI-powered summaries and actionable insights for researchers, analysts, and healthcare professionals.",
        },
      ].map((feature) => (
        <div
          key={feature.title}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 hover:border-cyan-500 hover:-translate-y-1 transition-all duration-300"
        >
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">
            {feature.title}
          </h3>

          <p className="text-gray-400 leading-7">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* TECH STACK */}
      <section className="px-6 md:px-10 pt-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14">
            Tech Stack
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col items-center justify-center gap-4 hover:border-cyan-500 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-cyan-400">{tech.icon}</div>

                <span className="text-sm font-medium text-center">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* DEVELOPER */}
      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
            <h2 className="text-4xl font-bold mb-3">Developer</h2>

            <p className="text-gray-400 mb-8">
              Designed & Developed by <strong>Nasreen Nadaf</strong>
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <a
                href="https://github.com/nasreennadaf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-xl bg-[#24292F] hover:bg-[#30363d] transition-all duration-300"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/nasreen-nadaf-2b0973368/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-xl bg-[#0A66C2] hover:bg-[#08539d] transition-all duration-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;