let currentPosition = 0; // Tracks current slide position
let gap = 10; // Space between slides
const slideWidth = 400; // Width of each slide

function moveCarousel(direction) {
    const items = document.querySelectorAll(".carousel-item"); // Select all slides

    if (direction == "forward") {
        // minus 2 b/c first 2 slides already showing
        if (currentPosition >= items.length - 2) return false; // Stop at last slide
        currentPosition++; // Move forward
    } else {
        if (currentPosition == 0) return false; // Stop at first slide
        currentPosition--; // Move backward
    }

    const offset = (slideWidth + gap) * currentPosition; // Calculate shift

    for (const item of items) {
        item.style.transform = `translateX(-${offset}px)`; // Shift slides
    }
}
