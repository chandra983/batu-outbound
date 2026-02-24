/* ============================================
   BATU OUTBOUND - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Preloader ----
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', function () {
    setTimeout(function () {
      preloader.classList.add('loaded');
    }, 800);
  });

  // Fallback in case load event already fired
  setTimeout(function () {
    if (preloader && !preloader.classList.contains('loaded')) {
      preloader.classList.add('loaded');
    }
  }, 3000);

  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector('.navbar-custom');
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');

  function setActiveNavLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNavLink);

  // ---- Close mobile nav on link click ----
  const navbarCollapse = document.getElementById('navbarNav');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  // ---- Scroll Reveal Animations ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  function revealOnScroll() {
    revealElements.forEach(function (el) {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight - 60) {
        el.classList.add('revealed');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('.counter-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    const counterSection = document.querySelector('.counter-section');
    if (!counterSection) return;

    const sectionTop = counterSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      countersAnimated = true;
      counters.forEach(function (counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        function updateCounter() {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + suffix;
          }
        }
        updateCounter();
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // ---- Back to Top Button ----
  const backToTop = document.getElementById('backToTop');
  function handleBackToTop() {
    if (window.scrollY > 600) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  }

  window.addEventListener('scroll', handleBackToTop);
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Hero Particles ----
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('hero-particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (10 + Math.random() * 15) + 's';
      particle.style.width = (2 + Math.random() * 4) + 'px';
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }

  // ---- Smooth scroll for all anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Staggered reveal for cards ----
  const cardGroups = document.querySelectorAll('.stagger-group');
  cardGroups.forEach(function (group) {
    const children = group.querySelectorAll('.stagger-item');
    children.forEach(function (child, index) {
      child.style.transitionDelay = (index * 0.1) + 's';
    });
  });

  // ---- Gallery Lightbox (Simple) ----
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const img = this.querySelector('img');
      if (!img) return;

      const lightbox = document.createElement('div');
      lightbox.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:10000;display:flex;align-items:center;justify-content:center;cursor:pointer;animation:fadeIn 0.3s ease;';

      const lightboxImg = document.createElement('img');
      lightboxImg.src = img.src;
      lightboxImg.style.cssText = 'max-width:90%;max-height:90%;object-fit:contain;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.5);';

      lightbox.appendChild(lightboxImg);
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';

      lightbox.addEventListener('click', function () {
        lightbox.style.opacity = '0';
        setTimeout(function () {
          lightbox.remove();
          document.body.style.overflow = '';
        }, 300);
      });
    });
  });

});
