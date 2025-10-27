// Only run carousel logic if the carousel exists on the page
if (document.querySelector('.carousel')) {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    function showSlide(index) {
        if (index < 0 || index >= totalSlides) return;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Track slide change event using Application Insights telemetry
        if (window.appInsights) {
            appInsights.trackEvent({
                name: "SlideChanged",
                properties: { index }
            });
        }

        // Optional: log when looping back to first slide (only in debug mode)
        const DEBUG = false; // Set to true for debugging
        if (DEBUG && index === 0) {
            console.log("Looped back to first slide");
        }
    }

    function changeSlide(direction) {
        currentSlideIndex += direction;
        if (currentSlideIndex >= totalSlides) currentSlideIndex = 0;
        if (currentSlideIndex < 0) currentSlideIndex = totalSlides - 1;
        showSlide(currentSlideIndex);
        pauseAutoAdvance(); // Pause auto-advance when navigation occurs
    }

    function currentSlide(index) {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
    }

    let autoAdvanceInterval;
    let autoAdvanceTimeout = null;

    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(() => {
            changeSlide(1);
        }, 3000);
    }

    function pauseAutoAdvance() {
        clearInterval(autoAdvanceInterval);
        clearTimeout(autoAdvanceTimeout);
        autoAdvanceTimeout = setTimeout(() => {
            startAutoAdvance();
        }, 5000); // Resume after 5 seconds of inactivity
    }

    // Dot click: navigate to slide and pause auto-advance
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            currentSlide(idx);
            pauseAutoAdvance();
        });
    });
    // No need for separate pause handler on arrow click since changeSlide now pauses auto-advance

    // Initialize first slide
    showSlide(currentSlideIndex);

    // Start auto-advance
    startAutoAdvance();
}
