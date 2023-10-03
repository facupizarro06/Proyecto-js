// Obtener elementos del DOM
const agregarCarritoBtns = document.querySelectorAll('.agregar-carrito');
const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
const listaCarrito = document.getElementById('listaCarrito');
const totalCarrito = document.getElementById('totalCarrito');

// Función para agregar un producto al carrito
function agregarAlCarrito(productoId) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = productos.find(p => p.id === productoId);

    if (producto) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(productoId) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevoCarrito = carrito.filter(producto => producto.id !== productoId);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    mostrarCarrito();
}

// Función para mostrar el carrito de compras
function mostrarCarrito() {
    listaCarrito.innerHTML = '';
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    let total = 0;
    carrito.forEach(producto => {
        const itemCarrito = document.createElement('li');
        itemCarrito.innerHTML = `${producto.nombre} - $${producto.precio} <button class="eliminar" data-id="${producto.id}">Eliminar</button>`;
        listaCarrito.appendChild(itemCarrito);
        total += producto.precio;
    });

    totalCarrito.textContent = `$${total.toFixed(2)}`;
}

// Eventos para agregar productos al carrito
agregarCarritoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const productoId = parseInt(btn.getAttribute('data-id'));
        agregarAlCarrito(productoId);
    });
});

// Evento para eliminar productos del carrito
listaCarrito.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar')) {
        const productoId = parseInt(e.target.getAttribute('data-id'));
        eliminarDelCarrito(productoId);
    }
});

// Evento para vaciar el carrito
vaciarCarritoBtn.addEventListener('click', () => {
    localStorage.removeItem('carrito');
    mostrarCarrito();
});

// Datos de ejemplo de productos (puedes modificarlos o cargarlos desde una fuente externa)
const productos = [
    { id: 1, nombre: 'Adidas Falcon', precio: 50 },
    { id: 2, nombre: 'Nike Total White', precio: 60 },
    // Agrega más productos aquí
];

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
});