import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Mail, ExternalLink, Terminal,
  Code2, FolderGit2, UserRound, Cpu,
  ChevronRight, Menu, X, Loader2
} from 'lucide-react'

const skills = [
  ['Frontend', 'HTML · CSS · JavaScript · React · Tailwind CSS'],
  ['Backend', 'PHP · Laravel · Node.js · Express'],
  ['Database', 'MySQL · MongoDB'],
  ['Tools', 'Git · GitHub · REST APIs'],
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

function SectionTitle({ children }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-sm">
      <span className="text-[#58a6ff]">— {children}</span>
      <div className="h-px flex-1 bg-[#30363d]" />
    </div>
  )
}

function App() {
  const [active, setActive] = useState('about')
  const [terminalInput, setTerminalInput] = useState('')
  const [output, setOutput] = useState([
    'Welcome to abdellah.dev',
    "Type 'help' to explore the terminal.",
  ])
  const [mobileMenu, setMobileMenu] = useState(false)

  // GitHub Data Fetching State
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

  const commands = {
    help: ['Available commands:', 'about · skills · projects · contact · clear'],
    about: ['Abdellah El Jahidi', 'Full Stack Developer | Morocco'],
    skills: skills.map(([name, value]) => `${name}: ${value}`),
    projects: githubProjects.length > 0 
      ? githubProjects.map(p => p.name) 
      : ['Fetching projects from GitHub...'],
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
        ...(commands[command] || ['Command not found. Type help.']),
      ])
    }

    setTerminalInput('')
  }

  const navItems = [
    { id: 'about', label: 'about.tsx', icon: UserRound },
    { id: 'skills', label: 'skills.ts', icon: Cpu },
    { id: 'projects', label: 'projects.tsx', icon: FolderGit2 },
    { id: 'contact', label: 'contact.tsx', icon: Mail },
  ]

  function navigate(id) {
    setActive(id)
    setMobileMenu(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#0d1117] p-2 text-[#c9d1d9] sm:p-4">
      <div className="mx-auto max-w-375 overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] shadow-2xl shadow-black/30">

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

          <button
            className="rounded p-2 hover:bg-[#30363d] md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation"
          >
            {mobileMenu ? <X size={19} /> : <Menu size={19} />}
          </button>
        </header>

        <div className="grid md:grid-cols-[220px_minmax(0,1fr)]">

          {/* Explorer sidebar */}
          <aside className={`${mobileMenu ? 'block' : 'hidden'} border-b border-[#30363d] bg-[#0d1117] md:block md:border-b-0 md:border-r`}>
            <div className="px-4 py-5 text-[11px] uppercase tracking-[0.18em] text-[#8b949e]">
              Explorer
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

              <div className="mt-8 border-t border-[#30363d] pt-5">
                <p className="mb-3 px-2 text-[10px] uppercase tracking-widest text-[#8b949e]">
                  Tech Stack
                </p>
                {['React', 'Laravel', 'Node.js', 'MongoDB', 'MySQL', 'Git'].map((item) => (
                  <div key={item} className="flex items-center gap-2 px-3 py-2 text-xs text-[#8b949e]">
                    <span className="text-[#3fb950]">◆</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main editor */}
          <main className="min-w-0">
            <div className="flex overflow-x-auto border-b border-[#30363d] bg-[#161b22]">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => navigate(id)}
                  className={`shrink-0 border-r border-[#30363d] px-4 py-3 text-xs ${
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
              {/* Hero */}
              <section id="about" className="scroll-mt-8 py-5">
                <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex min-h-55 items-center justify-center overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117]/90 p-5"
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
                      <p className="text-sm text-[#ffa657]">
                        . whoami
                      </p>
                      <h1 className="mt-2 wrap-break-word text-2xl font-semibold tracking-tight text-white sm:text-4xl">
                        Abdellah El Jahidi
                      </h1>
                      <p className="mt-3 text-sm leading-7 text-[#8b949e]">
                        Full Stack Developer building modern web applications
                        with clean code and thoughtful user experiences.
                      </p>
                    </div>

                    <div>
                      <SectionTitle>Contact</SectionTitle>
                      <p className="break-all text-sm">
                        <span className="text-[#ffa657]">. Email: </span>
                        <a className="text-[#58a6ff] hover:underline" href="mailto:abdellaheljahidi@gmail.com">
                          abdellaheljahidi@gmail.com
                        </a>
                      </p>
                      <p className="mt-3 text-sm">
                        <span className="text-[#ffa657]">. Location: </span>
                        Morocco
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://github.com/eljahidi"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] px-4 py-2.5 text-xs transition hover:border-[#58a6ff] hover:text-[#58a6ff]"
                      >
                        <Code2 size={15} /> GitHub <ExternalLink size={12} />
                      </a>
                      <button
                        onClick={() => navigate('projects')}
                        className="rounded-md bg-[#238636] px-4 py-2.5 text-xs text-white transition hover:bg-[#2ea043]"
                      >
                        Explore Projects →
                      </button>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Skills */}
              <section id="skills" className="scroll-mt-8 py-12">
                <SectionTitle>Technical Skills</SectionTitle>
                <div className="grid gap-3 sm:grid-cols-2">
                  {skills.map(([name, value], index) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="rounded-lg border border-[#30363d] bg-[#0d1117]/90 p-4 transition hover:border-[#58a6ff66]"
                    >
                      <p className="mb-3 text-xs text-[#58a6ff]">
                        {'// '}{name}
                      </p>
                      <p className="text-xs leading-6 text-[#c9d1d9]">
                        {value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Projects */}
              <section id="projects" className="scroll-mt-8 py-8">
                <SectionTitle>GitHub Projects</SectionTitle>
                {loading ? (
                  <div className="flex items-center justify-center py-10 text-[#8b949e]">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Fetching projects...
                  </div>
                ) : (
                  <div className="grid gap-4 lg:grid-cols-2">
                    {githubProjects.map((project, index) => (
                      <motion.article
                        key={project.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col justify-between rounded-lg border border-[#30363d] bg-[#0d1117]/95 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#58a6ff77]"
                      >
                        <div>
                          <div className="mb-4 flex items-center justify-between">
                            <FolderGit2 size={23} className="text-[#58a6ff]" />
                            <a
                              href={project.html_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#8b949e] transition hover:text-[#58a6ff]"
                              title="View on GitHub"
                            >
                              <ExternalLink size={16} />
                            </a>
                          </div>
                          <h3 className="text-base font-semibold text-white">{project.name}</h3>
                          <p className="mt-3 text-xs leading-6 text-[#8b949e]">
                            {project.description || "No description provided."}
                          </p>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.language && (
                            <span className="rounded bg-[#161b22] border border-[#30363d] px-2 py-1 text-[10px] text-[#3fb950]">
                              {project.language}
                            </span>
                          )}
                          {project.topics?.map(topic => (
                            <span key={topic} className="rounded bg-[#161b22] px-2 py-1 text-[10px] text-[#c9d1d9]">
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
                <SectionTitle>Interactive Terminal</SectionTitle>
                <div className="overflow-hidden rounded-lg border border-[#30363d] bg-[#010409]">
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
                        aria-label="Terminal command"
                        className="min-w-0 flex-1 bg-transparent py-1 text-[#c9d1d9] outline-none placeholder:text-[#484f58]"
                      />
                      <span className="cursor" />
                    </form>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-8 py-10">
                <SectionTitle>Contact</SectionTitle>
                <div className="rounded-lg border border-[#30363d] bg-[#0d1117]/90 p-5 sm:p-7">
                  <p className="text-sm leading-7 text-[#c9d1d9]">
                    Interested in working together or discussing a project?
                    Feel free to get in touch.
                  </p>
                  <a
                    href="mailto:abdellaheljahidi@gmail.com"
                    className="mt-5 inline-flex items-center gap-2 text-sm text-[#58a6ff] hover:underline"
                  >
                    <Mail size={16} /> Contact me →
                  </a>
                </div>
              </section>
            </div>

            {/* Status bar */}
            <footer className="flex flex-wrap items-center justify-between gap-2 bg-[#161b22] px-4 py-2 text-[10px] text-[#c9d1d9]">
              <div className="flex items-center gap-3">
                <span className="text-[#58a6ff]">⎇ main</span>
                <span>React JSX</span>
              </div>
              <div className="flex items-center gap-3">
                <span>UTF-8</span>
                <span className="text-[#3fb950]">● Ready</span>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App