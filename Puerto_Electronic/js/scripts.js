document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS PARA SELECTS DE REGIÓN Y COMUNA ---
    const regionesYcomunas = [
        {
            "nombre": "Arica y Parinacota",
            "comunas": ["Arica", "Camarones", "Putre", "General Lagos"]
        },
        {
            "nombre": "Metropolitana de Santiago",
            "comunas": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
        },
        {
            "nombre": "Los Lagos",
            "comunas": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]
        }
    ];

    
    

    // Función para mostrar un mensaje de éxito o error en la pantalla
    function showNotification(message, type = 'success') {
        const existingMessage = document.querySelector('.notification-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageContainer = document.createElement('div');
        messageContainer.classList.add('notification-message', type);
        messageContainer.textContent = message;

        document.body.appendChild(messageContainer);

        setTimeout(() => {
            messageContainer.remove();
        }, 3000);
    }

    //funcion para validar rut version chile
    const validarRun = (run) => {
        if (!/^[0-9]+[0-9kK]{1}$/.test(run)) return false;
        try {
            let rut = run.slice(0, -1);
            const dv = run.slice(-1).toLowerCase();
            let suma = 0;
            let multiplo = 2;
            for (let i = rut.length - 1; i >= 0; i--) {
                suma += parseInt(rut.charAt(i)) * multiplo;
                multiplo = multiplo < 7 ? multiplo + 1 : 2;
            }
            const dvEsperado = 11 - (suma % 11);
            let dvCalculado = dvEsperado === 11 ? '0' : (dvEsperado === 10 ? 'k' : dvEsperado.toString());
            return dv === dvCalculado;
        } catch (err) {
            return false;
        }
    };

    // mostrar productos, usuarios y posts de blog
    let products = JSON.parse(localStorage.getItem('products')) || [
        { id: 1, name: 'Smartphone Pro Max', price: 999.99, image: 'https://img.freepik.com/fotos-premium/telefono-celular-elegante-moderno-pantalla-holografica-que-proyecta-impresionante-tema-galactico_986810-276.jpg' },
        { id: 2, name: 'Laptop Ultrabook', price: 1250.00, image: 'https://todoclick.cl/6740624-large_default/notebook-hp-250-g10-i5-1334u-16gb-ram-512gb-ssd-w11p.jpg' },
        { id: 3, name: 'Audífonos Bluetooth', price: 75.50, image: 'https://www.ebest.cl/media/catalog/product/cache/47abc4af9d81a631bd44d97ba9797770/e/a/earfun_air_lite_auriculares_bluetooth_01_l.jpg' },
        { id: 4, name: 'Smartwatch Deportivo', price: 199.99, image: 'https://img01.huaweifile.com/sg/ms/cl/pms/uomcdn/CL_HW_B2C/pms/202409/gbom/6942103131752/428_428_9285B8C55588A10F1A701F4BF01DC729mp.png' },
        { id: 5, name: 'Teclado Mecánico RGB', price: 120.00, image: 'https://prophonechile.cl/wp-content/uploads/2020/05/coreteclado.png' },
        { id: 6, name: 'Mouse Gamer Inalámbrico', price: 55.00, image: 'https://melollevo.cl/cdn/shop/files/5b4fbbd1-0690-46e7-9f92-aa23711ecb5b.jpg?v=1748825528&width=1214' }
    ];

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const blogPosts = [
        {
            title: 'Los Mejores Gadgets para la Productividad en 2025',
            snippet: 'Descubre los dispositivos que te ayudarán a ser más eficiente...',
            date: '12 de julio de 2025',
            image: 'https://phantom-expansion.uecdn.es/40ce79dac374bbda37bf3b61fdca5563/crop/0x3/2048x1155/resize/828/f/webp/assets/multimedia/imagenes/2025/03/26/17430132980044.jpg',
            link: 'blogs/blog1.html'
        },
        {
            title: 'Guía Completa para Elegir tu Primer Ordenador Gaming',
            snippet: 'Desde procesadores hasta tarjetas gráficas, te explicamos todo...',
            date: '17 de enero de 2025',
            image: 'https://img.pccomponentes.com/pcblog/6590/componentes-pc-gaming.jpg',
            link: 'blogs/blog2.html'
        },
        {
            title: 'Cómo Mantener tu Batería de Laptop en Óptimas Condiciones',
            snippet: 'Consejos simples para prolongar la vida útil de tu dispositivo...',
            date: '2 de agosto de 2025',
            image: 'https://cl-media.hptiendaenlinea.com/magefan_blog/Reemplazo_de_bater_a_en_laptop.png',
            link: 'blogs/blog3.html'
        }
    ];

    // Función para renderizar un producto en el DOM
    const renderProduct = (product) => {
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="btn add-to-cart-btn" data-id="${product.id}">Agregar al Carrito</button>
            </div>
        `;
    };

    // Lógica para mostrar productos en la página de inicio
    const featuredProductsList = document.getElementById('product-list');
    if (featuredProductsList) {
        const featuredProducts = products.slice(0, 3);
        featuredProductsList.innerHTML = featuredProducts.map(renderProduct).join('');
    }

    // Lógica para mostrar todos los productos en la página de productos
    const allProductsList = document.getElementById('all-products-list');
    if (allProductsList) {
        allProductsList.innerHTML = products.map(renderProduct).join('');
    }

    // --- Lógica para validar el formulario de registro de la tienda 
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        // --- Carga de Regiones y Comunas ---
        const regionSelect = document.getElementById('registroRegion');
        const comunaSelect = document.getElementById('registroComuna');

        if(regionSelect) {
            regionesYcomunas.forEach(region => {
                regionSelect.innerHTML += `<option value="${region.nombre}">${region.nombre}</option>`;
            });

            regionSelect.addEventListener('change', () => {
                comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
                const selectedRegion = regionesYcomunas.find(r => r.nombre === regionSelect.value);
                if (selectedRegion) {
                    selectedRegion.comunas.forEach(comuna => {
                        comunaSelect.innerHTML += `<option value="${comuna}">${comuna}</option>`;
                    });
                    comunaSelect.disabled = false;
                } else {
                    comunaSelect.disabled = true;
                }
            });
        }
        
        // --- Validación del Formulario al Enviar ---
        registroForm.addEventListener('submit', (event) => {
            event.preventDefault();
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            let isValid = true;

            // Usamos los IDs correctos del formulario de registro
            const run = document.getElementById('registroRun').value;
            if (!validarRun(run)) { // Reutilizamos la función validarRun
                document.getElementById('errorRegistroRun').textContent = 'El RUN no es válido.';
                isValid = false;
            }

            const email = document.getElementById('registroEmail').value;
            if (!/^[^@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(email)) {
                document.getElementById('errorRegistroEmail').textContent = 'El correo debe ser válido.';
                isValid = false;
            }

            // Aquí agregamos el resto de las validaciones de longitud

            if (isValid) {
                const newUser = {
                    run: run,
                    nombre: document.getElementById('registroNombre').value,
                    apellidos: document.getElementById('registroApellidos').value,
                    email: email,
                    password: document.getElementById('registroPassword').value,
                    fechaNacimiento: document.getElementById('registroFechaNacimiento').value,
                    region: regionSelect.value,
                    comuna: comunaSelect.value,
                    direccion: document.getElementById('registroDireccion').value,
                    rol: 'cliente' // Se asigna el rol por defecto
                };

                let users = JSON.parse(localStorage.getItem('users')) || [];
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                showNotification('¡Registro exitoso! Ya puedes iniciar sesión.');
                setTimeout(() => { window.location.href = 'login.html'; }, 2000);
            }
        });
    }


    // Lógica para validar el formulario de login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        document.getElementById('errorLoginEmail').textContent = '';
        document.getElementById('errorLoginPassword').textContent = '';
        document.getElementById('loginSuccessMessage').textContent = '';
        document.getElementById('loginErrorMessage').textContent = '';

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        let isValid = true;
        const emailPattern = /^[^@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

        if (email === '') {
            document.getElementById('errorLoginEmail').textContent = 'El correo electrónico es obligatorio.';
            isValid = false;
        } else if (!emailPattern.test(email)) {
            document.getElementById('errorLoginEmail').textContent = 'El formato del correo es inválido.';
            isValid = false;
        }
        if (password.length < 4 || password.length > 10) {
            document.getElementById('errorLoginPassword').textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
            isValid = false;
        }
        if (isValid) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const foundUser = users.find(user => user.email === email && user.password === password);
            if (foundUser) {
                showNotification('¡Inicio de sesión exitoso! Redireccionando...');
                localStorage.setItem('currentUser', JSON.stringify(foundUser));
                setTimeout(() => {
                    if (foundUser.rol === 'administrador' || foundUser.rol === 'vendedor') {
                        window.location.href = 'admin/admin-home.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                }, 2000);
            } else {
                showNotification('Correo o contraseña incorrectos.', 'error');
            }
        }
    });
}
    

    // Lógica para la funcionalidad del carrito
    const cartCountEl = document.getElementById('cart-count');
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartCountEl) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCountEl.textContent = totalItems;
        }
    };
    updateCartCount();
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(event.target.dataset.id);
            const productToAdd = products.find(p => p.id === productId);
            if (productToAdd) {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingProduct = cart.find(item => item.id === productId);
                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    productToAdd.quantity = 1;
                    cart.push(productToAdd);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                showNotification(`¡${productToAdd.name} ha sido agregado al carrito!`);
            }
        }
    });

    const cartTableBody = document.querySelector('#cart-table tbody');
    const cartTotalEl = document.getElementById('cart-total');
    if (cartTableBody && cartTotalEl) {
        const renderCart = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cartTableBody.innerHTML = '';
            let total = 0;
            if (cart.length === 0) {
                const noItemsRow = document.createElement('tr');
                noItemsRow.innerHTML = `<td colspan="5" class="empty-cart-message">Tu carrito está vacío.</td>`;
                cartTableBody.appendChild(noItemsRow);
            } else {
                cart.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.name}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>
                            <input type="number" class="quantity-input" data-id="${item.id}" value="${item.quantity}" min="1">
                        </td>
                        <td>$${itemTotal.toFixed(2)}</td>
                        <td>
                            <button class="btn btn-danger remove-from-cart-btn" data-id="${item.id}">Eliminar</button>
                        </td>
                    `;
                    cartTableBody.appendChild(row);
                });
            }
            cartTotalEl.textContent = `$${total.toFixed(2)}`;
        };
        cartTableBody.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-from-cart-btn')) {
                const productId = parseInt(event.target.dataset.id);
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart = cart.filter(item => item.id !== productId);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                updateCartCount();
                showNotification('Producto eliminado del carrito.');
            }
        });
        cartTableBody.addEventListener('input', (event) => {
            if (event.target.classList.contains('quantity-input')) {
                const productId = parseInt(event.target.dataset.id);
                const newQuantity = parseInt(event.target.value);
                if (newQuantity < 1) {
                    event.target.value = 1;
                    return;
                }
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const item = cart.find(i => i.id === productId);
                if (item) {
                    item.quantity = newQuantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                    updateCartCount();
                }
            }
        });
        renderCart();
    }

    const emptyCartBtn = document.getElementById('empty-cart-btn');
    if (emptyCartBtn) {
        emptyCartBtn.addEventListener('click', () => {
            localStorage.removeItem('cart');
            if (cartTableBody && cartTotalEl) {
                cartTableBody.innerHTML = '<tr><td colspan="5" class="empty-cart-message">Tu carrito está vacío.</td></tr>';
                cartTotalEl.textContent = '$0.00';
            }
            updateCartCount();
            showNotification('El carrito ha sido vaciado.');
        });
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                showNotification('El carrito está vacío. Agrega productos para continuar.', 'error');
            } else {
                showNotification('¡Compra finalizada! Gracias por tu compra.');
                localStorage.removeItem('cart');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000); // aca agregamos un Pequeño retraso para que el mensaje sea visible
            }
        });
    }

    // Lógica para validar y guardar el formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let isValid = true;
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            const nombre = document.getElementById('contactNombre').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const comentario = document.getElementById('contactComentario').value.trim();
            if (nombre === '') {
                document.getElementById('errorContactNombre').textContent = 'El nombre es obligatorio.';
                isValid = false;
            } else if (nombre.length > 100) {
                document.getElementById('errorContactNombre').textContent = 'El nombre no puede exceder los 100 caracteres.';
                isValid = false;
            }
            const emailPattern = /^[^@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
            if (email === '') {
                document.getElementById('errorContactEmail').textContent = 'El correo electrónico es obligatorio.';
                isValid = false;
            } else if (!emailPattern.test(email)) {
                document.getElementById('errorContactEmail').textContent = 'El formato del correo es inválido.';
                isValid = false;
            } else if (email.length > 100) {
                document.getElementById('errorContactEmail').textContent = 'El correo electrónico no puede exceder los 100 caracteres.';
                isValid = false;
            }
            if (comentario === '') {
                document.getElementById('errorContactComentario').textContent = 'El comentario es obligatorio.';
                isValid = false;
            } else if (comentario.length > 500) {
                document.getElementById('errorContactComentario').textContent = 'El comentario no puede exceder los 500 caracteres.';
                isValid = false;
            }
            if (isValid) {
                const newMessage = {
                    nombre: nombre,
                    email: email,
                    comentario: comentario,
                    timestamp: new Date().toISOString()
                };
                let messages = JSON.parse(localStorage.getItem('messages')) || [];
                messages.push(newMessage);
                localStorage.setItem('messages', JSON.stringify(messages));

                showNotification('¡Mensaje enviado con éxito!');
                contactForm.reset();
            }
        });
    }

    // Lógica para proteger páginas de administración y el logout
    const currentPagePath = window.location.pathname;
    const isAdminPage = currentPagePath.includes('admin');

    if (isAdminPage) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            showNotification('Acceso denegado. Por favor, inicia sesión.', 'error');
            setTimeout(() => {
                window.location.href = '../login.html';
            }, 2000); // Pequeño retraso para que el mensaje sea visible
        }
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('currentUser');
            showNotification('Has cerrado sesión exitosamente.');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000); // Pequeño retraso para que el mensaje sea visible
        });
    }

    // Lógica de gestión de productos del admin
    const productsTableBody = document.getElementById('products-table-body');
    const productForm = document.getElementById('productForm');
    const renderAdminProducts = () => {
        if (!productsTableBody) return;
        productsTableBody.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger delete-product-btn" data-id="${product.id}">Eliminar</button>
                </td>
            `;
            productsTableBody.appendChild(row);
        });
    };
    if (productsTableBody) {
        renderAdminProducts();
        productsTableBody.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-product-btn')) {
                const productId = parseInt(event.target.dataset.id);
                if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                    products = products.filter(p => p.id !== productId);
                    localStorage.setItem('products', JSON.stringify(products));
                    renderAdminProducts();
                    showNotification('Producto eliminado con éxito.');
                }
            }
        });
    }
    if (productForm) {
        productForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const newProduct = {
                id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
                name: document.getElementById('productName').value,
                price: parseFloat(document.getElementById('productPrice').value),
                image: document.getElementById('productImage').value
            };
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            showNotification('Producto guardado con éxito.');
            setTimeout(() => {
                window.location.href = 'admin-products.html';
            }, 2000); // Pequeño retraso para que el mensaje sea visible
        });
    }

    

    // --- LÓGICA DE BLOGS ---
    const blogPostsList = document.getElementById('blog-posts-list');
    if (blogPostsList) {
        const renderBlogPosts = () => {
            blogPostsList.innerHTML = '';
            blogPosts.forEach(post => {
                const postCard = document.createElement('div');
                postCard.classList.add('blog-post-card');
                postCard.innerHTML = `
                    <img src="${post.image}" alt="${post.title}">
                    <div class="post-info">
                        <h3>${post.title}</h3>
                        <p class="post-date">${post.date}</p>
                        <p>${post.snippet}</p>
                        <a href="${post.link}" class="read-more-link">Leer más...</a>
                    </div>
                `;
                blogPostsList.appendChild(postCard);
            });
        };
        renderBlogPosts();
    }

    // --- Lógica para añadir un nuevo usuario desde el panel de administración ---
    const newUserForm = document.getElementById('newUserForm');
    if (newUserForm) {
        // --- Carga de Regiones y Comunas ---
        const regionSelect = document.getElementById('userRegion');
        const comunaSelect = document.getElementById('userComuna');

        regionesYcomunas.forEach(region => {
            const option = document.createElement('option');
            option.value = region.nombre;
            option.textContent = region.nombre;
            regionSelect.appendChild(option);
        });

        regionSelect.addEventListener('change', () => {
            comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
            const selectedRegion = regionesYcomunas.find(r => r.nombre === regionSelect.value);
            if (selectedRegion) {
                selectedRegion.comunas.forEach(comuna => {
                    const option = document.createElement('option');
                    option.value = comuna;
                    option.textContent = comuna;
                    comunaSelect.appendChild(option);
                });
                comunaSelect.disabled = false;
            } else {
                comunaSelect.disabled = true;
            }
        });

        // --- Función para validar el RUN chileno  ---
        const validarRun = (run) => {
            if (!/^[0-9]+[0-9kK]{1}$/.test(run)) {
                return false;
            }
            try {
                let rut = run.slice(0, -1);
                const dv = run.slice(-1).toLowerCase();
                let suma = 0;
                let multiplo = 2;

                // Recorrer el RUT de derecha a izquierda
                for (let i = rut.length - 1; i >= 0; i--) {
                    suma += parseInt(rut.charAt(i)) * multiplo;
                    multiplo = multiplo < 7 ? multiplo + 1 : 2;
                }

                const dvEsperado = 11 - (suma % 11);
                let dvCalculado;

                if (dvEsperado === 11) {
                    dvCalculado = '0';
                } else if (dvEsperado === 10) {
                    dvCalculado = 'k';
                } else {
                    dvCalculado = dvEsperado.toString();
                }

                return dv === dvCalculado;
            } catch (err) {
                return false;
            }
        };
        
        // --- Validación del Formulario al Enviar ---
        newUserForm.addEventListener('submit', (event) => {
            event.preventDefault();
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            let isValid = true;

            const run = document.getElementById('userRun').value;
            if (!validarRun(run)) {
                document.getElementById('errorUserRun').textContent = 'El RUN no es válido.';
                isValid = false;
            }

            const nombre = document.getElementById('userName').value;
            if (nombre.length > 50) {
                document.getElementById('errorUserName').textContent = 'El nombre no debe exceder los 50 caracteres.';
                isValid = false;
            }

            const apellidos = document.getElementById('userApellidos').value;
            if (apellidos.length > 100) {
                document.getElementById('errorUserApellidos').textContent = 'Los apellidos no deben exceder los 100 caracteres.';
                isValid = false;
            }

            const email = document.getElementById('userEmail').value;
            if (!/^[^@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(email)) {
                document.getElementById('errorUserEmail').textContent = 'El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.';
                isValid = false;
            }

            const direccion = document.getElementById('userDireccion').value;
             if (direccion.length > 300) {
                document.getElementById('errorUserDireccion').textContent = 'La dirección no debe exceder los 300 caracteres.';
                isValid = false;
            }

            if (isValid) {
                const newUser = {
                    run: run,
                    nombre: nombre,
                    apellidos: apellidos,
                    email: email,
                    password: document.getElementById('userPassword').value,
                    fechaNacimiento: document.getElementById('userFechaNacimiento').value,
                    region: regionSelect.value,
                    comuna: comunaSelect.value,
                    direccion: direccion,
                    rol: document.getElementById('userRol').value
                };

                let users = JSON.parse(localStorage.getItem('users')) || [];
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                showNotification('Usuario agregado con éxito.');
                setTimeout(() => { window.location.href = 'admin-users.html'; }, 1500);
            }
        });
    }


    // --- LÓGICA PARA LISTAR Y ELIMINAR USUARIOS EN admin-users.html (CON MODAL) ---
    const usersTableBody = document.getElementById('users-table-body');
    
    if (usersTableBody) {
        const deleteModal = document.getElementById('delete-confirm-modal');
        const userEmailSpan = document.getElementById('user-email-to-delete');
        const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
        const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
        let userEmailToDelete = null;

        const renderAdminUsers = () => {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            usersTableBody.innerHTML = '';
            
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.nombre}</td>
                    <td>${user.email}</td>
                    <td>${user.rol || 'Cliente'}</td>
                    <td>
                        <button class="btn btn-danger delete-user-btn" data-email="${user.email}">Eliminar</button>
                    </td>
                `;
                usersTableBody.appendChild(row);
            });
        };

        // 1.logica para Abrir la ventana modal al hacer clic en "Eliminar"
        usersTableBody.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-user-btn')) {
                userEmailToDelete = event.target.dataset.email;
                userEmailSpan.textContent = userEmailToDelete; // Muestra el email en la ventana
                deleteModal.classList.add('visible'); // Muestra la ventana
            }
        });

        // 2. logica para Cerrar la ventana modal al hacer clic en "Cancelar"
        cancelDeleteBtn.addEventListener('click', () => {
            deleteModal.classList.remove('visible');
            userEmailToDelete = null;
        });

        // 3. logica para Ejecutar la eliminación al hacer clic en "Sí, Eliminar"
        confirmDeleteBtn.addEventListener('click', () => {
            if (userEmailToDelete) {
                let users = JSON.parse(localStorage.getItem('users')) || [];
                users = users.filter(u => u.email !== userEmailToDelete);
                localStorage.setItem('users', JSON.stringify(users));
                
                showNotification('Usuario eliminado con éxito.'); // Usa la función de notificación verde
                renderAdminUsers(); // Actualiza la tabla
                
                deleteModal.classList.remove('visible'); // Oculta la ventana
                userEmailToDelete = null;
            }
        });

        // Renderizar la tabla al cargar la página
        renderAdminUsers();
    }
});
