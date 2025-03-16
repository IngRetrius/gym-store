// cart.js - Lógica mejorada del carrito de compras

// Estado del carrito
let cart = {
    items: [],
    total: 0
};

// Elementos del DOM que se inicializarán cuando el documento esté listo
let cartContainer;
let cartItemsContainer;
let cartTotalElement;
let cartCountElement;
let cartIcon;
let closeCartButton;
let cartOverlay;
let checkoutButton;

// Variables de color para mantener consistencia con la página principal
const colors = {
    yellow: '#FFDA00',
    blue: '#00338D',
    red: '#C8102E',
    buttonGradient: 'linear-gradient(90deg, #2a5298, #00338D)',
    darkBg: '#121212'
};

// Inicializar carrito desde localStorage (si existe)
function initCart() {
    try {
        const savedCart = localStorage.getItem('gym-store-cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            
            // Verificar que el carrito cargado tenga la estructura correcta
            if (!cart.items || !Array.isArray(cart.items)) {
                console.log('Estructura de carrito incorrecta, inicializando uno nuevo');
                cart = { items: [], total: 0 };
            }
            
            // Recalcular el total para asegurar consistencia
            calculateTotal();
            
            // Actualizar el UI con los items cargados
            updateCartUI();
            
            console.log('Carrito cargado desde localStorage:', cart);
        } else {
            console.log('No hay carrito guardado en localStorage');
        }
    } catch (error) {
        console.error('Error al cargar el carrito:', error);
        cart = { items: [], total: 0 };
    }
}

// Guardar carrito en localStorage
function saveCart() {
    try {
        localStorage.setItem('gym-store-cart', JSON.stringify(cart));
        console.log('Carrito guardado en localStorage:', cart);
    } catch (error) {
        console.error('Error al guardar el carrito:', error);
    }
}

// Añadir producto al carrito
function addToCart(product) {
    // Comprobar si el producto ya está en el carrito
    const existingItemIndex = cart.items.findIndex(item => 
        item.id === product.id && item.size === product.size && item.color === product.color);
    
    if (existingItemIndex > -1) {
        // Actualizar cantidad si ya existe
        cart.items[existingItemIndex].quantity += product.quantity;
    } else {
        // Añadir nuevo producto al carrito
        cart.items.push(product);
    }
    
    // Recalcular el total
    calculateTotal();
    
    // Actualizar UI y guardar cambios
    updateCartUI();
    saveCart();
    
    // Mostrar el carrito
    showCart();
    
    // Mostrar notificación
    showNotification(`${product.name} añadido al carrito`, 'success');
}

// Eliminar producto del carrito
function removeFromCart(itemIndex) {
    if (!cart.items[itemIndex]) return;
    
    const removedItem = cart.items[itemIndex];
    cart.items.splice(itemIndex, 1);
    calculateTotal();
    updateCartUI();
    saveCart();
    
    // Mostrar notificación
    showNotification(`${removedItem.name} eliminado del carrito`, 'info');
}

// Actualizar cantidad de un producto
function updateQuantity(itemIndex, newQuantity) {
    if (!cart.items[itemIndex]) return;
    
    if (newQuantity <= 0) {
        removeFromCart(itemIndex);
        return;
    }
    
    cart.items[itemIndex].quantity = newQuantity;
    calculateTotal();
    updateCartUI();
    saveCart();
}

// Calcular el total del carrito
function calculateTotal() {
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Actualizar la interfaz del carrito
function updateCartUI() {
    // Si los elementos del DOM no están disponibles, salir
    if (!cartItemsContainer || !cartCountElement || !cartTotalElement) return;
    
    // Actualizar contador de artículos
    const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);
    cartCountElement.textContent = itemCount;
    
    // Actualizar lista de productos en el carrito
    cartItemsContainer.innerHTML = '';
    
    if (cart.items.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart"><p>Tu carrito está vacío</p></div>';
    } else {
        cart.items.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>Talla: ${item.size} | Color: ${item.color}</p>
                    </div>
                    <div class="item-options">
                        <div class="item-price" style="color: ${colors.yellow}">$${item.price.toFixed(2)}</div>
                        <div class="item-quantity">
                            <button class="quantity-btn decrease" data-index="${index}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn increase" data-index="${index}">+</button>
                        </div>
                    </div>
                </div>
                <button class="remove-item" data-index="${index}"><i class="fas fa-times"></i></button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Verificar si existe el elemento .cart-summary
        const cartSummaryElement = document.querySelector('.cart-summary');
        if (cartSummaryElement) {
            // Calcular subtotal y actualizar resumen
            const subtotal = cart.total;
            cartSummaryElement.innerHTML = `
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Envío</span>
                    <span>Calculado al finalizar</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span style="color: ${colors.yellow}">$${cart.total.toFixed(2)}</span>
                </div>
            `;
        }
        
        // Añadir eventos para los botones de cantidad y eliminar
        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                updateQuantity(index, cart.items[index].quantity - 1);
            });
        });
        
        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                updateQuantity(index, cart.items[index].quantity + 1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const removeBtn = e.target.closest('.remove-item');
                if (removeBtn) {
                    const index = parseInt(removeBtn.dataset.index);
                    removeFromCart(index);
                }
            });
        });
    }
    
    // Actualizar el total con el color amarillo
    if (cartTotalElement) {
        cartTotalElement.style.color = colors.yellow;
        cartTotalElement.textContent = `$${cart.total.toFixed(2)}`;
    }
    
    // Actualizar estilo del botón de WhatsApp si existe
    if (checkoutButton) {
        checkoutButton.style.background = colors.buttonGradient;
    }
}

// Mostrar el carrito
function showCart() {
    if (!cartContainer || !cartOverlay) return;
    
    cartContainer.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
}

// Ocultar el carrito
function hideCart() {
    if (!cartContainer || !cartOverlay) return;
    
    cartContainer.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear elemento de notificación si no existe
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    // Actualizar contenido y tipo
    notification.textContent = message;
    notification.className = `notification ${type}`;
    
    // Establecer el color de fondo según el tipo
    switch (type) {
        case 'success':
            notification.style.background = `linear-gradient(135deg, ${colors.blue} 0%, #004aad 100%)`;
            break;
        case 'error':
            notification.style.background = `linear-gradient(135deg, ${colors.red} 0%, #9e0e26 100%)`;
            break;
        case 'warning':
            notification.style.background = `linear-gradient(135deg, ${colors.yellow} 0%, #d9bc00 100%)`;
            notification.style.color = '#121212'; // Texto oscuro para fondo amarillo
            break;
        default: // info
            notification.style.background = `linear-gradient(135deg, ${colors.blue} 0%, #004aad 100%)`;
    }
    
    // Mostrar notificación
    notification.classList.add('active');
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// Inicializar elementos del DOM y eventos
function initCartElements() {
    cartContainer = document.getElementById('cart-container');
    cartItemsContainer = document.getElementById('cart-items');
    cartTotalElement = document.getElementById('cart-total');
    cartCountElement = document.querySelector('.cart-count');
    cartIcon = document.querySelector('.cart-icon');
    closeCartButton = document.getElementById('close-cart');
    cartOverlay = document.getElementById('cart-overlay');
    checkoutButton = document.getElementById('checkout-whatsapp');
    
    if (!cartContainer || !cartItemsContainer || !cartCountElement) {
        console.error('Algunos elementos del carrito no se encontraron en el DOM');
        return;
    }
    
    // Establecer el fondo del carrito
    if (cartContainer) {
        cartContainer.style.backgroundColor = colors.darkBg;
    }
    
    // Establecer el color del botón de checkout
    if (checkoutButton) {
        checkoutButton.style.background = colors.buttonGradient;
    }
    
    // Abrir carrito al hacer clic en el icono
    if (cartIcon) {
        cartIcon.addEventListener('click', showCart);
    }
    
    // Cerrar carrito al hacer clic en el botón de cerrar o en el overlay
    if (closeCartButton) {
        closeCartButton.addEventListener('click', hideCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', hideCart);
    }
    
    // Checkout con WhatsApp
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            // Redirección a WhatsApp se maneja en whatsapp-redirect.js
            if (typeof redirectToWhatsApp === 'function') {
                redirectToWhatsApp();
            } else if (typeof window.redirectToWhatsApp === 'function') {
                window.redirectToWhatsApp();
            } else {
                console.error('La función redirectToWhatsApp no está disponible');
            }
        });
    }
    
    // Añadir eventos a los botones "Añadir al carrito" en la página
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            try {
                const productCard = e.target.closest('.product-card');
                if (!productCard) {
                    console.error('No se encontró el elemento .product-card');
                    return;
                }
                
                const nameElement = productCard.querySelector('.product-name');
                const priceElement = productCard.querySelector('.product-price');
                const imageElement = productCard.querySelector('.product-image img');
                
                if (!nameElement || !priceElement || !imageElement) {
                    console.error('Faltan elementos en el product-card');
                    return;
                }
                
                const product = {
                    id: productCard.dataset.productId || `product-${Date.now()}`,
                    name: nameElement.textContent,
                    price: parseFloat(priceElement.textContent.replace('$', '')),
                    image: imageElement.src,
                    size: 'Único', // Valor por defecto
                    color: 'Único', // Valor por defecto
                    quantity: 1
                };
                
                addToCart(product);
            } catch (error) {
                console.error('Error al añadir producto al carrito:', error);
            }
        });
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar elementos del DOM
    initCartElements();
    
    // Cargar el carrito desde localStorage
    initCart();
});

// Asegurarse de que el carrito se guarde antes de navegar a otra página
window.addEventListener('beforeunload', () => {
    saveCart();
});

// CSS para notificaciones - usando variables de color consistentes
const notificationStyles = `
.notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 4px;
    color: #fff;
    font-weight: 500;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
}

.notification.active {
    transform: translateY(0);
    opacity: 1;
}
`;

// Inyectar estilos de notificación
const styleElement = document.createElement('style');
styleElement.textContent = notificationStyles;
document.head.appendChild(styleElement);

// Exportar funciones para uso en otros scripts
window.cartFunctions = {
    addToCart,
    removeFromCart,
    updateQuantity,
    showCart,
    hideCart,
    getCart: () => cart
};