/**
 * Fancy Foods - Main JavaScript
 * Language switching and UI interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize language from localStorage or default to Arabic
  const savedLang = localStorage.getItem('fancyfoods-lang') || 'ar';
  setLanguage(savedLang);
  
  // Language switcher event listeners
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.dataset.lang;
      setLanguage(lang);
      localStorage.setItem('fancyfoods-lang', lang);
    });
  });
  
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // Header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Animate elements on scroll
  const animateElements = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animateElements.forEach(el => observer.observe(el));
});

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
  
  // Show/hide content based on language
  const arElements = document.querySelectorAll('[data-lang="ar"]');
  const enElements = document.querySelectorAll('[data-lang="en"]');
  
  if (lang === 'ar') {
    arElements.forEach(el => el.style.display = '');
    enElements.forEach(el => el.style.display = 'none');
  } else {
    arElements.forEach(el => el.style.display = 'none');
    enElements.forEach(el => el.style.display = '');
  }
  
  // Update navigation links
  updateNavigationLinks(lang);
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
