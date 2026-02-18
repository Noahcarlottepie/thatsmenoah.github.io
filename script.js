// Smooth scrolling for navigation links
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

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Active section highlighting in navigation
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');
const navDots = document.querySelectorAll('.nav-dot-wrapper');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });

    // Update side navigation dots
    navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.dataset.section === current) {
            dot.classList.add('active');
        }
    });
});

// Side navigation click handling
navDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const sectionId = dot.dataset.section;
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animated counters for statistics
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateNumbers() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const current = parseInt(stat.innerText);
        const increment = target / 50; // Divide animation into 50 steps
        
        if (current < target) {
            stat.innerText = Math.ceil(current + increment);
            setTimeout(animateNumbers, 20);
        } else {
            stat.innerText = target;
        }
    });
}

// Trigger animation when stats section is in view
const statsSection = document.querySelector('.hero-stats');

window.addEventListener('scroll', () => {
    if (!animated && statsSection) {
        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            animateNumbers();
            animated = true;
        }
    }
});

// Form submission handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .fade-in-delay, .slide-in-left').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled * 0.001);
    }
});

// Dynamic year in footer
const yearElement = document.querySelector('.footer-bottom p:first-child');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = `© ${currentYear} Noah. All rights reserved.`;
}

// Birthday countdown (if close to Feb 21)
function updateBirthdayCountdown() {
    const today = new Date();
    const birthday = new Date(today.getFullYear(), 1, 21); // February 21 (month is 0-indexed)
    
    if (today > birthday) {
        birthday.setFullYear(birthday.getFullYear() + 1);
    }
    
    const diffTime = birthday - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const birthdayElements = document.querySelectorAll('.age-badge');
    if (diffDays <= 30) {
        birthdayElements.forEach(el => {
            el.innerHTML = `15 years old · Birthday in ${diffDays} days!`;
        });
    }
}

updateBirthdayCountdown();

// Add blur effect on scroll for header
window.addEventListener('scroll', () => {
    const header = document.querySelector('nav');
    if (window.scrollY > 50) {
        header.style.backdropFilter = 'blur(15px)';
        header.style.backgroundColor = 'rgba(8, 8, 8, 0.98)';
    } else {
        header.style.backdropFilter = 'blur(10px)';
        header.style.backgroundColor = 'rgba(8, 8, 8, 0.95)';
    }
});