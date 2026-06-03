document.addEventListener("DOMContentLoaded", () => {
  // Dropdown Logic
  const dropdowns = document.querySelectorAll(".dropdown > a");
  dropdowns.forEach(dropdownToggle => {
    dropdownToggle.addEventListener("click", function(e) {
      e.preventDefault();
      this.parentElement.classList.toggle('open');
    });
  });

  // Hero Carousel Logic
  const slides = document.querySelectorAll(".hero-slider .slide");
  const prevBtn = document.querySelector(".nav-prev");
  const nextBtn = document.querySelector(".nav-next");
  const dots = document.querySelectorAll(".indicator-dot");
  
  if (slides.length > 0) {
    let currentIndex = 0;
    let slideInterval;
    const intervalTime = 5000;

    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));
      slides[index].classList.add("active");
      if (dots[index]) dots[index].classList.add("active");
      currentIndex = index;
    }

    function nextSlide() {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= slides.length) {
        nextIndex = 0;
      }
      showSlide(nextIndex);
    }

    function prevSlide() {
      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = slides.length - 1;
      }
      showSlide(prevIndex);
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetInterval();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetInterval();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => {
        showSlide(idx);
        resetInterval();
      });
    });

    function startInterval() {
      slideInterval = setInterval(nextSlide, intervalTime);
    }

    function resetInterval() {
      clearInterval(slideInterval);
      startInterval();
    }

    startInterval();
  }

  // Image Fallback Logic
  const images = document.querySelectorAll("img");
  images.forEach(img => {
    img.addEventListener("error", function() {
      // Prevent infinite loop if placeholder also fails
      if (this.dataset.fallbackApplied) return;
      this.dataset.fallbackApplied = 'true';
      
      const width = this.clientWidth || 200;
      const height = this.clientHeight || 200;
      this.src = `https://placehold.co/${width}x${height}/000000/FFFFFF?text=${width}x${height}`;
    });
    
    // Trigger error if image is already broken on load
    if (img.complete && img.naturalHeight === 0) {
      img.dispatchEvent(new Event("error"));
    }
  });
});
