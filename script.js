// Mobile nav toggle
const navToggleButton = document.querySelector('.nav__toggle');
const navMenu = document.getElementById('navMenu');

if (navToggleButton && navMenu) {
  navToggleButton.addEventListener('click', () => {
    const expanded = navToggleButton.getAttribute('aria-expanded') === 'true';
    navToggleButton.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('is-open');
  });
}

// Close menu on link click (mobile)
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu && navMenu.classList.contains('is-open')) {
      navMenu.classList.remove('is-open');
      navToggleButton?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Scrollspy active link highlighting
const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];
const sectionMap = new Map(
  sectionIds.map(id => [id, document.getElementById(id)])
);

const linkMap = new Map(
  Array.from(document.querySelectorAll('.nav__link')).map(a => [a.getAttribute('href')?.replace('#', ''), a])
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = id ? linkMap.get(id) : null;
      if (!link) return;

      if (entry.isIntersecting) {
        document.querySelectorAll('.nav__link').forEach(a => a.classList.remove('is-active'));
        link.classList.add('is-active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
);

sectionMap.forEach(sec => sec && observer.observe(sec));

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear().toString();

// Contact form handler via mailto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    if (!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:vasu@example.com?subject=${subject}&body=${body}`;
  });
}


