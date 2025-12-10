/**
 * Fancy Foods - Main JavaScript
 * Language switching and sophisticated UI interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initLanguage();
  initMobileMenu();
  initHeaderScroll();
  initScrollProgress();
  initBackToTop();
  initAnimations();
  initCounters();
  initFormValidation();
  initRippleEffect();
  initSmoothScroll();
  initParallax();
  initWhatsAppButton();
  initPageTransitions();
});

/**
 * Initialize language settings
 */
function initLanguage() {
  const savedLang = localStorage.getItem('fancyfoods-lang') || 'ar';
  setLanguage(savedLang);
  
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.dataset.lang;
      setLanguage(lang);
      localStorage.setItem('fancyfoods-lang', lang);
      
      // Add micro animation on language change
      document.body.style.opacity = '0.95';
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 150);
    });
  });
}

/**
 * Initialize mobile menu with animations
 */
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      this.classList.toggle('active');
      
      // Animate nav links when menu opens
      if (nav.classList.contains('active')) {
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
          link.style.opacity = '0';
          link.style.transform = 'translateX(-20px)';
          setTimeout(() => {
            link.style.transition = 'all 0.3s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
          }, index * 100);
        });
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenuBtn.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
    });
  }
}

/**
 * Initialize header scroll effect
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll direction
    if (currentScroll > lastScroll && currentScroll > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

/**
 * Initialize scroll progress indicator
 */
function initScrollProgress() {
  // Create progress element if not exists
  if (!document.querySelector('.scroll-progress')) {
    const progressEl = document.createElement('div');
    progressEl.className = 'scroll-progress';
    document.body.prepend(progressEl);
  }
  
  const progressBar = document.querySelector('.scroll-progress');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }, { passive: true });
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
  // Create button if not exists
  if (!document.querySelector('.back-to-top')) {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = '↑';
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  const backToTopBtn = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });
}

/**
 * Initialize scroll animations with intersection observer
 */
function initAnimations() {
  const animateElements = document.querySelectorAll('[data-animate]');
  
  // First, make all elements visible
  animateElements.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
  
  // Then set up observers for scroll-based animations on elements below fold
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const animationType = el.dataset.animate || 'fade-in-up';
        
        // Add staggered delay based on position
        const siblings = Array.from(el.parentElement.children).filter(c => c.hasAttribute('data-animate'));
        const index = siblings.indexOf(el);
        el.style.animationDelay = (index * 0.1) + 's';
        
        el.classList.add('animate-' + animationType);
        observer.unobserve(el);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });
  
  // Only observe elements that are initially below the viewport
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animateElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isAboveFold = rect.top < window.innerHeight;
        
        if (isAboveFold) {
          // Element is visible, trigger animation immediately
          const animationType = el.dataset.animate || 'fade-in-up';
          const siblings = Array.from(el.parentElement.children).filter(c => c.hasAttribute('data-animate'));
          const index = siblings.indexOf(el);
          el.style.animationDelay = (index * 0.05) + 's';
          el.classList.add('animate-' + animationType);
        } else {
          // Element is below fold, set up for scroll animation
          el.style.opacity = '0';
          el.style.transform = 'translateY(30px)';
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          observer.observe(el);
        }
      });
    });
  });
}

/**
 * Initialize animated counters
 */
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(counter => counterObserver.observe(counter));
}

/**
 * Animate a counter element
 */
function animateCounter(element) {
  const text = element.textContent;
  const match = text.match(/(\d+)/);
  if (!match) return;
  
  const target = parseInt(match[1]);
  const suffix = text.replace(match[1], '');
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  
  element.classList.add('counter', 'counting');
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
      element.classList.remove('counting');
    }
    element.textContent = Math.floor(current) + suffix;
  }, duration / steps);
}

/**
 * Initialize form validation with feedback
 */
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    
    inputs.forEach(input => {
      // Add floating label effect
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
        validateInput(this);
      });
      
      // Real-time validation
      input.addEventListener('input', debounce(function() {
        validateInput(this);
      }, 500));
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
      let isValid = true;
      inputs.forEach(input => {
        if (!validateInput(input)) {
          isValid = false;
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        // Shake effect on invalid submit
        form.classList.add('shake');
        setTimeout(() => form.classList.remove('shake'), 500);
      }
    });
  });
}

/**
 * Validate a form input
 */
function validateInput(input) {
  const value = input.value.trim();
  let isValid = true;
  let message = '';
  
  // Remove previous states
  input.classList.remove('error', 'success');
  const existingFeedback = input.parentElement.querySelector('.form-feedback');
  if (existingFeedback) existingFeedback.remove();
  
  if (input.required && !value) {
    isValid = false;
    message = 'This field is required';
  } else if (input.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      message = 'Please enter a valid email address';
    }
  } else if (input.type === 'tel' && value) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(value)) {
      isValid = false;
      message = 'Please enter a valid phone number';
    }
  }
  
  if (!isValid && message) {
    input.classList.add('error');
    const feedback = document.createElement('div');
    feedback.className = 'form-feedback error';
    feedback.textContent = message;
    input.parentElement.appendChild(feedback);
  } else if (value) {
    input.classList.add('success');
  }
  
  return isValid || !input.required;
}

/**
 * Initialize ripple effect on buttons
 */
function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(btn => {
    btn.classList.add('ripple');
    
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Initialize parallax effects for hero
 */
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const shapes = hero.querySelectorAll('.shape');
  
  // Mouse move parallax effect
  hero.addEventListener('mousemove', function(e) {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPercent = (clientX / innerWidth - 0.5) * 2;
    const yPercent = (clientY / innerHeight - 0.5) * 2;
    
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 10;
      const x = xPercent * speed;
      const y = yPercent * speed;
      
      shape.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
  
  // Scroll effect
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    if (scrolled < hero.offsetHeight) {
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroContent.style.opacity = Math.max(0, 1 - (scrolled / hero.offsetHeight) * 1.5);
      }
    }
  }, { passive: true });
}

/**
 * Initialize WhatsApp floating button
 */
function initWhatsAppButton() {
  // Create WhatsApp button if not exists
  if (!document.querySelector('.whatsapp-float')) {
    const lang = localStorage.getItem('fancyfoods-lang') || 'ar';
    const tooltipText = lang === 'ar' ? 'تواصل معنا عبر واتساب' : 'Chat with us on WhatsApp';
    
    const whatsappBtn = document.createElement('a');
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.href = 'https://wa.me/963988216431';
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
    whatsappBtn.setAttribute('aria-label', tooltipText);
    whatsappBtn.innerHTML = `
      <span class="whatsapp-tooltip">${tooltipText}</span>
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    `;
    document.body.appendChild(whatsappBtn);
  }
}

/**
 * Initialize page transitions
 */
function initPageTransitions() {
  // Add entry animation to body
  document.body.classList.add('page-transition-enter');
  
  requestAnimationFrame(() => {
    document.body.classList.add('page-transition-enter-active');
    document.body.classList.remove('page-transition-enter');
  });
  
  // Animate on link clicks
  const links = document.querySelectorAll('a[href^="/"]:not([target="_blank"]), a[href$=".html"]:not([target="_blank"])');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === window.location.pathname || href.startsWith('#')) return;
      
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
}

/**
 * Set the website language
 * @param {string} lang - Language code ('ar' or 'en')
 */
function setLanguage(lang) {
  const body = document.body;
  const htmlEl = document.documentElement;
  
  // Update body classes
  if (lang === 'ar') {
    body.classList.add('rtl');
    body.classList.remove('ltr', 'en');
    htmlEl.setAttribute('lang', 'ar');
    htmlEl.setAttribute('dir', 'rtl');
  } else {
    body.classList.add('ltr', 'en');
    body.classList.remove('rtl');
    htmlEl.setAttribute('lang', 'en');
    htmlEl.setAttribute('dir', 'ltr');
  }
  
  // Update language buttons
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Show/hide content based on language (exclude language switcher buttons)
  const arElements = document.querySelectorAll('[data-lang="ar"]:not(.lang-btn)');
  const enElements = document.querySelectorAll('[data-lang="en"]:not(.lang-btn)');
  
  if (lang === 'ar') {
    arElements.forEach(el => el.style.display = '');
    enElements.forEach(el => el.style.display = 'none');
  } else {
    arElements.forEach(el => el.style.display = 'none');
    enElements.forEach(el => el.style.display = '');
  }
  
  // Update navigation links
  updateNavigationLinks(lang);
  
  // Update WhatsApp tooltip
  const whatsappTooltip = document.querySelector('.whatsapp-tooltip');
  if (whatsappTooltip) {
    whatsappTooltip.textContent = lang === 'ar' ? 'تواصل معنا عبر واتساب' : 'Chat with us on WhatsApp';
  }
}

/**
 * Update navigation link text based on language
 * @param {string} lang - Language code
 */
function updateNavigationLinks(lang) {
  const navTranslations = {
    ar: {
      home: 'الرئيسية',
      products: 'المنتجات',
      about: 'من نحن',
      contact: 'اتصل بنا'
    },
    en: {
      home: 'Home',
      products: 'Products',
      about: 'About Us',
      contact: 'Contact'
    }
  };
  
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const key = link.dataset.nav;
    if (key && navTranslations[lang][key]) {
      link.textContent = navTranslations[lang][key];
    }
  });
}

/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector for target element
 */
function scrollToElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Debounce utility function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle utility function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}


