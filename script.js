// Cursor follow effect
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {duration: 0.1, x: e.clientX, y: e.clientY});
});

// Name hover effect
const name = document.getElementById('name');
const nameText = "Your Name";
nameText.split('').forEach(letter => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.className = 'name-letter';
    name.appendChild(span);
});

// Overlay disappear on click
const overlay = document.getElementById('overlay');
const content = document.getElementById('content');
overlay.addEventListener('click', () => {
    gsap.to(overlay, {duration: 1, opacity: 0, scale: 1.5, ease: 'power2.out', onComplete: () => {
        overlay.style.display = 'none';
        content.style.display = 'block';
        gsap.from('#about, #projects', {duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: 'power2.out'});
        initializeFloatingCards();
    }});
});

// Create static evenly spaced dots in the background
const background = document.getElementById('background');
const dotSize = 4;
const spacing = 30;
const rows = Math.ceil(window.innerHeight / spacing);
const cols = Math.ceil(window.innerWidth / spacing);

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const dot = document.createElement('div');
        dot.classList.add('absolute', 'rounded-full', 'bg-gray-300');
        dot.style.width = `${dotSize}px`;
        dot.style.height = `${dotSize}px`;
        dot.style.left = `${j * spacing}px`;
        dot.style.top = `${i * spacing}px`;
        background.appendChild(dot);
    }
}

// Floating cards effect
function initializeFloatingCards() {
    const cards = document.querySelectorAll('#about, #projects');
    cards.forEach(card => {
        gsap.to(card, {
            y: "random(-10, 10)",
            x: "random(-10, 10)",
            rotation: "random(-2, 2)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            onComplete: function() {
                this.restart();
            }
        });

        card.addEventListener('mouseenter', () => {
            gsap.to(card, {duration: 0.3, scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.1)', ease: 'power2.out'});
            gsap.killTweensOf(card, {y: true, x: true, rotation: true}); // Stop the floating animation
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {duration: 0.3, scale: 1, boxShadow: 'none', ease: 'power2.out'});
            initializeFloatingCards(); // Restart the floating animation
        });
    });
}