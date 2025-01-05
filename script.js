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
                backgroundColor: 'rgba(36, 36, 36, 0.9)'
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



// Add Three.js and necessary dependencies
document.addEventListener('DOMContentLoaded', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    // Set up renderer for full screen
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.zIndex = '1';
    renderer.domElement.style.pointerEvents = 'none';
    document.body.prepend(renderer.domElement);

    // Create enhanced Paper Plane with larger dimensions
    const createPaperPlane = () => {
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            // Main body - increased size
            0, 0, 0,      -0.8, 0, 1.2,    0, 0.1, 2.4,    // Left wing
            0, 0, 0,       0.8, 0, 1.2,    0, 0.1, 2.4,    // Right wing
            0, 0, 0,       0, 0.2, 1.2,    0, 0.1, 2.4,    // Top fold
            
            // Wing details
            -0.8, 0, 1.2, -0.4, 0.06, 1.6, 0, 0.1, 2.4,   // Left wing detail
            0.8, 0, 1.2,   0.4, 0.06, 1.6, 0, 0.1, 2.4,   // Right wing detail
            
            // Wing tips - more pronounced
            -0.8, 0, 1.2, -0.6, 0.1, 0.6, -0.4, 0, 0.8,   // Left tip
            0.8, 0, 1.2,   0.6, 0.1, 0.6,  0.4, 0, 0.8,   // Right tip
            
            // Enhanced tail section
            0, 0.1, 2.4,  -0.3, 0.16, 2.0, 0, 0.2, 1.8,   // Left tail
            0, 0.1, 2.4,   0.3, 0.16, 2.0, 0, 0.2, 1.8    // Right tail
        ]);

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals();

        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shininess: 90,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.95,
            flatShading: true
        });

        const plane = new THREE.Mesh(geometry, material);
        // Increased scale for larger appearance
        plane.scale.set(0.8, 0.8, 0.8);
        plane.rotation.x = Math.PI * 0.1;
        return plane;
    };

    const paperPlane = createPaperPlane();
    scene.add(paperPlane);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
    directionalLight.position.set(5, 5, 5);
    const backLight = new THREE.DirectionalLight(0xFFFFFF, 0.4);
    backLight.position.set(-5, -5, -5);
    scene.add(ambientLight, directionalLight, backLight);

    camera.position.z = 5; // Adjusted camera distance

    // Animation Variables
    let time = 0;
    let scrollPercent = 0;
    let mouseX = 0;
    let mouseY = 0;
    const moveRange = 4; // Increased movement range

    // Enhanced trail effect
    const addTrail = () => {
        const trailGeometry = new THREE.BufferGeometry();
        const trailMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.02,
            transparent: true,
            opacity: 0.2
        });

        const positions = new Float32Array(30 * 3); // Increased number of trail points
        trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const trail = new THREE.Points(trailGeometry, trailMaterial);
        scene.add(trail);

        let trailPoints = [];

        setInterval(() => {
            trailPoints.unshift({
                x: paperPlane.position.x,
                y: paperPlane.position.y,
                z: paperPlane.position.z
            });

            if (trailPoints.length > 30) {
                trailPoints.pop();
            }

            const positions = trail.geometry.attributes.position.array;

            for (let i = 0; i < trailPoints.length; i++) {
                positions[i * 3] = trailPoints[i].x;
                positions[i * 3 + 1] = trailPoints[i].y;
                positions[i * 3 + 2] = trailPoints[i].z;
            }

            trail.geometry.attributes.position.needsUpdate = true;
        }, 50);
    };

    addTrail();

    // Event Listeners
    window.addEventListener('scroll', () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        scrollPercent = window.scrollY / maxScroll;
    });

    window.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Enhanced animation loop with more complex movement
    const animate = () => {
        requestAnimationFrame(animate);
        time += 0.005;

        // Complex hovering movement
        const hoverX = Math.sin(time) * moveRange;
        const hoverY = Math.cos(time * 0.5) * moveRange * 0.5;
        const targetX = mouseX * moveRange + hoverX * 0.3;
        const targetY = mouseY * moveRange + hoverY * 0.3;

        // Smooth position interpolation
        paperPlane.position.x += (targetX - paperPlane.position.x) * 0.03;
        paperPlane.position.y += (targetY - paperPlane.position.y) * 0.03;
        paperPlane.position.z = -1 + Math.sin(time * 0.5) * 0.5;

        // Dynamic rotation based on movement
        const targetRotationX = Math.PI * 0.1 + mouseY * 0.2 + Math.sin(time * 0.5) * 0.1;
        const targetRotationZ = -mouseX * 0.3 + Math.cos(time) * 0.1;
        const targetRotationY = Math.sin(time * 0.3) * 0.1;

        paperPlane.rotation.x += (targetRotationX - paperPlane.rotation.x) * 0.1;
        paperPlane.rotation.z += (targetRotationZ - paperPlane.rotation.z) * 0.1;
        paperPlane.rotation.y += (targetRotationY - paperPlane.rotation.y) * 0.1;

        renderer.render(scene, camera);
    };

    animate();
});