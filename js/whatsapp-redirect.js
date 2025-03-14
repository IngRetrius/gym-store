// whatsapp-redirect.js - Lógica mejorada para redirección a WhatsApp

// Número de WhatsApp (cambia esto por tu número)
const whatsappNumber = '573106564709'; // Ejemplo: 521 (México) + tu número

// Función para crear mensaje de WhatsApp con detalles de la orden
function createWhatsAppMessage() {
    const cart = window.cartFunctions.getCart();
    
    if (!cart || cart.items.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de continuar.');
        return null;
    }

    let message = '🛒 *NUEVO PEDIDO* 🛒\n\n';
    message += '*Productos:*\n';
    
    // Añadir cada producto al mensaje
    cart.items.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n`;
        message += `   - Cantidad: ${item.quantity}\n`;
        message += `   - Talla: ${item.size}\n`;
        message += `   - Color: ${item.color}\n`;
        message += `   - Precio unitario: $${item.price.toFixed(2)}\n`;
        message += `   - Subtotal: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    // Añadir total
    message += `*TOTAL: $${cart.total.toFixed(2)}*\n\n`;
    
    // Añadir mensaje para completar el pedido
    message += 'Por favor, proporciona los siguientes datos para completar tu pedido:\n';
    message += '- Nombre completo:\n';
    message += '- Dirección de entrega:\n';
    message += '- Método de pago preferido:\n';
    message += '- Notas adicionales:\n\n';
    message += 'Gracias por elegir El Templo del Oversize!';
    
    return encodeURIComponent(message);
}

// Función para redirigir a WhatsApp
function redirectToWhatsApp() {
    const message = createWhatsAppMessage();
    
    if (!message) return;
    
    // Mostrar indicador de carga o spinner
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Preparando tu pedido...</p>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Estilos para el spinner
    const spinnerStyles = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(5, 5, 5, 0.9);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(140, 82, 255, 0.3);
            border-top: 4px solid #8c52ff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        
        .loading-overlay p {
            color: #e0e0e0;
            font-size: 1.2rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    // Inyectar estilos
    const styleElement = document.createElement('style');
    styleElement.textContent = spinnerStyles;
    document.head.appendChild(styleElement);
    
    // Esperar un poco para mostrar la animación
    setTimeout(() => {
        // Crear URL de WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
        
        // Redirigir a WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Eliminar overlay después de redirigir
        setTimeout(() => {
            document.body.removeChild(loadingOverlay);
        }, 500);
    }, 1500);
}

// Exportar función para uso en otros scripts
window.redirectToWhatsApp = redirectToWhatsApp;