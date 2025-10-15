/**
 * Main JavaScript file for Sarala Yoga website
 * Handles navigation, accessibility features, and core functionality
 */

// Global configuration
const CONFIG = {
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  },
  animations: {
    duration: 300,
    easing: 'ease-in-out'
  }
};

/**
 * Navigation functionality
 */
class Navigation {
  constructor() {
    this.mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.isMenuOpen = false;
    
    this.init();
  }

  init() {
    if (this.mobileMenuButton && this.mobileMenu) {
      this.bindEvents();
      this.setupKeyboardNavigation();
    }
  }

  bindEvents() {
    this.mobileMenuButton.addEventListener('click', () => this.toggleMenu());
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && !this.mobileMenu.contains(e.target) && !this.mobileMenuButton.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
        this.mobileMenuButton.focus();
      }
    });

    // Close menu when window is resized to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= CONFIG.breakpoints.md && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  }

  setupKeyboardNavigation() {
    const navLinks = this.mobileMenu.querySelectorAll('a');
    const firstLink = navLinks[0];
    const lastLink = navLinks[navLinks.length - 1];

    // Trap focus within mobile menu when open
    this.mobileMenu.addEventListener('keydown', (e) => {
      if (!this.isMenuOpen) return;

      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstLink) {
          e.preventDefault();
          lastLink.focus();
        } else if (!e.shiftKey && document.activeElement === lastLink) {
          e.preventDefault();
          firstLink.focus();
        }
      }
    });
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.mobileMenu.classList.remove('hidden');
    this.mobileMenuButton.setAttribute('aria-expanded', 'true');
    this.isMenuOpen = true;
    
    // Focus first link in menu
    const firstLink = this.mobileMenu.querySelector('a');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  closeMenu() {
    this.mobileMenu.classList.add('hidden');
    this.mobileMenuButton.setAttribute('aria-expanded', 'false');
    this.isMenuOpen = false;
    
    // Restore body scroll
    document.body.style.overflow = '';
  }
}

/**
 * Accessibility features
 */
class Accessibility {
  constructor() {
    this.init();
  }

  init() {
    this.setupSkipLinks();
    this.setupFocusManagement();
    this.setupHighContrastMode();
    this.setupFontScaling();
    this.setupKeyboardNavigation();
    this.setupScreenReaderSupport();
  }

  setupSkipLinks() {
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  setupFocusManagement() {
    // Ensure all interactive elements are focusable
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
    interactiveElements.forEach(element => {
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }
    });

    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
      *:focus {
        outline: 2px solid #0ea5e9 !important;
        outline-offset: 2px !important;
      }
      
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        border-radius: 4px;
      }
      
      .skip-link:focus {
        top: 6px;
      }
    `;
    document.head.appendChild(style);
  }

  setupHighContrastMode() {
    // Add high contrast mode toggle
    const contrastToggle = document.createElement('button');
    contrastToggle.innerHTML = '🌓';
    contrastToggle.setAttribute('aria-label', 'Toggle high contrast mode');
    contrastToggle.setAttribute('title', 'Toggle high contrast mode');
    contrastToggle.className = 'fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg z-50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500';
    
    contrastToggle.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      const isActive = document.body.classList.contains('high-contrast');
      contrastToggle.setAttribute('aria-pressed', isActive);
    });

    document.body.appendChild(contrastToggle);

    // High contrast styles
    const contrastStyle = document.createElement('style');
    contrastStyle.textContent = `
      .high-contrast {
        filter: contrast(150%) brightness(110%);
      }
      
      .high-contrast * {
        border-color: #000 !important;
      }
    `;
    document.head.appendChild(contrastStyle);
  }

  setupFontScaling() {
    // Add font scaling controls
    const fontControls = document.createElement('div');
    fontControls.className = 'fixed bottom-4 right-20 bg-gray-800 text-white p-2 rounded-lg shadow-lg z-50 flex gap-2';
    fontControls.innerHTML = `
      <button id="font-decrease" aria-label="Decrease font size" class="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">A-</button>
      <button id="font-reset" aria-label="Reset font size" class="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">A</button>
      <button id="font-increase" aria-label="Increase font size" class="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">A+</button>
    `;

    document.body.appendChild(fontControls);

    const decreaseBtn = document.getElementById('font-decrease');
    const resetBtn = document.getElementById('font-reset');
    const increaseBtn = document.getElementById('font-increase');

    let currentFontSize = 100;

    decreaseBtn.addEventListener('click', () => {
      currentFontSize = Math.max(80, currentFontSize - 10);
      document.documentElement.style.fontSize = `${currentFontSize}%`;
    });

    resetBtn.addEventListener('click', () => {
      currentFontSize = 100;
      document.documentElement.style.fontSize = `${currentFontSize}%`;
    });

    increaseBtn.addEventListener('click', () => {
      currentFontSize = Math.min(150, currentFontSize + 10);
      document.documentElement.style.fontSize = `${currentFontSize}%`;
    });
  }

  setupKeyboardNavigation() {
    // Ensure proper tab order
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Add keyboard navigation styles
    const keyboardStyle = document.createElement('style');
    keyboardStyle.textContent = `
      .keyboard-navigation *:focus {
        outline: 2px solid #0ea5e9 !important;
        outline-offset: 2px !important;
      }
    `;
    document.head.appendChild(keyboardStyle);
  }

  setupScreenReaderSupport() {
    // Add screen reader announcements
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.id = 'screen-reader-announcer';
    document.body.appendChild(announcer);

    // Function to announce to screen readers
    window.announceToScreenReader = (message) => {
      const announcer = document.getElementById('screen-reader-announcer');
      if (announcer) {
        announcer.textContent = message;
      }
    };
  }
}

/**
 * Smooth scrolling for anchor links
 */
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          this.scrollToElement(target);
        }
      });
    });
  }

  scrollToElement(element) {
    const headerHeight = 64; // Height of sticky header
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Focus the element for accessibility
    element.focus();
  }
}

/**
 * Form validation and enhancement
 */
class FormEnhancement {
  constructor() {
    this.init();
  }

  init() {
    this.setupFormValidation();
    this.setupFormAccessibility();
  }

  setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
        
        // Required field indicators
        if (input.hasAttribute('required')) {
          const label = form.querySelector(`label[for="${input.id}"]`);
          if (label && !label.textContent.includes('*')) {
            label.innerHTML += ' <span class="text-red-500">*</span>';
          }
        }
      });

      // Form submission validation
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    this.showFieldError(field, isValid, errorMessage);
    return isValid;
  }

  validateForm(form) {
    const fields = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  showFieldError(field, isValid, message) {
    const errorId = `${field.id}-error`;
    let errorElement = document.getElementById(errorId);

    if (!isValid) {
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = errorId;
        errorElement.className = 'text-red-500 text-sm mt-1';
        errorElement.setAttribute('role', 'alert');
        field.parentNode.appendChild(errorElement);
      }
      errorElement.textContent = message;
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', errorId);
      field.classList.add('border-red-500');
    } else {
      if (errorElement) {
        errorElement.remove();
      }
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
      field.classList.remove('border-red-500');
    }
  }

  clearFieldError(field) {
    const errorId = `${field.id}-error`;
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
      errorElement.remove();
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
      field.classList.remove('border-red-500');
    }
  }

  setupFormAccessibility() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      // Add form labels and descriptions
      const fields = form.querySelectorAll('input, textarea, select');
      fields.forEach(field => {
        if (!field.getAttribute('aria-label') && !field.getAttribute('aria-labelledby')) {
          const label = form.querySelector(`label[for="${field.id}"]`);
          if (label) {
            field.setAttribute('aria-labelledby', label.id || `${field.id}-label`);
          }
        }
      });
    });
  }
}

/**
 * Performance monitoring and optimization
 */
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    this.monitorPageLoad();
    this.setupLazyLoading();
    this.optimizeImages();
  }

  monitorPageLoad() {
    window.addEventListener('load', () => {
      // Measure Core Web Vitals
      if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach(entry => {
            console.log('FID:', entry.processingStart - entry.startTime);
          });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach(entry => {
            console.log('CLS:', entry.value);
          });
        }).observe({ entryTypes: ['layout-shift'] });
      }
    });
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  optimizeImages() {
    // Add responsive image support
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.hasAttribute('srcset')) {
        const src = img.src;
        const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        
        // Check if WebP is supported
        if (this.supportsWebP()) {
          img.src = webpSrc;
        }
      }
    });
  }

  supportsWebP() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
}

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize core functionality
  new Navigation();
  new Accessibility();
  new SmoothScroll();
  new FormEnhancement();
  new PerformanceMonitor();

  // Announce page load to screen readers
  if (window.announceToScreenReader) {
    window.announceToScreenReader('Page loaded successfully');
  }

  // Add loading complete class
  document.body.classList.add('loaded');
});

// Export for use in other modules
window.SaralaYoga = {
  Navigation,
  Accessibility,
  SmoothScroll,
  FormEnhancement,
  PerformanceMonitor
};