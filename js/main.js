// main.js - Funciones principales del sitio

// Función para manejar animaciones y efectos de UI
document.addEventListener('DOMContentLoaded', () => {
    // Navegación móvil (hamburguesa)
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Animación de aparición para productos al hacer scroll
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
    
    // Función para manejar las imágenes de productos (cambio al pasar el mouse)
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
    
    // Filtrado de productos
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
    
    // Galería de imágenes en página de producto
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
    
    // Selector de tallas
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
});

// Función para mostrar mensajes al usuario (toast notifications)
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

// Exportar funciones para uso en otros scripts
window.siteUtils = {
    showNotification
};