// Cyberpunk 2077 Style JavaScript Effects

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all effects
    initParticleSystem();
    initTypingEffect();
    initHoverEffects();
    initScrollAnimations();
    initMatrixRain();
});

// Particle System for Background
function initParticleSystem() {
    const particleContainer = document.querySelector('.bg-particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position and properties
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: #00ffff;
        border-radius: 50%;
        box-shadow: 0 0 ${size * 2}px #00ffff;
        animation: float ${duration}s infinite linear;
        opacity: ${Math.random() * 0.5 + 0.3};
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, duration * 1000);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(100vh) rotate(0deg); }
        100% { transform: translateY(-100px) rotate(360deg); }
    }
    
    .particle {
        pointer-events: none;
        z-index: -1;
    }
    
    .typing-cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .matrix-rain {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -3;
        overflow: hidden;
    }
    
    .matrix-column {
        position: absolute;
        top: -100%;
        color: #00ff00;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        line-height: 14px;
        opacity: 0.3;
        animation: matrixFall linear infinite;
    }
    
    @keyframes matrixFall {
        0% { top: -100%; }
        100% { top: 100%; }
    }
`;
document.head.appendChild(style);

// Typing Effect for Mission Text
function initTypingEffect() {
    const missionTexts = document.querySelectorAll('.mission-text p');
    
    missionTexts.forEach((text, index) => {
        const originalText = text.textContent;
        text.textContent = '';
        
        setTimeout(() => {
            typeText(text, originalText, 50);
        }, index * 2000);
    });
}

function typeText(element, text, speed) {
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    element.appendChild(cursor);
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent = text.substring(0, i + 1);
            element.appendChild(cursor);
            i++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                cursor.remove();
            }, 1000);
        }
    }, speed);
}

// Enhanced Hover Effects
function initHoverEffects() {
    // Add glow effect to tags
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            this.style.boxShadow = '0 0 30px rgba(255, 0, 128, 1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 0 10px rgba(255, 0, 128, 0.5)';
        });
    });
    
    // Add ripple effect to social buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
    
    // Profile card tilt effect
    const profileCard = document.querySelector('.profile-card');
    profileCard.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    profileCard.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
}

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(0, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.info-section, .social-btn');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Add slide animation CSS
const slideStyle = document.createElement('style');
slideStyle.textContent = `
    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(slideStyle);

// Matrix Rain Effect
function initMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-rain';
    document.body.appendChild(matrixContainer);
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        createMatrixColumn(matrixContainer, chars, i * 20);
    }
}

function createMatrixColumn(container, chars, left) {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.style.left = left + 'px';
    column.style.animationDuration = (Math.random() * 3 + 2) + 's';
    column.style.animationDelay = Math.random() * 2 + 's';
    
    // Create random characters
    let text = '';
    for (let i = 0; i < 20; i++) {
        text += chars[Math.floor(Math.random() * chars.length)] + '\n';
    }
    column.textContent = text;
    
    container.appendChild(column);
    
    // Remove and recreate after animation
    setTimeout(() => {
        if (column.parentNode) {
            column.remove();
            createMatrixColumn(container, chars, left);
        }
    }, 5000);
}

// Random glitch effect on name
function addRandomGlitch() {
    const name = document.querySelector('.name');
    if (name && Math.random() < 0.1) {
        name.style.animation = 'glitch 0.3s ease-in-out';
        setTimeout(() => {
            name.style.animation = '';
        }, 300);
    }
}

// Call random glitch every 5 seconds
setInterval(addRandomGlitch, 5000);

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    const body = document.body;
    body.style.animation = 'rainbow 2s infinite';
    
    const easterEggStyle = document.createElement('style');
    easterEggStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(easterEggStyle);
    
    setTimeout(() => {
        body.style.animation = '';
        easterEggStyle.remove();
    }, 4000);
    
    // Show easter egg message
    const message = document.createElement('div');
    message.textContent = 'CHEAT CODE ACTIVATED!';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Orbitron', monospace;
        font-size: 2rem;
        color: #ff0080;
        text-shadow: 0 0 20px #ff0080;
        z-index: 9999;
        animation: fadeInOut 3s ease-in-out;
    `;
    
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        }
    `;
    document.head.appendChild(fadeStyle);
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
        fadeStyle.remove();
    }, 3000);
}
