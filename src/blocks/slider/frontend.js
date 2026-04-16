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
    var indicators = slider.querySelectorAll('.indicators .indicator:not(.pause-play)');
    var pausePlayBtn = slider.querySelector('.indicator.pause-play');
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

    // set initial active slide and aria-hidden states
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.toggle("active")
      }
      slide.setAttribute('aria-hidden', index === currentSlide ? 'false' : 'true');
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

    // Pause all videos inside a slide
    function pauseSlideVideos(slide) {
      slide.querySelectorAll('video').forEach(v => v.pause());
    }

    // Resume autoplay videos inside a slide
    function resumeSlideVideos(slide) {
      slide.querySelectorAll('video[autoplay]').forEach(v => v.play().catch(() => {}));
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
        pauseSlideVideos(slides[prev]);
        setTimeout(() => {
          slides[target].classList.remove(enterClass);
          slides[target].classList.add('active');
          slides[prev].classList.remove(exitClass);
          resumeSlideVideos(slides[target]);
        }, transitionDuration);
      } else {
        slides[prev].classList.remove('active');
        pauseSlideVideos(slides[prev]);
        slides[target].classList.add('active');
        resumeSlideVideos(slides[target]);
      }

      // Reset embed overlay on both leaving and entering slides
      clearEmbedOverlay(slides[prev]);
      clearEmbedOverlay(slides[target]);

      // Update aria-hidden and announce to screen readers
      slides.forEach((slide, i) => {
        slide.setAttribute('aria-hidden', i === currentSlide ? 'false' : 'true');
      });
      const liveRegion = slider.querySelector('[aria-live]');
      if (liveRegion) liveRegion.textContent = `Slide ${currentSlide + 1} of ${slideCount}`;

      carousel.setAttribute('current', currentSlide);
      indicate();
      updateLoopButtons();
    }

    function clearEmbedOverlay(slide) {
      const copy = slide.querySelector('.slide-copy');
      if (copy) copy.classList.remove('embed-playing');
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
      if (pausePlayBtn) {
        pausePlayBtn.classList.toggle('is-paused', !isPlaying);
        pausePlayBtn.setAttribute('aria-label', isPlaying ? 'Pause slideshow' : 'Play slideshow');
      }
    }

    /*
    * Handle carousel controls (prev/next buttons)
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
        }
      });
    });

    // Pause/play indicator button
    if (pausePlayBtn) {
      pausePlayBtn.addEventListener('click', () => {
        if (isPlaying) stopAutoplay();
        else startAutoplay();
      });
    }

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

    // --- Embed video overlay hide on play ---
    // Inject enablejsapi=1 into YouTube iframes so they post state messages
    slides.forEach(slide => {
      const iframe = slide.querySelector('.slide-embed');
      if (!iframe) return;
      if (iframe.src.includes('youtube.com') && !iframe.src.includes('enablejsapi')) {
        iframe.src += (iframe.src.includes('?') ? '&' : '?') + 'enablejsapi=1';
      }
    });

    window.addEventListener('message', (e) => {
      slides.forEach(slide => {
        const iframe = slide.querySelector('.slide-embed');
        if (!iframe || iframe.contentWindow !== e.source) return;
        const copy = slide.querySelector('.slide-copy');
        if (!copy) return;
        try {
          const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
          // YouTube: info 1=playing, 0=ended, 2=paused
          if (data.event === 'onStateChange') {
            if (data.info === 1) copy.classList.add('embed-playing');
            if (data.info === 0 || data.info === 2) copy.classList.remove('embed-playing');
          }
          // Vimeo
          if (data.event === 'play') copy.classList.add('embed-playing');
          if (data.event === 'pause' || data.event === 'ended') copy.classList.remove('embed-playing');
        } catch (err) {}
      });
    });

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
      function debounce(fn, delay) {
        let t;
        return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
      }
      setUniformHeight();
      window.addEventListener('resize', debounce(setUniformHeight, 150));
    }

  });
})