// collections.js - Script para manejar la interacción con las colecciones
// Modificado para integrar la paleta de colores colombiana y los efectos visuales

document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const collectionsPanel = document.querySelector('.collections-panel');
    const selectedCollection = document.getElementById('selected-collection');
    const collectionCards = document.querySelectorAll('.collection-card');
    
    // Aplicar efectos visuales de partículas y círculos para consistencia con el diseño principal
    const applyVisualEffects = () => {
        // Verificar si ya existen los elementos visuales
        if (!document.querySelector('.particles-container')) {
            // Aplicar partículas estrellas a la página de colecciones si no existen
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'particles-container';
            document.body.appendChild(particlesContainer);
            
            // Añadir partículas (estrellas)
            const particleCount = 40;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = `particle-star star-${Math.floor(Math.random() * 4) + 1}`;
                
                // Posición aleatoria por toda la pantalla
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                
                particle.style.left = `${posX}vw`;
                particle.style.top = `${posY}vh`;
                
                // Añadir retraso aleatorio a la animación
                particle.style.animationDelay = `${Math.random() * 7}s`;
                
                // Factor de movimiento para parallax
                particle.setAttribute('data-factor', (0.2 + Math.random() * 0.4).toFixed(2));
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Verificar y añadir círculos si no existen
        if (!document.querySelector('.bg-circles')) {
            const circlesContainer = document.createElement('div');
            circlesContainer.className = 'bg-circles';
            document.body.appendChild(circlesContainer);
            
            // Añadir círculos con colores de la bandera colombiana
            const circles = [
                { className: 'circle circle-1', color: '#FFDA00' }, // Amarillo
                { className: 'circle circle-2', color: '#00338D' }, // Azul
                { className: 'circle circle-3', color: '#C8102E' }, // Rojo
                { className: 'circle circle-4', color: '#00338D' }  // Azul (nuevo)
            ];
            
            circles.forEach(({ className, color }) => {
                const circle = document.createElement('div');
                circle.className = className;
                circle.style.background = color;
                circlesContainer.appendChild(circle);
            });
        }
    };
    
    // Aplicar efectos visuales al cargar la página
    applyVisualEffects();
    
    // Añadir efecto de parallax para las partículas
    const parallaxEffect = (e) => {
        const particles = document.querySelectorAll('.particle-star');
        const circles = document.querySelectorAll('.circle');
        
        // Movimiento sutil para las partículas
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
            
            circle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    };
    
    // Agregar evento de movimiento del mouse para el efecto parallax
    window.addEventListener('mousemove', parallaxEffect);
    
    // Datos de las colecciones
    const collectionsData = {
        basics: {
            name: "OVERSIZE BASICS",
            description: "Esenciales oversized para tu día a día. Confort sin compromisos.",
            banner: "../assets/images/collections/basics-banner.jpg",
            products: [
                {
                    id: "basics-1",
                    name: "Camiseta Oversized Classic",
                    price: 349.00,
                    image: "../assets/images/products/basics-tshirt.jpg",
                    gender: "unisex",
                    category: "tops"
                },
                {
                    id: "basics-2",
                    name: "Hoodie Essential Oversize",
                    price: 599.00,
                    image: "../assets/images/products/basics-hoodie.jpg",
                    gender: "unisex",
                    category: "outerwear"
                },
                {
                    id: "basics-3",
                    name: "Joggers Comfort XL",
                    price: 449.00,
                    image: "../assets/images/products/basics-joggers.jpg",
                    gender: "unisex",
                    category: "bottoms"
                },
                {
                    id: "basics-4",
                    name: "Shorts Loose Fit",
                    price: 329.00,
                    image: "../assets/images/products/basics-shorts.jpg",
                    gender: "unisex",
                    category: "bottoms"
                }
            ]
        },
        tech: {
            name: "TECH SHADOW",
            description: "Inspiración futurista. Diseños vanguardistas con telas técnicas.",
            banner: "../assets/images/collections/tech-banner.jpg",
            products: [
                {
                    id: "tech-1",
                    name: "Chaqueta Reflectante Tech",
                    price: 899.00,
                    image: "../assets/images/products/tech-jacket.jpg",
                    gender: "unisex",
                    category: "outerwear"
                },
                {
                    id: "tech-2",
                    name: "Pantalón Cargo Tech",
                    price: 649.00,
                    image: "../assets/images/products/tech-pants.jpg",
                    gender: "unisex",
                    category: "bottoms"
                },
                {
                    id: "tech-3",
                    name: "Camiseta Manga Larga Digital",
                    price: 449.00,
                    image: "../assets/images/products/tech-longsleeve.jpg",
                    gender: "unisex",
                    category: "tops"
                },
                {
                    id: "tech-4",
                    name: "Chaleco Multi-Bolsillos",
                    price: 549.00,
                    image: "../assets/images/products/tech-vest.jpg",
                    gender: "unisex",
                    category: "outerwear"
                }
            ]
        },
        urban: {
            name: "URBAN RAW",
            description: "Autenticidad callejera. Prendas para dominar el asfalto.",
            banner: "../assets/images/collections/urban-banner.jpg",
            products: [
                {
                    id: "urban-1",
                    name: "Sudadera Graffiti Oversize",
                    price: 549.00,
                    image: "../assets/images/products/urban-sweatshirt.jpg",
                    gender: "unisex",
                    category: "tops"
                },
                {
                    id: "urban-2",
                    name: "Jeans Baggy Destroyed",
                    price: 649.00,
                    image: "../assets/images/products/urban-jeans.jpg",
                    gender: "unisex",
                    category: "bottoms"
                },
                {
                    id: "urban-3",
                    name: "Bomber Jacket XL",
                    price: 749.00,
                    image: "../assets/images/products/urban-bomber.jpg",
                    gender: "unisex",
                    category: "outerwear"
                },
                {
                    id: "urban-4",
                    name: "Beanie Street Style",
                    price: 249.00,
                    image: "../assets/images/products/urban-beanie.jpg",
                    gender: "unisex",
                    category: "accessories"
                }
            ]
        },
        power: {
            name: "POWER SERIES",
            description: "Rendimiento extremo. Diseñado para quienes superan límites.",
            banner: "../assets/images/collections/power-banner.jpg",
            products: [
                {
                    id: "power-1",
                    name: "Camiseta Performance Oversize",
                    price: 399.00,
                    image: "../assets/images/products/power-tshirt.jpg",
                    gender: "unisex",
                    category: "tops"
                },
                {
                    id: "power-2",
                    name: "Shorts Training XL",
                    price: 349.00,
                    image: "../assets/images/products/power-shorts.jpg",
                    gender: "unisex",
                    category: "bottoms"
                },
                {
                    id: "power-3",
                    name: "Hoodie Técnico Power",
                    price: 649.00,
                    image: "../assets/images/products/power-hoodie.jpg",
                    gender: "unisex",
                    category: "outerwear"
                },
                {
                    id: "power-4",
                    name: "Leggings Compresión Pro",
                    price: 449.00,
                    image: "../assets/images/products/power-leggings.jpg",
                    gender: "unisex",
                    category: "bottoms"
                }
            ]
        }
    };
    
    // Agregar eventos a las tarjetas de colección
    collectionCards.forEach(card => {
        card.addEventListener('click', function() {
            const collectionId = this.dataset.collection;
            showCollectionDetails(collectionId);
        });
    });
    
    // Función para mostrar los detalles de una colección
    function showCollectionDetails(collectionId) {
        const collection = collectionsData[collectionId];
        
        if (!collection) {
            console.error('Colección no encontrada:', collectionId);
            return;
        }
        
        // Crear HTML para la colección seleccionada
        let collectionHTML = `
            <div class="collection-header" style="background-image: url('${collection.banner}');">
                <div class="container">
                    <div class="collection-header-content">
                        <button id="back-to-collections" class="back-button">
                            <i class="fas fa-arrow-left"></i> VOLVER
                        </button>
                        <h1>${collection.name}</h1>
                        <p>${collection.description}</p>
                    </div>
                </div>
            </div>
            
            <div class="container">
                <div class="collection-filters">
                    <button class="filter-button active" data-filter="all">TODOS</button>
                    <button class="filter-button" data-filter="tops">TOPS</button>
                    <button class="filter-button" data-filter="bottoms">BOTTOMS</button>
                    <button class="filter-button" data-filter="outerwear">OUTERWEAR</button>
                    <button class="filter-button" data-filter="accessories">ACCESORIOS</button>
                </div>
                
                <div class="products-grid">
        `;
        
        // Agregar productos
        collection.products.forEach(product => {
            collectionHTML += `
                <div class="product-card" data-category="${product.category}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" onerror="this.src='../assets/images/products/placeholder.jpg'; this.onerror=null;">
                        <div class="product-actions">
                            <button class="quick-view-btn" data-product-id="${product.id}">VISTA RÁPIDA</button>
                            <button class="add-to-cart-btn colombia-gradient" data-product-id="${product.id}">AÑADIR AL CARRITO</button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                    </div>
                </div>
            `;
        });
        
        collectionHTML += `
                </div>
            </div>
        `;
        
        // Actualizar el DOM
        selectedCollection.innerHTML = collectionHTML;
        
        // Mostrar la sección de colección seleccionada y ocultar el panel de colecciones
        collectionsPanel.style.display = 'none';
        selectedCollection.style.display = 'block';
        
        // Agregar evento al botón de volver
        document.getElementById('back-to-collections').addEventListener('click', function() {
            collectionsPanel.style.display = 'block';
            selectedCollection.style.display = 'none';
        });
        
        // Agregar eventos a los botones de filtro
        const filterButtons = document.querySelectorAll('.filter-button');
        const productCards = document.querySelectorAll('.product-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Añadir clase active al botón seleccionado
                this.classList.add('active');
                
                // Obtener el filtro
                const filter = this.dataset.filter;
                
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
        
        // Agregar eventos a los botones de añadir al carrito
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = this.dataset.productId;
                
                // Encontrar el producto en la colección actual
                let productData = null;
                for (const col in collectionsData) {
                    const found = collectionsData[col].products.find(p => p.id === productId);
                    if (found) {
                        productData = found;
                        break;
                    }
                }
                
                if (productData) {
                    const product = {
                        id: productData.id,
                        name: productData.name,
                        price: productData.price,
                        image: productData.image,
                        size: 'M', // Valor por defecto
                        color: 'Negro', // Valor por defecto
                        quantity: 1
                    };
                    
                    // Usar la función del carrito para añadir el producto
                    window.cartFunctions.addToCart(product);
                    
                    // Mostrar notificación
                    window.siteUtils.showNotification('Producto añadido al carrito', 'success');
                }
            });
        });
        
        // Agregar eventos a los botones de vista rápida
        document.querySelectorAll('.quick-view-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = this.dataset.productId;
                // Aquí iría la funcionalidad de vista rápida
                alert('Vista rápida de producto: ' + productId);
            });
        });
    }
});