// Modern Terminal UI JavaScript Effects

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all effects
    initModernEffects();
    initTerminalAnimations();
    initInteractiveElements();
    initScrollAnimations();
    initParticleBackground();
});

// Modern Interactive Effects
function initModernEffects() {
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Terminal button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
            }, 100);
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Navigation item click effects
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Add loading effect
            const loader = document.createElement('div');
            loader.innerHTML = '...';
            loader.style.cssText = `
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                color: var(--neon-green);
                animation: pulse 0.5s ease-in-out infinite;
            `;
            this.style.position = 'relative';
            this.appendChild(loader);
            
            setTimeout(() => {
                loader.remove();
            }, 1000);
        });
    });
}

// Terminal Typing Animations
function initTerminalAnimations() {
    // Animate ASCII art on load
    const asciiArt = document.querySelector('.ascii-art');
    if (asciiArt) {
        asciiArt.style.opacity = '0';
        setTimeout(() => {
            asciiArt.style.transition = 'opacity 2s ease-in-out';
            asciiArt.style.opacity = '1';
        }, 500);
    }
    
    // Animate info lines with stagger
    const infoLines = document.querySelectorAll('.info-line');
    infoLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            line.style.transition = 'all 0.6s ease-out';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 200 + 1000);
    });
    
    // Add typing effect to prompts
    const prompts = document.querySelectorAll('.prompt');
    prompts.forEach(prompt => {
        const text = prompt.textContent;
        prompt.textContent = '';
        typeWriter(prompt, text, 100);
    });
}

function typeWriter(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Interactive Elements
function initInteractiveElements() {
    // Add hover sound effect simulation
    const interactiveElements = document.querySelectorAll('.nav-item, .link, .btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Visual feedback for hover
            this.style.filter = 'brightness(1.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
    
    // Add click ripple effect
    const clickableElements = document.querySelectorAll('.info-block, .quick-access');
    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Add color based on element type
    if (element.classList.contains('quick-btn')) {
        ripple.style.background = 'rgba(79, 172, 254, 0.3)';
    } else if (element.classList.contains('submit-btn')) {
        ripple.style.background = 'rgba(0, 255, 136, 0.3)';
    } else {
        ripple.style.background = 'rgba(255, 0, 110, 0.3)';
    }
    
    element.appendChild(ripple);
    
    // Create secondary ripple for enhanced effect
    setTimeout(() => {
        const secondRipple = ripple.cloneNode();
        secondRipple.style.animationDelay = '0.1s';
        secondRipple.style.opacity = '0.5';
        element.appendChild(secondRipple);
        
        setTimeout(() => {
            if (secondRipple.parentNode) {
                secondRipple.remove();
            }
        }, 600);
    }, 100);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Particle Background System
function initParticleBackground() {
    const particleCount = 30;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        createFloatingParticle();
    }
}

function createFloatingParticle() {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 15;
    
    particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: var(--neon-blue);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: -1;
        opacity: ${Math.random() * 0.3 + 0.1};
        animation: floatParticle ${duration}s linear infinite;
        box-shadow: 0 0 ${size * 2}px var(--neon-blue);
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createFloatingParticle();
        }
    }, duration * 1000);
}

function createSimpleRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'simple-ripple';
    
    ripple.style.position = 'fixed';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.border = '2px solid rgba(255, 255, 255, 0.6)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1000';
    ripple.style.animation = 'simpleRipple 1s ease-out forwards';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 1000);
}

// Space particle system with stars and cosmic effects
function initParticleSystem() {
    const particleContainer = document.querySelector('.bg-particles');
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer, i);
    }
    
    document.addEventListener('mousemove', handleMouseParticles);
    document.addEventListener('click', handleSpaceClick);
}

function handleSpaceClick(e) {
    createSimpleRipple(e.clientX, e.clientY);
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const angle = (i * 45) * Math.PI / 180;
            const distance = Math.random() * 80 + 40;
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
            createMouseParticle(e.clientX + offsetX, e.clientY + offsetY);
        }, i * 50);
    }
    
    createCosmicWave(e.clientX, e.clientY);
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.setAttribute('data-particle-id', index);
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    
    const colors = [
        '#ffffff',
        '#f0f8ff',
        '#e6e6fa'
    ];
    
    const size = Math.random() * 2 + 1;
    const speed = Math.random() * 80 + 40;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.background = color;
    particle.style.borderRadius = '50%';
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    particle.style.animationDuration = speed + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.opacity = '0.6';
    
    if (Math.random() > 0.7) {
        particle.classList.add('pulse-particle');
    }
    
    container.appendChild(particle);
}

// Mouse particle trail effect
let mouseParticleTimer;
function handleMouseParticles(e) {
    if (Math.random() > 0.98) {
        createMouseTrail(e.clientX, e.clientY);
    }
}

function createMouseParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'mouse-particle';
    particle.style.left = (x - 2) + 'px';
    particle.style.top = (y - 2) + 'px';
    
    document.body.appendChild(particle);
    
    // Create space ripple effect
    if (Math.random() > 0.6) {
        createCosmicWave(x, y);
    }
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 2000);
}

function createCosmicWave(x, y) {
    const wave = document.createElement('div');
    wave.className = 'cosmic-wave';
    wave.style.left = (x - 50) + 'px';
    wave.style.top = (y - 50) + 'px';
    
    document.body.appendChild(wave);
    
    setTimeout(() => {
        if (wave.parentNode) {
            wave.parentNode.removeChild(wave);
        }
    }, 2000);
}

// Constellation effect connecting particles
function createConstellationEffect() {
    const particles = document.querySelectorAll('.particle');
    const connections = [];
    
    setInterval(() => {
        // Remove old connections
        connections.forEach(line => {
            if (line.parentNode) {
                line.parentNode.removeChild(line);
            }
        });
        connections.length = 0;
        
        // Create new connections
        const visibleParticles = Array.from(particles).filter(p => {
            const rect = p.getBoundingClientRect();
            return rect.top > -50 && rect.top < window.innerHeight + 50;
        });
        
        for (let i = 0; i < visibleParticles.length; i++) {
            for (let j = i + 1; j < visibleParticles.length; j++) {
                const p1 = visibleParticles[i].getBoundingClientRect();
                const p2 = visibleParticles[j].getBoundingClientRect();
                const distance = Math.sqrt(
                    Math.pow(p1.left - p2.left, 2) + Math.pow(p1.top - p2.top, 2)
                );
                
                if (distance < 150 && Math.random() > 0.8) {
                    createConstellationLine(p1, p2, distance);
                }
            }
        }
    }, 3000);
}

function createConstellationLine(p1, p2, distance) {
    const line = document.createElement('div');
    line.className = 'constellation-line';
    
    const angle = Math.atan2(p2.top - p1.top, p2.left - p1.left) * 180 / Math.PI;
    
    line.style.left = p1.left + 'px';
    line.style.top = p1.top + 'px';
    line.style.width = distance + 'px';
    line.style.transform = `rotate(${angle}deg)`;
    line.style.opacity = Math.max(0.3, 1 - distance / 150);
    
    // Add stellar glow effect
    line.style.boxShadow = `0 0 8px rgba(255, 255, 255, 0.6)`;
    
    document.body.appendChild(line);
    
    setTimeout(() => {
        if (line.parentNode) {
            line.parentNode.removeChild(line);
        }
    }, 5000);
}

// Advanced loading animations
function initAdvancedLoadingAnimations() {
    // Staggered element animations
    const elements = document.querySelectorAll('.section, .contact-item, .collab-card');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) rotateX(10deg)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) rotateX(0deg)';
        }, index * 200);
    });
    
    // Form field focus chain animation
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    formInputs.forEach((input, index) => {
        input.addEventListener('focus', () => {
            formInputs.forEach((otherInput, otherIndex) => {
                if (otherIndex !== index) {
                    otherInput.style.transform = 'scale(0.95)';
                    otherInput.style.opacity = '0.7';
                }
            });
        });
        
        input.addEventListener('blur', () => {
            formInputs.forEach(otherInput => {
                otherInput.style.transform = 'scale(1)';
                otherInput.style.opacity = '1';
            });
        });
    });
}

// Space-themed particle system with stars and cosmic effects
const particleStyles = `
.bg-particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
}

.particle {
    position: absolute;
    border-radius: 50%;
    animation: starFloat linear infinite;
    opacity: 0.8;
}

.pulse-particle {
    animation: starFloat linear infinite, starTwinkle 3s ease-in-out infinite;
}

.shooting-star {
    animation: shootingStar 8s linear infinite;
    width: 2px !important;
    height: 2px !important;
    background: linear-gradient(45deg, #ffffff, #87ceeb) !important;
    box-shadow: 0 0 10px #ffffff, 2px 2px 20px #87ceeb !important;
}

.orbital-particle {
    animation: starFloat linear infinite, planetOrbit 15s linear infinite;
}

.mouse-particle {
    position: fixed;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, #ffffff 0%, #87ceeb 100%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10;
    animation: mouseStarTrail 2s ease-out forwards;
    box-shadow: 0 0 15px #ffffff;
}

.constellation-line {
    position: absolute;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), rgba(135, 206, 235, 0.4), transparent);
    transform-origin: left center;
    animation: constellationGlow 5s ease-in-out infinite;
    border-radius: 1px;
}

.cosmic-wave {
    position: fixed;
    width: 80px;
    height: 80px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    pointer-events: none;
    z-index: 5;
    animation: spaceRipple 2s ease-out forwards;
}

@keyframes starFloat {
    0% {
        transform: translateY(100vh) translateX(0) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 0.8;
    }
    50% {
        transform: translateX(30px) rotate(180deg);
    }
    90% {
        opacity: 0.8;
    }
    100% {
        transform: translateY(-100px) translateX(-20px) rotate(360deg);
        opacity: 0;
    }
}

@keyframes starTwinkle {
    0%, 100% {
        opacity: 0.3;
        transform: scale(1);
    }
    50% {
        opacity: 1;
        transform: scale(1.5);
    }
}

@keyframes shootingStar {
    0% {
        transform: translateX(-100px) translateY(-100px) rotate(45deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateX(100vw) translateY(100vh) rotate(45deg);
        opacity: 0;
    }
}

@keyframes planetOrbit {
    0% {
        transform: rotate(0deg) translateX(40px) rotate(0deg);
    }
    100% {
        transform: rotate(360deg) translateX(40px) rotate(-360deg);
    }
}

@keyframes mouseStarTrail {
    0% {
        transform: scale(0);
        opacity: 1;
        box-shadow: 0 0 15px #ffffff;
    }
    50% {
        transform: scale(2);
        opacity: 0.6;
        box-shadow: 0 0 30px #ffffff, 0 0 50px #87ceeb;
    }
    100% {
        transform: scale(0.1);
        opacity: 0;
        box-shadow: 0 0 5px #ffffff;
    }
}

@keyframes constellationGlow {
    0%, 100% {
        opacity: 0.2;
        transform: scaleX(0.5);
    }
    50% {
        opacity: 0.8;
        transform: scaleX(1);
    }
}

@keyframes spaceRipple {
    0% {
        transform: scale(0);
        opacity: 0.6;
        border-width: 3px;
    }
    50% {
        opacity: 0.3;
        border-width: 2px;
    }
    100% {
        transform: scale(6);
        opacity: 0;
        border-width: 1px;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = particleStyles;
document.head.appendChild(styleSheet);

// Add CSS for modern animations
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% { 
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% { 
            transform: translateY(-100vh) translateX(50px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .terminal {
        animation: terminalBoot 1s ease-out;
    }
    
    @keyframes terminalBoot {
        0% {
            opacity: 0;
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);



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
    
    const animateElements = document.querySelectorAll('.info-block, .quick-access, .section');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}


// Add modern terminal effects
function addTerminalEffects() {
    // Random terminal flicker
    const terminal = document.querySelector('.terminal');
    if (terminal && Math.random() < 0.05) {
        terminal.style.animation = 'flicker 0.1s ease-in-out';
        setTimeout(() => {
            terminal.style.animation = '';
        }, 100);
    }
}

// Add flicker effect
const flickerStyle = document.createElement('style');
flickerStyle.textContent = `
    @keyframes flicker {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.95; }
    }
`;
document.head.appendChild(flickerStyle);

// Call random flicker every 10 seconds
setInterval(addTerminalEffects, 10000);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + Shift + T for terminal theme toggle
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
    }
});

function toggleTheme() {
    const root = document.documentElement;
    const currentBg = getComputedStyle(root).getPropertyValue('--primary-bg');
    
    if (currentBg.includes('#0a0a0f')) {
        // Switch to light mode
        root.style.setProperty('--primary-bg', '#f0f0f0');
        root.style.setProperty('--text-primary', '#000000');
        root.style.setProperty('--terminal-bg', '#ffffff');
    } else {
        // Switch back to dark mode
        root.style.setProperty('--primary-bg', '#0a0a0f');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--terminal-bg', '#0f0f23');
    }
}

// Modern Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.successMessage = document.getElementById('successMessage');
        this.charCount = document.getElementById('charCount');
        
        if (this.form) {
            this.initializeForm();
        }
    }
    
    initializeForm() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        this.form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearError(field));
        });
        
        const messageField = document.getElementById('message');
        if (messageField) {
            messageField.addEventListener('input', this.updateCharCount.bind(this));
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) return;
        
        this.setLoading(true);
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.showSuccess();
            this.form.reset();
            this.updateCharCount();
        } catch (error) {
            this.showError('Failed to send message. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }
    
    validateForm() {
        let isValid = true;
        const fields = this.form.querySelectorAll('[required]');
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        let errorMessage = '';
        
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
            }
        } else if (field.name === 'message' && value.length > 500) {
            errorMessage = 'Message must be 500 characters or less';
        }
        
        this.showFieldError(field, errorMessage);
        return !errorMessage;
    }
    
    showFieldError(field, message) {
        const errorElement = document.getElementById(field.name + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.toggle('show', !!message);
        }
        field.style.borderColor = message ? 'var(--neon-pink)' : '';
    }
    
    clearError(field) {
        this.showFieldError(field, '');
    }
    
    updateCharCount() {
        const messageField = document.getElementById('message');
        if (messageField && this.charCount) {
            const count = messageField.value.length;
            this.charCount.textContent = count;
            this.charCount.style.color = count > 450 ? 'var(--neon-pink)' : 'var(--text-muted)';
        }
    }
    
    setLoading(loading) {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoader = this.submitBtn.querySelector('.btn-loader');
        
        btnText.style.display = loading ? 'none' : 'inline';
        btnLoader.style.display = loading ? 'inline' : 'none';
        this.submitBtn.disabled = loading;
    }
    
    showSuccess() {
        this.successMessage.style.display = 'block';
        this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => {
            this.successMessage.style.display = 'none';
        }, 5000);
    }
    
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error show';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--secondary-bg);
            border: 1px solid var(--neon-pink);
            border-radius: 8px;
            padding: 15px;
            z-index: 9999;
            max-width: 300px;
        `;
        
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }
}

// Utility function for smooth scrolling to form
function scrollToForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        form.querySelector('input').focus();
    }
}

// Enhanced Theme Manager
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.applyTheme();
    }
    
    toggle() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
        localStorage.setItem('theme', this.currentTheme);
    }
    
    applyTheme() {
        const root = document.documentElement;
        
        if (this.currentTheme === 'light') {
            root.style.setProperty('--primary-bg', '#f0f0f0');
            root.style.setProperty('--text-primary', '#000000');
            root.style.setProperty('--terminal-bg', '#ffffff');
            root.style.setProperty('--secondary-bg', '#e0e0e0');
        } else {
            root.style.setProperty('--primary-bg', '#0a0a0f');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--terminal-bg', '#0f0f23');
            root.style.setProperty('--secondary-bg', '#1a1a2e');
        }
    }
}

// Initialize modern components
const contactForm = new ContactFormHandler();
const themeManager = new ThemeManager();

// Update theme toggle function
function toggleTheme() {
    themeManager.toggle();
}
