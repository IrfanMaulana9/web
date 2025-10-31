// ========================================
// PROJECT CLASS - OOP Approach
// ========================================
class Project {
  constructor(title, description, tags, link, image) {
      this.title = title;
      this.description = description;
      this.tags = tags;
      this.link = link;
      this.image = image;
  }

  render() {
      return `
          <div class="project-card">
              <div style="overflow: hidden;">
                  <img src="${this.image}" alt="${this.title}" class="project-image">
              </div>
              <div class="project-content">
                  <h3 class="project-title">${this.title}</h3>
                  <p class="project-description">${this.description}</p>
                  <div class="project-tags">
                      ${this.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                  </div>
                  <a href="${this.link}" target="_blank" class="project-link">
                      View Project →
                  </a>
              </div>
          </div>
      `;
  }
}

// ========================================
// SKILL CLASS - OOP Approach
// ========================================
class Skill {
  constructor(name, level, icon) {
      this.name = name;
      this.level = level;
      this.icon = icon;
  }

  render() {
      return `
          <div class="skill-card">
              <div class="skill-header">
                  <div class="skill-icon">${this.icon}</div>
                  <div class="skill-name">${this.name}</div>
              </div>
              <div class="skill-bar">
                  <div class="skill-progress" data-level="${this.level}" style="width: 0%;"></div>
              </div>
              <div class="skill-percentage">${this.level}%</div>
          </div>
      `;
  }
}

// ========================================
// CANVAS ANIMATION CLASS
// ========================================
class CanvasAnimation {
  constructor() {
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.particleCount = 80;
      
      this.init();
  }

  init() {
      this.resize();
      this.createParticles();
      this.animate();
      
      window.addEventListener('resize', () => this.resize());
  }

  resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
  }

  createParticles() {
      for (let i = 0; i < this.particleCount; i++) {
          this.particles.push({
              x: Math.random() * this.canvas.width,
              y: Math.random() * this.canvas.height,
              radius: Math.random() * 2 + 1,
              vx: (Math.random() - 0.5) * 0.5,
              vy: (Math.random() - 0.5) * 0.5,
              opacity: Math.random() * 0.5 + 0.2
          });
      }
  }

  drawParticles() {
      this.particles.forEach((particle, i) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0) particle.x = this.canvas.width;
          if (particle.x > this.canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = this.canvas.height;
          if (particle.y > this.canvas.height) particle.y = 0;

          this.ctx.beginPath();
          this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(242, 170, 76, ${particle.opacity})`;
          this.ctx.fill();

          for (let j = i + 1; j < this.particles.length; j++) {
              const dx = this.particles[j].x - particle.x;
              const dy = this.particles[j].y - particle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 120) {
                  this.ctx.beginPath();
                  this.ctx.moveTo(particle.x, particle.y);
                  this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                  this.ctx.strokeStyle = `rgba(242, 170, 76, ${0.15 * (1 - distance / 120)})`;
                  this.ctx.lineWidth = 1;
                  this.ctx.stroke();
              }
          }
      });
  }

  animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawParticles();
      requestAnimationFrame(() => this.animate());
  }
}

// ========================================
// CURSOR ANIMATION CLASS
// ========================================
class CursorAnimation {
  constructor() {
      this.dot = document.getElementById('cursor-dot');
      this.outline = document.getElementById('cursor-outline');
      this.mouseX = 0;
      this.mouseY = 0;
      this.outlineX = 0;
      this.outlineY = 0;
      
      this.init();
  }

  init() {
      document.addEventListener('mousemove', (e) => {
          this.mouseX = e.clientX;
          this.mouseY = e.clientY;
          
          this.dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });

      this.animateOutline();
      
      const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
      interactiveElements.forEach(el => {
          el.addEventListener('mouseenter', () => {
              this.outline.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px) scale(1.5)`;
              this.outline.style.borderColor = 'rgba(242, 170, 76, 0.8)';
          });
          
          el.addEventListener('mouseleave', () => {
              this.outline.style.transform = `translate(${this.outlineX}px, ${this.outlineY}px) scale(1)`;
              this.outline.style.borderColor = 'rgba(242, 170, 76, 0.3)';
          });
      });
  }

  animateOutline() {
      this.outlineX += (this.mouseX - this.outlineX) * 0.2;
      this.outlineY += (this.mouseY - this.outlineY) * 0.2;
      
      this.outline.style.left = this.outlineX + 'px';
      this.outline.style.top = this.outlineY + 'px';
      
      requestAnimationFrame(() => this.animateOutline());
  }
}

// ========================================
// SCROLL ANIMATION CLASS
// ========================================
class ScrollAnimation {
  constructor() {
      this.sections = document.querySelectorAll('section');
      this.init();
  }

  init() {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
              }
          });
      }, {
          threshold: 0.1,
          rootMargin: '0px 0px -100px 0px'
      });

      this.sections.forEach(section => {
          observer.observe(section);
      });
  }
}

// ========================================
// COUNTER ANIMATION CLASS
// ========================================
class CounterAnimation {
  constructor() {
      this.counters = document.querySelectorAll('.stat-number');
      this.animated = false;
      this.init();
  }

  init() {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting && !this.animated) {
                  this.animateCounters();
                  this.animated = true;
              }
          });
      }, { threshold: 0.5 });

      const aboutSection = document.getElementById('about');
      if (aboutSection) {
          observer.observe(aboutSection);
      }
  }

  animateCounters() {
      this.counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
              current += increment;
              if (current < target) {
                  counter.textContent = Math.floor(current);
                  requestAnimationFrame(updateCounter);
              } else {
                  counter.textContent = target;
              }
          };

          updateCounter();
      });
  }
}

// ========================================
// SKILLS ANIMATION CLASS
// ========================================
class SkillsAnimation {
  constructor() {
      this.animated = false;
      this.init();
  }

  init() {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting && !this.animated) {
                  this.animateSkills();
                  this.animated = true;
              }
          });
      }, { threshold: 0.3 });

      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
          observer.observe(skillsSection);
      }
  }

  animateSkills() {
      const progressBars = document.querySelectorAll('.skill-progress');
      progressBars.forEach((bar, index) => {
          setTimeout(() => {
              const level = bar.getAttribute('data-level');
              bar.style.width = level + '%';
          }, index * 100);
      });
  }
}

// ========================================
// PORTFOLIO MANAGER CLASS
// ========================================
class PortfolioManager {
  constructor() {
      this.projects = [];
      this.skills = [];
      this.init();
  }

  init() {
      this.loadProjects();
      this.loadSkills();
      this.setupNavigation();
      this.setupContactForm();
      
      new CanvasAnimation();
      new CursorAnimation();
      new ScrollAnimation();
      new CounterAnimation();
      new SkillsAnimation();
  }

  loadProjects() {
      const projectsData = [
          new Project(
              'Prediksi Diabetes',
              'Advanced analytics platform with machine learning insights and real-time data visualization for enterprise clients.',
              ['Java', 'Javafx'],
              'https://github.com/IrfanMaulana9/SistemPrediksiDiabetes',
              'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80'
          ),
          new Project(
              'Maytrav',
              'Website untuk pelayanan travel mobil dengan agen dan client.',
              ['Html', 'TailwindCSS', 'PHP', 'MySQL'],
              'https://github.com/IrfanMaulana9/MayTrav',
              'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80'
          ),
          new Project(
              'Rekomendasi Film',
              'Rekomendasi film Menggunakan Python.',
              ['Python', 'OpenAI', 'Streamlit'],
              'https://github.com/IrfanMaulana9/RekomendasiFilm',
              'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80'
          ),
      ];

      this.projects = projectsData;
      this.renderProjects();
  }

  loadSkills() {
      const skillsData = [
          new Skill('JavaScript', 95, '⚡'),
          new Skill('Html', 92, '</>'),
          new Skill('Css', 88, '🟢'),
          new Skill('Python', 85, '🐍'),
          new Skill('Database Design', 90, '📂'),
          new Skill('Java', 70, '♨️'),
          new Skill('Adobe Photoshop', 80, '🏞️'),
          new Skill('UI/UX Design', 87, '🎨')
      ];

      this.skills = skillsData;
      this.renderSkills();
  }

  renderProjects() {
      const container = document.getElementById('projects-grid');
      if (!container) return;

      container.innerHTML = this.projects.map(project => project.render()).join('');
      
      const cards = container.querySelectorAll('.project-card');
      cards.forEach((card, index) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(50px)';
          setTimeout(() => {
              card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
          }, index * 150);
      });
  }

  renderSkills() {
      const container = document.getElementById('skills-container');
      if (!container) return;

      container.innerHTML = this.skills.map(skill => skill.render()).join('');
      
      const cards = container.querySelectorAll('.skill-card');
      cards.forEach((card, index) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px)';
          setTimeout(() => {
              card.style.transition = 'all 0.5s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
          }, index * 100);
      });
  }

  setupNavigation() {
      const menuToggle = document.getElementById('menu-toggle');
      const navMenu = document.getElementById('nav-menu');

      menuToggle.addEventListener('click', () => {
          navMenu.classList.toggle('active');
          this.animateMenuIcon(menuToggle);
      });

      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', (e) => {
              e.preventDefault();
              const target = document.querySelector(anchor.getAttribute('href'));
              if (target) {
                  target.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                  });
                  navMenu.classList.remove('active');
              }
          });
      });

      window.addEventListener('scroll', () => {
          this.updateActiveNav();
      });
  }

  animateMenuIcon(toggle) {
      const spans = toggle.querySelectorAll('span');
      if (toggle.classList.contains('active')) {
          toggle.classList.remove('active');
          spans[0].style.transform = 'rotate(0) translateY(0)';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'rotate(0) translateY(0)';
      } else {
          toggle.classList.add('active');
          spans[0].style.transform = 'rotate(45deg) translateY(10px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
      }
  }

  updateActiveNav() {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          const id = section.getAttribute('id');

          if (scrollPos >= top && scrollPos < top + height) {
              document.querySelectorAll('.nav-item').forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === `#${id}`) {
                      link.classList.add('active');
                  }
              });
          }
      });
  }

  setupContactForm() {
      const form = document.getElementById('contact-form');
      
      form.addEventListener('submit', async (e) => {
          e.preventDefault();
          await this.handleFormSubmit(e.target);
      });
  }

  async handleFormSubmit(form) {
      const button = form.querySelector('.btn-submit');
      const originalHTML = button.innerHTML;
      
      button.innerHTML = '<span>Sending...</span>';
      button.style.transform = 'scale(0.95)';
      button.disabled = true;
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      button.innerHTML = '<span>✓ Message Sent!</span>';
      button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      
      setTimeout(() => {
          button.innerHTML = originalHTML;
          button.style.background = '';
          button.style.transform = '';
          button.disabled = false;
          form.reset();
      }, 2000);
  }
}

// ========================================
// PARALLAX EFFECT CLASS
// ========================================
class ParallaxEffect {
  constructor() {
      this.init();
  }

  init() {
      window.addEventListener('scroll', () => {
          const scrolled = window.pageYOffset;
          
          const floatingCards = document.querySelectorAll('.floating-card');
          floatingCards.forEach((card, index) => {
              const speed = 0.3 + (index * 0.1);
              card.style.transform = `translateY(${scrolled * speed}px)`;
          });
      });
  }
}

// ========================================
// SMOOTH REVEAL ON SCROLL CLASS
// ========================================
class SmoothReveal {
  constructor() {
      this.init();
  }

  init() {
      const elements = document.querySelectorAll('.project-card, .skill-card, .stat-item');
      
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.style.opacity = '1';
                  entry.target.style.transform = 'translateY(0)';
              }
          });
      }, {
          threshold: 0.1
      });

      elements.forEach(el => {
          observer.observe(el);
      });
  }
}

// ========================================
// INITIALIZE APPLICATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
  }, 100);

  new PortfolioManager();
  new ParallaxEffect();
  new SmoothReveal();

  const images = document.querySelectorAll('img');
  images.forEach(img => {
      img.style.opacity = '0';
      img.addEventListener('load', () => {
          img.style.transition = 'opacity 0.5s ease';
          img.style.opacity = '1';
      });
  });
});