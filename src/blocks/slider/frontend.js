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
    var interval = parseInt(slider.getAttribute('data-interval')) || 5000;
    var slides = slider.querySelectorAll('.wp-block-custom-cut-slide');
    var currentSlide = parseInt(slider.getAttribute('data-current')) || 0;
    var controls = slider.querySelectorAll('.btn');
    var indicators = slider.querySelectorAll('.indicators button');
    var autoplay = slider.getAttribute('data-autoplay') === "true";
    var timer = null;
    var isPlaying = false;
    var uniformHeight = slider.getAttribute('data-uniform-height') === "true";

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
        // stopAutoplay();
      })
    })

    function indicate() {
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("current", index === currentSlide)
      })
    }

    // remove active class from previous slide and add to current slide
    function updateCurrent() {
      // Update the front-end UI based on the current slide
      slides[currentSlide].classList.toggle("active")
      currentSlide = (currentSlide + 1) % slideCount
      carousel.setAttribute('current', currentSlide);
      slides[currentSlide].classList.toggle("active")
      indicate()
      return currentSlide
    }

    function previousSlide() {
      slides[currentSlide].classList.toggle("active")
      if ((currentSlide) <= 0) {
        currentSlide = (slideCount - currentSlide - 1) % slideCount
      } else {
        currentSlide = (currentSlide - 1) % slideCount
      }
      slides[currentSlide].classList.toggle("active")
      carousel.setAttribute('current', currentSlide)
      indicate()
      return currentSlide
    }

    const slideTo = (target) => {
      const currentIndex = (currentSlide || 0);
      indicators.forEach(d => d.classList.remove("current"));

      if ((currentIndex !== target)) {
        slides[currentSlide].classList.toggle("active")
        slides[target].classList.add("active")
        currentSlide = target;
        carousel.setAttribute('current', currentSlide)
        // Update indicators
        indicate()
        return currentSlide;
      }
    }

    // --- Autoplay logic ---
    function startAutoplay() {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        updateCurrent();
      }, interval);
      isPlaying = true;
      updatePauseButton();
    }

    function stopAutoplay() {
      if (timer) clearInterval(timer);
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
          updateCurrent();
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

    // Initialize indicators and pause button
    indicate();
    updatePauseButton();

    // Start autoplay if enabled
    if (autoplay) {
      startAutoplay();
    }
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
    setUniformHeight();
    window.addEventListener('resize', setUniformHeight);
  }

})