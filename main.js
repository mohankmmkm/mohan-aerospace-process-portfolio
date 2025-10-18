let activeSectionId = 'home'; // Track the currently active section

document.addEventListener('DOMContentLoaded', () => {

    const sections = document.querySelectorAll('section');
    let currentSectionIndex = 0;
    let isScrolling = false;

    const scrollToSection = (index) => {
        if (index >= 0 && index < sections.length) {
            isScrolling = true;
            sections[index].scrollIntoView({ behavior: 'smooth' });
            currentSectionIndex = index;

            setTimeout(() => { 
                isScrolling = false;
            }, 800);
        }
    };

    document.addEventListener('wheel', (event) => {
        // Only apply scroll hijacking on larger screens
        if (window.innerWidth > 768) {
            if (isScrolling) {
                return;
            }
    
            if (event.deltaY > 0) {
                if (currentSectionIndex < sections.length - 1) {
                    scrollToSection(currentSectionIndex + 1);
                }
            } else {
                if (currentSectionIndex > 0) {
                    scrollToSection(currentSectionIndex - 1);
                }
            }
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const targetIndex = Array.from(sections).indexOf(targetSection);
                scrollToSection(targetIndex);
            }
        });
    });

    // --- Dynamic Year for Footer ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- Advanced Intersection Observer for Section Tracking & Animations ---
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update the active section ID
                activeSectionId = entry.target.id;
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of the viewport
        threshold: 0
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});