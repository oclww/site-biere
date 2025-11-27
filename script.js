// ===================================
// VÉRIFICATION QUE LE DOM EST CHARGÉ
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Site Le Hibou Blond chargé avec succès !');

    // Ajouter une classe au body pour indiquer que le JS est chargé
    document.body.classList.add('js-loaded');
});

// ===================================
// CURSOR PERSONNALISÉ MINIMALISTE
// ===================================
const cursor = document.querySelector('.cursor');

if (cursor) {
    let mouseX = 0;
    let mouseY = 0;

    // Suivre la position de la souris
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Mouvement direct (sans délai)
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Effet sur les liens et boutons
    const interactiveElements = document.querySelectorAll('a, button, .biere-card, .engagement-card, .filter-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            cursor.style.opacity = '1';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursor.style.opacity = '0.6';
        });
    });
}

// ===================================
// LOADER - DISPARAIT RAPIDEMENT
// ===================================
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800); // Réduit à 800ms au lieu de 2000ms
    }
});

// Failsafe : si le loader est encore là après 3 secondes, le retirer
setTimeout(() => {
    const loader = document.querySelector('.loader');
    if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        console.log('Loader retiré par failsafe');
    }
}, 3000);

// ===================================
// NAVIGATION
// ===================================
const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Menu burger
if (burger && navMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (burger && navMenu) {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// PARTICULES DE FOND
// ===================================
function createParticles() {
    const particles = document.getElementById('particles');
    if (!particles) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = '#d4af37';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5;

        const duration = Math.random() * 10 + 10;
        const tx = Math.random() * 100 - 50;
        const ty = Math.random() * 100 - 50;

        particle.style.animation = `particleFloat-${i} ${duration}s linear infinite`;

        const keyframes = `
            @keyframes particleFloat-${i} {
                0% { transform: translate(0, 0); }
                50% { transform: translate(${tx}px, ${ty}px); }
                100% { transform: translate(0, 0); }
            }
        `;

        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);

        particles.appendChild(particle);
    }
}

createParticles();

// ===================================
// ANIMATION DES COMPTEURS
// ===================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observer pour déclencher les compteurs
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const target = parseInt(statNumber.dataset.target);
                animateCounter(statNumber, target);
                statObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// ===================================
// FILTRES DES BIÈRES
// ===================================
const filterButtons = document.querySelectorAll('.filter-btn');
const biereCards = document.querySelectorAll('.biere-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;

        // Filtrer les cartes
        biereCards.forEach((card, index) => {
            const category = card.dataset.category;

            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1) translateY(0)';
                }, index * 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8) translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===================================
// ANIMATIONS AU SCROLL (AOS Alternative)
// ===================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observer tous les éléments avec data-aos
document.querySelectorAll('[data-aos]').forEach(el => {
    scrollObserver.observe(el);
});

// ===================================
// PARALLAX EFFECT
// ===================================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;

            // Hero shapes parallax
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.1;
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });

            // Hero content parallax
            const heroContent = document.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled * 0.002);
            }

            ticking = false;
        });

        ticking = true;
    }
});

// ===================================
// CARD HOVER EFFECT
// ===================================
document.querySelectorAll('.biere-card, .engagement-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ===================================
// BOUTON SCROLL TO TOP
// ===================================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.setAttribute('aria-label', 'Retour en haut');
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #d4af37 0%, #f4d976 100%);
    color: #0a0a0a;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 20px rgba(212, 175, 55, 0.4);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
    scrollTopBtn.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.6)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
    scrollTopBtn.style.boxShadow = '0 5px 20px rgba(212, 175, 55, 0.4)';
});

// ===================================
// PRELOAD IMAGES
// ===================================
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

preloadImages();

// ===================================
// EASTER EGG - KONAMI CODE
// ===================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activé !
        document.body.style.animation = 'rainbow 2s ease infinite';
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        // Afficher un message
        const message = document.createElement('div');
        message.textContent = '🦉 Mode Hibou Activé ! 🍺';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #d4af37 0%, #f4d976 100%);
            color: #0a0a0a;
            padding: 2rem 4rem;
            border-radius: 20px;
            font-size: 2rem;
            font-weight: bold;
            z-index: 10000;
            animation: popup 0.5s ease;
        `;

        const popupStyle = document.createElement('style');
        popupStyle.textContent = `
            @keyframes popup {
                0% { transform: translate(-50%, -50%) scale(0); }
                100% { transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(popupStyle);

        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
            document.body.style.animation = '';
        }, 3000);
    }
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c🦉 Le Hibou Blond', 'font-size: 3rem; font-weight: bold; color: #d4af37;');
console.log('%cSite développé avec passion 🍺', 'font-size: 1.2rem; color: #3d6e4e;');
console.log('%cBuvez avec modération !', 'font-size: 1rem; color: #8a8a8a;');

// ===================================
// GESTION DES ERREURS
// ===================================
window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.message);
});

// ===================================
// RESPONSIVE - DISABLE CURSOR ON TOUCH DEVICES
// ===================================
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    if (cursor) cursor.style.display = 'none';
}

// ===================================
// ANIMATION DE LA CARTE AU CLIC
// ===================================
document.querySelectorAll('.biere-card').forEach(card => {
    card.addEventListener('click', function() {
        // Animation de clic
        this.style.transform = 'scale(0.95) translateY(0)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// ===================================
// LAZY LOADING POUR LES SECTIONS
// ===================================
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 1s ease';
    sectionObserver.observe(section);
});

// ===================================
// AMÉLIORATION UX - Feedback visuel
// ===================================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Petit feedback au clic
        this.style.transform = 'scale(0.95) translateY(-2px)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});
