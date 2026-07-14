"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

// ── Static project data fetched from github.com/Niravsb ──────
const PROJECTS = [
  {
    name: "Ledger AI",
    category: "AI / Finance",
    lang: "JavaScript · React",
    description: "100% private AI-powered UPI expense tracker with analytics dashboards and Claude/Ollama chat.",
    image: "/project_ledger_ai.png",
    liveUrl: "https://ledger-ai-gules.vercel.app",
    repoUrl: "https://github.com/Niravsb/ledger-ai",
  },
  {
    name: "MediFlow",
    category: "Full-Stack",
    lang: "Python · Django",
    description: "Hospital management system with role-based access, appointment booking, and Google Calendar sync.",
    image: "/project_mediflow.png",
    liveUrl: null,
    repoUrl: "https://github.com/Niravsb/mediflow",
  },
  {
    name: "Trading Bot",
    category: "Automation",
    lang: "Python · Binance API",
    description: "CLI-based Binance Futures trading bot with strict validation, secure env management, and live logging.",
    image: "/project_trading_bot.png",
    liveUrl: null,
    repoUrl: "https://github.com/Niravsb/trading_bot",
  },
] as const;

export default function Home() {
  const splineRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // ── Lazy-load Spline after first paint ──────────────────
    const loadSpline = () => {
      if (splineRef.current) {
        splineRef.current.src = "https://my.spline.design/distortingtypography-o3pLERRIgO1CxGueviGvHYlm/";
      }
    };
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadSpline, { timeout: 2000 });
    } else {
      setTimeout(loadSpline, 200);
    }

    // ── Smooth scroll for anchor links ──────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const linkElement = e.currentTarget as HTMLAnchorElement;
        const targetId = linkElement.getAttribute('href');
        if (!targetId || targetId === '#') return;
        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // ── Intersection Observer for reveal animations ─────────
    const revealElements = document.querySelectorAll('.reveal-element');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealElements.forEach(el => observer.observe(el));

    // ── Nav active link on scroll ───────────────────────────
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(section => navObserver.observe(section));

    // ── Header shrink on scroll ─────────────────────────────
    const header = document.querySelector('.glass-header') as HTMLElement | null;
    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 50) {
        header.style.background = 'rgba(11, 11, 11, 0.85)';
        header.style.padding = '10px 30px';
      } else {
        header.style.background = 'rgba(11, 11, 11, 0.6)';
        header.style.padding = '15px 30px';
      }
    };

    // ── 3D Parallax Tilt for About ──────────────────────────
    const aboutCard = document.getElementById('about-card') as HTMLElement | null;
    const onAboutMouseMove = (e: MouseEvent) => {
      if (!aboutCard) return;
      const rect = aboutCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -8;
      const rotateY = ((x - rect.width / 2) / rect.width) * 8;
      aboutCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const onAboutMouseLeave = () => {
      if (aboutCard) aboutCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    };

    aboutCard?.addEventListener('mousemove', onAboutMouseMove);
    aboutCard?.addEventListener('mouseleave', onAboutMouseLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial hero reveal
    setTimeout(() => {
      document.body.classList.add('loaded');
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0 });
      document.querySelectorAll('.hero-content .reveal-element').forEach(el => heroObserver.observe(el));
    }, 100);

    return () => {
      window.removeEventListener('scroll', onScroll);
      aboutCard?.removeEventListener('mousemove', onAboutMouseMove);
      aboutCard?.removeEventListener('mouseleave', onAboutMouseLeave);
      observer.disconnect();
      navObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <header className="glass-header">
        <div className="logo-container">
          <Image src="/logo.png" alt="NB Logo" fill className="nav-logo" sizes="52px" priority />
        </div>
        <nav>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="spline-container">
          {/* Spline iframe is lazy-loaded via useEffect after idle callback */}
          <iframe
            ref={splineRef}
            frameBorder="0"
            className="spline-iframe"
            loading="lazy"
            title="3D Hero Animation"
          />
        </div>
        <div className="hero-content">
          <h1 className="hero-title text-delay">Creative Developer <br/>& Designer</h1>
          <a href="#work" className="btn-primary reveal-element text-delay" style={{marginTop: '2rem'}}>View Work</a>
        </div>
      </section>

      {/* Selected Works */}
      <section className="works" id="work">
        <div className="container">
          <h2 className="section-title reveal-element">Selected Works</h2>
          <div className="works-grid">
            {PROJECTS.map((project, i) => (
              <div key={project.name} className={`reveal-element reveal-delay-${i + 1}`}>
                <CardContainer className="inter-var">
                  <CardBody className="project-3d-body">
                    <div>
                      <CardItem translateZ="50" className="project-title">
                        {project.name}
                      </CardItem>
                      <CardItem as="span" translateZ="55" className="project-category">
                        {project.category}
                      </CardItem>
                      <CardItem as="span" translateZ="55" className="project-lang">
                        {project.lang}
                      </CardItem>
                    </div>
                    <CardItem translateZ="100" className="project-image-wrapper-3d block-display">
                      <Image
                        src={project.image}
                        alt={`${project.name} preview`}
                        className="project-image-3d"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </CardItem>
                    <div className="project-actions">
                      <CardItem
                        translateZ={20}
                        as="a"
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        GitHub <span className="arrow">→</span>
                      </CardItem>
                      {project.liveUrl && (
                        <CardItem
                          translateZ={20}
                          as="a"
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-secondary"
                        >
                          Live ↗
                        </CardItem>
                      )}
                    </div>
                  </CardBody>
                </CardContainer>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Marquee */}
      <section className="about" id="about">
        <div className="marquee-container">
          <div className="marquee-content">
            <span>AI Apps</span>
            <span className="separator">•</span>
            <span>React</span>
            <span className="separator">•</span>
            <span>Django</span>
            <span className="separator">•</span>
            <span>Python</span>
            <span className="separator">•</span>
            <span>WebGL</span>
            <span className="separator">•</span>
            <span>Three.js</span>
            <span className="separator">•</span>
            {/* Duplicated for seamless loop */}
            <span>AI Apps</span>
            <span className="separator">•</span>
            <span>React</span>
            <span className="separator">•</span>
            <span>Django</span>
            <span className="separator">•</span>
            <span>Python</span>
            <span className="separator">•</span>
            <span>WebGL</span>
            <span className="separator">•</span>
            <span>Three.js</span>
            <span className="separator">•</span>
          </div>
        </div>
        <div className="container">
          <div className="about-grid" id="about-card">
            <div className="about-image-wrapper reveal-element">
              <div className="about-image-inner">
                <Image
                  src="/developer_portrait.jpg"
                  alt="Nirav Borde"
                  fill
                  sizes="(max-width: 900px) 300px, 480px"
                  className="about-image"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
            </div>
            <div className="about-text-content">
              <h2 className="section-title reveal-element">About</h2>
              <p className="about-text reveal-element">
                I&apos;m a developer obsessed with the intersection of AI and great interfaces. I build full-stack apps, automated systems, and interactive experiences — from private AI expense trackers to hospital management platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="footer" id="contact">
        <div className="container">
          <h2 className="huge-text reveal-element">Let&apos;s build<br/>something great.</h2>
          <div className="footer-bottom reveal-element">
            <a href="mailto:bordenirav@gmail.com" className="email-link">bordenirav@gmail.com</a>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/nirav-borde-445528271"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Niravsb"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
