// main.js - Funciones principales del sitio con mejoras para el menú móvil

// Función para manejar animaciones y efectos de UI
document.addEventListener('DOMContentLoaded', () => {
    // -------- NAVEGACIÓN MÓVIL (HAMBURGUESA) --------
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        // Eliminar cualquier evento previo (para evitar duplicados)
        const newMenuToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
        
        // Asignar nuevo evento
        newMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Aplicar clases para activar/desactivar menú
            nav.classList.toggle('active');
            newMenuToggle.classList.toggle('active');
            
            // Log para debugging
            console.log('Menú toggle:', nav.classList.contains('active') ? 'Abierto' : 'Cerrado');
        });
        
        // Cerrar menú al hacer click fuera de él
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !newMenuToggle.contains(e.target)) {
                nav.classList.remove('active');
                newMenuToggle.classList.remove('active');
            }
        });
        
        // Cerrar menú al presionar la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                nav.classList.remove('active');
                newMenuToggle.classList.remove('active');
            }
        });
    } else {
        console.warn('Elementos del menú móvil no encontrados:', { menuToggle, nav });
    }
    
    // -------- ANIMACIÓN DE PRODUCTOS AL SCROLL --------
    const productCards = document.querySelectorAll('.product-card');
    
    if (productCards.length > 0) {
        // Función para verificar si un elemento está en el viewport
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        };
        
        // Función para mostrar elementos visibles
        const showVisibleItems = () => {
            productCards.forEach(card => {
                if (isInViewport(card)) {
                    card.classList.add('visible');
                }
            });
        };
        
        // Ejecutar al cargar y al hacer scroll
        showVisibleItems();
        window.addEventListener('scroll', showVisibleItems);
    }
    
    // -------- IMÁGENES DE PRODUCTOS (HOVER) --------
    const productImages = document.querySelectorAll('.product-image');
    
    productImages.forEach(imageContainer => {
        const mainImage = imageContainer.querySelector('img');
        const hoverImage = imageContainer.dataset.hoverImage;
        
        if (hoverImage && mainImage) {
            const originalImage = mainImage.src;
            
            imageContainer.addEventListener('mouseenter', () => {
                mainImage.src = hoverImage;
            });
            
            imageContainer.addEventListener('mouseleave', () => {
                mainImage.src = originalImage;
            });
        }
    });
    
    // -------- FILTRADO DE PRODUCTOS --------
    const filterButtons = document.querySelectorAll('.filter-button');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Añadir clase active al botón seleccionado
                button.classList.add('active');
                
                // Obtener el filtro
                const filter = button.dataset.filter;
                
                // Filtrar productos
                productCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.dataset.category === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // -------- GALERÍA DE IMÁGENES --------
    const productThumbnails = document.querySelectorAll('.product-thumbnail');
    const productMainImage = document.querySelector('.product-main-image img');
    
    if (productThumbnails.length > 0 && productMainImage) {
        productThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                // Actualizar imagen principal
                productMainImage.src = thumbnail.src;
                
                // Remover clase active de todas las miniaturas
                productThumbnails.forEach(thumb => thumb.classList.remove('active'));
                
                // Añadir clase active a la miniatura seleccionada
                thumbnail.classList.add('active');
            });
        });
    }
    
    // -------- SELECTOR DE TALLAS --------
    const sizeOptions = document.querySelectorAll('.size-option');
    const sizeSelect = document.querySelector('.size-select');
    
    if (sizeOptions.length > 0 && sizeSelect) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remover clase selected de todas las opciones
                sizeOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Añadir clase selected a la opción seleccionada
                option.classList.add('selected');
                
                // Actualizar el valor del select
                sizeSelect.value = option.dataset.size;
            });
        });
    }
    
    // -------- INICIALIZACIÓN ESPECÍFICA PARA EVITAR CONFLICTOS --------
    // Esto asegura que minimal-animations.js no inicialice otra vez el menú
    window.menuInitialized = true;
});

// -------- NOTIFICACIONES --------
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // Eliminar notificación después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('active');
        
        // Eliminar del DOM después de la animación
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// -------- FUNCIONES ESPECÍFICAS PARA EL MENÚ MÓVIL --------
function toggleMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        return true;
    }
    return false;
}

function closeMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        return true;
    }
    return false;
}

// -------- EXPORTAR FUNCIONES PARA USO EN OTROS SCRIPTS --------
window.siteUtils = {
    showNotification,
    toggleMobileMenu,
    closeMobileMenu
};

// Asegurar compatibilidad con minimal-animations.js
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Agregar estilos CSS inline para asegurar que el menú se muestre correctamente
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @media (max-width: 768px) {
                nav.active {
                    max-height: 300px !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                    overflow: visible !important;
                    z-index: 1000 !important;
                }
                
                .mobile-menu-toggle {
                    z-index: 1001 !important;
                    position: relative !important;
                    cursor: pointer !important;
                    display: flex !important;
                }
            }
        `;
        document.head.appendChild(styleElement);
    }, 500);
});