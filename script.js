// script.js - Adds interactivity to the DomainsBlacklists website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic', // Smoother easing
        once: true,
        offset: 50 // Trigger animations a bit sooner
    });

    const navbar = document.querySelector('.navbar');
    const backToTopButton = document.querySelector('.back-to-top');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const body = document.body;

    // --- Navbar Scroll Effect ---
    function handleScroll() {
        // Navbar shrink
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case page loads scrolled

    // --- Back to Top Button Click ---
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return; // Ignore empty or # links

            const targetId = href.substring(1); // Remove #
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight; // Get current navbar height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Optionally close mobile menu if open
                closeMobileMenu();
            }
        });
    });

    // --- Theme Toggle Functionality ---
    function applyTheme(theme) {
        body.className = theme; // Set class directly
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme === 'dark-mode');
        // Update primary color RGB variable (needed for CSS rgba())
        const primaryColor = getComputedStyle(body).getPropertyValue('--primary-color').trim();
        body.style.setProperty('--primary-rgb', hexToRgb(primaryColor));
    }

    function updateThemeIcon(isDarkMode) {
        themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Helper to convert hex to RGB string for CSS variable
    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        // 3 digits
        if (hex.length == 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        }
        // 6 digits
        else if (hex.length == 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }
        return `${r}, ${g}, ${b}`;
    }


    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark-mode' : 'light-mode');
    applyTheme(initialTheme); // Apply initial theme

    // Theme toggle click handler
    themeToggleBtn.addEventListener('click', function() {
        const newTheme = body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode';
        applyTheme(newTheme);
    });

    // Listen for system theme changes
     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) { // Only change if user hasn't manually set a theme
             applyTheme(e.matches ? 'dark-mode' : 'light-mode');
        }
    });


    // --- Mobile Menu Behavior ---
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    function closeMobileMenu() {
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click(); // Simulate click to close
        }
    }

    // Close menu if clicking outside the navbar when it's open
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = navbar.contains(event.target);
        if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
            closeMobileMenu();
        }
    });


    // --- Tooltip Initialization (Bootstrap 5) ---
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // --- Remove JS-based hover effects (handled by CSS now) ---
    // Removed download button text change on hover
    // Removed feature item icon beat on hover

    // --- Add pulse animation to feature highlights (handled by AOS/CSS now) ---
    // document.querySelectorAll('.feature-highlight').forEach(highlight => {
    //     highlight.classList.add('slide-up'); // Or use AOS data attributes
    // });

    console.log("DomainsBlacklists UI enhancements loaded.");
});