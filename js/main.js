/* ════════════════════════════════════════════════
   Portfolio — Putu Kartika Widya Arjentinia
   main.js
   ════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

// ══════════════════════════════════════════
// MASTER TIMELINE (load entrance)
// ══════════════════════════════════════════
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

// Nav slides down
tl.to('#mainNav', { opacity: 1, y: 0, duration: 0.6 }, 0)

  // Badge fades + slides up
  .to('#heroBadge', { opacity: 1, y: 0, duration: 0.6 }, 0.2)

  // Pulse the badge dot
  .to('#badgeDot', {
    scale: 1.4, opacity: 0.4,
    duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut'
  }, 0.2)

  // Name entrance
  .to('#heroName', { opacity: 1, y: 0, duration: 0.7 }, 0.35)

  // Role line
  .to('#heroRole', { opacity: 1, y: 0, duration: 0.6 }, 0.5)

  // Description
  .to('#heroDesc', { opacity: 1, y: 0, duration: 0.6 }, 0.6)

  // CTA buttons
  .to('#heroCtas', { opacity: 1, y: 0, duration: 0.6 }, 0.7)

  // Stats
  .to('#heroStats', { opacity: 1, duration: 0.5 }, 0.8)
  .from('#heroStats .stat-card', {
    y: 30, opacity: 0, stagger: 0.12, duration: 0.5, ease: 'back.out(1.4)'
  }, 0.8)

  // Scroll hint
  .to('#scrollHint', { opacity: 1, duration: 0.5 }, 1.1);

// ══════════════════════════════════════════
// UNDERLINE ANIMATION (workaround untuk pseudo-element)
// ══════════════════════════════════════════
(function () {
  const word = document.getElementById('underlineWord');
  const line = document.createElement('span');
  line.style.cssText = 'position:absolute;bottom:-4px;left:0;height:3px;width:0;background:linear-gradient(90deg,#6C63FF,#A78BFA);border-radius:2px;display:block;';
  word.style.position = 'relative';
  word.appendChild(line);

  setTimeout(() => {
    gsap.to(line, { width: '100%', duration: 0.7, ease: 'power2.inOut', delay: 0.5 });
  }, 900);
})();

// ══════════════════════════════════════════
// COUNTER ANIMATION
// ══════════════════════════════════════════
gsap.utils.toArray('.count').forEach(el => {
  const target = parseInt(el.dataset.target);
  gsap.to(el, {
    innerHTML: target,
    duration: 1.5,
    ease: 'power2.out',
    delay: 1.0,
    snap: { innerHTML: 1 },
    onUpdate() { el.textContent = Math.round(parseFloat(el.innerHTML)); }
  });
});

// ══════════════════════════════════════════
// FLOATING GLOW — follows mouse
// ══════════════════════════════════════════
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 60;
  const y = (e.clientY / window.innerHeight - 0.5) * 60;
  gsap.to('#heroGlow', { x, y, duration: 1.8, ease: 'power1.out' });
});

// ══════════════════════════════════════════
// SCROLL HINT bounce
// ══════════════════════════════════════════
gsap.to('.scroll-arrow', {
  y: 6, duration: 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5
});

// Hide scroll hint on scroll
ScrollTrigger.create({
  start: 'top -80',
  onEnter: () => gsap.to('#scrollHint', { opacity: 0, duration: 0.3 }),
  onLeaveBack: () => gsap.to('#scrollHint', { opacity: 1, duration: 0.3 }),
});

// ══════════════════════════════════════════
// MAGNETIC BUTTONS
// ══════════════════════════════════════════
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
  });
});

// ══════════════════════════════════════════
// TYPEWRITER
// ══════════════════════════════════════════
const roles = ['Data Analyst', 'Business Process Analyst', 'Information System Student', 'Dashboard Developer'];
let rIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const cur = roles[rIdx];
  if (!deleting) {
    typedEl.textContent = cur.slice(0, ++cIdx);
    if (cIdx === cur.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = cur.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 40 : 75);
}
setTimeout(type, 1200);

// ══════════════════════════════════════════
// MOBILE NAV
// ══════════════════════════════════════════
const burger = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// ══════════════════════════════════════════
// ABOUT — ScrollTrigger entrance
// ══════════════════════════════════════════
gsap.from('#about .section-label, #about .section-title', {
  scrollTrigger: { trigger: '#about', start: 'top 80%' },
  y: 32, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
});

gsap.from('#aboutText p', {
  scrollTrigger: { trigger: '#aboutText', start: 'top 78%' },
  y: 24, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out'
});

gsap.from('#aboutCards .info-card', {
  scrollTrigger: { trigger: '#aboutCards', start: 'top 78%' },
  x: 40, opacity: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out'
});

// Hover tilt pada info cards
document.querySelectorAll('.info-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
  });
});

// ══════════════════════════════════════════
// SKILLS — staggered pill entrance
// ══════════════════════════════════════════
gsap.from('#skills .section-label, #skills .section-title', {
  scrollTrigger: { trigger: '#skills', start: 'top 80%' },
  y: 32, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
});

gsap.from('.skill-group-title', {
  scrollTrigger: { trigger: '#skills .skills-grid', start: 'top 80%' },
  y: 16, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out'
});

['#skillGroup1', '#skillGroup2', '#skillGroup3'].forEach((id, i) => {
  const tags = document.querySelectorAll(id + ' .skill-tag');
  ScrollTrigger.create({
    trigger: id,
    start: 'top 82%',
    onEnter: () => {
      gsap.to(tags, {
        opacity: 1, y: 0,
        duration: 0.45,
        stagger: { amount: 0.5, from: 'start' },
        ease: 'back.out(1.6)',
        delay: i * 0.08
      });
    }
  });
});

// ══════════════════════════════════════════
// EXPERIENCE — timeline draw + card entrance
// ══════════════════════════════════════════
gsap.from('#experience .section-label, #experience .section-title', {
  scrollTrigger: { trigger: '#experience', start: 'top 80%' },
  y: 32, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
});

// Timeline line draws down on scroll
gsap.to('#timelineFill', {
  scrollTrigger: {
    trigger: '.timeline',
    start: 'top 75%',
    end: 'bottom 60%',
    scrub: 0.6,
  },
  height: '100%',
  ease: 'none'
});

// Timeline cards slide in dari kiri
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
  gsap.to(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 82%',
    },
    opacity: 1,
    x: 0,
    duration: 0.65,
    ease: 'power3.out',
    delay: i * 0.08
  });

  const dot = item.querySelector('.timeline-dot');
  ScrollTrigger.create({
    trigger: item,
    start: 'top 75%',
    onEnter: () => {
      gsap.to(dot, { borderColor: 'var(--accent)', duration: 0.4 });
    }
  });
});

// ══════════════════════════════════════════
// PROJECTS — cards pop up dengan stagger
// ══════════════════════════════════════════
gsap.from('#projects .section-label, #projects .section-title', {
  scrollTrigger: { trigger: '#projects', start: 'top 80%' },
  y: 32, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
});

gsap.utils.toArray('.project-card').forEach((card, i) => {
  gsap.to(card, {
    scrollTrigger: { trigger: card, start: 'top 88%' },
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power3.out',
    delay: (i % 2) * 0.12
  });

  // Hover lift
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { y: -6, duration: 0.35, ease: 'power2.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  });
});

// ══════════════════════════════════════════
// CERTIFICATIONS
// ══════════════════════════════════════════
gsap.from('#certifications .section-label, #certifications .section-title', {
  scrollTrigger: { trigger: '#certifications', start: 'top 80%' },
  y: 32, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
});

gsap.utils.toArray('.cert-card').forEach((card, i) => {
  gsap.to(card, {
    scrollTrigger: { trigger: card, start: 'top 90%' },
    opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
    delay: (i % 3) * 0.07
  });
  card.addEventListener('mouseenter', () => gsap.to(card, { scale: 1.03, duration: 0.25, ease: 'power2.out' }));
  card.addEventListener('mouseleave', () => gsap.to(card, { scale: 1, duration: 0.4, ease: 'elastic.out(1,0.5)' }));
});

// ══════════════════════════════════════════
// CONTACT
// ══════════════════════════════════════════
gsap.from('#contact .section-label, #contact .section-title', {
  scrollTrigger: { trigger: '#contact', start: 'top 80%' },
  y: 32, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
});

gsap.from('.contact-intro p', {
  scrollTrigger: { trigger: '.contact-intro', start: 'top 80%' },
  y: 24, opacity: 0, duration: 0.6, ease: 'power2.out'
});

gsap.from('.social-link', {
  scrollTrigger: { trigger: '.social-links', start: 'top 82%' },
  x: -30, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out'
});

gsap.from('.contact-form .form-group, .contact-form .btn-submit', {
  scrollTrigger: { trigger: '.contact-form', start: 'top 82%' },
  y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out'
});

// Magnetic submit button
const submitBtn = document.getElementById('submitBtn');
if (submitBtn) {
  submitBtn.addEventListener('mousemove', (e) => {
    const r = submitBtn.getBoundingClientRect();
    gsap.to(submitBtn, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.3,
      y: (e.clientY - (r.top + r.height / 2)) * 0.3,
      duration: 0.3, ease: 'power2.out'
    });
  });
  submitBtn.addEventListener('mouseleave', () => gsap.to(submitBtn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' }));
}

// Contact form → mailto
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = this.querySelector('#fname').value;
  const email = this.querySelector('#femail').value;
  const msg = this.querySelector('#fmsg').value;
  window.location.href = `mailto:arjentinia01@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}%0A%0AFrom: ${encodeURIComponent(email)}`;
  const ok = document.getElementById('formSuccess');
  ok.style.display = 'flex';
  gsap.from(ok, { opacity: 0, y: 10, duration: 0.4 });
  this.reset();
});

// ══════════════════════════════════════════
// BACK TO TOP
// ══════════════════════════════════════════
const backBtn = document.getElementById('backTop');
window.addEventListener('scroll', () => backBtn.classList.toggle('visible', window.scrollY > 500));
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ══════════════════════════════════════════
// PAGE LOADER
// ══════════════════════════════════════════
const loaderBar = document.getElementById('loaderBar');
const loader = document.getElementById('loader');

gsap.to(loaderBar, {
  width: '100%',
  duration: 0.9,
  ease: 'power2.inOut',
  onComplete: () => {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        loader.style.display = 'none';
        document.body.style.overflow = '';
        ScrollTrigger.refresh();
      }
    });
  }
});

// Prevent scroll while loading
document.body.style.overflow = 'hidden';

// ══════════════════════════════════════════
// CUSTOM CURSOR
// ══════════════════════════════════════════
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

if (dot && ring) {
  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    gsap.to(dot, { x: mx, y: my, duration: 0.1, ease: 'none' });
  });

  // Ring follows dengan lag
  gsap.ticker.add(() => {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    gsap.set(ring, { x: rx, y: ry });
  });

  // Grow on hover atas interactive elements
  document.querySelectorAll('a, button, .stat-card, .project-card, .cert-card, .info-card, .skill-tag').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(ring, { width: 48, height: 48, borderColor: 'rgba(108,99,255,0.8)', duration: 0.25 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(ring, { width: 32, height: 32, borderColor: 'rgba(108,99,255,0.5)', duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    });
  });

  // Hide cursor saat keluar window
  document.addEventListener('mouseleave', () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 }));
  document.addEventListener('mouseenter', () => gsap.to([dot, ring], { opacity: 1, duration: 0.2 }));
}

// ══════════════════════════════════════════
// ACTIVE NAV ON SCROLL
// ══════════════════════════════════════════
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + id) a.classList.add('active');
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => navObserver.observe(s));

// ══════════════════════════════════════════
// SCROLL PROGRESS BAR (top of page)
// ══════════════════════════════════════════
const progressBar = document.createElement('div');
progressBar.style.cssText = 'position:fixed;top:0;left:0;height:2px;width:0%;background:linear-gradient(90deg,#6C63FF,#A78BFA);z-index:9999;pointer-events:none;transition:width 0.1s;';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrolled / total * 100) + '%';
});

// ══════════════════════════════════════════
// GSAP ScrollTrigger refresh on resize
// ══════════════════════════════════════════
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
});