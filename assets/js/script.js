// ===== PORTFOLIO JAVASCRIPT =====

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeTheme();
    initializeNavigation();
    initializeTypingEffect();
    initializeScrollEffects();
    initializeContactForm();
    initializeAnimations();
});

// ===== THEME TOGGLE FUNCTIONALITY =====
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Get saved theme or default to light
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    // Check system preference if no saved theme
    if (!localStorage.getItem('theme')) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = 'dark';
        }
    }
    
    // Apply initial theme
    applyTheme(currentTheme);
    
    // Theme toggle click event
    themeToggle.addEventListener('click', function() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });
    
    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        
        // Update theme icon
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
        
        // Update meta theme color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name=theme-color]') || 
                               document.createElement('meta');
        if (!document.querySelector('meta[name=theme-color]')) {
            metaThemeColor.setAttribute('name', 'theme-color');
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a1a1a' : '#ffffff');
    }
}

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const navHamburger = document.getElementById('nav-hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navHamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navHamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navHamburger.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Active navigation based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== TYPING EFFECT FUNCTIONALITY =====
function initializeTypingEffect() {
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    const textArray = [
        'Cloud Engineer',
        'DevOps Specialist', 
        'Site Reliability Engineer',
        'Software Developer',
    ];
    
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            }
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            }
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    // Start the typing effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll(
        '.hero-content, .about-content, .timeline-item, .project-card, .contact-item, .skill-category'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Progress bar for page scroll
    function updateScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (!scrollProgress) {
            // Create scroll progress bar
            const progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
                z-index: 9999;
                transition: width 0.3s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
}

// ===== CONTACT FORM FUNCTIONALITY =====
function initializeContactForm() {
    // Initialize EmailJS
    emailjs.init("zqKiYhi1Kh2I4dYYy"); // Replace with your EmailJS public key
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Basic validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(formData.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs.send("service_p1imo8l", "template_jti8hm8", {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_name: "Atharv Kadam",
                to_email: "atharvkadam498@gmail.com"
            })
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            }, function(error) {
                console.log('FAILED...', error);
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                showNotification('Failed to send message. Please try again or contact me directly.', 'error');
            });
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Add CSS for animations
    const animationStyles = `
        <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .hero-content,
        .about-content,
        .timeline-item,
        .project-card,
        .contact-item,
        .skill-category {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .project-card {
            transition-delay: 0.1s;
        }
        
        .project-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .project-card:nth-child(3) {
            transition-delay: 0.3s;
        }
        
        .skill-category:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .skill-category:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .cursor.typing {
            animation: none;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', animationStyles);
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add optimized scroll listener
window.addEventListener('scroll', throttle(function() {
    // Your scroll-based functions here
}, 16)); // ~60fps

// ===== EASTER EGG =====
// Konami code easter egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konamiSequence.toString()) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        
        const easterEggStyle = `
            <style>
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', easterEggStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 4000);
        
        konamiCode = [];
    }
});

// ===== PERFORMANCE MONITORING =====
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page load time: ${perfData.loadEventEnd - perfData.fetchStart}ms`);
        }, 0);
    });
}