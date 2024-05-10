// Función para iniciar sesión
function login() {
    // Obtiene el valor del input donde el usuario escribe su nombre
    var username = document.getElementById('username').value;
    // Verifica si el nombre de usuario está presente
    if (username) {
        // Almacena el nombre de usuario en sessionStorage
        sessionStorage.setItem('username', username);
        // Inicializa una lista de compras vacía y la guarda en sessionStorage
        sessionStorage.setItem('shoppingList', JSON.stringify([]));
        // Actualiza el texto en pantalla para mostrar el nombre de usuario que ha iniciado sesión
        document.getElementById('sessionStatus').innerText = 'Sesión iniciada como: ' + username;
        // Alerta al usuario que la sesión ha sido iniciada
        alert('Sesión iniciada para ' + username);
    } else {
        // Alerta al usuario para que ingrese un nombre si el campo estaba vacío
        alert('Por favor, ingresa un nombre');
    }
}

// Función para añadir un artículo a la lista de compras
function addItem() {
    // Verifica si hay un nombre de usuario almacenado en sessionStorage
    var username = sessionStorage.getItem('username');
    // Si no hay sesión iniciada, alerta al usuario y detiene la función
    if (!username) {
        alert('Debes iniciar sesión para añadir artículos.');
        return;
    }
    // Obtiene el valor del input donde el usuario escribe el artículo a añadir
    var item = document.getElementById('item').value;
    // Verifica si el artículo está presente
    if (item) {
        // Obtiene la lista actual de compras de sessionStorage, o inicializa una nueva lista si no existe
        var shoppingList = JSON.parse(sessionStorage.getItem('shoppingList')) || [];
        // Añade el nuevo artículo a la lista
        shoppingList.push(item);
        // Guarda la lista actualizada en sessionStorage
        sessionStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        // Limpia el campo de texto después de añadir el artículo
        document.getElementById('item').value = '';
        // Alerta al usuario que el artículo ha sido añadido
        alert(item + ' añadido a tu lista de compras.');
    } else {
        // Alerta al usuario para que ingrese un artículo si el campo estaba vacío
        alert('Por favor, ingresa un artículo para añadir a la lista');
    }
}

// Función para mostrar los artículos en la lista de compras
function showItems() {
    // Obtiene la lista de compras de sessionStorage
    var shoppingList = JSON.parse(sessionStorage.getItem('shoppingList'));
    // Verifica si hay artículos en la lista
    if (shoppingList && shoppingList.length > 0) {
        // Muestra los artículos en la página
        document.getElementById('result').innerText = 'Artículos en la lista de compras: ' + shoppingList.join(', ');
    } else {
        // Indica que la lista está vacía si no hay artículos
        document.getElementById('result').innerText = 'Tu lista de compras está vacía.';
    }
}

// Función para cerrar sesión
function logout() {
    // Elimina el nombre de usuario de sessionStorage
    sessionStorage.removeItem('username');
    // Elimina la lista de compras de sessionStorage
    sessionStorage.removeItem('shoppingList');
    // Actualiza el texto en pantalla para indicar que no hay sesión iniciada
    document.getElementById('sessionStatus').innerText = 'No hay ninguna sesión iniciada.';
    // Limpia el campo de texto del artículo
    document.getElementById('item').value = '';
    // Limpia también el campo del nombre de usuario
    document.getElementById('username').value = '';
    // Alerta al usuario que la sesión ha sido cerrada
    alert('Sesión cerrada');
    // Limpia cualquier mensaje anterior sobre la lista de compras
    document.getElementById('result').innerText = '';
}
