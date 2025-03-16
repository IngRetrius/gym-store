// minimal-animations.js - Script para las animaciones con tema colombiano - versión minimalista

document.addEventListener('DOMContentLoaded', () => {
    // Asegurarse de que el hero ocupe toda la pantalla
    const adjustHeroHeight = () => {
        const hero = document.querySelector('.hero-fullscreen');
        const header = document.querySelector('.modern-header');
        if (hero && header) {
            const headerHeight = header.offsetHeight;
            hero.style.height = `calc(100vh - ${headerHeight}px)`;
            hero.style.marginTop = `${headerHeight}px`;
        }
    };
    
    // Ajustar al cargar y al cambiar el tamaño de la ventana
    adjustHeroHeight();
    window.addEventListener('resize', adjustHeroHeight);
    
    // Añadir el nuevo círculo azul
    const addBlueCircle = () => {
        const circlesContainer = document.querySelector('.bg-circles');
        if (circlesContainer) {
            const blueCircle = document.createElement('div');
            blueCircle.className = 'circle circle-4';
            circlesContainer.appendChild(blueCircle);
            console.log('Círculo azul añadido');
        }
    };
    
    // Crear contenedor de partículas y añadir partículas tipo estrellas en toda la pantalla
    const createStarParticles = () => {
        // Eliminar contenedor anterior si existe
        const oldContainer = document.querySelector('.particles-container');
        if (oldContainer) {
            oldContainer.remove();
        }
        
        // Crear contenedor de partículas a nivel de body para que cubra toda la pantalla
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);
        
        // Añadir partículas (estrellas)
        const particleCount = 40; // Aumentado el número de partículas
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = `particle-star star-${Math.floor(Math.random() * 4) + 1}`;
            
            // Posición aleatoria garantizada por toda la pantalla
            // Usamos vw y vh para posicionar en relación al viewport completo
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            particle.style.left = `${posX}vw`;
            particle.style.top = `${posY}vh`;
            
            // Añadir retraso aleatorio a la animación para que no todas brillen al mismo tiempo
            particle.style.animationDelay = `${Math.random() * 7}s`;
            
            // Añadir factor aleatorio para el movimiento
            particle.setAttribute('data-factor', (0.2 + Math.random() * 0.4).toFixed(2));
            
            particlesContainer.appendChild(particle);
        }
        
        console.log('Partículas distribuidas por toda la pantalla');
    };
    
    // Efecto parallax para el indio y partículas por toda la pantalla
    const parallaxEffect = (e) => {
        const indioImage = document.querySelector('.hero-image img[alt="Indio"]');
        const particles = document.querySelectorAll('.particle-star');
        const circles = document.querySelectorAll('.circle');
        
        if (indioImage) {
            const moveX = (e.clientX / window.innerWidth - 0.5) * -15;
            const moveY = (e.clientY / window.innerHeight - 0.5) * -8;
            indioImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        
        // Movimiento sutil para las partículas en dirección opuesta al cursor
        particles.forEach(particle => {
            const factor = parseFloat(particle.getAttribute('data-factor') || 0.3);
            const moveX = (e.clientX / window.innerWidth - 0.5) * factor * 40;
            const moveY = (e.clientY / window.innerHeight - 0.5) * factor * 40;
            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        // Movimiento de los círculos
        circles.forEach(circle => {
            const speed = parseFloat(circle.getAttribute('data-speed') || 0.02);
            const offsetX = (0.5 - e.clientX / window.innerWidth) * speed * 100;
            const offsetY = (0.5 - e.clientY / window.innerHeight) * speed * 100;
            
            // Aplicar transformación basada en la clase para diferentes efectos
            if (circle.classList.contains('circle-4')) {
                circle.style.transform = `translate(${offsetX * 0.7}px, ${offsetY * 0.7}px)`;
            } else {
                circle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            }
        });
    };
    
    // Asignar velocidades diferentes a cada círculo (más lentas para mayor sutileza)
    const circles = document.querySelectorAll('.circle');
    circles[0]?.setAttribute('data-speed', '0.01');
    circles[1]?.setAttribute('data-speed', '0.015');
    circles[2]?.setAttribute('data-speed', '0.02');
    
    // Ejecutar funciones al cargar
    addBlueCircle();
    createStarParticles();
    
    // Manejar apertura y cierre del menú móvil
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Detección de scroll para el header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.modern-header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(5, 5, 5, 0.98)';
            } else {
                header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            }
        }
    });
    
    // Efecto de luces para valores al hacer scroll
    const valueItems = document.querySelectorAll('.value-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.3 });
    
    valueItems.forEach(item => {
        observer.observe(item);
    });
    
    // Agregar evento de movimiento del mouse para el efecto parallax
    window.addEventListener('mousemove', parallaxEffect);
    
    // Recalcular posiciones en caso de cambio de tamaño de pantalla
    window.addEventListener('resize', () => {
        adjustHeroHeight();
        createStarParticles();
    });
    
    // Optimización para imagen PNG del indio
    const indioImage = document.querySelector('.hero-image img[alt="Indio"]');
    if (indioImage) {
        // Mejorar la visibilidad moviendo la imagen un poco a la derecha
        indioImage.style.objectPosition = 'right center';
    }
    
    // Añadir clases de animaciones para las tarjetas de valores
    setTimeout(() => {
        document.querySelectorAll('.value-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-in');
            }, index * 150);
        });
    }, 500);
});

// Estilos adicionales para animaciones
document.addEventListener('DOMContentLoaded', () => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .value-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .value-item.in-view {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Personalizar el cursor para los elementos interactivos */
        .value-item:hover {
            cursor: pointer;
        }
        
        /* Efecto de brillo para el botón */
        .cta-button.colombia-gradient {
            position: relative;
            overflow: hidden;
        }
        
        .cta-button.colombia-gradient:after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(30deg);
            transition: transform 0.5s ease;
            pointer-events: none;
            opacity: 0;
        }
        
        .cta-button.colombia-gradient:hover:after {
            opacity: 1;
            transform: rotate(30deg) translate(-30%, -30%);
        }
    `;
    document.head.appendChild(styleElement);
});