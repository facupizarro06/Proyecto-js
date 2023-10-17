// DOM
const agregarCarritoBtns = document.querySelectorAll('.agregar-carrito');
const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
const listaCarrito = document.getElementById('listaCarrito');
const totalCarrito = document.getElementById('totalCarrito');

//Agregar un producto al carrito
function agregarAlCarrito(productoId) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = productos.find(p => p.id === productoId);

    if (producto) {
        const productoEnCarrito = carrito.find(item => item.id === productoId);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            producto.cantidad = 1;
            carrito.push(producto);
        }
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
}

// Eliminar un producto 
function eliminarDelCarrito(productoId) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevoCarrito = carrito.filter(producto => producto.id !== productoId);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    mostrarCarrito();
}

// Mostrar el carrito de compras
function mostrarCarrito() {
    listaCarrito.innerHTML = '';
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    let total = 0;
    carrito.forEach(producto => {
        const itemCarrito = document.createElement('li');
        itemCarrito.innerHTML = `
            ${producto.nombre} - $${producto.precio} x ${producto.cantidad}
            <button class="eliminar" data-id="${producto.id}">Eliminar</button>
            <button class="aumentar" data-id="${producto.id}">+</button>
            <button class="disminuir" data-id="${producto.id}">-</button>
        `;
        listaCarrito.appendChild(itemCarrito);
        total += producto.precio * producto.cantidad;
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
    } else if (e.target.classList.contains('aumentar')) {
        const productoId = parseInt(e.target.getAttribute('data-id'));
        aumentarCantidad(productoId);
    } else if (e.target.classList.contains('disminuir')) {
        const productoId = parseInt(e.target.getAttribute('data-id'));
        disminuirCantidad(productoId);
    }
});

// Evento para vaciar el carrito
vaciarCarritoBtn.addEventListener('click', () => {
    localStorage.removeItem('carrito');
    mostrarCarrito();
});

// Aumentar la cantidad de un producto
function aumentarCantidad(productoId) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoEnCarrito = carrito.find(item => item.id === productoId);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
}

// Disminuir la cantidad de un producto 
function disminuirCantidad(productoId) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoEnCarrito = carrito.find(item => item.id === productoId);
    if (productoEnCarrito && productoEnCarrito.cantidad > 1) {
        productoEnCarrito.cantidad--;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
}
//  FuncionF finalizar la compra
function finalizarCompra() {
    const ordenCompra = Math.floor(Math.random() * 1000000); // Generar un número de orden aleatorio
    document.getElementById('ordenCompra').textContent = `Número de Orden de Compra: #${ordenCompra}`;
    document.getElementById('ordenCompra').style.display = 'block';
    localStorage.removeItem('carrito'); // Limpiar el carrito al finalizar la compra
    mostrarCarrito();
}

// Evento finalizar la compra
document.getElementById('finalizarCompra').addEventListener('click', finalizarCompra);

// Datos de productos
const productos = [
    { id: 1, nombre: 'Adidas Falcon', precio: 5000 },
    { id: 2, nombre: 'Nike Air Force Total White', precio: 6000 },
   
];

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
});