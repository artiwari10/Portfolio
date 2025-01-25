// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        if (targetElement) {
            const targetPosition = targetElement.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        }
    });
});

// Mobile navigation toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Typing effect for the hero section
const text = document.querySelector('.typing-text');
const phrases = ['Web Developer', 'Competitive Programmer'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        text.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        text.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 200);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 200);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// Start the typing effect
type();

// Initialize EmailJS
(function() {
    // Replace with your EmailJS public key
    emailjs.init("YOUR_PUBLIC_KEY");
})();

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    let lastSubmissionTime = 0;
    const SUBMISSION_COOLDOWN = 60000;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const now = Date.now();
        if (now - lastSubmissionTime < SUBMISSION_COOLDOWN) {
            showNotification('Please wait a moment before sending another message.', 'error');
            return;
        }
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.classList.add('loading');
        
        const formData = {
            from_name: document.getElementById('name').value.trim(),
            reply_to: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim(),
            to_name: "Anmol Ratan Tiwari",
        };

        if (!isValidEmail(formData.reply_to)) {
            showNotification('Please enter a valid email address.', 'error');
            submitBtn.classList.remove('loading');
            return;
        }

        try {
            const response = await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData);

            if (response.status === 200) {
                showNotification('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
                lastSubmissionTime = now;
            } else {
                showNotification('Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            showNotification('An error occurred. Please try again later.', 'error');
            console.error('Error:', error);
        } finally {
            submitBtn.classList.remove('loading');
        }
    });

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});

// Enhanced scroll progress bar
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    
    // Add easing to the progress bar
    requestAnimationFrame(() => {
        scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
        scrollProgress.style.transition = 'transform 0.2s ease-out';
    });
});

// Modified section visibility animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Simplified section observation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '1'; // Ensure sections are visible by default
    observer.observe(section);
});

// Add smooth scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Prevent scroll jank
let isScrolling;
window.addEventListener('scroll', () => {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        window.scrollTo({
            top: window.scrollY,
            behavior: 'smooth'
        });
    }, 66);
}, false);
