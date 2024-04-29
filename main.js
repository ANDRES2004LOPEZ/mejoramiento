document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const rentForm = document.getElementById('rent-form');
    const returnForm = document.getElementById('return-form');

    // Función para generar un ID de alquiler único
    function generateRentalID() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return `${timestamp}-${random}`;
    }

    // Validación y manejo del formulario de inicio de sesión
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Validación básica de campos vacíos
            if (!username || !password) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            // Simulación de autenticación
            const user = {
                username: 'andres',
                password: '12345'
            };

            if (username === user.username && password === user.password) {
                // Autenticación exitosa, guardar en el almacenamiento local
                localStorage.setItem('user', JSON.stringify(user));
                alert('Inicio de sesión exitoso.');
                // Redirigir al usuario a la página de alquiler
                window.location.href = 'alquilar.html';
            } else {
                alert('Usuario o contraseña incorrectos.');
            }
        });
    }

    // Validación y manejo del formulario de alquiler
    if (rentForm) {
        rentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const carType = document.getElementById('car-type').value;

            // Validación del tipo de carrito
            if (!carType) {
                alert('Por favor, seleccione el tipo de carrito.');
                return;
            }

            // Generar un ID de alquiler único
            const rentalId = generateRentalID();

            // Simulación de alquiler
            const rental = {
                id: rentalId,
                carType: carType,
                date: new Date().toISOString()
            };

            // Guardar el alquiler en el almacenamiento local
            let rentals = JSON.parse(localStorage.getItem('rentals')) || [];
            rentals.push(rental);
            localStorage.setItem('rentals', JSON.stringify(rentals));

            // Mostrar el ID de alquiler generado
            alert(`Carrito alquilado exitosamente. Su ID de alquiler es: ${rentalId}`);
            // Redirigir al usuario a la página de devolución
            window.location.href = 'devolver.html';
        });
    }

    

     // Validación y manejo del formulario de devolución
     if (returnForm) {
         returnForm.addEventListener('submit', function(e) {
             e.preventDefault();
             const rentalId = document.getElementById('rental-id').value;


             // Validación del ID de alquiler
             if (!rentalId) {
                 alert('Por favor, ingrese el ID de alquiler.');
                 return;
             }

             // Simulación de devolución
             let rentals = JSON.parse(localStorage.getItem('rentals')) || [];
             const rentalIndex = rentals.findIndex(rental => rental.id === rentalId);

             if (rentalIndex !== -1) {
                 rentals.splice(rentalIndex, 1);
                 localStorage.setItem('rentals', JSON.stringify(rentals));
                 alert('Carrito devuelto exitosamente.');
                 // Redirigir al usuario a la página de inicio de sesión
                 window.location.href = 'iniciarSesion.html';
             } else {
                 alert('ID de alquiler no encontrado.');
             }
         });
     }
 });
