



        const lista = document.getElementById('listado');
        const carritoIcono = document.getElementById('carrito');
        const carritoContainer = document.getElementById('carrito-container');
        const carritoContent = document.getElementById('carrito-content');
        
        
        const carrito = [];
        
       
        function actualizarIconoCarrito() {
            carritoIcono.setAttribute('data-badge', carrito.length);
        }
        
        
        function agregarAlCarrito(producto) {
            
            const productoEnCarrito = carrito.find(item => item.id === producto.id);
        
            if (productoEnCarrito) {
                
                productoEnCarrito.cantidad++;
            } else {
                
                carrito.push({ ...producto, cantidad: 1 });
            }
        
            actualizarCarrito();
            actualizarIconoCarrito();
            console.log(`Producto "${producto.producto}" agregado al carrito.`);
        }
        
        
        function actualizarCarrito() {
            carritoContent.innerHTML = ''; 
        
            carrito.forEach(item => {
                const carritoItem = document.createElement('div');
                carritoItem.innerHTML = `
                    <p>${item.producto} - Precio: $${item.precio} - Cantidad: ${item.cantidad}
                        <button onclick="restarDelCarrito(${item.id})">-</button>
                        <button onclick="sumarAlCarrito(${item.id})">+</button>
                    </p>
                `;
                carritoContent.appendChild(carritoItem);
            });
        

            const finalizarCompraButton = document.createElement('button');
            finalizarCompraButton.textContent = 'Finalizar Compra';
            finalizarCompraButton.className = 'btn btn-success';
            finalizarCompraButton.addEventListener('click', finalizarCompra);
            
            carritoContent.appendChild(finalizarCompraButton);
        }
        

        function sumarAlCarrito(id) {
            const productoEnCarrito = carrito.find(item => item.id === id);
            if (productoEnCarrito) {
                productoEnCarrito.cantidad++;
            }
            actualizarCarrito();
        }
        
        function restarDelCarrito(id) {
            const productoEnCarrito = carrito.find(item => item.id === id);
            if (productoEnCarrito && productoEnCarrito.cantidad > 1) {
                productoEnCarrito.cantidad--;
            } else {
                
                const index = carrito.findIndex(item => item.id === id);
                carrito.splice(index, 1);
            }
            actualizarCarrito();
        }
        
        
        function finalizarCompra() {
            window.location.href = 'http://www.homerswebpage.com/';
        }
        
        

        function toggleCarritoPopup() {
            const carritoPopup = document.getElementById('carrito-popup');
            carritoPopup.style.display = carritoPopup.style.display === 'none' ? 'block' : 'none';
        }
        
        carritoIcono.addEventListener('click', toggleCarritoPopup);
        


/***********************************Fetch de Ruta Relativa para las cards ********************/


        fetch('./data/ecommerce.json')
            .then((response) => response.json())
            .then((data) => {
                data.forEach((product, index) => {
                    const card = document.querySelector(`.col-md-4:nth-child(${index + 1}) .card`);
        
                    const productDetails = document.createElement('div');
                    productDetails.innerHTML = `
                        <h4>${product.producto}</h4>
                        <p>${product.precio}</p>
                    `;
        
                    card.querySelector('.card-body').insertBefore(productDetails, card.querySelector('.card-body').firstChild);
        
                    const comprarBoton = document.createElement('button');
                    comprarBoton.textContent = 'Comprar';
                    comprarBoton.className = 'btn btn-primary';
                    comprarBoton.addEventListener('click', () => agregarAlCarrito(product));
        
                    
                    card.querySelector('.card-body').appendChild(comprarBoton);
                });
            });