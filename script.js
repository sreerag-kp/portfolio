// Custom Cursor
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');
const interactables = document.querySelectorAll('a, button, input, textarea');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows directly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay for smooth effect
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: 'forwards' });
});

interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('cursor-hover');
    });

    el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('cursor-hover');
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-links a');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');

    if (mobileMenu.classList.contains('active')) {
        hamburger.innerHTML = '<i class="ri-close-line"></i>';
    } else {
        hamburger.innerHTML = '<i class="ri-menu-3-line"></i>';
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="ri-menu-3-line"></i>';
    });
});

// Sticky Navbar
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
// Trigger once on load
reveal();

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;

        // Change button state to sending
        btn.innerHTML = '<span>Sending...</span> <i class="ri-loader-4-line"></i>';
        btn.style.opacity = '0.8';
        btn.style.pointerEvents = 'none';

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch("https://formsubmit.co/ajax/sreeragkaruthodi@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    _subject: subject,
                    message: message
                })
            });

            if (response.ok) {
                btn.innerHTML = '<span>Sent Successfully!</span> <i class="ri-check-line"></i>';
                btn.style.background = '#27c93f';
                contactForm.reset();
            } else {
                throw new Error("Form submission failed");
            }
        } catch (error) {
            btn.innerHTML = '<span>Failed to send!</span> <i class="ri-error-warning-line"></i>';
            btn.style.background = '#ff4757';
        }

        // Reset button state
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'all';
        }, 4000);
    });
}
