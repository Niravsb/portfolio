"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

export default function Home() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const linkElement = e.currentTarget as HTMLAnchorElement;
        const targetId = linkElement.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    // Intersection Observer for fade-up animations
    const revealElements = document.querySelectorAll('.reveal-element');
    const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    revealElements.forEach(element => {
      revealOnScroll.observe(element);
    });

    // Parallax effect on header scroll
    const header = document.querySelector('.glass-header');
    const onScroll = () => {
      if (header) {
        if (window.scrollY > 50) {
          (header as HTMLElement).style.background = 'rgba(11, 11, 11, 0.85)';
          (header as HTMLElement).style.padding = '10px 30px';
        } else {
          (header as HTMLElement).style.background = 'rgba(11, 11, 11, 0.6)';
          (header as HTMLElement).style.padding = '15px 30px';
        }
      }
    };

    // 3D Parallax Tilt for About Section
    const aboutCard = document.getElementById('about-card');
    if (aboutCard) {
      aboutCard.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = aboutCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8; 
        const rotateY = ((x - centerX) / centerX) * 8;
        (aboutCard as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      aboutCard.addEventListener('mouseleave', () => {
        (aboutCard as HTMLElement).style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      });
    }
    window.addEventListener('scroll', onScroll);

    // Initial load animation fallbacks
    setTimeout(() => {
      document.body.classList.add('loaded');
      const firstRevealOptions = { threshold: 0 };
      const firstObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) entry.target.classList.add('visible');
          });
      }, firstRevealOptions);
      
      document.querySelectorAll('.hero-content .reveal-element').forEach(el => {
          firstObserver.observe(el);
      });
    }, 100);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Navigation */}
      <header className="glass-header">
        <div className="logo-container">
          <Image src="/logo.png" alt="NB Logo" fill className="nav-logo" sizes="52px" />
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
          <iframe src="https://my.spline.design/distortingtypography-o3pLERRIgO1CxGueviGvHYlm/" frameBorder="0" className="spline-iframe"></iframe>
        </div>
        <div className="hero-content">
          <h1 className="hero-title reveal-element text-delay">Creative Developer <br/>& Designer</h1>
          <a href="#work" className="btn-primary reveal-element text-delay" style={{marginTop: '2rem'}}>View Work</a>
        </div>
      </section>

      {/* Selected Works */}
      <section className="works" id="work">
        <div className="container">
          <h2 className="section-title reveal-element">Selected Works</h2>
          <div className="works-grid">
            {/* Project 1 */}
            <div className="reveal-element">
              <CardContainer className="inter-var">
                <CardBody className="project-3d-body">
                  <div>
                    <CardItem translateZ="50" className="project-title">
                      Aethel UI
                    </CardItem>
                    <CardItem as="p" translateZ="60" className="project-category">
                      Web Design
                    </CardItem>
                  </div>
                  <CardItem translateZ="100" className="project-image-wrapper-3d block-display">
                    <Image src="/project_1_uiux.png" alt="UI/UX Project" className="project-image-3d" fill />
                  </CardItem>
                  <div className="project-actions">
                    <CardItem translateZ={20} as="a" href="#work" className="project-link">
                      View Project →
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </div>
            {/* Project 2 */}
            <div className="reveal-element">
              <CardContainer className="inter-var">
                <CardBody className="project-3d-body">
                  <div>
                    <CardItem translateZ="50" className="project-title">
                      Chromatik
                    </CardItem>
                    <CardItem as="p" translateZ="60" className="project-category">
                      3D Art
                    </CardItem>
                  </div>
                  <CardItem translateZ="100" className="project-image-wrapper-3d block-display">
                    <Image src="/project_2_3d_art.png" alt="3D Art Project" className="project-image-3d" fill />
                  </CardItem>
                  <div className="project-actions">
                    <CardItem translateZ={20} as="a" href="#work" className="project-link">
                      View Project →
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </div>
            {/* Project 3 */}
            <div className="reveal-element">
              <CardContainer className="inter-var">
                <CardBody className="project-3d-body">
                  <div>
                    <CardItem translateZ="50" className="project-title">
                      Nexus Core
                    </CardItem>
                    <CardItem as="p" translateZ="60" className="project-category">
                      Interactive
                    </CardItem>
                  </div>
                  <CardItem translateZ="100" className="project-image-wrapper-3d block-display">
                    <Image src="/project_3_web_design.png" alt="Web Design Project" className="project-image-3d" fill />
                  </CardItem>
                  <div className="project-actions">
                    <CardItem translateZ={20} as="a" href="#work" className="project-link">
                      View Project →
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </div>
      </section>

      {/* About / Marquee */}
      <section className="about" id="about">
        <div className="marquee-container">
          <div className="marquee-content">
            <span>UI/UX</span>
            <span className="separator">•</span>
            <span>WebGL</span>
            <span className="separator">•</span>
            <span>React</span>
            <span className="separator">•</span>
            <span>Three.js</span>
            <span className="separator">•</span>
            <span>Spline</span>
            <span className="separator">•</span>
            {/* Duplicated for seamless loop */}
            <span>UI/UX</span>
            <span className="separator">•</span>
            <span>WebGL</span>
            <span className="separator">•</span>
            <span>React</span>
            <span className="separator">•</span>
            <span>Three.js</span>
            <span className="separator">•</span>
            <span>Spline</span>
            <span className="separator">•</span>
          </div>
        </div>
        <div className="container">
          <div className="about-grid" id="about-card">
            <div className="about-image-wrapper reveal-element">
              <div className="about-image-inner">
                {/* Image Removed for now, rounded space placeholder kept */}
              </div>
            </div>
            <div className="about-text-content">
              <h2 className="section-title reveal-element">About</h2>
              <p className="about-text reveal-element">
                I am a specialized creative developer focusing on interactive experiences, merging high-end design with modern web technologies. With a deep charcoal aesthetic at heart, I build premium digital interfaces that stand out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="container">
          <h2 className="huge-text reveal-element">Let&apos;s build<br/>something great.</h2>
          <div className="footer-bottom reveal-element">
            <a href="mailto:bordenirav@gmail.com" className="email-link">bordenirav@gmail.com</a>
            <div className="social-links">
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
