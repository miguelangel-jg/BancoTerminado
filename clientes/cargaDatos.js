let username = sessionStorage.getItem("username");

let listaClientes = JSON.parse(localStorage.getItem("listaClientes"));


function cargarInformacionCliente() {
  let username = sessionStorage.getItem("username");
  let listaClientes = JSON.parse(localStorage.getItem("listaClientes"));

  for (let i = 0; i < listaClientes.length; i++) {
    if (username === listaClientes[i].nombre) {
      // Cargar información del cliente
      let nombreUsuario = document.getElementById("nombreUsuario");
      nombreUsuario.innerHTML = listaClientes[i].nombre;

      let apellidos = document.getElementById("apellidos");
      apellidos.innerHTML = listaClientes[i].apellidos;

      let telefono = document.getElementById("telefono");
      telefono.innerHTML = listaClientes[i].telefono;

      let email = document.getElementById("email");
      email.innerHTML = listaClientes[i].email;

      let DNI = document.getElementById("dni");
      DNI.innerHTML = listaClientes[i].dni;

      let saldo = document.getElementById("saldo");
      if (listaClientes[i].saldo < 50) {
        saldo.style.color = "red";
      }
      saldo.innerHTML = listaClientes[i].saldo + " €";

      // Cargar transacciones del cliente
      let transaccionesCliente = listaClientes[i].transacciones;
      let cuerpoTabla = document.getElementById("cuerpoTablaTransacciones");

      // Limpiar la tabla antes de agregar las nuevas transacciones
      cuerpoTabla.innerHTML = "";

      // Iterar sobre las transacciones y construir las filas de la tabla
      for (let j = 0; j < transaccionesCliente.length; j++) {
        let nuevaFila = document.createElement("tr");
      
        let concepto = document.createElement("td");
        concepto.textContent = transaccionesCliente[j].concepto;
        nuevaFila.appendChild(concepto);
      
        let cantidad = document.createElement("td");
        
      
        // Verificar el tipo de transacción y asignar el color correspondiente
        if (transaccionesCliente[j].tipo === "Ingreso") {
          cantidad.textContent = "+" + transaccionesCliente[j].cantidad + "€";
          cantidad.style.color = "#28a745"; 
        } else {
          cantidad.textContent = "-" + transaccionesCliente[j].cantidad + "€" ;
          cantidad.style.color = "red"; 
        }
      
        nuevaFila.appendChild(cantidad);
      
        let tipo = document.createElement("td");
        tipo.textContent = transaccionesCliente[j].tipo;
        nuevaFila.appendChild(tipo);
      
        // Agregar la nueva fila a la tabla
        cuerpoTabla.appendChild(nuevaFila);
      }
    }
  }
}


// Función para cerrar sesión
function cerrarSesion() {
  // Elimina el nombre de usuario de sessionStorage
  sessionStorage.removeItem("username");

  // Actualiza el texto en pantalla para indicar que no hay sesión iniciada
  alert("Se ha cerrado la sesion");

  // Almacenar listaClientes actualizada en el almacenamiento local del navegador
  localStorage.setItem("listaClientes", JSON.stringify(listaClientes));

  window.location.href = "../index.html";
}



window.onload = cargarInformacionCliente;