import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import { NAV_LINKS, PROFILE, SKILLS, SKILL_LEVELS } from "@/data/profile";
import type { SkillLevel } from "@/data/profile";
import { getProjects } from "@/lib/supabase";
import { SITE_URL } from "@/lib/site";

export const revalidate = 60;

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  jobTitle: PROFILE.title,
  url: SITE_URL,
  email: `mailto:${PROFILE.email}`,
  sameAs: [PROFILE.github, PROFILE.linkedin],
}).replace(/</g, "\\u003c");

export default async function Home() {
  const { projects, failed } = await getProjects();
  const label = (id: (typeof NAV_LINKS)[number]["id"]) => NAV_LINKS.find((l) => l.id === id)?.label ?? id;

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Navbar name={PROFILE.name} />
      <main>
        <section id="home" className="hero">
          <div className="container">
            <h1>{PROFILE.name}</h1>
            <p className="role muted">{PROFILE.title}</p>
            <p className="lead">{PROFILE.intro}</p>
            <div className="actions">
              <a href="#projects" className="btn primary">
                Projelerime bak
              </a>
              <a href="#contact" className="btn">
                {label("contact")}
              </a>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="container">
            <h2 className="section-title mono reveal">01. {label("about")}</h2>
            {PROFILE.about.map((text) => (
              <p key={text} className="lead reveal">
                {text}
              </p>
            ))}
          </div>
        </section>

        <section id="skills">
          <div className="container">
            <h2 className="section-title mono reveal">02. {label("skills")}</h2>
            <ul className="legend mono reveal" aria-label="Seviye renkleri">
              {(Object.keys(SKILL_LEVELS) as SkillLevel[]).map((lvl) => (
                <li key={lvl} className={`lvl-${lvl}`}>
                  <span className="dot" aria-hidden="true" />
                  {SKILL_LEVELS[lvl]}
                </li>
              ))}
            </ul>
            <div className="skills">
              {SKILLS.map(({ group, items }) => (
                <div key={group} className="skill-box reveal">
                  <h3>{group}</h3>
                  <ul className="tags skill-tags mono">
                    {items.map(({ name, level }) => (
                      <li key={name} className={`lvl-${level}`}>
                        {name}
                        <span className="sr-only"> ({SKILL_LEVELS[level]})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="container">
            <h2 className="section-title mono reveal">03. {label("projects")}</h2>
            <Projects projects={projects} failed={failed} />
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <h2 className="section-title mono reveal">04. {label("contact")}</h2>
            <p className="lead reveal">Bir proje ya da iş birliği için yaz.</p>
            <div className="actions reveal">
              <a className="btn primary" href={`mailto:${PROFILE.email}`}>
                {PROFILE.email}
              </a>
              <a className="btn" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer mono muted">
        <span>
          © {new Date().getFullYear()} {PROFILE.name}
        </span>
        <a href="#home" className="to-top">
          Başa dön ↑
        </a>
      </footer>
    </>
  );
}