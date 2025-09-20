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
    
    
    // Scroll Animations
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-scale, .fade-in');
        const separatorLines = document.querySelectorAll('.separator-line');
        const separatorAccents = document.querySelectorAll('.separator-accent');
        
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
        
        // Separator animation observer
        const separatorObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const separatorContainer = entry.target;
                    const line = separatorContainer.querySelector('.separator-line');
                    const accent = separatorContainer.querySelector('.separator-accent');
                    
                    if (line) line.classList.add('animate');
                    if (accent) accent.classList.add('animate');
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
        
        // Observe separator containers
        document.querySelectorAll('.section-separator').forEach(separator => {
            separatorObserver.observe(separator);
        });
    }
    
    // AmCharts Interactive Map Functionality
    function handleInteractiveMap() {
        // Check if AmCharts is available
        if (typeof AmCharts === 'undefined') {
            console.error('AmCharts library not loaded');
            return;
        }
        
        const mapContainer = document.querySelector('.global-map-container');
        if (!mapContainer) return;
        
        const panels = document.querySelectorAll('.office-panel');
        const panelContainer = document.querySelector('.office-info-panels');
        let activePanel = null;
        let map;
        
        
        // Show panels with animation
        function showPanels() {
            if (panelContainer && !panelContainer.classList.contains('show')) {
                panelContainer.classList.add('show');
            }
        }
        
        // Handle panel interactions
        function activatePanel(officeTitle) {
            // Remove active state from all panels
            panels.forEach(panel => panel.classList.remove('active'));
            
            // Find and activate corresponding panel
            const panelMap = {
                'PARIS': 'paris-panel',
                'GENEVA': 'geneva-panel', 
                'DUBAI': 'dubai-panel',
                'RIYADH': 'riyadh-panel'
            };
            
            const panelId = panelMap[officeTitle.toUpperCase()];
            const panel = document.getElementById(panelId);
            
            if (panel) {
                panel.classList.add('active');
                activePanel = panel;
                
                // Scroll to panel on mobile
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        panel.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 300);
                }
            }
        }
        
        // Create AmCharts map
        map = AmCharts.makeChart("chartdiv", {
            "type": "map",
            "theme": "light",
            "projection": "miller",
            "showBalloon": false,
            
            "dataProvider": {
                "map": "worldLow",
                
                "areas": [{
                    "id": "FR", // France - Paris
                    "color": "rgba(231,231,231,0.4)",
                    "alpha": 1,
                    "outlineColor": "rgba(231,231,231,0.7)",
                    "rollOverColor": "rgba(231,231,231,0.55)",
                    "rollOverOutlineColor": "rgba(231,231,231,0.9)"
                }, {
                    "id": "CH", // Switzerland - Geneva
                    "color": "rgba(231,231,231,0.4)",
                    "alpha": 1,
                    "outlineColor": "rgba(231,231,231,0.7)",
                    "rollOverColor": "rgba(231,231,231,0.55)",
                    "rollOverOutlineColor": "rgba(231,231,231,0.9)"
                }, {
                    "id": "AE", // UAE - Dubai
                    "color": "rgba(231,231,231,0.4)",
                    "alpha": 1,
                    "outlineColor": "rgba(231,231,231,0.7)",
                    "rollOverColor": "rgba(231,231,231,0.55)",
                    "rollOverOutlineColor": "rgba(231,231,231,0.9)"
                }, {
                    "id": "SA", // Saudi Arabia - Riyadh
                    "color": "rgba(231,231,231,0.4)",
                    "alpha": 1,
                    "outlineColor": "rgba(231,231,231,0.7)",
                    "rollOverColor": "rgba(231,231,231,0.55)",
                    "rollOverOutlineColor": "rgba(231,231,231,0.9)"
                }]
            },
            
            "areasSettings": {
                "unlistedAreasColor": "rgba(231,231,231,0.005)",
                "unlistedAreasAlpha": 0.2,
                "outlineColor": "rgba(231,231,231,0.02)",
                "outlineAlpha": 0.15,
                "rollOverColor": "rgba(231,231,231,0.01)",
                "rollOverOutlineColor": "rgba(231,231,231,0.03)"
            },
            
            "zoomControl": {
                "panControlEnabled": false,
                "zoomControlEnabled": false
            },
            
            "mouseWheelZoomEnabled": false,
            "dragMap": false,
            "backgroundZoomsToTop": false,
            
            "export": {
                "enabled": false
            },
            
            "listeners": [{
                "event": "clickMapObject",
                "method": function(e) {
                    if (e.mapObject.id) {
                        showPanels();
                        // Map country codes to office names
                        const countryOfficeMap = {
                            'FR': 'PARIS',
                            'CH': 'GENEVA', 
                            'AE': 'DUBAI',
                            'SA': 'RIYADH'
                        };
                        const officeName = countryOfficeMap[e.mapObject.id];
                        if (officeName) {
                            activatePanel(officeName);
                        }
                    }
                }
            }, {
                "event": "rollOverMapObject", 
                "method": function(e) {
                    if (e.mapObject.id && ['FR', 'CH', 'AE', 'SA'].includes(e.mapObject.id)) {
                        showPanels();
                    }
                }
            }]
        });
        
        // Force remove any remaining AmCharts UI elements after map loads
        setTimeout(() => {
            const chartDiv = document.getElementById('chartdiv');
            if (chartDiv) {
                // Remove any links or UI elements
                const links = chartDiv.querySelectorAll('a, [href], [style*="cursor: pointer"]');
                links.forEach(link => link.remove());
                
                // Remove export menu elements
                const exportElements = document.querySelectorAll('.amcharts-export-menu, .amcharts-export-menu-top-right');
                exportElements.forEach(el => el.remove());
                
                // Remove any positioned divs that might be UI elements
                const positionedDivs = chartDiv.querySelectorAll('div[style*="position: absolute"]');
                positionedDivs.forEach(div => {
                    // Keep only the map-related divs, remove UI elements
                    if (!div.className.includes('amcharts-map-') || 
                        div.innerHTML.includes('amcharts') || 
                        div.innerHTML.includes('export') || 
                        div.style.cursor === 'pointer' ||
                        div.style.borderRadius ||
                        div.style.backgroundColor ||
                        div.offsetWidth <= 30 ||
                        div.offsetHeight <= 30) {
                        div.remove();
                    }
                });
                
                // Remove small circular or button-like elements
                const smallElements = chartDiv.querySelectorAll('div');
                smallElements.forEach(div => {
                    const style = window.getComputedStyle(div);
                    if ((div.offsetWidth <= 30 && div.offsetHeight <= 30) ||
                        style.borderRadius === '50%' ||
                        style.cursor === 'pointer') {
                        div.remove();
                    }
                });
            }
        }, 1500);
        
        // Additional cleanup after longer delay
        setTimeout(() => {
            const chartDiv = document.getElementById('chartdiv');
            if (chartDiv) {
                // Remove all circles and white elements
                const circles = chartDiv.querySelectorAll('circle, svg circle');
                circles.forEach(circle => circle.remove());
                
                const allDivs = chartDiv.querySelectorAll('div');
                allDivs.forEach(div => {
                    const style = window.getComputedStyle(div);
                    // Remove any remaining small UI elements or white backgrounds
                    if ((div.offsetWidth <= 25 && div.offsetHeight <= 25) ||
                        div.style.borderRadius === '50%' ||
                        style.borderRadius === '50%' ||
                        style.backgroundColor === 'rgb(255, 255, 255)' ||
                        style.backgroundColor === 'white' ||
                        style.backgroundColor === '#ffffff' ||
                        style.backgroundColor === '#fff' ||
                        (div.innerHTML === '' && div.offsetWidth <= 50)) {
                        div.remove();
                    }
                });
                
                // Remove any SVG elements that might be UI
                const svgs = chartDiv.querySelectorAll('svg');
                svgs.forEach(svg => {
                    const circles = svg.querySelectorAll('circle');
                    circles.forEach(circle => circle.remove());
                });
            }
        }, 3000);
        
        // Continuous monitoring to remove any dynamically created UI elements
        const cleanupInterval = setInterval(() => {
            const chartDiv = document.getElementById('chartdiv');
            if (chartDiv) {
                // Remove circles
                const circles = chartDiv.querySelectorAll('circle');
                circles.forEach(circle => circle.remove());
                
                // Remove small white elements
                const smallElements = chartDiv.querySelectorAll('div');
                smallElements.forEach(div => {
                    const style = window.getComputedStyle(div);
                    if ((div.offsetWidth <= 30 && div.offsetHeight <= 30) ||
                        style.borderRadius === '50%' ||
                        style.backgroundColor === 'rgb(255, 255, 255)' ||
                        style.cursor === 'pointer') {
                        div.remove();
                    }
                });
            }
        }, 2000); // Check every 2 seconds
        
        // Stop monitoring after 30 seconds
        setTimeout(() => {
            clearInterval(cleanupInterval);
        }, 30000);
        
        // Panel click handlers
        panels.forEach(panel => {
            panel.addEventListener('click', function() {
                panels.forEach(p => p.classList.remove('active'));
                panel.classList.add('active');
                activePanel = panel;
                showPanels();
            });
        });
        
        // Auto-show panels when map comes into view
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(showPanels, 1000);
                }
            });
        }, {
            threshold: 0.3
        });
        
        mapObserver.observe(mapContainer);
        
        // Email click handlers
        document.querySelectorAll('.panel-details .email').forEach(email => {
            email.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = `mailto:${this.textContent}`;
            });
            email.style.cursor = 'pointer';
        });
        
        // Phone click handlers for mobile
        if ('ontouchstart' in window) {
            document.querySelectorAll('.panel-details .phone').forEach(phone => {
                phone.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = `tel:${this.textContent}`;
                });
                phone.style.cursor = 'pointer';
            });
        }
    }
    
    // Smooth Scrolling for Navigation Links
    function handleSmoothScrolling() {
        // Handle all anchor links (both navigation and footer)
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Calculate offset for fixed navigation
                    const navHeight = 80; // Height of fixed navigation
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Handle external links (open in new tab)
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            link.addEventListener('click', function(e) {
                // Only open in new tab if it's not the main website link in nav
                if (!this.classList.contains('main-website')) {
                    e.preventDefault();
                    window.open(this.href, '_blank', 'noopener,noreferrer');
                }
            });
        });
        
        // Handle mailto and tel links
        document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach(link => {
            link.addEventListener('click', function(e) {
                // Let the default behavior handle mailto and tel links
                // This ensures they work properly on all devices
            });
        });
        
        // Handle footer links specifically
        document.querySelectorAll('.footer-link').forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('Footer link clicked:', this.textContent, this.href);
                
                const href = this.getAttribute('href');
                
                if (href.startsWith('#')) {
                    // Internal anchor link
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    console.log('Looking for target element with ID:', targetId);
                    console.log('Found target element:', targetElement);
                    
                    if (targetElement) {
                        const navHeight = 80;
                        const targetPosition = targetElement.offsetTop - navHeight;
                        
                        console.log('Scrolling to position:', targetPosition);
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        console.error('Target element not found for ID:', targetId);
                    }
                } else if (href.startsWith('http')) {
                    // External link
                    e.preventDefault();
                    console.log('Opening external link:', href);
                    window.open(href, '_blank', 'noopener,noreferrer');
                } else if (href.startsWith('mailto:') || href.startsWith('tel:')) {
                    // Let default behavior handle mailto and tel
                    console.log('Handling contact link:', href);
                    // No preventDefault needed
                }
            });
        });
    }
    
    // Navigation Active State
    function handleNavigationActiveState() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        const sections = document.querySelectorAll('section[id], div[id]');
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const navHeight = 80;
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Debug function to check if links are working
    function debugLinks() {
        console.log('=== LINK DEBUG INFO ===');
        
        // Check internal links
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        console.log(`Found ${internalLinks.length} internal links:`, internalLinks);
        
        // Check external links
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        console.log(`Found ${externalLinks.length} external links:`, externalLinks);
        
        // Check footer links
        const footerLinks = document.querySelectorAll('.footer-link');
        console.log(`Found ${footerLinks.length} footer links:`, footerLinks);
        
        // Check sections
        const sections = document.querySelectorAll('[id]');
        console.log(`Found ${sections.length} sections with IDs:`, sections);
        
        console.log('=== END DEBUG INFO ===');
    }
    
    // Initialize functions
    handleSectionTitles();
    handleScrollAnimations();
    handleSmoothScrolling();
    handleNavigationActiveState();
    // handleInteractiveMap(); // Commented out since we removed the map
    
    // Run debug function
    setTimeout(debugLinks, 1000);
    
    // Initialize WhatsApp button functionality
    initializeWhatsAppButton();
    
    // Initialize mobile navigation
    initializeMobileNavigation();
    
    // AI Citation Tracking
    trackAICitations();
    
    // Footer accordion removed - all sections always expanded
});

// WhatsApp Button Functionality
function initializeWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-link');
    
    if (whatsappButton) {
        // Add click tracking
        whatsappButton.addEventListener('click', function(e) {
            // Track WhatsApp clicks for analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'contact',
                    'event_label': 'floating_button',
                    'value': 1
                });
            }
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log('WhatsApp button clicked - opening chat with +33647761123');
        });
        
        // Add hover effects
        whatsappButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        whatsappButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Show button after page load with animation
        setTimeout(() => {
            whatsappButton.style.opacity = '0';
            whatsappButton.style.transform = 'translateY(20px)';
            whatsappButton.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                whatsappButton.style.opacity = '1';
                whatsappButton.style.transform = 'translateY(0)';
            }, 100);
        }, 1000);
        
        console.log('WhatsApp button initialized successfully');
    }
}

// Mobile Navigation Functionality
function initializeMobileNavigation() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (hamburgerMenu && mobileNavOverlay) {
        // Toggle mobile menu
        hamburgerMenu.addEventListener('click', function() {
            const isOpen = mobileNavOverlay.classList.contains('active');
            
            if (isOpen) {
                // Close menu
                mobileNavOverlay.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            } else {
                // Open menu
                mobileNavOverlay.classList.add('active');
                hamburgerMenu.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
        
        // Close mobile menu
        function closeMobileMenu() {
            mobileNavOverlay.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
        
        // Close button
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', closeMobileMenu);
        }
        
        // Close on overlay click
        mobileNavOverlay.addEventListener('click', function(e) {
            if (e.target === mobileNavOverlay) {
                closeMobileMenu();
            }
        });
        
        // Close on link click
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        console.log('Mobile navigation initialized successfully');
    }
}

// AI Citation Tracking Functionality
function trackAICitations() {
    const aiUserAgents = [
        'GPTBot', 'ChatGPT', 'Claude-Web', 
        'PerplexityBot', 'CCBot', 'Bingbot'
    ];
    
    const userAgent = navigator.userAgent || '';
    const isAI = aiUserAgents.some(bot => userAgent.includes(bot));
    
    // Also check for headless browsers (often used by AI)
    const isHeadless = /HeadlessChrome/.test(userAgent);
    
    if (isAI || isHeadless) {
        // Log AI access if gtag is available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'ai_crawl', {
                'event_category': 'AIO',
                'event_label': userAgent,
                'value': 1
            });
        }
        
        // Log to console for debugging
        console.log('AI Crawler Detected:', userAgent);
    }
}

// Footer Accordion Functionality - REMOVED
// All footer sections are now always expanded on all devices