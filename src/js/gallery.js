/**
 * Gallery functionality for Sarala Yoga website
 * Handles image filtering, lightbox, and accessibility features
 */

class Gallery {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.galleryItems = document.querySelectorAll('.gallery-item');
    this.images = document.querySelectorAll('.gallery-image');
    this.lightbox = null;
    this.currentImageIndex = 0;
    this.filteredItems = [];
    
    this.init();
  }

  init() {
    if (this.filterButtons.length > 0 && this.galleryItems.length > 0) {
      this.setupFiltering();
      this.setupLightbox();
      this.setupKeyboardNavigation();
      this.setupAccessibility();
    }
  }

  setupFiltering() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = button.getAttribute('data-filter');
        this.filterImages(filter);
        this.updateActiveButton(button);
      });
    });

    // Initialize with all images visible
    this.filteredItems = Array.from(this.galleryItems);
  }

  filterImages(filter) {
    this.galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        item.classList.remove('hidden');
        item.style.display = 'block';
      } else {
        item.classList.add('hidden');
        item.style.display = 'none';
      }
    });

    // Update filtered items array for lightbox navigation
    this.updateFilteredItems(filter);
    
    // Announce filter change to screen readers
    if (window.announceToScreenReader) {
      const filterText = filter === 'all' ? 'all images' : `${filter} images`;
      window.announceToScreenReader(`Showing ${filterText}`);
    }
  }

  updateFilteredItems(filter) {
    this.filteredItems = Array.from(this.galleryItems).filter(item => {
      const category = item.getAttribute('data-category');
      return filter === 'all' || category === filter;
    });
  }

  updateActiveButton(activeButton) {
    this.filterButtons.forEach(button => {
      button.classList.remove('active');
      button.setAttribute('aria-pressed', 'false');
    });
    
    activeButton.classList.add('active');
    activeButton.setAttribute('aria-pressed', 'true');
  }

  setupLightbox() {
    this.images.forEach((image, index) => {
      image.addEventListener('click', () => {
        this.openLightbox(index);
      });

      // Keyboard accessibility
      image.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openLightbox(index);
        }
      });
    });
  }

  openLightbox(imageIndex) {
    this.createLightbox();
    this.showImage(imageIndex);
    this.lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Focus the lightbox for accessibility
    this.lightbox.focus();
    
    // Announce lightbox opening
    if (window.announceToScreenReader) {
      window.announceToScreenReader('Image gallery opened');
    }
  }

  createLightbox() {
    if (this.lightbox) return;

    this.lightbox = document.createElement('div');
    this.lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 hidden';
    this.lightbox.setAttribute('role', 'dialog');
    this.lightbox.setAttribute('aria-modal', 'true');
    this.lightbox.setAttribute('aria-label', 'Image gallery');
    this.lightbox.setAttribute('tabindex', '-1');

    this.lightbox.innerHTML = `
      <div class="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
        <!-- Close button -->
        <button class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded z-10" 
                aria-label="Close gallery" id="close-lightbox">
          ×
        </button>
        
        <!-- Previous button -->
        <button class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded z-10" 
                aria-label="Previous image" id="prev-image">
          ‹
        </button>
        
        <!-- Next button -->
        <button class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded z-10" 
                aria-label="Next image" id="next-image">
          ›
        </button>
        
        <!-- Image container -->
        <div class="flex items-center justify-center w-full h-full">
          <img class="max-w-full max-h-full object-contain" 
               id="lightbox-image" 
               alt="" 
               loading="eager">
        </div>
        
        <!-- Image info -->
        <div class="absolute bottom-4 left-4 right-4 text-white text-center">
          <div id="image-title" class="text-xl font-semibold mb-2"></div>
          <div id="image-caption" class="text-sm opacity-80"></div>
          <div id="image-counter" class="text-sm mt-2 opacity-60"></div>
        </div>
      </div>
    `;

    document.body.appendChild(this.lightbox);
    this.bindLightboxEvents();
  }

  bindLightboxEvents() {
    const closeBtn = this.lightbox.querySelector('#close-lightbox');
    const prevBtn = this.lightbox.querySelector('#prev-image');
    const nextBtn = this.lightbox.querySelector('#next-image');

    closeBtn.addEventListener('click', () => this.closeLightbox());
    prevBtn.addEventListener('click', () => this.previousImage());
    nextBtn.addEventListener('click', () => this.nextImage());

    // Keyboard navigation
    this.lightbox.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowLeft':
          this.previousImage();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
      }
    });

    // Close on backdrop click
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });

    // Touch/swipe support for mobile
    this.setupTouchNavigation();
  }

  setupTouchNavigation() {
    let startX = 0;
    let startY = 0;

    this.lightbox.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    this.lightbox.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;

      // Only handle horizontal swipes
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.nextImage();
        } else {
          this.previousImage();
        }
      }
    });
  }

  showImage(index) {
    const item = this.filteredItems[index];
    if (!item) return;

    const image = item.querySelector('.gallery-image');
    const overlay = item.querySelector('.gallery-overlay');
    const title = overlay ? overlay.querySelector('h3') : null;
    const caption = overlay ? overlay.querySelector('p') : null;

    const lightboxImage = this.lightbox.querySelector('#lightbox-image');
    const imageTitle = this.lightbox.querySelector('#image-title');
    const imageCaption = this.lightbox.querySelector('#image-caption');
    const imageCounter = this.lightbox.querySelector('#image-counter');

    // Load high-resolution image if available
    const fullSrc = image.getAttribute('data-full-src');
    const imageSrc = fullSrc || image.src;
    const imageCaptionText = image.getAttribute('data-caption');

    lightboxImage.src = imageSrc;
    lightboxImage.alt = image.alt;
    
    if (title) imageTitle.textContent = title.textContent;
    if (caption || imageCaptionText) {
      imageCaption.textContent = caption ? caption.textContent : imageCaptionText;
    }
    
    imageCounter.textContent = `${index + 1} of ${this.filteredItems.length}`;

    this.currentImageIndex = index;
  }

  previousImage() {
    const prevIndex = this.currentImageIndex > 0 
      ? this.currentImageIndex - 1 
      : this.filteredItems.length - 1;
    this.showImage(prevIndex);
  }

  nextImage() {
    const nextIndex = this.currentImageIndex < this.filteredItems.length - 1 
      ? this.currentImageIndex + 1 
      : 0;
    this.showImage(nextIndex);
  }

  closeLightbox() {
    if (this.lightbox) {
      this.lightbox.classList.add('hidden');
      document.body.style.overflow = '';
      
      // Return focus to the image that was clicked
      const currentItem = this.filteredItems[this.currentImageIndex];
      if (currentItem) {
        const image = currentItem.querySelector('.gallery-image');
        if (image) {
          image.focus();
        }
      }
      
      // Announce lightbox closing
      if (window.announceToScreenReader) {
        window.announceToScreenReader('Image gallery closed');
      }
    }
  }

  setupKeyboardNavigation() {
    // Ensure all images are keyboard accessible
    this.images.forEach(image => {
      if (!image.hasAttribute('tabindex')) {
        image.setAttribute('tabindex', '0');
      }
      
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `View ${image.alt} in full size`);
    });
  }

  setupAccessibility() {
    // Add ARIA labels to filter buttons
    this.filterButtons.forEach(button => {
      const filter = button.getAttribute('data-filter');
      const filterText = filter === 'all' ? 'all images' : `${filter} images`;
      button.setAttribute('aria-label', `Filter to show ${filterText}`);
    });

    // Add loading states for images
    this.images.forEach(image => {
      image.addEventListener('load', () => {
        image.classList.add('loaded');
      });

      image.addEventListener('error', () => {
        image.classList.add('error');
        console.warn(`Failed to load image: ${image.src}`);
      });
    });
  }
}

/**
 * Initialize gallery when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if we're on the gallery page
  if (document.querySelector('.gallery-item')) {
    new Gallery();
  }
});

// Export for use in other modules
window.Gallery = Gallery;