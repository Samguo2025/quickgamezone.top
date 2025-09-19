// Interactive JavaScript for Stickman Parkour website
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .cta-button, .secondary-button');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Fullscreen functionality
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const gameFrame = document.querySelector('.game-iframe');
    
    if (fullscreenBtn && gameFrame) {
        fullscreenBtn.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                gameFrame.requestFullscreen().catch(err => {
                    console.log('Error attempting to enable fullscreen:', err);
                });
            } else {
                document.exitFullscreen();
            }
        });
    }

    // Reload game functionality
    const reloadBtn = document.getElementById('reloadBtn');
    if (reloadBtn && gameFrame) {
        reloadBtn.addEventListener('click', function() {
            gameFrame.src = gameFrame.src;
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.8)';
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.control-item, .feature');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Game controls keyboard hints
    document.addEventListener('keydown', function(e) {
        const gameSection = document.getElementById('game');
        const gameSectionRect = gameSection.getBoundingClientRect();
        const isInViewport = gameSectionRect.top < window.innerHeight && gameSectionRect.bottom > 0;
        
        if (isInViewport) {
            if (e.key === 'Escape' && document.fullscreenElement) {
                document.exitFullscreen();
            }
        }
    });

    // Dynamic year in footer
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
    }

    // Loading state for iframe
    if (gameFrame) {
        gameFrame.addEventListener('load', function() {
            // Add loading animation
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.transition = 'opacity 0.5s ease-in-out';
                this.style.opacity = '1';
            }, 100);
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Mobile menu toggle (if needed for responsive design)
    const createMobileMenu = function() {
        if (window.innerWidth <= 768) {
            const navContainer = document.querySelector('.nav-container');
            const navLinks = document.querySelector('.nav-links');
            
            if (!document.querySelector('.mobile-menu-toggle')) {
                const mobileToggle = document.createElement('button');
                mobileToggle.className = 'mobile-menu-toggle';
                mobileToggle.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 12h18M3 6h18M3 18h18"/>
                    </svg>
                `;
                
                mobileToggle.addEventListener('click', function() {
                    navLinks.classList.toggle('mobile-active');
                });
                
                navContainer.insertBefore(mobileToggle, navLinks);
            }
        }
    };

    // Initialize mobile menu
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - could be used for navigation
            console.log('Swipe left detected');
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - could be used for navigation
            console.log('Swipe right detected');
        }
    }

    // Performance optimization - lazy load images if any are added
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Error handling for iframe
    if (gameFrame) {
        gameFrame.addEventListener('error', function() {
            console.log('Game failed to load');
            // Could add fallback content here
        });
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Ensure proper focus management
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Console welcome message
    console.log('🎮 Welcome to Stickman Parkour!');
    console.log('🏃‍♂️ Use arrow keys to play');
    console.log('🎯 Press ESC to exit fullscreen');
});