/* ============================================
   NASHIPAE CULTURAL OASIS - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navigation scroll effect ---
  const nav = document.querySelector('.nav');
  let lastScrollY = 0;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Mobile menu toggle ---
  const mobileToggle = document.querySelector('.nav__mobile-toggle');
  const navLinks = document.querySelector('.nav__links');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll animations (Intersection Observer) ---
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger-children').forEach(el => {
    observer.observe(el);
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // --- Parallax effect on hero image ---
  const heroImg = document.querySelector('.hero__bg img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroImg.style.transform = `scale(${1.05 + scrolled * 0.0002}) translateY(${scrolled * 0.15}px)`;
      }
    }, { passive: true });
  }

  // --- Counter animation for highlights ---
  const counters = document.querySelectorAll('.highlight__number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalText = target.getAttribute('data-count');

        // Check if it's a number we can animate
        const numMatch = finalText.match(/^(\d+)/);
        if (numMatch) {
          const finalNum = parseInt(numMatch[1]);
          const suffix = finalText.replace(numMatch[1], '');
          let current = 0;
          const step = Math.ceil(finalNum / 40);
          const timer = setInterval(() => {
            current += step;
            if (current >= finalNum) {
              current = finalNum;
              clearInterval(timer);
            }
            target.textContent = current + suffix;
          }, 30);
        }

        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
});
