/**
 * Contact form functionality for Sarala Yoga website
 * Handles form validation, submission, and user feedback
 */

class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.submitButton = null;
    this.isSubmitting = false;
    
    this.init();
  }

  init() {
    if (this.form) {
      this.submitButton = this.form.querySelector('button[type="submit"]');
      this.setupFormHandling();
      this.setupFieldValidation();
      this.setupAccessibility();
    }
  }

  setupFormHandling() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Real-time validation on input
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  setupFieldValidation() {
    // Email validation
    const emailField = this.form.querySelector('input[type="email"]');
    if (emailField) {
      emailField.addEventListener('blur', () => this.validateEmail(emailField));
    }

    // Phone validation
    const phoneField = this.form.querySelector('input[type="tel"]');
    if (phoneField) {
      phoneField.addEventListener('blur', () => this.validatePhone(phoneField));
    }

    // Message validation
    const messageField = this.form.querySelector('textarea');
    if (messageField) {
      messageField.addEventListener('blur', () => this.validateMessage(messageField));
    }
  }

  setupAccessibility() {
    // Add required field indicators
    const requiredFields = this.form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      const label = this.form.querySelector(`label[for="${field.id}"]`);
      if (label && !label.textContent.includes('*')) {
        const asterisk = document.createElement('span');
        asterisk.className = 'text-red-500 ml-1';
        asterisk.textContent = '*';
        asterisk.setAttribute('aria-label', 'required');
        label.appendChild(asterisk);
      }
    });

    // Add field descriptions
    this.addFieldDescriptions();

    // Ensure proper tab order
    const focusableElements = this.form.querySelectorAll('input, textarea, select, button');
    focusableElements.forEach((element, index) => {
      element.setAttribute('tabindex', index + 1);
    });
  }

  addFieldDescriptions() {
    const descriptions = {
      'name': 'Enter your full name as you would like to be addressed',
      'email': 'We will use this to respond to your inquiry',
      'phone': 'Optional - helps us contact you quickly if needed',
      'service': 'Select the type of yoga service you are interested in',
      'experience': 'Helps us tailor our response to your needs',
      'message': 'Tell us about your goals, any specific needs, or questions you have'
    };

    Object.entries(descriptions).forEach(([fieldName, description]) => {
      const field = this.form.querySelector(`[name="${fieldName}"]`);
      if (field) {
        const descriptionId = `${field.id}-description`;
        let descriptionElement = document.getElementById(descriptionId);
        
        if (!descriptionElement) {
          descriptionElement = document.createElement('div');
          descriptionElement.id = descriptionId;
          descriptionElement.className = 'text-sm text-gray-600 mt-1';
          descriptionElement.textContent = description;
          field.parentNode.appendChild(descriptionElement);
        }
        
        field.setAttribute('aria-describedby', descriptionId);
      }
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

    // Specific field validations
    switch (field.type) {
      case 'email':
        if (value && !this.isValidEmail(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
        break;
      case 'tel':
        if (value && !this.isValidPhone(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid phone number';
        }
        break;
    }

    // Message length validation
    if (field.tagName === 'TEXTAREA' && field.name === 'message') {
      if (value.length < 10) {
        isValid = false;
        errorMessage = 'Please provide more details (at least 10 characters)';
      } else if (value.length > 1000) {
        isValid = false;
        errorMessage = 'Message is too long (maximum 1000 characters)';
      }
    }

    this.showFieldError(field, isValid, errorMessage);
    return isValid;
  }

  validateEmail(emailField) {
    const value = emailField.value.trim();
    if (value && !this.isValidEmail(value)) {
      this.showFieldError(emailField, false, 'Please enter a valid email address');
      return false;
    }
    this.clearFieldError(emailField);
    return true;
  }

  validatePhone(phoneField) {
    const value = phoneField.value.trim();
    if (value && !this.isValidPhone(value)) {
      this.showFieldError(phoneField, false, 'Please enter a valid phone number');
      return false;
    }
    this.clearFieldError(phoneField);
    return true;
  }

  validateMessage(messageField) {
    const value = messageField.value.trim();
    if (value.length < 10) {
      this.showFieldError(messageField, false, 'Please provide more details (at least 10 characters)');
      return false;
    } else if (value.length > 1000) {
      this.showFieldError(messageField, false, 'Message is too long (maximum 1000 characters)');
      return false;
    }
    this.clearFieldError(messageField);
    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    // Accept various phone number formats
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
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
      field.classList.add('border-red-500');
      field.classList.remove('border-gray-300');
    } else {
      if (errorElement) {
        errorElement.remove();
      }
      field.removeAttribute('aria-invalid');
      field.classList.remove('border-red-500');
      field.classList.add('border-gray-300');
    }
  }

  clearFieldError(field) {
    const errorId = `${field.id}-error`;
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
      errorElement.remove();
      field.removeAttribute('aria-invalid');
      field.classList.remove('border-red-500');
      field.classList.add('border-gray-300');
    }
  }

  async handleSubmit() {
    if (this.isSubmitting) return;

    // Validate all fields
    const fields = this.form.querySelectorAll('input, textarea, select');
    let isFormValid = true;

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      this.showFormError('Please correct the errors above and try again.');
      this.focusFirstError();
      return;
    }

    this.setSubmittingState(true);

    try {
      const formData = this.getFormData();
      await this.submitForm(formData);
      this.showSuccessMessage();
      this.form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      this.showFormError('Sorry, there was an error sending your message. Please try again or contact us directly.');
    } finally {
      this.setSubmittingState(false);
    }
  }

  getFormData() {
    const formData = new FormData(this.form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    // Add additional metadata
    data.timestamp = new Date().toISOString();
    data.userAgent = navigator.userAgent;
    data.referrer = document.referrer;

    return data;
  }

  async submitForm(data) {
    // In a real implementation, this would send to a server
    // For now, we'll simulate a successful submission
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate network delay
        if (Math.random() > 0.1) { // 90% success rate
          resolve({ success: true, message: 'Message sent successfully' });
        } else {
          reject(new Error('Network error'));
        }
      }, 1500);
    });
  }

  setSubmittingState(isSubmitting) {
    this.isSubmitting = isSubmitting;
    
    if (this.submitButton) {
      this.submitButton.disabled = isSubmitting;
      
      if (isSubmitting) {
        this.submitButton.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending Message...
        `;
      } else {
        this.submitButton.innerHTML = 'Send Message';
      }
    }

    // Disable all form fields during submission
    const fields = this.form.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
      field.disabled = isSubmitting;
    });
  }

  showSuccessMessage() {
    this.clearFormMessages();
    
    const successMessage = document.createElement('div');
    successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6';
    successMessage.setAttribute('role', 'alert');
    successMessage.innerHTML = `
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <strong>Success!</strong> Your message has been sent successfully. We'll get back to you within 24 hours.
      </div>
    `;
    
    this.form.insertBefore(successMessage, this.form.firstChild);
    
    // Announce success to screen readers
    if (window.announceToScreenReader) {
      window.announceToScreenReader('Message sent successfully');
    }

    // Auto-hide success message after 10 seconds
    setTimeout(() => {
      if (successMessage.parentNode) {
        successMessage.remove();
      }
    }, 10000);
  }

  showFormError(message) {
    this.clearFormMessages();
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6';
    errorMessage.setAttribute('role', 'alert');
    errorMessage.innerHTML = `
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
        <strong>Error:</strong> ${message}
      </div>
    `;
    
    this.form.insertBefore(errorMessage, this.form.firstChild);
    
    // Announce error to screen readers
    if (window.announceToScreenReader) {
      window.announceToScreenReader('Form submission error');
    }
  }

  clearFormMessages() {
    const existingMessages = this.form.querySelectorAll('[role="alert"]');
    existingMessages.forEach(message => {
      if (message.closest('form') === this.form) {
        message.remove();
      }
    });
  }

  focusFirstError() {
    const firstError = this.form.querySelector('[aria-invalid="true"]');
    if (firstError) {
      firstError.focus();
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

/**
 * Initialize contact form when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if we're on a page with a contact form
  if (document.getElementById('contact-form')) {
    new ContactForm();
  }
});

// Export for use in other modules
window.ContactForm = ContactForm;
