let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= totalSlides) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = totalSlides - 1;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-advance every 3 seconds
setInterval(() => {
    changeSlide(1);
}, 3000);

// Initialize first slide
showSlide(currentSlideIndex);