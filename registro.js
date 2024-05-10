class Cliente {
  constructor(nombre, apellidos, telefono, dni, email, password, cuenta) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.telefono = telefono;
    this.dni = dni;
    this.email = email;
    this.password = password;
    this.tCuenta = cuenta;
    this.saldo = 0;
    this.transacciones = []; // Cada cliente tendrá su propio array de transacciones
  }
}


// Obtener la lista actual de clientes del almacenamiento local, o inicializar una nueva lista si no existe
let listaClientes = JSON.parse(localStorage.getItem("listaClientes")) || [];

if (listaClientes.length < 1) {
  alert("Lista vacía");
} else {
  for (let i = 0; i < listaClientes.length; i++) {
    console.log(listaClientes[i]);
  }
}



//Funcion para registrarse:
function registrarse() {
  let nombre = document.getElementById("nombre").value;
  let apellidos = document.getElementById("apellidos").value;
  let telefono = parseInt(document.getElementById("telefono").value);
  let dni = document.getElementById("dni").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let password2 = document.getElementById("password2").value;
  let cuenta = document.getElementById("tCuenta").value;

  if (
    nombre &&
    apellidos &&
    telefono &&
    dni &&
    email &&
    password &&
    password2
  ) {
    if (password.length < 8 && password2.length < 8) {
      alert("Por favor escriba una contraseña mas segura");
    } else if (password === password2) {
      // Creamos un nuevo cliente

      //Comprobar que no existe nadie con el mismo telefono dni o email:
      let repetido = false;

      for (let i = 0; i < listaClientes.length; i++) {
        if(dni=== listaClientes[i].dni || telefono === listaClientes[i].telefono || email === listaClientes[i].email){
          repetido = true;
        }        
      }

      if(repetido){
        alert("No se puede crear un cliente porque alguno de los valores como email, telefono o dni ya estan registrados con otro usuario");
      }else{
        let nCliente = new Cliente(
          nombre,
          apellidos,
          telefono,
          dni,
          email,
          password,
          cuenta
        );
        // Añadimos el nuevo cliente al array de clientes:
        listaClientes.push(nCliente);
  
        console.log("Elementos en el array " + listaClientes.length);
  
        alert("Cliente añadido");
  
        // Almacenar listaClientes actualizada en el almacenamiento local del navegador
        localStorage.setItem("listaClientes", JSON.stringify(listaClientes));
  
        for (let i = 0; i < listaClientes.length; i++) {
          console.log(listaClientes[i]);
        }
  
        alert("Mira los clientes:");
  
        // Redirigir a la página de inicio de sesión
        window.location.href = "inicio-sesion.html";
      }
    } else {
      alert("Las contraseñas tienen que ser iguales");
    }
  } else {
    alert("Por favor introduzca los valores en el formulario");
  }
}

// Función para iniciar sesión
function iniciarSesion() {
  // Obtiene el valor del input donde el usuario escribe su nombre
  var username = document.getElementById("user").value;
  var password = document.getElementById("passwd").value;

  // Verifica si el nombre de usuario está presente
  if (username) {
    // Recuperar listaClientes del almacenamiento local
    let listaClientes = JSON.parse(localStorage.getItem("listaClientes"));

    console.log("Longitud lista clientes: ", listaClientes.length);

    for (let i = 0; i < listaClientes.length; i++) {
      console.log(listaClientes[i]);
    }

    //Comprobar que el nombre de usuario o el correo existen en la lista de clientes
    let encontrado = false;

    //Comprobar por telefono:
    for (let i = 0; i < listaClientes.length; i++) {
      if (
        username == listaClientes[i].telefono &&
        password === listaClientes[i].password
      ) {
        encontrado = true;
        username = listaClientes[i].nombre;
      }
    }

    //Comprobar por email
    for (let i = 0; i < listaClientes.length; i++) {
      if (
        username == listaClientes[i].email &&
        password === listaClientes[i].password
      ) {
        username = listaClientes[i].nombre;
        encontrado = true;
      }
    }

    //Comprobar por DNI:
    for (let i = 0; i < listaClientes.length; i++) {
      if (username == listaClientes[i].dni) {
        username = listaClientes[i].nombre;
        encontrado = true;
      }
    }

    //Si se encuentra el usuario:
    if (encontrado) {
      //Almacena el nombre de usuario en sessionStorage
      sessionStorage.setItem("username", username);
      // Alerta al usuario que la sesión ha sido iniciada
      alert("Sesión iniciada para " + username);
      // Almacenar listaClientes actualizada en el almacenamiento local del navegador
      localStorage.setItem("listaClientes", JSON.stringify(listaClientes));
      window.location.href = "clientes.html";
    } else {
      alert("Credenciales no validas");
    }
  } else {
    // Alerta al usuario para que ingrese un nombre si el campo estaba vacío
    alert("Por favor, ingresa los valores en el formulario");
  }
}

/* A PARTIR DE AQUI SON PRUEBAS QUE NO ESTAN EN FUNCIONAMIENTO*/
function clientes() {
  // Recuperar el nombre de usuario del almacenamiento local
  console.log("Se ha ejecutado la funcion clientes");
  let nombre = localStorage.getItem("username");
  alert(nombre);
  console.log(nombre);

  let nombreUsuario = document.getElementById("nombUser");
  nombreUsuario.style.backgroundColor = "red";
  nombreUsuario.innerHTML = nombre;
}

//Funcion inicio sesion:
function login() {
  // Recuperar listaClientes del almacenamiento local
  let listaClientes = JSON.parse(localStorage.getItem("listaClientes"));

  const emailUsuario = document.getElementById("user").value; // Obtener el valor del campo de correo electrónico
  const passwordUsuario = document.getElementById("passwd").value; // Obtener el valor del campo de contraseña

  let encontrado = false;
  let nombreUsuario = "";

  // Verificar si la lista de clientes no está vacía
  if (listaClientes.length > 0) {
    for (let i = 0; i < listaClientes.length; i++) {
      // Comprobar si el email y la contraseña coinciden

      if (emailUsuario === listaClientes[i].email) {
        encontrado = true;
        nombreUsuario = listaClientes[i].nombre;
        break; // Salir del bucle una vez que se encuentra el usuario
      }
    }
  } else {
    alert("lista Vacia");
  }

  if (encontrado) {
    alert("Usuario válido. Iniciando sesión...");

    nombreUsuario = localStorage.setItem("nombreUsuario");
    // Aquí puedes redirigir al usuario a la página de inicio de sesión exitosa
  } else {
    alert("Usuario no válido. Verifica tus credenciales.");
  }
}
