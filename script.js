const revealElements = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.nav a');
const samePageNavLinks = document.querySelectorAll('.nav a[href^="#"]');
const sections = document.querySelectorAll('section[id]');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const scrollProgress = document.querySelector('.scroll-progress');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });

revealElements.forEach((element) => revealObserver.observe(element));

if (sections.length && samePageNavLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        samePageNavLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach((section) => sectionObserver.observe(section));
}

function updateScrollProgress() {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;
  scrollProgress.style.width = `${Math.min(progress, 100)}%`;
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (nav) nav.classList.remove('open');
  });
});
