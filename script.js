// ========================================
// NAVIGATION SCROLL EFFECT
// ========================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// CONFETTI ANIMATION
// ========================================
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#d4af37', '#8b4dbf', '#ff6b9d', '#4d9de0', '#f0d878'];
    const shapes = ['circle', 'square'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const left = Math.random() * 100;
        const animationDuration = 3 + Math.random() * 4;
        const delay = Math.random() * 3;
        const size = 8 + Math.random() * 8;
        
        confetti.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${left}%;
            top: -20px;
            opacity: ${0.6 + Math.random() * 0.4};
            animation: confettiFall ${animationDuration}s linear ${delay}s infinite;
            border-radius: ${shape === 'circle' ? '50%' : '0'};
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        confettiContainer.appendChild(confetti);
    }
}

// Add confetti animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize confetti on page load
window.addEventListener('load', createConfetti);

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// RESERVE PLOT FUNCTION - Redirects to Zoho Forms
// ========================================
function reservePlot(estateName) {
    // Zoho form URLs for each estate
    const zohoForms = {
        'JASPER': 'https://zfrmz.com/1NJB081pOUxpEoTL6ojs',
        'GARNET': 'https://zfrmz.com/Z9wcmnyYV10yzcAd4cMG',
        'SAPPHIRE': 'https://zfrmz.com/7VfiikCg9MpFuEYfFphD',
        'SARDIUS': 'https://zfrmz.com/bzwLwyVrOEfwnZoyc3F5'
    };
    
    // Redirect to the appropriate Zoho form
    if (zohoForms[estateName]) {
        window.open(zohoForms[estateName], '_blank');
    } else {
        // If estate not found, scroll to payment section
        const paymentSection = document.getElementById('payment-section');
        if (paymentSection) {
            paymentSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// ========================================
// FORM SUBMISSION (Removed - using Zoho forms instead)
// ========================================
// Form submission is now handled by Zoho forms
// This section is kept for potential future use

// Form submission functions removed - using Zoho forms instead
// Zoho forms handle submission and confirmation automatically

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all estate cards and benefit cards
window.addEventListener('load', function() {
    const animatedElements = document.querySelectorAll('.estate-card, .benefit-card, .step-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========================================
// COUNTER ANIMATION (for discount amounts)
// ========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = `₦${Math.floor(current)}M OFF`;
    }, 16);
}

// Animate promo badges when they come into view
const badgeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const badgeText = entry.target.textContent;
            const amount = parseInt(badgeText.replace(/[^0-9]/g, ''));
            if (amount) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target, amount);
            }
        }
    });
}, { threshold: 0.5 });

window.addEventListener('load', function() {
    document.querySelectorAll('.promo-badge').forEach(badge => {
        badgeObserver.observe(badge);
    });
});

// ========================================
// MOBILE MENU (if needed for future expansion)
// ========================================
// This can be expanded if you add more navigation items

// ========================================
// LAZY LOADING IMAGES (already handled by HTML loading="lazy")
// ========================================

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScroll = debounce(function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ========================================
// ESTATE CARD INTERACTIONS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const estateCards = document.querySelectorAll('.estate-card');
    
    estateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});

// ========================================
// FORM VALIDATION ENHANCEMENT
// ========================================
// Form validation removed - using Zoho forms instead
// Zoho forms handle their own validation

// ========================================
// PAGE LOAD ANIMATIONS
// ========================================
window.addEventListener('load', function() {
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
    
    // Log page load for analytics (replace with actual analytics)
    console.log('40th Birthday Promo Page Loaded');
});

// ========================================
// CURSOR TRAIL EFFECT (Optional - Premium Touch)
// ========================================
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', function(e) {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// ========================================
// ESTATE COMPARISON (Future Enhancement)
// ========================================
// This can be added later if needed to compare multiple estates

// ========================================
// CONSOLE MESSAGE (Brand Touch)
// ========================================
console.log('%c🎉 40th Birthday Promo! 🎉', 'font-size: 24px; font-weight: bold; color: #d4af37;');
console.log('%cOwn Premium Land at Massive Discounts', 'font-size: 16px; color: #0a1628;');
console.log('%cLimited Plots Available - Secure Yours Now!', 'font-size: 14px; color: #8b4dbf;');
