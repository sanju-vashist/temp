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





document.addEventListener('DOMContentLoaded', () => {
    // First ensure each section has the correct ID
    const sections = {
        'about': document.querySelector('#about'),
        'services-grid': document.querySelector('#services-grid'),
        'project': document.querySelector('#project'),
        'experince': document.querySelector('#experince'),
        'technical-skills': document.querySelector('#technical-skills'),
        'get-in-touch': document.querySelector('.get-in-touch')
    };
    
    // Set IDs if missing
    Object.entries(sections).forEach(([id, element]) => {
        if (element && !element.id) {
            element.id = id;
        }
    });

    // Add click handlers to nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section from href
            const targetId = this.getAttribute('href').replace('#', '');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Scroll to section
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
// Main JavaScript code
const queryKnowledgeBase = async (userQuery, knowledgeBase) => {
    try {
        if (!config || !config.API_KEY) {
            throw new Error('API key not configured');
        }

        const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        
        const response = await fetch(`${API_ENDPOINT}?key=${config.API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Context: "${knowledgeBase}" 
                               Question: "${userQuery}"
                               Please provide a brief, 2-3 line response.`
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error querying knowledge base:', error);
        return 'Sorry, I encountered an error processing your request.';
    }
};

class VoiceAssistant {
    constructor() {
        this.micButton = document.getElementById('micButton');
        this.stopButton = document.getElementById('stopButton');
        this.transcriptDiv = document.getElementById('transcript');
        this.responseDiv = document.getElementById('response');
        this.overlay = document.getElementById('overlay');
        this.popup = document.getElementById('popup');
        this.isListening = false;
        this.recognition = null;
        this.synthesis = window.speechSynthesis;

        this.knowledgeBase = 
    "I am Sanju, a 2nd-year BTech Computer Engineering student at Maharishi Markandeshwar University (MMU), Mullana, Ambala. " +
    "I am a frontend web developer and a  app developer with strong skills in Flutter, Python, Firebase, Supabase, ReactNative, FastAPI,django and web development basics. " +
    "I often contribute to projects on GitHub and am passionate about creating innovative and unconventional solutions." +
    "\n\n" +
    "Skills: " +
    "1. Flutter Development - Building cross-platform apps with responsive designs and robust functionality. " +
    "2. Python - Backend scripting, APIs, and basic data analysis. " +
    "3. Firebase - Database integration, user authentication, and real-time data handling. " +
    "4. Web Development - Proficient in HTML, CSS, and JavaScript for designing dynamic websites. " +
    "5. GitHub - Regular contributions to repositories, version control, and collaboration." +
    "\n\n" +
    "Projects: " +
    "1. Saanjavni: A comprehensive medical information app with biometric registration, family medical history, emergency access, and monetization features. Created using Flutter and Firebase. " +
    "2. Lafda: An anonymous chatting app that allows users to interact in group chats and share thoughts freely. " +
    "2. Dowry Calculator: A fun app that calculates a hypothetical dowry amount based on user qualifications. " +
    "4. The Normal app: A simple app that steals your data and sends it to server without even knowing and its aim is to educate how easy is to steal your data and how chiness app may do it.created using react native and supbase "
    "\n\n" +
    "Achievements: " +
   
    "\n\n" +
    "I am highly motivated to explore diverse fields such as app development, data science, and artificial intelligence. " +
    "I enjoy coding, experimenting with new technologies, and bringing creative ideas to life."


        this.initializeSpeechRecognition();
        this.setupEventListeners();
    }

    initializeSpeechRecognition() {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const current = event.resultIndex;
                const transcript = event.results[current][0].transcript;
                this.transcriptDiv.textContent = `You said: ${transcript}`;

                if (event.results[current].isFinal) {
                    this.processQuery(transcript);
                }
            };

            this.recognition.onend = () => {
                this.stopListening();
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.responseDiv.textContent = 'Error: ' + event.error;
                this.stopListening();
            };
        } else {
            this.micButton.disabled = true;
            alert('Speech recognition is not supported in your browser.');
        }
    }

    setupEventListeners() {
        this.micButton.addEventListener('click', () => {
            if (this.isListening) {
                this.stopListening();
            } else {
                this.startListening();
            }
        });

        this.stopButton.addEventListener('click', () => {
            this.stopListening();
            this.hidePopup();
            this.synthesis.cancel();
        });

        this.overlay.addEventListener('click', () => {
            this.hidePopup();
        });
    }

    startListening() {
        if (this.recognition) {
            try {
                this.recognition.start();
                this.isListening = true;
                this.micButton.classList.add('listening');
                this.transcriptDiv.textContent = 'Listening...';
                this.showPopup();
            } catch (error) {
                console.error('Error starting recognition:', error);
            }
        }
    }

    stopListening() {
        if (this.recognition) {
            try {
                this.recognition.stop();
                this.isListening = false;
                this.micButton.classList.remove('listening');
            } catch (error) {
                console.error('Error stopping recognition:', error);
            }
        }
    }

    showPopup() {
        this.overlay.style.display = 'block';
        this.popup.style.display = 'block';
    }

    hidePopup() {
        this.overlay.style.display = 'none';
        this.popup.style.display = 'none';
    }

    speak(text) {
        if (!text) return;
        
        this.synthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Wait for voices to be loaded
        if (speechSynthesis.getVoices().length === 0) {
            speechSynthesis.addEventListener('voiceschanged', () => {
                const voices = speechSynthesis.getVoices();
                utterance.voice = voices.find(voice => voice.lang === 'en-US') || voices[0];
                this.synthesis.speak(utterance);
            });
        } else {
            const voices = speechSynthesis.getVoices();
            utterance.voice = voices.find(voice => voice.lang === 'en-US') || voices[0];
            this.synthesis.speak(utterance);
        }
    }

    async processQuery(query) {
        try {
            this.responseDiv.textContent = 'Processing...';
            const response = await queryKnowledgeBase(query, this.knowledgeBase);
            this.responseDiv.textContent = `Answer: ${response}`;
            this.speak(response);
        } catch (error) {
            console.error('Error processing query:', error);
            this.responseDiv.textContent = 'Sorry, there was an error processing your request.';
        }
    }
}

// Initialize the voice assistant when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VoiceAssistant();
});