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
        cantidad.textContent = transaccionesCliente[j].cantidad;

        // Verificar el tipo de transacción y asignar el color correspondiente
        if (transaccionesCliente[j].tipo === "Ingreso") {
          cantidad.style.color = "#28a745"; // Verde oscuro
        } else {
          cantidad.style.color = "red"; // Rojo
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

function ingresarDinero() {
  let username = sessionStorage.getItem("username");
  let listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
  let cantidadIngresar = parseInt(
    document.getElementById("cantidadIngreso").value
  );

  for (let i = 0; i < listaClientes.length; i++) {
    if (username === listaClientes[i].nombre) {
      listaClientes[i].saldo += cantidadIngresar;

      // Agregar transacción al cliente
      let Transaccion = {
        concepto: "Ingreso",
        cantidad: cantidadIngresar,
        tipo: "Ingreso",
      };
      listaClientes[i].transacciones.push(Transaccion);

      // Almacenar listaClientes actualizada en el almacenamiento local del navegador
      localStorage.setItem("listaClientes", JSON.stringify(listaClientes));

      alert("Ingreso realizado");
    }
  }
}

function realizarTransferencia() {
  // Obtener el nombre de usuario del remitente y la lista de clientes del almacenamiento local
  let username = sessionStorage.getItem("username");
  let listaClientes = JSON.parse(localStorage.getItem("listaClientes"));

  for (let i = 0; i < listaClientes.length; i++) {
    console.log(listaClientes[i]);
  }
  alert("Mira los clientes:");

  // Obtener el nombre del destinatario y la cantidad a transferir de los elementos HTML
  let nombreDestinatario = document.getElementById("emailDest").value;
  let cantidadTransferir = parseInt(document.getElementById("cantTrans").value);

  // Buscar al remitente y al destinatario en la lista de clientes
  let remitente = listaClientes.find((cliente) => cliente.nombre === username);
  let destinatario = listaClientes.find(
    (cliente) => cliente.email === nombreDestinatario
  );

  if (!remitente || !destinatario) {
    alert("El remitente o el destinatario no existen en la lista de clientes.");
    return;
  }

  if (remitente.saldo < cantidadTransferir) {
    alert(
      "El remitente no tiene suficiente saldo para realizar la transferencia."
    );
    return;
  }

  // Actualizar el saldo del destinatario sumando la cantidad a transferir
  destinatario.saldo += cantidadTransferir;

  // Restar la cantidad transferida del saldo del remitente
  remitente.saldo -= cantidadTransferir;

  // Agregar transacción al cliente
  let Transaccion = {
    concepto: `Transferencia a ${destinatario.nombre}`,
    cantidad: cantidadTransferir,
    tipo: "Extracto",
  };

  remitente.transacciones.push(Transaccion);

  // Agregar transacción al cliente
  Transaccion = {
    concepto: `Transferencia de: ${remitente.nombre}`,
    cantidad: cantidadTransferir,
    tipo: "Ingreso",
  };

  destinatario.transacciones.push(Transaccion);

  // Almacenar listaClientes actualizada en el almacenamiento local del navegador
  localStorage.setItem("listaClientes", JSON.stringify(listaClientes));

  alert("Transferencia realizada con exito");
}

//Funcion para realizar un bizum
function bizum() {
  // Obtener el nombre de usuario del remitente y la lista de clientes del almacenamiento local
  let username = sessionStorage.getItem("username");
  let listaClientes = JSON.parse(localStorage.getItem("listaClientes"));

  // Obtener el nombre del destinatario y la cantidad a transferir de los elementos HTML
  let telefonoDestinatario = parseInt(document.getElementById("telf").value);
  let cantidadTransferir = parseInt(document.getElementById("cantB").value);

  // Buscar al remitente y al destinatario en la lista de clientes
  let remitente = listaClientes.find((cliente) => cliente.nombre === username);
  let destinatario = listaClientes.find(
    (cliente) => cliente.telefono === telefonoDestinatario
  );

  if (!remitente || !destinatario) {
    alert("El remitente o el destinatario no existen en la lista de clientes.");
    return;
  }

  if (remitente.saldo < cantidadTransferir) {
    alert(
      "El remitente no tiene suficiente saldo para realizar la transferencia."
    );
    return;
  }

  // Actualizar el saldo del destinatario sumando la cantidad a transferir
  destinatario.saldo += cantidadTransferir;

  // Restar la cantidad transferida del saldo del remitente
  remitente.saldo -= cantidadTransferir;

  // Agregar transacción al cliente
  let Transaccion = {
    concepto: `Bizum a ${destinatario.nombre}`,
    cantidad: cantidadTransferir,
    tipo: "Extracto",
  };

  remitente.transacciones.push(Transaccion);

  // Agregar transacción al cliente
  Transaccion = {
    concepto: `Bizum recibido de: ${remitente.nombre}`,
    cantidad: cantidadTransferir,
    tipo: "Ingreso",
  };

  destinatario.transacciones.push(Transaccion);


  // Actualizar la lista de clientes en el almacenamiento local
  localStorage.setItem("listaClientes", JSON.stringify(listaClientes));

  // Notificar que la transferencia se realizó con éxito
  alert("Bizum realizado con exito");
}

function sacarDinero() {
  // Obtener el nombre de usuario del remitente y la lista de clientes del almacenamiento local
  let username = sessionStorage.getItem("username");
  let listaClientes = JSON.parse(localStorage.getItem("listaClientes"));

  let cantidadSacar = parseInt(document.getElementById("cantS").value);

  // Buscar al usuario en la lista de clientes
  let usuario;
  for (let i = 0; i < listaClientes.length; i++) {
    if (username === listaClientes[i].nombre) {
      usuario = listaClientes[i];
      break; // Salir del bucle una vez encontrado el usuario
    }

    for (let i = 0; i < listaClientes.length; i++) {
      if (username === listaClientes[i].nombre) {
        if (listaClientes[i].saldo < cantidadSacar) {
          alert("No hay suficiente saldo");
        } else {
          listaClientes[i].saldo -= cantidadSacar;
          // Agregar transacción al cliente
          let Transaccion = {
            concepto: "Extracto en cajero",
            cantidad: cantidadSacar,
            tipo: "Extracto",
          };
          listaClientes[i].transacciones.push(Transaccion);
        }
        
      }
    }

    // Actualizar la lista de clientes en el almacenamiento local
    localStorage.setItem("listaClientes", JSON.stringify(listaClientes));

    alert("Extracto realizado");
  }
  
}

