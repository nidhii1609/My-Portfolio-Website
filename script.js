// ===== ROTATING TEXT =====
const words = document.querySelectorAll('.word');
let currentIndex = 0;

function rotateWords() {
  words[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % words.length;
  words[currentIndex].classList.add('active');
}

setInterval(rotateWords, 3000);

// ===== NAVBAR SCROLL =====
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
  });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -80px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(element) {
  const target = parseInt(element.dataset.count);
  const prefix = element.dataset.prefix || '';
  const suffix = element.dataset.suffix || '';
  const valueEl = element.querySelector('.metric-value');
  const duration = 2500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    
    valueEl.textContent = prefix + current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

const metricsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      metricsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.metric-card').forEach(card => {
  metricsObserver.observe(card);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${id}`) {
          item.classList.add('active');
        }
      });
    }
  });
}, {
  threshold: 0.3,
  rootMargin: '-100px 0px -60% 0px'
});

sections.forEach(section => sectionObserver.observe(section));

// ===== SMOOTH PARALLAX =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const mesh = document.querySelector('.mesh-gradient');
  if (mesh) {
    mesh.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0001})`;
  }
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-4px)`;
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== 3D TILT EFFECT =====
document.querySelectorAll('.metric-card, .work-item, .skill-card, .edu-card, .achievement-card, .contact-item, .project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
