// slider front end

document.addEventListener('DOMContentLoaded', () => {
  console.log("Frontend slider script loaded")
  // Run this for all carousels loaded
  // Get every carousel on page
  var sliders = document.querySelectorAll('.wp-block-custom-cut-slider');

  // run transitions for each carousel instance on page
  sliders.forEach((carousel, index) => {
    var slider = carousel
    var slideCount = slider.getAttribute('slide-count');
    var interval = slider.getAttribute('data-interval');
    var slides = slider.querySelectorAll('.wp-block-custom-cut-slide');
    var currentSlide = parseInt(slider.getAttribute('current'));
    var controls = slider.querySelectorAll('.btn');
    var indicators = slider.querySelectorAll('.indicators button');

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
        indicator.classList.remove("current")
        if (index === currentSlide) {
          indicator.classList.add("current")
        }
      })
    }

    // remove active class from previous slide and add to current slide
    function updateCurrent() {
      // Update the front-end UI based on the current slide
      slides[currentSlide].classList.toggle("active")
      currentSlide = (currentSlide + 1) % slideCount
      slides[currentSlide].classList.toggle("active")
      carousel.setAttribute('current', currentSlide);
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

    /*
    * Handle carousel controls
    */
    controls.forEach((control) => {
      control.addEventListener('click', (event) => {
        const setting = control.querySelector('span');
        const type = setting.classList;
        if (type.contains('previous')) {
          previousSlide();
        } else if (type.contains('next')) {
          updateCurrent()
        } else if (type.contains('pause')) {
          // console.log('Clicked on pause, toDo: Implement transistion pause');
        }
      });
    });

  });

})