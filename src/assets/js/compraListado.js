//Aqui voy a guardar todos las ordenes de compra
let listaCompra = JSON.parse(localStorage.getItem("listaCompraKey")) || [];
//Variable para guardar el n° de orden que se editara
let codigoAux 
//Traer los input
let proveedor = document.querySelector("#proveedor");
let emision = document.querySelector("#emision");
let entrega = document.querySelector("#entrega");
let direccion = document.querySelector("#direccion");
let formEditar = document.querySelector("#formEditar");
let btnBorrado = document.querySelector("#btnBorrado");

// Crear una instancia de la ventana modal
const modalEditar = new bootstrap.Modal(
       document.querySelector("#modalEditar")
);
const modalBorrar = new bootstrap.Modal(
       document.querySelector("#modalCenter")
);

cargarInicial();

function cargarInicial() {
    if (listaCompra.length > 0) {
        //dibujar las filas de la tabla
        listaCompra.forEach((itemCompra) => {
            crearFila(itemCompra);
        });
    }
}

function crearFila(orden) {
  let grillaProv1 = document.querySelector("#grillaProv1");
  let grillaProv2 = document.querySelector("#grillaProv2");
  let grillaProv3 = document.querySelector("#grillaProv3");

    switch (orden.proveedor) {
        case "Proveedor 1":
            grillaProv1.innerHTML += ` <tr>
            <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${orden.numeroOrden}</strong></td>
            <td>${orden.fechaEmision}</td>
            <td>${orden.fechaEntregaEsperada}</td>
            <td>${orden.infoRecepcion}</td>
            <td>
                <div class="dropdown">
                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu">
                    <button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalEditar"
                    onclick='editarOrden("${orden.numeroOrden}")'><i class="bx bx-edit-alt me-1"></i> Editar</button>
                    <button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalCenter"
                    onclick='checkBorrado("${orden.numeroOrden}")'><i class="bx bx-trash me-1"></i> Eliminar</button>
                </div>
                </div>
            </td>
            </tr>`;
            break;
        case "Proveedor 2":
            grillaProv2.innerHTML += ` <tr>
            <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${orden.numeroOrden}</strong></td>
            <td>${orden.fechaEmision}</td>
            <td>${orden.fechaEntregaEsperada}</td>
            <td>${orden.infoRecepcion}</td>
            <td>
                <div class="dropdown">
                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu">
                    <button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalEditar"
                    onclick='editarOrden("${orden.numeroOrden}")'><i class="bx bx-edit-alt me-1"></i> Editar</button>
                    <button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalCenter"
                    onclick='checkBorrado("${orden.numeroOrden}")'><i class="bx bx-trash me-1"></i> Eliminar</button>
                </div>
                </div>
            </td>
            </tr>`;
            break;
        case "Proveedor 3":
            grillaProv3.innerHTML += ` <tr>
            <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${orden.numeroOrden}</strong></td>
            <td>${orden.fechaEmision}</td>
            <td>${orden.fechaEntregaEsperada}</td>
            <td>${orden.infoRecepcion}</td>
            <td>
                <div class="dropdown">
                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu">
                    <button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalEditar"
                    onclick='editarOrden("${orden.numeroOrden}")'><i class="bx bx-edit-alt me-1"></i> Editar</button>
                    <button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalCenter"
                    onclick='checkBorrado("${orden.numeroOrden}")'><i class="bx bx-trash me-1"></i> Eliminar</button>
                </div>
                </div>
            </td>
            </tr>`;
            break;
    
        default:
            console.log("Orden de compra sin proveedor");
            break;
    }
}

function guardarComprasEnLocalStorage() {
    localStorage.setItem("listaCompraKey", JSON.stringify(listaCompra));
}

function checkBorrado(codigo) {
  btnBorrado.addEventListener("click",(e)=>{
    e.preventDefault();
    borrarCompra(codigo);
  });
}

function borrarCompra(codigo) {
      //Buscar la orden de compra en el arreglo y borrarla
      let copiaListaCompra = listaCompra.filter(
        (itemCompra) => itemCompra.numeroOrden != codigo
      );
      listaCompra = copiaListaCompra;
      //Actualizar el localstorage
      guardarComprasEnLocalStorage();
      //Actualizar la tabla
      borrarTabla();
      cargarInicial();
      modalBorrar.hide();
};

function borrarTabla() {
  let grillaProv1 = document.querySelector("#grillaProv1");
  let grillaProv2 = document.querySelector("#grillaProv2");
  let grillaProv3 = document.querySelector("#grillaProv3");
  grillaProv1.innerHTML = "";
  grillaProv2.innerHTML = "";
  grillaProv3.innerHTML = "";
}

function editarOrden(codigoBuscado) {
  //Buscar dentro del arreglo la orden de compra que quiero editar
  let ordenBuscado = listaCompra.find(
    (orden) => orden.numeroOrden === codigoBuscado
  ); //return implicito
  //Mostrar la ventana modal con el formulario cargado con todos los datos de la orden que selecciono el usuario
  proveedor.value = ordenBuscado.proveedor;
  emision.value = ordenBuscado.fechaEmision;
  entrega.value = ordenBuscado.fechaEntregaEsperada;
  direccion.value = ordenBuscado.infoRecepcion;

  //Asigno el codigoBuscado a la variable auxiliar de codigo
  codigoAux=codigoBuscado;
};

formEditar.addEventListener("submit",(e)=>{
  e.preventDefault();
  actualizarOrden(codigoAux);
});

function actualizarOrden(codigoBuscado) {
  //Tomar todos los datos cargados del formulario, buscar el objeto que estoy mostrando en el formulario y actualizar sus valores
  
  let posicionOrdenBuscado= listaCompra.findIndex((orden)=> codigoBuscado === orden.numeroOrden )
  console.log(proveedor.value);
  //Modificar los valores dentro del arreglo
  listaCompra[posicionOrdenBuscado].proveedor =  proveedor.value ;
  listaCompra[posicionOrdenBuscado].fechaEmision =  emision.value ;
  listaCompra[posicionOrdenBuscado].fechaEntregaEsperada = entrega.value;
  listaCompra[posicionOrdenBuscado].infoRecepcion = direccion.value;

  //Actualizar el localstorage
  guardarComprasEnLocalStorage()
  //Actualizar la tabla
  borrarTabla();
  cargarInicial();
  //Cerrar la ventana modal
  modalEditar.hide();
  //Limpiar el formulario
  formEditar.reset();
}
