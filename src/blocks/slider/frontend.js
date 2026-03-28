// slider front end

document.addEventListener('DOMContentLoaded', () => {
  console.log("Frontend slider script loaded")
  // Run this for all carousels loaded
  // Get every carousel on page
  var sliders = document.querySelectorAll('.wp-block-custom-cut-slider');

  // run transitions for each carousel instance on page
  sliders.forEach((carousel, index) => {
    var slider = carousel
    var slideCount = slider.getAttribute('data-slide-count');
    var interval = parseInt(slider.getAttribute('data-slide-interval')) || 5000;
    var slides = slider.querySelectorAll('.wp-block-custom-cut-slide');
    var currentSlide = parseInt(slider.getAttribute('data-current')) || 0;
    var controls = slider.querySelectorAll('.btn');
    var indicators = slider.querySelectorAll('.indicators .indicator');
    var autoplay = slider.getAttribute('data-autoplay') === "true";
    var keyboardNav = slider.getAttribute('data-keyboard-nav') === "true";
    var swipeNav = slider.getAttribute('data-swipe-nav') === "true";
    var transitionType = slider.getAttribute('data-transition-type') || 'fade';
    var transitionDuration = parseInt(slider.getAttribute('data-transition-duration')) || 800;
    var autoplayMode = slider.getAttribute('data-autoplay-mode') || 'forward';
    var enableLoop = slider.getAttribute('data-enable-loop') !== 'false';
    var timer = null;
    var isPlaying = false;
    var uniformHeight = slider.getAttribute('data-uniform-height') === "true";
    var touchStartX = 0;

    // Expose transition duration to CSS for animation timing
    slider.style.setProperty('--slide-transition-duration', transitionDuration + 'ms');

    // set initial active slide from current attribute
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.toggle("active")
      }
    })

    indicators.forEach((indicator) => {
      indicator.addEventListener('click', (event) => {
        const target = parseInt(event.target.getAttribute('data-carousel-slide-to'))
        slideTo(target);
      })
    })

    function indicate() {
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("current", index === currentSlide)
      })
    }

    // Central transition handler — all navigation goes through here
    function goToSlide(target, direction) {
      if (target === currentSlide) return;
      const prev = currentSlide;
      currentSlide = target;

      if (transitionType === 'slide') {
        const enterClass = direction === 'forward' ? 'slide-enter-from-right' : 'slide-enter-from-left';
        const exitClass  = direction === 'forward' ? 'slide-exit-to-left'    : 'slide-exit-to-right';
        slides[target].classList.add(enterClass);
        slides[prev].classList.add(exitClass);
        slides[prev].classList.remove('active');
        setTimeout(() => {
          slides[target].classList.remove(enterClass);
          slides[target].classList.add('active');
          slides[prev].classList.remove(exitClass);
        }, transitionDuration);
      } else {
        slides[prev].classList.remove('active');
        slides[target].classList.add('active');
      }

      carousel.setAttribute('current', currentSlide);
      indicate();
      updateLoopButtons();
    }

    function nextSlide() {
      if (!enableLoop && currentSlide >= slideCount - 1) return;
      goToSlide((currentSlide + 1) % slideCount, 'forward');
    }

    function previousSlide() {
      if (!enableLoop && currentSlide <= 0) return;
      const prev = currentSlide <= 0 ? slideCount - 1 : currentSlide - 1;
      goToSlide(prev, 'backward');
    }

    function randomSlide() {
      if (slideCount <= 1) return;
      let next;
      do { next = Math.floor(Math.random() * slideCount); } while (next === currentSlide);
      goToSlide(next, 'forward');
    }

    function slideTo(target) {
      if (target === currentSlide) return;
      goToSlide(target, target > currentSlide ? 'forward' : 'backward');
    }

    function updateLoopButtons() {
      if (enableLoop) return;
      const prevBtn = slider.querySelector('.btn.left');
      const nextBtn = slider.querySelector('.btn.right');
      if (prevBtn) prevBtn.disabled = currentSlide <= 0;
      if (nextBtn) nextBtn.disabled = currentSlide >= slideCount - 1;
    }

    // --- Autoplay logic ---
    // Uses setTimeout chain so each slide can specify its own duration via data-slide-interval.
    function scheduleNext() {
      // Stop at boundary when loop is disabled
      if (!enableLoop && autoplayMode !== 'random') {
        if (autoplayMode === 'backward' && currentSlide <= 0) return stopAutoplay();
        if (autoplayMode !== 'backward' && currentSlide >= slideCount - 1) return stopAutoplay();
      }
      const slideInterval = parseInt(slides[currentSlide].getAttribute('data-slide-interval')) || interval;
      timer = setTimeout(() => {
        if (!isPlaying) return;
        if (autoplayMode === 'backward') previousSlide();
        else if (autoplayMode === 'random') randomSlide();
        else nextSlide();
        scheduleNext();
      }, slideInterval);
    }

    function startAutoplay() {
      if (timer) clearTimeout(timer);
      isPlaying = true;
      updatePauseButton();
      scheduleNext();
    }

    function stopAutoplay() {
      if (timer) clearTimeout(timer);
      isPlaying = false;
      updatePauseButton();
    }

    function updatePauseButton() {
      const pauseBtn = slider.querySelector('.btn.center .pause');
      if (pauseBtn) {
        pauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
      }
    }

    /*
    * Handle carousel controls
    */
    controls.forEach((control) => {
      control.addEventListener('click', (event) => {
        const setting = control.querySelector('span');
        const type = setting.classList;
        if (type.contains('previous')) {
          previousSlide();
          stopAutoplay();
        } else if (type.contains('next')) {
          nextSlide();
          stopAutoplay();
        } else if (type.contains('pause')) {
          // console.log('Clicked on pause, toDo: Implement transistion pause');
          if (isPlaying) {
            stopAutoplay();
          } else {
            startAutoplay();
          }
        }
      });
    });

    // --- Keyboard Navigation ---
    if (keyboardNav) {
      slider.setAttribute('tabindex', '0');
      slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          previousSlide();
          stopAutoplay();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide();
          stopAutoplay();
        } else if (e.code === 'Space') {
          e.preventDefault();
          isPlaying ? stopAutoplay() : startAutoplay();
        }
      });
    }

    // --- Touch/Swipe Navigation ---
    if (swipeNav) {
      slider.style.touchAction = 'pan-y';
      slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      slider.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? nextSlide() : previousSlide();
        }
      }, { passive: true });
    }

    // Initialize indicators, pause button, and loop button states
    indicate();
    updatePauseButton();
    updateLoopButtons();

    // Start autoplay if enabled
    if (autoplay) {
      startAutoplay();
    }

    // --- Uniform Height ---
    if (uniformHeight) {
      function setUniformHeight() {
        let maxHeight = 0;
        slides.forEach(slide => {
          slide.style.height = ''; // reset
          maxHeight = Math.max(maxHeight, slide.offsetHeight);
        });
        slides.forEach(slide => {
          slide.style.height = maxHeight + 'px';
        });
        slider.style.height = maxHeight + 'px';
      }
      setUniformHeight();
      window.addEventListener('resize', setUniformHeight);
    }

  });
})