import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";
import SectionTitle from "./SectionTitle";
import { portfolioData } from "../data/portfolioData";

const Experience = () => {
  return (
    <section id="experience" className="border-b border-white/10 py-20 sm:py-24">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Experience"
          title="Internships and education that shaped my development journey."
          description="These roles helped me strengthen reusable component design, responsive UI building, API integration, and practical debugging across real projects."
        />

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            {portfolioData.experience.map((item) => (
              <article
                key={`${item.company}-${item.role}`}
                className="panel p-6 sm:p-8 transition hover:-translate-y-1"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-amber-200">
                      <FiBriefcase />
                      {item.type}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-white">
                      {item.role}
                    </h3>
                    <p className="mt-2 text-lg text-slate-300">{item.company}</p>
                  </div>

                  <div className="space-y-2 text-sm text-slate-400">
                    <p className="inline-flex items-center gap-2">
                      <FiCalendar className="text-amber-300" />
                      {item.duration}
                    </p>
                    <p className="inline-flex items-center gap-2">
                      <FiMapPin className="text-amber-300" />
                      {item.location}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {item.points.map((point) => (
                    <p
                      key={point}
                      className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm leading-7 text-slate-300"
                    >
                      {point}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="space-y-6">
            <div className="panel p-6 sm:p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-200">
                Education
              </p>
              <div className="mt-6 space-y-5">
                {portfolioData.education.map((item) => (
                  <div
                    key={item.degree}
                    className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"
                  >
                    <h3 className="text-lg font-semibold text-white">{item.degree}</h3>
                    <p className="mt-2 text-slate-300">{item.institute}</p>
                    <p className="mt-3 text-sm text-slate-400">{item.meta}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel p-6 sm:p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-200">
                Certification
              </p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <h3 className="text-lg font-semibold text-white">
                  {portfolioData.certification.title}
                </h3>
                <p className="mt-2 text-slate-300">{portfolioData.certification.issuer}</p>
                <p className="mt-3 text-sm text-slate-400">
                  {portfolioData.certification.year}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
