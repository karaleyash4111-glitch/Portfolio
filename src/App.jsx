import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Icosahedron, MeshDistortMaterial, Environment, Sparkles } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X, Code2, Layers3, Cpu, ExternalLink, Terminal, MoveUpRight, Download, MousePointer2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: '01', name: 'MoodMate', type: 'AI / COMPUTER VISION', desc: 'An emotion-aware companion that explores mood detection and recommends music, quotes, and small activities.', stack: ['Python', 'OpenCV', 'Java'], symbol: '◉', tint: 'red' },
  { id: '02', name: 'PetSafe', type: 'PET CARE WEBSITE', desc: 'A pet-care website concept focused on making everyday pet information and care resources easier to explore.', stack: ['HTML', 'CSS', 'JavaScript'], symbol: '✳', tint: 'wine' },
  { id: '03', name: 'Campus Connect', type: 'STUDENT PLATFORM', desc: 'A student-focused platform concept for sharing campus information, activities, and useful updates in one place.', stack: ['Java', 'HTML', 'CSS'], symbol: '⌘', tint: 'ember' },
];

const skills = ['Java', 'Python', 'HTML', 'CSS', 'JavaScript'];

function Scene() {
  const orb = useRef();
  useFrame((state, delta) => {
    if (!orb.current) return;
    orb.current.rotation.x += delta * 0.12;
    orb.current.rotation.y += delta * 0.2;
    orb.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.12;
    orb.current.rotation.z = state.pointer.x * 0.12;
  });
  return <>
    <color attach="background" args={['#090708']} />
    <fog attach="fog" args={['#090708', 5, 13]} />
    <ambientLight intensity={0.5} />
    <pointLight position={[3, 2, 3]} intensity={18} color="#ff203f" />
    <pointLight position={[-3, -1, -2]} intensity={8} color="#711027" />
    <Suspense fallback={null}>
      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={orb} position={[1.75, 0.05, 0]}>
          <Icosahedron args={[1.25, 5]}>
            <MeshDistortMaterial color="#c8102e" roughness={0.22} metalness={0.78} distort={0.28} speed={1.7} />
          </Icosahedron>
          <mesh scale={1.38}>
            <icosahedronGeometry args={[1, 2]} />
            <meshBasicMaterial color="#ff3654" wireframe transparent opacity={0.32} />
          </mesh>
          <mesh rotation={[0.8, 0.2, 0.5]} scale={1.68}>
            <torusGeometry args={[1, 0.006, 8, 160]} />
            <meshBasicMaterial color="#ff3b57" transparent opacity={0.7} />
          </mesh>
          <mesh rotation={[1.3, 0.4, -0.5]} scale={1.9}>
            <torusGeometry args={[1, 0.004, 8, 160]} />
            <meshBasicMaterial color="#a70e2b" transparent opacity={0.8} />
          </mesh>
        </group>
      </Float>
      <Sparkles count={75} scale={7} size={2} speed={0.25} color="#ff526b" opacity={0.7} />
      <Stars radius={35} depth={24} count={700} factor={2} saturation={0} fade speed={0.5} />
      <Environment preset="night" />
    </Suspense>
  </>;
}

function Background3D() {
  return <div className="scene" aria-hidden="true">
    <Canvas camera={{ position: [0, 0, 6], fov: 48 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: false }}>
      <Scene />
    </Canvas>
    <div className="scene-vignette" />
    <div className="scanlines" />
  </div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['About', '#about'], ['Projects', '#projects'], ['Stack', '#stack'], ['Contact', '#contact']];
  return <header className="header">
    <a className="brand" href="#home" aria-label="Yash Karale home"><span className="brand-mark">YK<span>.</span></span><span className="brand-label">PORTFOLIO / 2026</span></a>
    <nav className={open ? 'nav nav-open' : 'nav'}>
      {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}<span>↗</span></a>)}
      <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>LET'S TALK <ArrowUpRight size={14} /></a>
    </nav>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
  </header>;
}

function SectionLabel({ n, children }) {
  return <div className="section-label"><span>{n}</span><span className="label-line" />{children}</div>;
}

function ProjectCard({ project, index }) {
  return <article className={`project-card project-${project.tint}`} data-reveal style={{ '--delay': `${index * 100}ms` }}>
    <div className="project-visual">
      <span className="project-index">PROJECT / {project.id}</span>
      <span className="project-symbol">{project.symbol}</span>
      <div className="visual-grid" />
      <span className="visual-cross cross-one">+</span><span className="visual-cross cross-two">+</span>
      <span className="visual-orbit orbit-one" /><span className="visual-orbit orbit-two" />
      <span className="visual-bottom">YK_LAB <span>• 0{index + 1}</span></span>
      <a className="project-open" href="#contact" aria-label={`Ask about ${project.name}`}><ArrowUpRight size={19} /></a>
    </div>
    <div className="project-meta"><span>{project.type}</span><span>{project.id} / 03</span></div>
    <h3>{project.name}</h3>
    <p>{project.desc}</p>
    <div className="tag-row">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
  </article>;
}

function App() {
  const [time, setTime] = useState('');
  const [cursor, setCursor] = useState({ x: -100, y: -100, visible: false });
  const [copied, setCopied] = useState(false);
  const [mobileEmail, setMobileEmail] = useState(false);
  const email = 'karaleyash4111@gmail.com';

  useEffect(() => {
    const onPointerMove = (event) => setCursor({ x: event.clientX, y: event.clientY, visible: true });
    const onPointerLeave = () => setCursor((current) => ({ ...current, visible: false }));
    window.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerleave', onPointerLeave);
    return () => { window.removeEventListener('pointermove', onPointerMove); document.removeEventListener('pointerleave', onPointerLeave); };
  }, []);

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()));
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-kicker, .hero-title, .hero-copy, .hero-actions, .hero-foot', {
        y: 24, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out', delay: 0.2
      });
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { y: 35, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.75, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });
      gsap.to('.about-orbit', {
        rotation: 360, duration: 24, repeat: -1, ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' }
      });
      gsap.to('.marquee-track', { xPercent: -25, ease: 'none', duration: 24, repeat: -1 });
    });
    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setMobileEmail(true);
    }
  };

  return <div className="app-shell">
    <Background3D />
    <Header />
    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-content">
          <div className="hero-kicker"><span className="status-dot" /> AVAILABLE FOR LEARNING & COLLABORATION <span className="kicker-code">[01—26]</span></div>
          <h1 className="hero-title">Building<br />the <span className="outline-word">next</span><br /><span className="red-word">digital</span> thing<span className="red-dot">.</span></h1>
          <p className="hero-copy">I'm <strong>Yash Karale</strong> — a student and front-end developer building digital experiences that feel alive.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">EXPLORE MY WORK <ArrowUpRight size={16} /></a>
            <a className="button button-ghost" href="/Yash-Karale-Resume.pdf" download><Download size={15} /> DOWNLOAD RESUME</a>
          </div>
          <div className="hero-foot"><span><span className="tiny-line" /> STUDENT & FRONT-END DEVELOPER</span><span>INDIA · IST {time || '––:––'}</span></div>
        </div>
        <div className="hero-side-note"><span>INTERACTIVE / 3D</span><span className="side-note-line" /><span>MOVE YOUR CURSOR</span></div>
        <a href="#about" className="scroll-cue"><span className="scroll-mouse"><i /></span><span>SCROLL TO EXPLORE</span></a>
        <div className="hero-coordinate">18° 31' N<br />73° 51' E</div>
      </section>

      <section className="ticker" aria-label="Skills marquee"><div className="marquee-track">{Array.from({ length: 4 }).map((_, i) => <span key={i}>CODE WITH INTENT <b>✳</b> DESIGN WITH FEELING <b>✳</b> STAY CURIOUS <b>✳</b> BUILD WHAT MATTERS <b>✳</b></span>)}</div></section>

      <section className="section-wrap about-section" id="about">
        <SectionLabel n="01">ABOUT / THE HUMAN</SectionLabel>
        <div className="about-layout">
          <div className="about-heading" data-reveal><h2>Curious mind.<br /><span className="red-word">Builder</span> mindset.</h2><div className="about-orbit profile-orbit"><img src="/yash-karale-profile.jpeg" alt="Yash Karale profile photo" /><span className="profile-tag">YK / PROFILE</span><i /><b /></div><p className="profile-hint">Front-end developer, student, and sports enthusiast.</p></div>
          <div className="about-copy" data-reveal><p className="lead">Building digital experiences that feel alive.</p><p>I'm a front-end developer and BBA CA student currently in my 5th semester. I enjoy turning ideas into clean, engaging web experiences and continuing to grow my development skills through hands-on projects.</p><p>Outside coding, I enjoy playing cricket, football, and volleyball. Sports keep me active, competitive, and motivated to keep improving — both on and off the screen.</p><div className="education-chip"><span>EDUCATION</span><strong>BBA CA · 5TH SEMESTER</strong></div><a href="#contact" className="text-link">HAVE A PROJECT IN MIND? <MoveUpRight size={15} /></a></div>
        </div>
        <div className="stats-row" data-reveal><div><strong>03<span>+</span></strong><span>PROJECT CONCEPTS</span></div><div><strong>05</strong><span>CORE TECHNOLOGIES</span></div><div><strong>∞</strong><span>THINGS LEFT TO LEARN</span></div></div>
      </section>

      <section className="section-wrap projects-section" id="projects">
        <SectionLabel n="02">SELECTED WORK / THE EXPERIMENTS</SectionLabel>
        <div className="section-heading" data-reveal><h2>Ideas into<br /><span className="red-word">interfaces.</span></h2><p>A selection of student and web-development projects. Each one is an opportunity to learn, experiment, and build something useful.</p></div>
        <div className="projects-grid">{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.id} />)}</div>
        <div className="projects-note"><span className="status-dot" /> MORE EXPERIMENTS IN PROGRESS <span className="note-line" /> <span>STAY TUNED ↗</span></div>
      </section>

      <section className="section-wrap stack-section" id="stack">
        <SectionLabel n="03">THE TOOLKIT / ALWAYS EVOLVING</SectionLabel>
        <div className="stack-layout">
          <div data-reveal><h2>Tools are just<br />the <span className="red-word">beginning.</span></h2><p>I'm growing a practical toolkit one project at a time — from programming fundamentals to the front-end details people interact with.</p><div className="stack-mini-cards"><div><Code2 /><span>BUILD</span><small>Write clean, useful code</small></div><div><Layers3 /><span>DESIGN</span><small>Make every detail count</small></div><div><Cpu /><span>EXPLORE</span><small>Keep experimenting</small></div></div></div>
          <div className="skills-panel" data-reveal><div className="panel-top"><span><Terminal size={14} /> yash@portfolio:~</span><span className="panel-lights"><i /><i /><i /></span></div><div className="terminal-prompt">const toolkit = <span>{'{'}</span></div><div className="skill-list">{skills.map((skill, i) => <div className="skill-item" key={skill}><span className="skill-num">0{i + 1}</span><span>{skill}</span><span className="skill-status">LEARNING / BUILDING</span></div>)}</div><div className="terminal-close"><span>{'}'}</span>;<span className="cursor-blink">_</span></div><div className="panel-footer">CONTINUOUSLY UPDATED <span>● ONLINE</span></div></div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-glow" />
        <div className="section-wrap contact-inner">
          <SectionLabel n="04">CONTACT / YOUR MOVE</SectionLabel>
          <div className="contact-main" data-reveal><span className="contact-eyebrow">GOT AN IDEA? LET'S MAKE IT REAL.</span><h2>Let's build<br />something <span className="red-word">bold.</span></h2><p>Open to collaborating, sharing ideas, and learning alongside people who love making things.</p><div className="contact-actions"><button className="button button-primary" onClick={copyEmail}><Mail size={16} /> {copied ? 'EMAIL COPIED!' : 'COPY EMAIL'} <ArrowUpRight size={16} /></button><a className="button button-ghost" href="mailto:karaleyash4111@gmail.com?subject=Let%E2%80%99s%20build%20something">SEND A MESSAGE <ExternalLink size={15} /></a></div>{mobileEmail && <p className="email-fallback">{email} — copy this address into your email app.</p>}</div>
          <div className="contact-bottom"><a className="brand" href="#home"><span className="brand-mark">YK<span>.</span></span></a><span>DESIGNED & BUILT WITH CURIOSITY <b>♥</b></span><div className="social-links"><a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile link"><Linkedin size={17} /></a><a href="mailto:karaleyash4111@gmail.com" aria-label="Email Yash"><Mail size={17} /></a></div><span>© 2026 YK / ALL RIGHTS RESERVED</span></div>
        </div>
      </section>
    </main>
    <div className="corner-stamp"><span>YK</span><i>STUDENT<br />DEVELOPER</i></div>
    <div className={cursor.visible ? 'custom-cursor cursor-visible' : 'custom-cursor'} style={{ left: cursor.x, top: cursor.y }} aria-hidden="true"><span /></div>
  </div>;
}

export default App;