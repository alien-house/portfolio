function toggleLang() {
  const body = document.body;
  const btn = document.querySelector('.lang-toggle');
  body.classList.toggle('en-mode');
  btn.textContent = body.classList.contains('en-mode') ? 'JA' : 'EN';
}

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
