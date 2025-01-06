// Theme toggling functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const showContactsBtn = document.querySelector('.show-contacts');
    const contactDetails = document.querySelector('.contact-details');

    if (showContactsBtn && contactDetails) {
        showContactsBtn.addEventListener('click', () => {
            contactDetails.classList.toggle('visible');
            showContactsBtn.textContent = contactDetails.classList.contains('visible') ?
                'Hide Contacts' : 'Show Contacts';
        });
    }
});


// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // Animate sidebar profile card on load
    gsap.from('.profile-card', {
        duration: 1,
        x: -100,
        opacity: 0,
        ease: 'power3.out'
    });

    // Animate navigation items
    gsap.from('.nav-links li', {
        duration: 0.5,
        y: -20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Animate section headings
    gsap.utils.toArray('section h2').forEach(heading => {
        gsap.from(heading, {
            scrollTrigger: {
                trigger: heading,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    // Animate service cards
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    // Animate portfolio items with stagger
    gsap.from('.portfolio-item', {
        scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Animate timeline items
    gsap.utils.toArray('.timeline-item').forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: -50,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    // Add hover animations to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                duration: 0.3,
                y: -10,
                scale: 1.02,
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                duration: 0.3,
                y: 0,
                scale: 1,
                boxShadow: 'none'
            });
        });
    });

    // Add hover animations to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1.03,
                backgroundColor: 'rgba(145, 136, 136, 0.9)'
            });
            gsap.to(card.querySelector('.gold-icon'), {
                duration: 0.3,
                scale: 1.2,
                rotation: 360
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1,
                backgroundColor: 'var(--card-bg)'
            });
            gsap.to(card.querySelector('.gold-icon'), {
                duration: 0.3,
                scale: 1,
                rotation: 0
            });
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            gsap.to(window, {
                duration: 1,
                scrollTo: target,
                ease: 'power2.inOut'
            });
        });
    });

    // Parallax effect for service icons
    gsap.utils.toArray('.service-icon').forEach(icon => {
        gsap.to(icon, {
            scrollTrigger: {
                trigger: icon,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: 50,
            rotation: 15
        });
    });
});

