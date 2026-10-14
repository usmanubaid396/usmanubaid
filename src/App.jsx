import React, { useState, useEffect, useRef } from 'react';
import { 
  Code, Cpu, Terminal, Zap, Activity, Server, ArrowUpRight, 
  Database, Crosshair, Mail, Phone, MapPin, Box, Layers, Shield, 
  CpuIcon, Globe, TerminalSquare, Workflow, Flame, CheckCircle2,
  Layers3, Sparkles, Command, GitBranch, Eye, Maximize2, RefreshCw, 
  Compass, BoxSelect, Cpu as CpuSymbol, Play, Pause, ChevronRight,
  Radio, Terminal as TerminalIcon, Cpu as Microchip, Hexagon, Network, Menu, X
} from 'lucide-react';

const WebGLEngine = React.lazy(() => import('./WebGLEngine'));
const COMPACT_QUERY = '(max-width: 1023px), (pointer: coarse), (prefers-reduced-motion: reduce)';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);
  return matches;
}

/* ==========================================================================
   UI COMPONENTS & MICROINTERACTIONS
   ================================================================---------- */
const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const compact = useMediaQuery(COMPACT_QUERY);
  const handleMouseMove = (e) => {
    if (compact || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -12;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };
  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`${compact ? "" : "transition-transform duration-150 ease-out transform-gpu"} ${className}`}>
      {children}
    </div>
  );
};

const SystemStatus = () => (
  <div className="system-status fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/15 text-[9px] sm:text-xs uppercase flex justify-between items-center px-3 sm:px-4 py-2 sm:py-3 font-light tracking-widest text-neutral-200 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
    <div className="flex items-center gap-2 text-white font-bold truncate">
      <div className="w-2 h-2 bg-[#dc2626] rounded-full animate-pulse shadow-[0_0_15px_#dc2626] shrink-0"></div>
      <span className="truncate">USMAN_UBAID // FULL STACK DEVELOPER</span>
    </div>
    <div className="text-[#3b82f6] font-bold hidden md:block shrink-0">LAHORE, PK [31.5204° N, 74.3587° E]</div>
  </div>
);

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="portfolio-navigation relative z-40 mt-10 sm:mt-12 w-full px-4 sm:px-8 py-5 sm:py-6 flex justify-between items-center border-b border-white/15 bg-neutral-950/90 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tighter text-white flex items-center gap-2 drop-shadow-md">
          Usman Ubaid <span className="text-[#dc2626]">.</span>
        </h1>
        <p className="text-[10px] sm:text-xs text-neutral-300 tracking-widest mt-0.5 uppercase hidden sm:block">Full-Stack SaaS, LMS & 3D Interactive Systems</p>
      </div>

      <div className="hidden lg:flex gap-6 text-xs font-bold tracking-[0.2em] uppercase items-center">
        {['Work', 'Skills', 'Ecosystem', 'Scrollytelling', 'Contact'].map((item, idx) => (
          <a key={idx} href={`#${item.toLowerCase()}`} className="text-neutral-200 hover:text-[#dc2626] transition-colors">
            [{item}]
          </a>
        ))}
        <a href="#contact" className="bg-white/20 hover:bg-[#dc2626] text-white backdrop-blur-md border border-white/30 px-4 py-2 transition-all shadow-lg">
          Let's talk
        </a>
      </div>

      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
        className="lg:hidden text-white p-2 border border-white/20 bg-white/[0.05] backdrop-blur-md"
        aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-navigation"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-3xl border-b border-white/20 p-6 flex flex-col gap-4 lg:hidden shadow-2xl">
          {['Work', 'Skills', 'Ecosystem', 'Scrollytelling', 'Contact'].map((item, idx) => (
            <a 
              key={idx} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold tracking-[0.2em] uppercase text-neutral-200 hover:text-[#dc2626] py-2 border-b border-white/10"
            >
              [{item}]
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="bg-[#dc2626] text-white text-center py-3 font-bold uppercase tracking-widest mt-2"
          >
            Let's talk
          </a>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section id="index" className="portfolio-hero relative z-10 w-full px-4 sm:px-8 pt-20 sm:pt-24 pb-24 sm:pb-32 border-b border-white/15 bg-transparent">
    <div className="max-w-6xl">
      <p className="text-[#dc2626] text-xs sm:text-sm tracking-[0.3em] mb-6 sm:mb-8 font-bold flex items-center gap-2 bg-neutral-950/80 backdrop-blur-xl w-fit px-3 sm:px-4 py-1.5 border border-white/20 shadow-xl">
        <Crosshair size={16} className="shrink-0" /> <span className="truncate">FULL-STACK SaaS & 3D IMMERSIVE ARCHITECTURE</span>
      </p>
      <h2 className="text-4xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.9] sm:leading-[0.85] text-white drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
        I build high-end <br /><span className="stroke-text">SaaS products</span> & web apps that scale.
      </h2>
      <p className="mt-6 sm:mt-8 text-xs sm:text-lg text-neutral-200 max-w-2xl font-light tracking-wide leading-relaxed bg-neutral-950/80 p-6 sm:p-8 border border-white/15 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        I'm Usman Ubaid — a full-stack web engineer building SaaS products, learning platforms, and interactive web experiences. My DIFF. MDCAT LMS brings together React, TypeScript, Firebase authentication, Firestore data, student analytics, and protected test sessions, alongside my work with SQL, Python, Next.js, and Vercel.
      </p>

      <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl">
        <div className="border border-white/15 bg-neutral-950/80 p-5 sm:p-6 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div className="text-3xl sm:text-5xl font-black text-white mb-1 drop-shadow">5+</div>
          <div className="text-[10px] sm:text-xs text-neutral-300 uppercase tracking-widest font-bold">Years Shipping Code</div>
        </div>
        <div className="border border-white/15 bg-neutral-950/80 p-5 sm:p-6 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div className="text-3xl sm:text-5xl font-black text-[#dc2626] mb-1 drop-shadow">20+</div>
          <div className="text-[10px] sm:text-xs text-neutral-300 uppercase tracking-widest font-bold">SaaS & Web Apps Launched</div>
        </div>
        <div className="border border-white/15 bg-neutral-950/80 p-5 sm:p-6 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div className="text-3xl sm:text-5xl font-black text-[#3b82f6] mb-1 drop-shadow">LMS</div>
          <div className="text-[10px] sm:text-xs text-neutral-300 uppercase tracking-widest font-bold">Auth / Data / Assessment</div>
        </div>
      </div>
      
      <div className="mt-10 sm:mt-12 flex flex-wrap gap-4">
        <a href="#contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/90 text-black px-6 sm:px-8 py-4 sm:py-5 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#dc2626] hover:text-white transition-all border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-md">
          Start a project <ArrowUpRight size={18} />
        </a>
        <a href="#work" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-neutral-950/80 backdrop-blur-2xl text-white px-6 sm:px-8 py-4 sm:py-5 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] hover:border-[#3b82f6] transition-all border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          Selected work <Activity size={18} className="text-[#3b82f6]" />
        </a>
      </div>
    </div>
  </section>
);

const worksData = [
  { id: 'SYS.01', title: 'Business Portfolio', type: 'Health Care Pharmaceuticals', tech: 'React / Node / PostgreSQL / Python ML', link: 'https://healthcarepk.online' },
  { id: 'SYS.02', title: 'Utility Workflow Tool', type: 'Universal Contract Maker', tech: 'Next.js / Tailwind / Vercel Edge', link: 'https://universal-contract-maker.vercel.app/' },
  { id: 'SYS.03', title: 'Individual Portfolio', type: 'Interactive 3D 60fps Web Portfolio', tech: 'React / Three.js / WebGL / Tailwind', link: '#' },
  { id: 'SYS.04', title: 'DIFF. MDCAT', type: 'Full-Stack Learning Management System', tech: 'React / TypeScript / Firebase Auth / Firestore', link: 'https://diffmdcat.vercel.app' },
];

const Works = () => {
  const compact = useMediaQuery(COMPACT_QUERY);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (compact) return;
    let animationFrameId = null;

    const handleScroll = () => {
      if (!containerRef.current) return;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollRange = rect.height - window.innerHeight;
        if (scrollRange <= 0) return;

        let progress = -rect.top / scrollRange;
        progress = Math.max(0, Math.min(1, progress));

        const newIndex = Math.min(worksData.length - 1, Math.floor(progress * worksData.length));
        setActiveIndex(newIndex);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [compact]);

  if (compact) return (
    <section id="work" className="mobile-section">
      <p className="mobile-eyebrow">// SELECTED PRODUCTION WORK</p>
      <h3 className="mobile-heading">Built & shipped.</h3>
      <div className="grid gap-4">
        {worksData.map(work => (
          <a key={work.id} href={work.link} target={work.link === "#" ? "_self" : "_blank"} rel="noopener noreferrer" className="mobile-project">
            <div className="flex items-center justify-between mb-8"><span className="text-xs text-neutral-400">{work.id}</span><ArrowUpRight size={24} className="text-[#dc2626]" /></div>
            <h4 className="text-3xl font-black tracking-tight mb-3">{work.title}</h4>
            <p className="text-sm text-white mb-3">{work.type}</p>
            <p className="text-xs leading-relaxed text-neutral-400">{work.tech}</p>
          </a>
        ))}
      </div>
    </section>
  );

  return (
    <section ref={containerRef} id="work" className="relative bg-transparent" style={{ height: `${(worksData.length + 1) * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-4 sm:px-12 max-w-7xl mx-auto">
        
        <div className="flex flex-col sm:flex-row border border-white/20 px-6 py-5 items-start sm:items-center justify-between bg-neutral-950/90 backdrop-blur-2xl mb-8 shadow-[0_12px_40px_rgba(0,0,0,0.95)] rounded gap-3 sm:gap-0">
          <div>
            <p className="text-[#dc2626] text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-1">// 3D SPATIAL CARD DECK</p>
            <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-white drop-shadow">Selected Production Work</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-400">NODE 0{activeIndex + 1} / 0{worksData.length}</span>
            <span className="text-xs text-[#dc2626] font-bold uppercase bg-white/[0.08] px-3 py-1 border border-white/25 shadow-lg">ACTIVE</span>
          </div>
        </div>

        <div className="relative h-[420px] sm:h-[480px] w-full flex items-center justify-center perspective-1000">
          {worksData.map((work, idx) => {
            const distance = idx - activeIndex;
            const isCurrent = distance === 0;
            const isPrev = distance < 0;
            
            let transformStyle = '';
            let opacityStyle = 0;
            let filterStyle = 'blur(12px)';
            let pointerEvents = 'none';

            if (isCurrent) {
              transformStyle = 'translate3d(0, 0, 0px) rotateX(0deg) scale3d(1, 1, 1)';
              opacityStyle = 1;
              filterStyle = 'blur(0px)';
              pointerEvents = 'auto';
            } else if (isPrev) {
              transformStyle = 'translate3d(-120px, -40px, -300px) rotateY(20deg) rotateX(8deg) scale3d(0.8, 0.8, 0.8)';
              opacityStyle = 0.3;
              filterStyle = 'blur(8px)';
            } else {
              transformStyle = 'translate3d(160px, 50px, -400px) rotateY(-25deg) rotateX(-10deg) scale3d(0.7, 0.7, 0.7)';
              opacityStyle = 0.15;
              filterStyle = 'blur(12px)';
            }

            return (
              <div 
                key={work.id}
                aria-hidden={!isCurrent}
                className="absolute w-full max-w-4xl transition-all duration-700 ease-out will-change-transform"
                style={{ 
                  transform: transformStyle,
                  opacity: opacityStyle,
                  filter: filterStyle,
                  pointerEvents: pointerEvents,
                  zIndex: isCurrent ? 50 : 10 - Math.abs(distance)
                }}
              >
                <TiltCard className="w-full">
                  <a 
                    href={work.link} 
                    tabIndex={isCurrent ? 0 : -1}
                    target={work.link !== '#' ? "_blank" : "_self"} 
                    rel="noopener noreferrer" 
                    className="block relative bg-neutral-950/95 backdrop-blur-3xl text-white border-2 border-white/40 p-8 sm:p-14 h-80 sm:h-96 flex flex-col justify-between group hover:border-[#dc2626] hover:shadow-[0_0_60px_rgba(220,38,38,0.5)] transition-all shadow-[0_30px_70px_rgba(0,0,0,0.98)] rounded"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs sm:text-sm bg-white/10 text-white px-3 py-1 font-black tracking-widest border border-white/20 shadow">{work.id}</span>
                      <ArrowUpRight size={32} className="text-neutral-400 group-hover:text-[#dc2626] transition-transform group-hover:rotate-45" />
                    </div>
                    <div>
                      <h4 className="text-3xl sm:text-6xl font-black tracking-tighter uppercase mb-4 text-white group-hover:text-[#dc2626] transition-colors drop-shadow-lg">{work.title}</h4>
                      <span className="text-xs text-white bg-[#dc2626] px-3.5 py-1 font-bold inline-block mb-3 shadow-[0_0_15px_rgba(220,38,38,0.7)]">{work.type}</span>
                      <p className="text-xs sm:text-sm text-neutral-300 font-mono tracking-wider">// {work.tech}</p>
                    </div>
                  </a>
                </TiltCard>
              </div>
            );
          })}
        </div>

        <div className="grid gap-3 mt-8" style={{ gridTemplateColumns: `repeat(${worksData.length}, minmax(0, 1fr))` }}>
          {worksData.map((work, idx) => (
            <button
              key={work.id}
              type="button"
              aria-label={`Show ${work.title}`}
              aria-pressed={activeIndex === idx}
              className="group py-3 rounded cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              onClick={() => {
                if (!containerRef.current) return;
                const scrollRange = containerRef.current.scrollHeight - window.innerHeight;
                window.scrollTo({ top: ((idx + 0.5) / worksData.length) * scrollRange + containerRef.current.offsetTop, behavior: 'smooth' });
              }}
            >
              <span className={`block h-1.5 transition-all duration-500 rounded ${activeIndex === idx ? 'bg-[#dc2626] shadow-[0_0_15px_#dc2626]' : 'bg-white/20 group-hover:bg-white/40'}`} />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

/* ==========================================================================
   SKILLS SECTION — HORIZONTAL RUNNING TICKER
   ================================================================---------- */
const SkillsTicker = () => {
  const compact = useMediaQuery(COMPACT_QUERY);
  const skills = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 
    'Three.js', 'Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'WebGL', 'Vercel',
    'TanStack Start', 'TanStack Router', 'TanStack Query', 'Firebase Auth',
    'Cloud Firestore', 'Firebase Admin SDK', 'Firestore Rules', 'Zustand',
    'Zod', 'React Hook Form', 'Radix UI', 'KaTeX', 'jsPDF', 'Playwright',
    'Better Auth', 'Kysely', 'PGLite', 'SQL Migrations'
  ];

  const lmsSkills = [
    { title: 'Authentication & Access', icon: Shield, detail: 'Google and email/password sign-in, password recovery, server-side ID token verification, and student, mentor, and administrator access checks.' },
    { title: 'Databases & Live Data', icon: Database, detail: 'Firestore profiles, quiz progress, snapshot subscriptions, live rankings, and security rules. PostgreSQL integration, SQL migrations, and a PGLite preview fallback.' },
    { title: 'Learning & Assessment', icon: Activity, detail: 'Chapter-wise question banks, past papers, timed quizzes, explanations, attempt history, progress analytics, and protected test-session workflows.' },
    { title: 'Admin & Content Tools', icon: Workflow, detail: 'Admin and mentor dashboards, student enrollment, session access and expiry, test management, and validated TXT, JSON, and CSV question-import workflows.' },
    { title: 'Interfaces & Study Exports', icon: Layers, detail: 'Responsive React and TypeScript interfaces with TanStack, Tailwind, Radix UI, Zustand, and Zod. KaTeX formula rendering and jsPDF/html2canvas quiz-review exports.' },
    { title: 'Delivery & Verification', icon: CheckCircle2, detail: 'Vite builds and Vercel deployment, chapter-manifest and SEO scripts, Python question-bank imports, Node tests, Playwright flows, and Firestore emulator permission tests.' },
  ];

  const tickerContent = [...skills, ...skills, ...skills];

  return (
    <section id="skills" className="relative z-10 w-full py-20 bg-transparent border-b border-white/15 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-8">
        <p className="text-[#dc2626] text-xs font-bold tracking-[0.3em] uppercase mb-1">// TECHNICAL CORE STACK</p>
        <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-white drop-shadow">Skills & Technologies</h3>
      </div>

      <div className="relative w-full overflow-hidden py-4 bg-neutral-950/80 border-y border-white/20 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        <div className={compact ? "flex flex-wrap gap-2 px-4" : "flex w-max animate-marquee gap-6"}>
          {(compact ? skills : tickerContent).map((skill, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-3 px-6 py-3.5 bg-black/80 backdrop-blur-xl border border-white/20 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-widest shadow-lg shrink-0 hover:border-[#dc2626] transition-colors"
            >
              <div className="w-2 h-2 bg-[#dc2626] rounded-full animate-pulse"></div>
              {skill}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-10 sm:mt-14">
        <p className="text-[#3b82f6] text-xs font-bold tracking-[0.2em] uppercase mb-6">// BUILT THROUGH DIFF. MDCAT</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {lmsSkills.map((skill) => (
            <TiltCard key={skill.title} className="h-full">
              <article className="h-full border border-white/20 bg-neutral-950/90 backdrop-blur-2xl p-6 rounded shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-[#dc2626] transition-colors">
                <skill.icon size={24} className="text-[#3b82f6] mb-4" aria-hidden="true" />
                <h4 className="text-base font-black uppercase tracking-tight mb-3">{skill.title}</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">{skill.detail}</p>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 75s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

const RadialOrbitalScrollytelling = () => {
  const compact = useMediaQuery(COMPACT_QUERY);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const modules = [
    { id: "NODE_01", title: "Frontend & Reactive UI Architecture", category: "CLIENT KERNEL", icon: Code, color: "#dc2626", desc: "Engineered with React, Next.js, and Tailwind CSS. Implements butter-smooth custom magnetic cursors, perspective tilt cards, and GPU-accelerated spatial transformations.", stats: "60 FPS Render Rate" },
    { id: "NODE_02", title: "SQL Integration & Migrations", category: "BACKEND INTEGRATION", icon: Database, color: "#3b82f6", desc: "Server-only parameterized SQL, PostgreSQL connection pooling, and tracked migrations. The LMS supports a configured Neon database or PGLite preview fallback, with Better Auth and Kysely integration.", stats: "PostgreSQL / PGLite / Kysely" },
    { id: "NODE_03", title: "Python Machine Learning & AI", category: "INTELLIGENT PIPELINES", icon: Cpu, color: "#10b981", desc: "Advanced neural networks and automated contract generation systems built with Python, PyTorch, and Vercel Edge functions for real-time inference.", stats: "Real-time AI Synthesis" },
    { id: "NODE_04", title: "Vercel Deployment & Build Pipelines", category: "CLOUD DEPLOYMENT", icon: Globe, color: "#f59e0b", desc: "Vercel deployment with Vite builds, generated chapter manifests, and SEO scripts. The LMS includes automated checks for question imports, authentication, and student flows.", stats: "Build / Deploy / Verify" },
    { id: "NODE_05", title: "Firebase Auth & Access Control", category: "IDENTITY & PERMISSIONS", icon: Shield, color: "#dc2626", desc: "Google and email/password authentication, password recovery, Firebase Admin token verification, and role checks for students, mentors, and administrators in DIFF. MDCAT.", stats: "Student / Mentor / Admin" },
    { id: "NODE_06", title: "Firestore & Student Analytics", category: "LIVE LEARNING DATA", icon: Database, color: "#3b82f6", desc: "Cloud Firestore stores profiles and progress, with snapshot subscriptions for live rankings. Ownership rules protect student records, and saved guest attempts synchronize after sign-in.", stats: "Profiles / Progress / Rankings" },
    { id: "NODE_07", title: "LMS & Assessment Workflows", category: "EDUCATION PLATFORM", icon: Activity, color: "#10b981", desc: "Question banks, timed quizzes, explanations, protected test sessions, admin and mentor dashboards, validated MCQ imports, and downloadable quiz reviews with mathematical notation.", stats: "Practice / Assess / Review" }
  ];

  useEffect(() => {
    if (compact) return;
    let animationFrameId = null;

    const handleScroll = () => {
      if (!containerRef.current) return;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollRange = rect.height - window.innerHeight;
        if (scrollRange <= 0) return;

        let progress = -rect.top / scrollRange;
        progress = Math.max(0, Math.min(1, progress));
        const newIndex = Math.min(modules.length - 1, Math.floor(progress * modules.length));
        setActiveIndex(newIndex);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [compact, modules.length]);

  if (compact) return (
    <section id="ecosystem" className="mobile-section">
      <p className="mobile-eyebrow">// SYSTEMS & CAPABILITIES</p>
      <h3 className="mobile-heading">Inside the stack.</h3>
      <div className="grid gap-3">
        {modules.map(m => (
          <details key={m.id} className="mobile-capability" open={m.id === "NODE_05"}>
            <summary className="flex items-center gap-3 cursor-pointer p-5"><m.icon size={22} style={{color: m.color}} className="shrink-0" /><span className="text-sm font-bold flex-1">{m.title}</span><ChevronRight size={18} className="detail-chevron shrink-0" /></summary>
            <div className="px-5 pb-5"><p className="text-sm text-neutral-300 leading-relaxed">{m.desc}</p><p className="text-xs text-[#3b82f6] mt-4">{m.stats}</p></div>
          </details>
        ))}
      </div>
    </section>
  );

  return (
    <section ref={containerRef} id="ecosystem" className="relative bg-transparent" style={{ height: `${(modules.length * 1.25 + 1) * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between px-4 sm:px-16 py-12 sm:py-20 pointer-events-auto">
        
        <div className="flex justify-between items-center border-b border-white/15 pb-4 sm:pb-6 bg-neutral-950/90 backdrop-blur-2xl px-4 sm:px-6 rounded shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div>
            <p className="text-[#dc2626] text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-1">// SLOW-SCROLL ECOSYSTEM MATRIX</p>
            <h3 className="text-xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow">Interactive Matrix</h3>
          </div>
          <div className="text-right font-mono text-[10px] sm:text-xs text-neutral-200">
            ACTIVE_INDEX: <span className="text-white font-bold">0{activeIndex + 1} / 0{modules.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center my-auto">
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-4">
            <div className="absolute w-56 sm:w-72 h-56 sm:h-72 rounded-full border border-white/20 animate-spin" style={{ animationDuration: '25s' }}></div>
            <div className="absolute w-40 sm:w-52 h-40 sm:h-52 rounded-full border border-dashed border-white/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
            
            <div className="w-28 sm:w-36 h-28 sm:h-36 rounded-full bg-neutral-950/90 backdrop-blur-2xl border-2 border-[#dc2626] flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.5)] relative z-10 transition-all duration-500">
              {React.createElement(modules[activeIndex].icon, { size: 36, style: { color: modules[activeIndex].color } })}
            </div>
            
            <div className="mt-6 sm:mt-8 text-center relative z-10">
              <span className="text-[10px] sm:text-xs font-mono px-3 sm:px-4 py-1.5 bg-neutral-950/90 backdrop-blur-2xl border border-white/20 text-white uppercase shadow-lg">
                {modules[activeIndex].category}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 border border-white/20 bg-neutral-950/90 backdrop-blur-3xl p-6 sm:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative overflow-hidden rounded">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-600/25 to-transparent pointer-events-none"></div>
            
            <span className="text-[10px] sm:text-xs font-mono text-[#dc2626] block mb-2">{modules[activeIndex].id} // SYSTEM KERNEL</span>
            <h4 className="text-2xl sm:text-5xl font-black uppercase tracking-tighter text-white mb-4 sm:mb-6 leading-tight sm:leading-none drop-shadow">
              {modules[activeIndex].title}
            </h4>
            <p className="text-xs sm:text-base text-neutral-200 font-mono leading-relaxed mb-6 sm:mb-8">
              {modules[activeIndex].desc}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 sm:pt-6 border-t border-white/15 gap-2 sm:gap-0">
              <div className="flex items-center gap-2">
                <Network size={16} className="text-[#3b82f6] shrink-0" />
                <span className="text-[11px] sm:text-xs font-mono text-neutral-300 uppercase">System Capability:</span>
              </div>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white bg-neutral-950/90 backdrop-blur-xl px-3 py-1 border border-white/20 w-fit">
                {modules[activeIndex].stats}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-2 sm:gap-4 border-t border-white/15 pt-4 sm:pt-6 bg-neutral-950/90 backdrop-blur-2xl px-4 sm:px-6 pb-3 sm:pb-4 rounded shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]" style={{ gridTemplateColumns: `repeat(${modules.length}, minmax(0, 1fr))` }}>
          {modules.map((m, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 sm:h-2 transition-all duration-300 cursor-pointer ${activeIndex === idx ? 'bg-[#dc2626] shadow-[0_0_15px_#dc2626]' : 'bg-white/20 hover:bg-white/40'}`}
              onClick={() => {
                if (!containerRef.current) return;
                const scrollRange = containerRef.current.scrollHeight - window.innerHeight;
                window.scrollTo({ top: ((idx + 0.5) / modules.length) * scrollRange + containerRef.current.offsetTop, behavior: 'smooth' });
              }}
            ></div>
          ))}
        </div>

      </div>
    </section>
  );
};

const ScrollytellingSection = () => {
  const compact = useMediaQuery(COMPACT_QUERY);
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  const milestones = [
    { phase: "PHASE_01 // ARCHITECTING", title: "Learning Flows & Data Modeling", desc: "Planning student, mentor, and admin journeys; organizing question banks; modeling Firestore records and SQL schemas; and defining access rules for private tests." },
    { phase: "PHASE_02 // ENGINEERING", title: "Full-Stack LMS Engineering", desc: "Building React and TypeScript interfaces with TanStack and Tailwind, connecting Firebase authentication, synchronizing progress, and implementing assessment and content-management APIs." },
    { phase: "PHASE_03 // 3D KERNEL INTEGRATION", title: "WebGL Shaders & Spatial Shards", desc: "Embedding Three.js particle matrices, raycasted mouse physics, and hardware-accelerated 60FPS visual depth into user interfaces." },
    { phase: "PHASE_04 // DEPLOYMENT & SCALE", title: "Verification & Production Delivery", desc: "Validating question imports, testing student flows and Firestore permissions, generating SEO assets, checking production builds, and deploying through Vercel." }
  ];

  useEffect(() => {
    if (compact) return;
    let animationFrameId = null;

    const handleScroll = () => {
      if (!containerRef.current) return;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollRange = rect.height - window.innerHeight;
        if (scrollRange <= 0) return;

        let progress = -rect.top / scrollRange;
        progress = Math.max(0, Math.min(1, progress));
        const newStep = Math.min(milestones.length - 1, Math.floor(progress * milestones.length));
        setActiveStep(newStep);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [compact, milestones.length]);

  if (compact) return (
    <section id="scrollytelling" className="mobile-section">
      <p className="mobile-eyebrow">// DEVELOPMENT LIFECYCLE</p>
      <h3 className="mobile-heading">From idea to launch.</h3>
      <ol className="grid gap-4">
        {milestones.map((m, idx) => (
          <li key={m.phase} className="mobile-phase"><span className="text-[#dc2626] text-xs font-bold">0{idx + 1} / {m.phase.split(" // ")[1]}</span><h4 className="text-xl font-bold mt-3 mb-3">{m.title}</h4><p className="text-sm text-neutral-300 leading-relaxed">{m.desc}</p></li>
        ))}
      </ol>
    </section>
  );

  return (
    <section ref={containerRef} id="scrollytelling" className="relative h-[600vh] bg-transparent border-b border-white/10">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center px-4 sm:px-16">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 items-center">
          <div className="lg:col-span-5 border border-white/15 bg-neutral-950/90 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl rounded">
            <p className="text-[#dc2626] text-xs font-bold tracking-[0.3em] uppercase mb-4">// SLOW NARRATIVE PROGRESSION</p>
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-6">Development Lifecycle</h3>
            <div className="space-y-4 font-mono text-xs">
              {milestones.map((m, idx) => (
                <div key={idx} className={`p-3 sm:p-4 border transition-all flex items-center justify-between ${activeStep === idx ? 'border-[#dc2626] bg-neutral-900 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]' : 'border-white/10 bg-neutral-950 text-neutral-400'}`}>
                  <span>{m.phase}</span>
                  {activeStep === idx && <div className="w-2 h-2 bg-[#dc2626] rounded-full animate-ping"></div>}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="min-h-[45vh] sm:min-h-[55vh] flex flex-col justify-center border-l-2 border-white/20 pl-8 sm:pl-12 bg-neutral-950/90 backdrop-blur-md p-8 rounded shadow-2xl transition-all duration-300">
              <span className="text-xs font-mono text-[#dc2626] mb-3 tracking-widest">{milestones[activeStep].phase}</span>
              <h4 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter text-white mb-4 sm:mb-6 leading-tight sm:leading-none">{milestones[activeStep].title}</h4>
              <p className="text-sm sm:text-base text-neutral-300 font-mono leading-relaxed">{milestones[activeStep].desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contact" className="portfolio-footer relative z-10 w-full bg-transparent">
    <div className="px-4 sm:px-8 py-24 border-b border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-16 bg-black/50 backdrop-blur-md">
      <div>
        <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase text-white drop-shadow">Let's build<br/>something great.</h2>
        <p className="text-xs text-neutral-300 mt-6 tracking-widest uppercase font-bold">Reach out to discuss your SaaS, LMS, authentication, database, or interactive web platform.</p>
        <div className="mt-8 flex flex-col gap-4 text-xs font-bold tracking-widest">
          <a href="mailto:usman@diffmdcat.com" className="text-neutral-200 hover:text-[#dc2626] transition-colors">usman@diffmdcat.com</a>
          <a href="https://github.com/usmanubaid396" target="_blank" rel="noopener noreferrer" className="text-neutral-200 hover:text-[#dc2626] transition-colors">github</a>
          <a href="https://linkedin.com/in/uu51" target="_blank" rel="noopener noreferrer" className="text-neutral-200 hover:text-[#dc2626] transition-colors">linkedin</a>
          <span className="text-[#3b82f6]">LAHORE, PAKISTAN [31.5204° N, 74.3587° E]</span>
        </div>
      </div>
      <div>
        <form className="flex flex-col gap-4 bg-black/60 p-8 border border-white/15 backdrop-blur-xl shadow-2xl" onSubmit={(e) => { e.preventDefault(); window.location.href = 'mailto:usman@diffmdcat.com'; }}>
          <input type="email" placeholder="YOUR EMAIL" required className="bg-black/80 border border-white/15 p-4 text-xs font-bold uppercase text-white focus:border-[#dc2626] outline-none transition-colors" />
          <textarea placeholder="PROJECT DETAILS / MESSAGE" rows="4" required className="bg-black/80 border border-white/15 p-4 text-xs font-bold uppercase text-white focus:border-[#dc2626] outline-none resize-none transition-colors"></textarea>
          <button type="submit" className="bg-white text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-[#dc2626] hover:text-white transition-colors border border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]">Send Message</button>
        </form>
      </div>
    </div>
    <div className="px-4 sm:px-8 py-6 text-[10px] text-neutral-400 tracking-widest uppercase font-bold flex justify-between bg-black/80 backdrop-blur-md border-t border-white/10">
      <div>&copy; {new Date().getFullYear()} USMAN UBAID // ALL RIGHTS RESERVED.</div>
      <div>{/* Adaptive rendering avoids promising a fixed frame rate. */}ADAPTIVE_3D_KERNEL</div>
    </div>
  </footer>
);

export default function App() {
  const compact = useMediaQuery(COMPACT_QUERY);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <div className="min-h-screen relative font-mono text-white bg-black">
      <div aria-hidden="true" className="ambient-background" />
      {!reducedMotion && <React.Suspense fallback={null}><WebGLEngine compact={compact} /></React.Suspense>}
      <SystemStatus />
      <main className="relative z-10 pt-12">
        <Navigation />
        <Hero />
        <Works />
        <SkillsTicker />
        <RadialOrbitalScrollytelling />
        <ScrollytellingSection />
        <Footer />
      </main>
    </div>
  );
}
