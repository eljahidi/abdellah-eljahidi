import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Mail, ExternalLink, Terminal,
  Code2, FolderGit2, UserRound, Cpu,
  ChevronRight, Menu, X, Loader2, Globe, GraduationCap
} from 'lucide-react'

// --- المسار الدراسي ---
const educationData = [
  {
    year: '2024 - 2026',
    title: 'Technicien Spécialisé en Développement Digital',
    school: 'ISTA NTIC Safi',
    desc: 'Option Web Full Stack'
  },
  {
    year: '2022 - 2023',
    title: 'Baccalauréat Sciences Physiques',
    school: 'Lycée 30 Juillet, Chemaia',
    desc: ''
  }
]

// --- المهارات ديالك ---
const skills = [
  ['Frontend', 'HTML · CSS · JavaScript · React.js · Tailwind CSS · Bootstrap · Responsive Design'],
  ['Backend', 'PHP · Laravel · Node.js · Express'],
  ['Database', 'MySQL · MongoDB · Data Modeling'],
  ['Tools', 'Git · GitHub · REST APIs · GitLab · Jira · Scrum · Agile · SonarQube · Docker · Postman · UML'],
]

const art = String.raw`
                 .::::.
              .::::::::::.
            .::::::..::::::.
           ::::::::::::::::::
          ::::::::::::::::::::
          ::::::::::::::::::::
           ::::::::::::::::::
             ::::::::::::::
               ::::::::::
                 ::::::
                   ::
`

// --- الترجمة ---
const translations = {
  en: {
    explorer: 'Explorer',
    techStack: 'Tech Stack',
    navAbout: 'about.tsx',
    navEdu: 'education.json',
    navSkills: 'skills.ts',
    navProjects: 'projects.tsx',
    navContact: 'contact.tsx',
    roleTitle: 'Full Stack Developer',
    description: 'Full Stack Developer building modern web applications with clean code and thoughtful user experiences.',
    locationLabel: 'Location',
    location: 'Morocco',
    exploreBtn: 'Explore Projects →',
    eduTitle: 'Education Path',
    skillsTitle: 'Technical Skills',
    featuredTitle: 'GitHub Projects',
    loading: 'Fetching projects from GitHub...',
    noDesc: 'No description provided.',
    terminalTitle: 'Interactive Terminal',
    contactTitle: 'Contact',
    contactText: 'Interested in working together or discussing a project? Feel free to get in touch.',
    contactBtn: 'Contact me →',
    termWelcome: 'Welcome to abdellah.dev',
    termHelp: "Type 'help' to explore the terminal.",
    termNotFound: 'Command not found. Type help.'
  },
  fr: {
    explorer: 'Explorateur',
    techStack: 'Technologies',
    navAbout: 'a_propos.tsx',
    navEdu: 'education.json',
    navSkills: 'competences.ts',
    navProjects: 'projets.tsx',
    navContact: 'contact.tsx',
    roleTitle: 'Développeur Full Stack',
    description: 'Développeur Full Stack créant des applications web modernes avec un code propre et des expériences utilisateur réfléchies.',
    locationLabel: 'Localisation',
    location: 'Maroc',
    exploreBtn: 'Voir les projets →',
    eduTitle: 'Parcours Éducatif',
    skillsTitle: 'Compétences Techniques',
    featuredTitle: 'Projets GitHub',
    loading: 'Chargement des projets depuis GitHub...',
    noDesc: 'Aucune description fournie.',
    terminalTitle: 'Terminal Interactif',
    contactTitle: 'Contact',
    contactText: 'Intéressé par une collaboration ou pour discuter d\'un projet ? N\'hésitez pas à me contacter.',
    contactBtn: 'Contactez-moi →',
    termWelcome: 'Bienvenue sur abdellah.dev',
    termHelp: "Tapez 'help' pour explorer le terminal.",
    termNotFound: 'Commande introuvable. Tapez help.'
  }
}

function SectionTitle({ children }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-sm">
      <span className="text-[#58a6ff]">— {children}</span>
      <div className="h-px flex-1 bg-[#30363d]" />
    </div>
  )
}

function App() {
  const [lang, setLang] = useState('en')
  const t = translations[lang]

  const [active, setActive] = useState('about')
  const [terminalInput, setTerminalInput] = useState('')
  const [output, setOutput] = useState([t.termWelcome, t.termHelp])
  const [mobileMenu, setMobileMenu] = useState(false)

  // GitHub Data Fetching
  const [githubProjects, setGithubProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.github.com/users/eljahidi/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        const repos = Array.isArray(data) ? data.filter(repo => !repo.fork) : [];
        setGithubProjects(repos);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, [])

  useEffect(() => {
    setOutput([t.termWelcome, t.termHelp])
  }, [lang, t.termWelcome, t.termHelp])

  const commands = {
    help: ['Available commands:', 'about · education · skills · projects · contact · clear'],
    about: ['Abdellah El Jahidi', `${t.roleTitle} | ${t.location}`],
    education: educationData.map(e => `${e.year}: ${e.title} at ${e.school}`),
    skills: skills.map(([name, value]) => `${name}: ${value}`),
    projects: githubProjects.length > 0 ? githubProjects.map(p => p.name) : [t.loading],
    contact: ['Email: abdellaheljahidi@gmail.com', 'GitHub: github.com/eljahidi'],
  }

  function runCommand(event) {
    event.preventDefault()
    const command = terminalInput.trim().toLowerCase()
    if (!command) return

    if (command === 'clear') {
      setOutput([])
    } else {
      setOutput((previous) => [
        ...previous,
        `visitor@abdellah:~$ ${command}`,
        ...(commands[command] || [t.termNotFound]),
      ])
    }
    setTerminalInput('')
  }

  const navItems = [
    { id: 'about', label: t.navAbout, icon: UserRound },
    { id: 'education', label: t.navEdu, icon: GraduationCap },
    { id: 'skills', label: t.navSkills, icon: Cpu },
    { id: 'projects', label: t.navProjects, icon: FolderGit2 },
    { id: 'contact', label: t.navContact, icon: Mail },
  ]

  function navigate(id) {
    setActive(id)
    setMobileMenu(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#0d1117] p-2 text-[#c9d1d9] sm:p-4">
      <div className="mx-auto max-w-300 overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] shadow-2xl shadow-black/30">

        {/* Window title bar */}
        <header className="flex h-12 items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>

          <div className="hidden items-center gap-2 text-xs text-[#8b949e] sm:flex">
            <Code2 size={15} />
            abdellah-portfolio — Visual Studio Code
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-[#8b949e] transition hover:bg-[#30363d] hover:text-white"
            >
              <Globe size={14} />
              {lang === 'en' ? 'FR' : 'EN'}
            </button>

            <button
              className="rounded p-1 hover:bg-[#30363d] md:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </header>

        <div className="grid md:grid-cols-[220px_minmax(0,1fr)]">

          {/* Explorer sidebar */}
          <aside className={`${mobileMenu ? 'block' : 'hidden'} border-b border-[#30363d] bg-[#0d1117] md:block md:border-b-0 md:border-r`}>
            <div className="px-4 py-5 text-[11px] uppercase tracking-[0.18em] text-[#8b949e]">
              {t.explorer}
            </div>

            <div className="px-3 pb-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <ChevronRight size={15} />
                ABD ELLAH
              </div>

              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => navigate(id)}
                  className={`flex w-full items-center gap-3 rounded px-3 py-2 text-left text-xs transition ${
                    active === id
                      ? 'bg-[#1f6feb22] text-[#58a6ff]'
                      : 'text-[#8b949e] hover:bg-[#161b22] hover:text-white'
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>
          </aside>

          {/* Main editor */}
          <main className="min-w-0">
            <div className="flex overflow-x-auto border-b border-[#30363d] bg-[#161b22]">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => navigate(id)}
                  className={`shrink-0 border-r border-[#30363d] px-4 py-3 text-xs transition ${
                    active === id
                      ? 'border-t-2 border-t-[#58a6ff] bg-[#0d1117] text-white'
                      : 'text-[#8b949e] hover:bg-[#0d1117]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="terminal-grid p-5 sm:p-8 lg:p-12">
              
              {/* Hero Section */}
              <section id="about" className="scroll-mt-8 py-5">
                <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                  <motion.div
                    whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex min-h-55 items-center justify-center overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117]/90 p-5 shadow-lg shadow-[#58a6ff]/5"
                  >
                    <pre className="glow text-center text-[8px] leading-tight text-[#8b949e] sm:text-[10px] md:text-xs">
                      {art}
                      <span className="text-[#58a6ff]">FULL STACK</span>
                      {'\n'}
                      <span className="text-[#3fb950]">DEVELOPER</span>
                    </pre>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="min-w-0 space-y-7"
                  >
                    <div>
                      <SectionTitle>abdellah@github</SectionTitle>
                      <h1 className="mt-2 wrap-break-word text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        Abdellah El Jahidi
                      </h1>
                      <p className="mt-4 text-sm leading-7 text-[#8b949e]">
                        {t.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://github.com/eljahidi"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] px-4 py-2.5 text-xs transition hover:border-[#58a6ff] hover:text-[#58a6ff] hover:shadow-[0_0_15px_rgba(88,166,255,0.2)]"
                      >
                        <Code2 size={15} /> GitHub <ExternalLink size={12} />
                      </a>
                      <button
                        onClick={() => navigate('projects')}
                        className="rounded-md bg-[#238636] px-4 py-2.5 text-xs text-white transition hover:bg-[#2ea043] hover:shadow-[0_0_15px_rgba(46,160,67,0.3)]"
                      >
                        {t.exploreBtn}
                      </button>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Education Section */}
              <section id="education" className="scroll-mt-8 py-12">
                <SectionTitle>{t.eduTitle}</SectionTitle>
                <div className="ml-2 space-y-8 border-l-2 border-[#30363d]">
                  {educationData.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-6"
                    >
                      <span className="absolute -left-2.25 top-1 h-4 w-4 rounded-full border-4 border-[#0d1117] bg-[#58a6ff]" />
                      
                      <div className="rounded-lg border border-[#30363d] bg-[#161b22]/50 p-4 transition-all hover:border-[#58a6ff55] hover:bg-[#161b22]">
                        <span className="mb-2 inline-block rounded-full bg-[#1f6feb22] px-3 py-1 text-[10px] text-[#58a6ff]">
                          {item.year}
                        </span>
                        <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                        <p className="mt-1 text-xs text-[#8b949e]">{item.school}</p>
                        {item.desc && <p className="mt-2 text-xs text-[#ffa657]">{item.desc}</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section id="skills" className="scroll-mt-8 py-12">
                <SectionTitle>{t.skillsTitle}</SectionTitle>
                <div className="grid gap-3 sm:grid-cols-2">
                  {skills.map(([name, value], index) => (
                    <motion.div
                      key={name}
                      whileHover={{ scale: 1.03, y: -2 }}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="rounded-lg border border-[#30363d] bg-[#0d1117]/90 p-4 transition-colors hover:border-[#58a6ff66] hover:shadow-[0_0_15px_rgba(88,166,255,0.1)]"
                    >
                      <p className="mb-3 text-xs font-semibold text-[#58a6ff]">
                        {'// '}{name}
                      </p>
                      <p className="text-xs leading-6 text-[#c9d1d9]">
                        {value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Projects (Dynamic from GitHub only) */}
              <section id="projects" className="scroll-mt-8 py-12">
                <SectionTitle>{t.featuredTitle}</SectionTitle>
                {loading ? (
                  <div className="flex items-center justify-center py-10 text-[#8b949e]">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> {t.loading}
                  </div>
                ) : (
                  <div className="grid gap-5 lg:grid-cols-2">
                    {githubProjects.map((project, index) => (
                      <motion.article
                        key={project.id}
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group flex flex-col rounded-xl border border-[#30363d] bg-[#161b22]/50 p-6 transition-all hover:border-[#58a6ff77] hover:bg-[#161b22] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <FolderGit2 size={26} className="text-[#58a6ff]" />
                          <a href={project.html_url} target="_blank" rel="noreferrer" className="text-[#8b949e] transition hover:text-[#58a6ff]">
                            <ExternalLink size={18} />
                          </a>
                        </div>
                        
                        <h3 className="text-lg font-bold text-white group-hover:text-[#58a6ff] transition-colors">{project.name}</h3>
                        
                        <p className="mt-3 text-sm leading-6 text-[#8b949e] flex-1">
                          {project.description || t.noDesc}
                        </p>
                        
                        <div className="mt-6 flex flex-wrap gap-2">
                          {project.language && (
                            <span className="rounded bg-[#1f6feb22] border border-[#1f6feb44] px-2.5 py-1 text-[11px] text-[#58a6ff]">
                              {project.language}
                            </span>
                          )}
                          {project.topics?.slice(0, 4).map(topic => (
                            <span key={topic} className="rounded bg-[#0d1117] border border-[#30363d] px-2.5 py-1 text-[11px] text-[#c9d1d9]">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
              </section>

              {/* Terminal */}
              <section className="py-8">
                <SectionTitle>{t.terminalTitle}</SectionTitle>
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="overflow-hidden rounded-lg border border-[#30363d] bg-[#010409] shadow-2xl"
                >
                  <div className="flex items-center gap-2 border-b border-[#30363d] px-4 py-3 text-xs text-[#8b949e]">
                    <Terminal size={14} /> bash — visitor@abdellah
                  </div>
                  <div className="space-y-2 p-4 font-mono text-xs">
                    {output.map((line, index) => (
                      <p key={`${index}-${line}`} className="wrap-break-word leading-5 text-[#8b949e]">
                        {line.startsWith('visitor@')
                          ? <span className="text-[#3fb950]">{line}</span>
                          : line}
                      </p>
                    ))}
                    <form onSubmit={runCommand} className="flex items-center gap-2">
                      <span className="shrink-0 text-[#3fb950]">$</span>
                      <input
                        value={terminalInput}
                        onChange={(event) => setTerminalInput(event.target.value)}
                        placeholder="Type help..."
                        className="min-w-0 flex-1 bg-transparent py-1 text-[#c9d1d9] outline-none placeholder:text-[#484f58]"
                      />
                      <span className="cursor" />
                    </form>
                  </div>
                </motion.div>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-8 py-10">
                <SectionTitle>{t.contactTitle}</SectionTitle>
                <div className="rounded-lg border border-[#30363d] bg-[#0d1117]/90 p-5 sm:p-7">
                  <p className="text-sm leading-7 text-[#c9d1d9]">
                    {t.contactText}
                  </p>
                  <a
                    href="mailto:abdellaheljahidi@gmail.com"
                    className="mt-5 inline-flex items-center gap-2 text-sm text-[#58a6ff] transition hover:gap-3 hover:text-[#79c0ff]"
                  >
                    <Mail size={16} /> {t.contactBtn}
                  </a>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App