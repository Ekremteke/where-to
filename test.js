let index = 0;
const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.carousel-card');
const totalCards = cards.length;

let startX, endX;

function nextCard() {
  index = (index + 1) % totalCards; // Loop back to first card
  updateCarousel();
}

function prevCard() {
  index = (index - 1 + totalCards) % totalCards; // Loop to last card
  updateCarousel();
}

function updateCarousel() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Automatic Loop
setInterval(nextCard, 30000); // was 3000

// Manual Navigation
document.querySelector('.next-btn').addEventListener('click', nextCard);
document.querySelector('.prev-btn').addEventListener('click', prevCard);

// Swipe Detection
carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  let diff = startX - endX;
  
  if (diff > 50) {
    nextCard(); // Swipe left → next
  } else if (diff < -50) {
    prevCard(); // Swipe right → previous
  }
}