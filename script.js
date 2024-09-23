// Dummy projects array
const projects = [
    {
        title: "Project 1",
        description: "A short description of project 1.",
        emoji: "🚀" // You can replace this with an emoji SVG if desired
    },
    {
        title: "Project 2",
        description: "A short description of project 2.",
        emoji: "💻"
    },
    {
        title: "Project 3",
        description: "A short description of project 3.",
        emoji: "🎨"
    },
    {
        title: "Project 4",
        description: "A short description of project 4.",
        emoji: "📱"
    }
];

// Generate and append project cards
const projectsContainer = document.getElementById('projects-container');
projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('bg-white', 'text-black', 'rounded-lg', 'p-8', 'shadow-lg', 'hoverable', 'transform', 'transition-transform', 'duration-300');
    
    const projectEmoji = document.createElement('div');
    projectEmoji.classList.add('text-4xl', 'mb-4');
    projectEmoji.textContent = project.emoji;

    const projectTitle = document.createElement('h2');
    projectTitle.classList.add('text-2xl', 'font-bold', 'mb-2');
    projectTitle.textContent = project.title;

    const projectDescription = document.createElement('p');
    projectDescription.textContent = project.description;

    projectCard.appendChild(projectEmoji);
    projectCard.appendChild(projectTitle);
    projectCard.appendChild(projectDescription);
    
    projectsContainer.appendChild(projectCard);
});


const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('.hoverable');

// Listeners
document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < $hoverables.length; i++) {
    $hoverables[i].addEventListener('mouseenter', onMouseHover);
    $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

// Move the cursor
function onMouseMove(e) {
    gsap.to($bigBall, .4, {
        x: e.pageX - 15,
        y: e.pageY - 15
    });
    gsap.to($smallBall, .1, {
        x: e.pageX - 5,
        y: e.pageY - 7
    });
}

// Hover an element
function onMouseHover() {
    gsap.to($bigBall, .3, {
        scale: 4
    });
}

function onMouseHoverOut() {
    gsap.to($bigBall, .3, {
        scale: 1
    });
}

// Overlay disappear on click
const overlay = document.getElementById('overlay');
const content = document.getElementById('content');
overlay.addEventListener('click', () => {
    gsap.to(overlay, {
        duration: 1, 
        opacity: 0, 
        scale: 1.5, 
        ease: 'power2.out', 
        onComplete: () => {
            overlay.style.display = 'none';
            content.style.display = 'block';
            gsap.from('#about, #projects', {duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: 'power2.out'});
            initializeFloatingCards();
        }
    });
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
        dot.classList.add('absolute', 'rounded-full', 'bg-pink-300');
        dot.style.width = `${dotSize}px`;
        dot.style.height = `${dotSize}px`;
        dot.style.left = `${j * spacing}px`;
        dot.style.top = `${i * spacing}px`;
        background.appendChild(dot);
    }
}

// Floating cards effect
function initializeFloatingCards() {
    const cards = document.querySelectorAll('#about'); // Target both "about" and projects
    cards.forEach(card => {
        gsap.to(card, {
            y: "random(-3, 3)",
            x: "random(-3, 3)",
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
            gsap.killTweensOf(card, {y: true, x: true, rotation: true});
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {duration: 0.3, scale: 1, boxShadow: 'none', ease: 'power2.out'});
            initializeFloatingCards(); // Restart floating effect on mouse leave
        });
    });
}
