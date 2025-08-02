document.addEventListener("DOMContentLoaded", function() {
    // --- Element 1: Loader Page Logic ---
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    const counter = document.getElementById('counter');
    const statusBar = document.getElementById('loader-status-bar');
    const loaderTextLines = document.querySelectorAll('.loader-text-line');
    
    let count = 0;
    const interval = setInterval(() => {
        if (count < 100) {
            count++;
            counter.textContent = count;
            statusBar.style.width = `${count}%`;
            
            if (count > 50) {
                loaderTextLines.forEach(line => line.style.transform = 'translateY(-100%)');
            } else {
                loaderTextLines.forEach(line => line.style.transform = 'translateY(0)');
            }
        } else {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.pointerEvents = 'none';
                mainContent.style.opacity = '1';
                document.body.style.overflow = 'auto'; // Re-enable scrolling after loader hides
            }, 500);
        }
    }, 20);

    // --- Element 4: Navbar Logic ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Element 5: Page Transition Logic ---
    const navLinks = document.querySelectorAll('.nav-menu a');
    const transitionOverlay = document.querySelector('.page-transition');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            transitionOverlay.classList.add('active');
            
            setTimeout(() => {
                document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            }, 800);
            
            setTimeout(() => {
                transitionOverlay.classList.remove('active');
            }, 1000);
        });
    });

    // --- Custom Cursor with Ripple Effect ---
    const customCursor = document.querySelector('.custom-cursor');
    const cursorTrail = document.querySelector('.cursor-trail');

    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
        cursorTrail.style.left = `${e.clientX}px`;
        cursorTrail.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mousedown', (e) => {
        const ripple = document.createElement('span');
        ripple.classList.add('cursor-ripple');
        const x = e.clientX;
        const y = e.clientY;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        document.body.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
