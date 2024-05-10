// Recuperar el nombre de usuario del almacenamiento local
let nombre = sessionStorage.getItem("username");

//Recuperar lista de clientes
let listaClientes = JSON.parse(localStorage.getItem("listaClientes"));

let nombreUsuario = document.getElementById("nombreUsuario");
nombreUsuario.style.marginLeft="5px";
nombreUsuario.innerHTML = nombre;

console.log(nombre);



