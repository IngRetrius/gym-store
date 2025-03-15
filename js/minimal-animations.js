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
    
    // Efecto parallax suave y sutil para los círculos de fondo
    document.addEventListener('mousemove', (e) => {
        const circles = document.querySelectorAll('.circle');
        
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        circles.forEach(circle => {
            const speed = parseFloat(circle.getAttribute('data-speed') || 0.02);
            const offsetX = (0.5 - x) * speed * 100;
            const offsetY = (0.5 - y) * speed * 100;
            
            circle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
    
    // Asignar velocidades diferentes a cada círculo (más lentas para mayor sutileza)
    const circles = document.querySelectorAll('.circle');
    circles[0]?.setAttribute('data-speed', '0.01');
    circles[1]?.setAttribute('data-speed', '0.015');
    circles[2]?.setAttribute('data-speed', '0.02');
    
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
    
    // Optimización para imagen PNG del indio
    const indioImage = document.querySelector('.hero-image img[alt="Indio"]');
    if (indioImage) {
        // Mejorar la visibilidad moviendo la imagen un poco a la derecha
        indioImage.style.objectPosition = 'right center';
        
        // Añadir un efecto de parallax sutil en la imagen del indio
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * -20;
            const moveY = (e.clientY / window.innerHeight - 0.5) * -10;
            indioImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
    
    // Añadir clases de animaciones para las tarjetas de valores
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            document.querySelectorAll('.value-item').forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, index * 150);
            });
        }, 500);
    });
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