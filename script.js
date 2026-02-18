// Language switching functionality
let currentLang = 'en';

const langSwitcher = document.getElementById('langSwitcher');
const langEn = document.querySelector('.lang-en');
const langRu = document.querySelector('.lang-ru');

// Function to update all text elements based on selected language
function updateLanguage(lang) {
    currentLang = lang;
    
    // Update all elements with data-en and data-ru attributes
    document.querySelectorAll('[data-en][data-ru]').forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = element.getAttribute(`data-${lang}`);
        } else {
            element.textContent = element.getAttribute(`data-${lang}`);
        }
    });

    // Update active state of language switcher buttons
    if (lang === 'en') {
        langEn.classList.add('active');
        langRu.classList.remove('active');
        document.documentElement.lang = 'en';
    } else {
        langRu.classList.add('active');
        langEn.classList.remove('active');
        document.documentElement.lang = 'ru';
    }
}

// Add click event listeners to language switcher
if (langSwitcher) {
    langEn.addEventListener('click', () => updateLanguage('en'));
    langRu.addEventListener('click', () => updateLanguage('ru'));
}

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
        
        // Show success message in current language
        const message = currentLang === 'en' 
            ? 'Thank you for your message! I will get back to you soon.'
            : 'Спасибо за сообщение! Я свяжусь с вами скоро.';
        
        alert(message);
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
            if (currentLang === 'en') {
                el.innerHTML = `15 years old · Birthday in ${diffDays} days!`;
            } else {
                el.innerHTML = `15 лет · День рождения через ${diffDays} ${getDaysWord(diffDays)}!`;
            }
        });
    }
}

function getDaysWord(days) {
    if (days % 10 === 1 && days % 100 !== 11) return 'день';
    if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) return 'дня';
    return 'дней';
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

// Initialize with English
updateLanguage('en');