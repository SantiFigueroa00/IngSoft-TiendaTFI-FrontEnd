//Aqui voy a guardar todos los productos
let listaProd = JSON.parse(localStorage.getItem("listaProdKey")) || [];
//Variable para guardar el codigo del producto que se editara
let codigoAux 
//Traer los input
let nombreProd = document.querySelector("#nombreProd");
let categoria = document.querySelector("#categoria");
let proveedor = document.querySelector("#proveedor");
let precio = document.querySelector("#precio");
let descripcion = document.querySelector("#descripcion");
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
    if (listaProd.length > 0) {
        //dibujar las filas de la tabla
        listaProd.forEach((itemProd) => {
            crearFila(itemProd);
        });
    }
}

function crearFila(producto) {
  let grillaProd = document.querySelector("#grillaProd");
  //Creo las cards de los producto
  grillaProd.innerHTML += ` <tr>
  <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${producto.codigo}</strong></td>
  <td>${producto.nombreProd}</td>
  <td>
    ${producto.descripcion}
  </td>
  <td><span class="badge bg-label-primary me-1">${producto.categoria}</span></td>
  <td>$${producto.precio}</td>
  <td>
  <div class="dropdown">
      <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
      <i class="bx bx-dots-vertical-rounded"></i>
      </button>
      <div class="dropdown-menu">
      <button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalEditar" onclick='editarProd("${producto.codigo}")'
          ><i class="bx bx-edit-alt me-1"></i> Editar</button
      >
      <button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalCenter" onclick='checkBorrado("${producto.codigo}")'
          ><i class="bx bx-trash me-1"></i> Eliminar</button
      >
      </div>
  </div>
  </td>
</tr>`;
}

function guardarProdsEnLocalStorage() {
    localStorage.setItem("listaProdKey", JSON.stringify(listaProd));
}

function checkBorrado(codigo) {
  btnBorrado.addEventListener("click",(e)=>{
    e.preventDefault();
    borrarProd(codigo);
  });
}

function borrarProd(codigo) {
      //Buscar el producto en el arreglo y borrarla
      let copiaListaProd = listaProd.filter(
        (itemProd) => itemProd.codigo != codigo
      );
      listaProd = copiaListaProd;
      //Actualizar el localstorage
      guardarProdsEnLocalStorage();
      //Actualizar la tabla
      borrarTabla();
      cargarInicial();
      modalBorrar.hide();
};

function borrarTabla() {
  let grillaProd = document.querySelector("#grillaProd");
  grillaProd.innerHTML = "";
}

function editarProd(codigoBuscado) {
  //Buscar dentro del arreglo el producto que quiero editar
  let prodBuscado = listaProd.find(
    (prod) => prod.codigo === codigoBuscado
  ); //return implicito
  //Mostrar la ventana modal con el formulario cargado con todos los datos del prod que selecciono el usuario
  nombreProd.value = prodBuscado.nombreProd;
  categoria.value = prodBuscado.categoria;
  proveedor.value = prodBuscado.proveedor;
  precio.value = prodBuscado.precio;
  descripcion.value = prodBuscado.descripcion;

  //Asigno el codigoBuscado a la variable auxiliar de codigo
  codigoAux=codigoBuscado;
};

formEditar.addEventListener("submit",(e)=>{
  e.preventDefault();
  actualizarProd(codigoAux);
});

function actualizarProd(codigoBuscado) {
  //Tomar todos los datos cargados del formulario, buscar el objeto que estoy mostrando en el formulario y actualizar sus valores
  
  let posicionProdBuscado= listaProd.findIndex((prod)=> codigoBuscado === prod.codigo )
  console.log(posicionProdBuscado);
  //Modificar los valores dentro del arreglo
  listaProd[posicionProdBuscado].nombreProd =  nombreProd.value 
  listaProd[posicionProdBuscado].categoria =  categoria.value 
  listaProd[posicionProdBuscado].proveedor = proveedor.value
  listaProd[posicionProdBuscado].precio = precio.value
  listaProd[posicionProdBuscado].descripcion = descripcion.value

  //Actualizar el localstorage
  guardarProdsEnLocalStorage()
  //Actualizar la tabla
  borrarTabla();
  cargarInicial();
  //Cerrar la ventana modal
  modalEditar.hide();
  //Limpiar el formulario
  formEditar.reset();
}
