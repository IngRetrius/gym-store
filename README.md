# El Templo del Oversize

![Logotipo de El Templo del Oversize](assets/images/logo/logo.svg)

Sitio web oficial para la marca de ropa oversize "El Templo del Oversize" - Una línea de moda que trasciende límites con diseños para quienes viven sin restricciones.

## Descripción del Proyecto

El Templo del Oversize es una tienda en línea especializada en ropa oversized con una estética única que combina elegancia oscura con toques modernos. El sitio está diseñado para ofrecer una experiencia de compra premium y exclusiva, centrada en colecciones limitadas (drops) que se lanzan periódicamente.

## Características Principales

- **Diseño Dark Mode Premium**: Interfaz moderna con tema oscuro y acentos en púrpura y rosa
- **Sistema de Drops**: Colecciones limitadas con cuenta regresiva para generar exclusividad
- **Responsive Design**: Adaptado para dispositivos móviles, tablets y escritorio
- **Carrito de Compras**: Interfaz de compra intuitiva con opción de checkout vía WhatsApp
- **Páginas Informativas**: Secciones sobre la historia de la marca y opciones de contacto

## Estructura del Proyecto

```
/
│
├── assets/                # Recursos estáticos
│   ├── images/            # Imágenes del sitio
│   │   ├── banners/       # Banners principales
│   │   ├── products/      # Imágenes de productos
│   │   ├── about/         # Imágenes para la sección Nosotros
│   │   ├── contact/       # Imágenes para la sección Contacto
│   │   └── logo/          # Logotipos de la marca
│
├── collections/           # Sección de colecciones/drops
│   ├── index.html         # Página principal de colecciones
│   └── collections.js     # Script específico para colecciones
│
├── css/                   # Hojas de estilo
│   ├── main.css           # Estilos generales
│   ├── dark-temple.css    # Tema oscuro principal
│   ├── cart.css           # Estilos del carrito
│   ├── collections.css    # Estilos de colecciones
│   ├── about.css          # Estilos para la página Nosotros
│   ├── contact.css        # Estilos para la página Contacto
│   └── ...                # Otros archivos CSS específicos
│
├── js/                    # Scripts JavaScript
│   ├── main.js            # Funcionalidad general
│   ├── cart.js            # Funcionalidad del carrito
│   └── whatsapp-redirect.js # Redirección a WhatsApp
│
├── pages/                 # Páginas informativas
│   ├── about.html         # Página Nosotros
│   ├── contact.html       # Página Contacto
│   └── terms.html         # Términos y condiciones
│
└── index.html             # Página principal
```

## Colecciones

El sistema de colecciones (drops) se maneja mediante datos JSON que contienen información sobre cada colección:

- Nombre de la colección
- Descripción
- Banner
- Listado de productos con sus detalles

Cada colección tiene una duración limitada y se muestra un contador de tiempo en la página de drop actual.

## Procesamiento de Compras

El proceso de compra se realiza mediante WhatsApp, utilizando el script `whatsapp-redirect.js` que genera un mensaje con el detalle de los productos seleccionados. Este sistema permite manejar las ventas de manera personalizada sin necesidad de un gateway de pago más complejo.

## Estilo y Diseño

El sitio utiliza una estética oscura premium con los siguientes colores principales:
- Fondo principal: #121212
- Fondo secundario: #0a0a0a
- Fondo medio: #1e1e24
- Acento primario: #9d5cff (púrpura)
- Acento secundario: #ff3e6c (rosa/coral)
- Texto principal: #ffffff

Los elementos principales incluyen gradientes, animaciones sutiles y efectos hover para mejorar la experiencia de usuario.

## Créditos

- Diseño y Desarrollo: Juan Camilo Perea Possos
- Marca: El Templo del Oversize (Ibagué, Tolima)

## Contacto

Para más información sobre este proyecto, contactar a través de WhatsApp al número:
+573106564709

---

Copyright © 2025 El Templo del Oversize. Todos los derechos reservados.