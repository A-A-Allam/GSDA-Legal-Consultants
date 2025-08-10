// Ultra-Minimalist Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Dynamic Section Title Management
    function handleSectionTitles() {
        const sections = [
            { element: document.querySelector('.content'), title: 'PORTFOLIO' },
            { element: document.querySelector('.about-section'), title: 'ABOUT' },
            { element: document.querySelector('.services-section'), title: 'SERVICES' },
            { element: document.querySelector('.team-section'), title: 'TEAM' },
            { element: document.querySelector('.contact-section'), title: 'CONTACT' }
        ];
        
        const titleElement = document.querySelector('.section-title');
        if (!titleElement) return;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            
            let currentSection = sections[0]; // Default to PORTFOLIO
            
            // Find which section is currently in view
            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                if (section.element) {
                    const rect = section.element.getBoundingClientRect();
                    const sectionTop = scrollTop + rect.top;
                    const sectionBottom = sectionTop + rect.height;
                    
                    // Check if section is in viewport (with some offset)
                    if (scrollTop >= sectionTop - windowHeight * 0.3 && scrollTop < sectionBottom - windowHeight * 0.3) {
                        currentSection = section;
                        break;
                    }
                }
            }
            
            // Update title if it's different
            if (titleElement.textContent !== currentSection.title) {
                titleElement.textContent = currentSection.title;
            }
        });
    }
    
    // Scroll Indicator Management
    function handleScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        const contactSection = document.querySelector('.contact-section');
        
        if (!scrollIndicator || !contactSection) return;
        
        window.addEventListener('scroll', function() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Calculate if we're near the bottom of the page (within 100px)
            const isNearBottom = scrollTop + windowHeight >= documentHeight - 100;
            
            // Hide scroll indicator when near the bottom of the last section
            if (isNearBottom) {
                scrollIndicator.classList.add('hidden');
            } else {
                scrollIndicator.classList.remove('hidden');
            }
        });
    }
    
    // Scroll Animations
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-scale, .fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2, // Trigger when 20% of element is visible
            rootMargin: '0px 0px -50px 0px' // Start animation 50px before element enters viewport
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Initialize functions
    handleSectionTitles();
    handleScrollIndicator();
    handleScrollAnimations();
    
});