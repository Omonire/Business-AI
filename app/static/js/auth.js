/**
 * Business AI - Auth pages (login + signup)
 * Password visibility toggles and client-side validation. UI only.
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Entrance animation ---------- */

  var enterElement = document.querySelector('[data-auth-enter]');

  if (enterElement && !prefersReducedMotion && typeof anime !== 'undefined') {
    anime({
      targets: enterElement,
      opacity: [0, 1],
      translateY: [18, 0],
      scale: [0.99, 1],
      duration: 550,
      easing: 'easeOutCubic'
    });
  }

  /* ---------- Password visibility toggles ---------- */

  var toggles = document.querySelectorAll('[data-password-toggle]');

  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var targetName = toggle.getAttribute('data-target');
      var input = document.getElementById(targetName);
      if (!input) return;

      var isVisible = toggle.classList.toggle('visible');
      input.type = isVisible ? 'text' : 'password';
      toggle.setAttribute('aria-label', isVisible ? 'Hide password' : 'Show password');
    });
  });

  /* ---------- Client-side validation helpers ---------- */

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Form-level error container (terms on signup) uses its own <p>.
  function setError(fieldWrapper, message) {
    var errorEl = fieldWrapper.querySelector('.field-error');
    var control = fieldWrapper.querySelector('.field-control');
    if (control) {
      control.classList.toggle('has-error', Boolean(message));
    }
    if (errorEl) {
      errorEl.textContent = message || '';
      errorEl.classList.toggle('visible', Boolean(message));
    }
    return Boolean(message);
  }

  function getInput(wrapper) {
    return wrapper.querySelector('input');
  }

  function validateField(wrapper, value) {
    var name = wrapper.getAttribute('data-field');
    var input = getInput(wrapper);

    if (!value) {
      return setError(wrapper, 'This field is required.');
    }

    switch (name) {
      case 'email':
        return setError(wrapper, EMAIL_RE.test(value) ? '' : 'Enter a valid email address.');
      case 'password': {
        var min = 8;
        if (value.length < min) {
          return setError(wrapper, 'Password must be at least ' + min + ' characters.');
        }
        if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
          return setError(wrapper, 'Use a mix of letters and numbers.');
        }
        return setError(wrapper, '');
      }
      case 'confirm': {
        var password = document.getElementById('password');
        if (password && value !== password.value) {
          return setError(wrapper, 'Passwords do not match.');
        }
        return setError(wrapper, '');
      }
      default:
        return setError(wrapper, '');
    }
  }

  // Live revalidation on input/blur
  document.querySelectorAll('.field[data-field]').forEach(function (wrapper) {
    var input = getInput(wrapper);

    input.addEventListener('input', function () {
      if (this.value.trim()) {
        validateField(wrapper, this.value.trim());
      } else {
        // Don't nag while the user is mid-typing on an empty field for 'confirm'.
        if (wrapper.getAttribute('data-field') !== 'confirm') {
          setError(wrapper, '');
        }
      }
    });

    input.addEventListener('blur', function () {
      validateField(wrapper, this.value.trim());
    });
  });

  /* ---------- Form submission (UI only) ---------- */

  function attachSubmit(formId) {
    var form = document.getElementById(formId);
    if (!form) return;

    var fieldWrappers = Array.prototype.slice.call(form.querySelectorAll('.field[data-field]'));
    var isSignup = formId === 'signupForm';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstInvalid = null;

      fieldWrappers.forEach(function (wrapper) {
        var input = getInput(wrapper);
        var message = validateField(wrapper, input.value.trim());
        if (message && !firstInvalid) {
          firstInvalid = input;
        }
      });

      if (isSignup) {
        var terms = form.querySelector('input[name="terms"]');
        var termsError = document.getElementById('termsError');
        var termsValid = terms && terms.checked;

        if (termsError) {
          termsError.textContent = termsValid ? '' : 'Please accept the terms to continue.';
          termsError.classList.toggle('visible', !termsValid);
        }
        if (!termsValid && !firstInvalid) {
          firstInvalid = terms;
        }
      }

      if (firstInvalid) {
        if (firstInvalid.focus) {
          firstInvalid.focus();
        }
        return;
      }

      // Auth is not wired to a backend yet. Leaving the button visually respond,
      // then resetting keeps the demo honest without simulating a real sign-in.
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = isSignup ? 'Creating account…' : 'Signing in…';

      setTimeout(function () {
        if (isSignup) {
          // Placeholder: future redirect to onboarding.
          window.location.href = '/login';
        } else {
          // Placeholder: future redirect to dashboard.
          window.location.href = '/dashboard';
        }
      }, 900);

      // Fallback reset in case navigation is interrupted.
      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1600);
    });
  }

  attachSubmit('loginForm');
  attachSubmit('signupForm');

  /* ---------- Google button placeholder ---------- */

  var googleBtn = document.getElementById('googleLogin');
  if (googleBtn) {
    googleBtn.addEventListener('click', function () {
      var originalHTML = googleBtn.innerHTML;
      googleBtn.disabled = true;
      googleBtn.textContent = 'Connecting to Google…';
      setTimeout(function () {
        googleBtn.disabled = false;
        googleBtn.innerHTML = originalHTML;
      }, 1200);
    });
  }
})();