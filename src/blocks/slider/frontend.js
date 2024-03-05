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

    // set initial active slide from current attribute
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.toggle("active")
      }
    })

    // remove active class from previous slide and add to current slide
    function updateCurrent() {
      // Update the front-end UI based on the current slide
      slides[currentSlide].classList.toggle("active")
      currentSlide = (currentSlide + 1) % slideCount
      slides[currentSlide].classList.toggle("active")
      return currentSlide
    }

    const transition = () => {
      // toggle active class for element
      //  ToDo: Pass a transition animation to updateCurrent
      updateCurrent();
      return clearTimeout()
    }
    setInterval(transition, interval, currentSlide)
  })
})