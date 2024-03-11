import { OrdenCompra } from "./classOrden.js";

let listaCompra = JSON.parse(localStorage.getItem("listaCompraKey")) || [];
//Variable para guardar el codigo del producto que se editara
let codigoAux 

//Traigo los Inputs
let proveedor = document.querySelector("#proveedor");
let producto = document.querySelector("#producto");
let emision = document.querySelector("#emision");
let entrega = document.querySelector("#entrega");
let direccion = document.querySelector("#direccion");
let cantidad = document.querySelector("#cantidad");
let precio = document.querySelector("#precio");
let grillaProd = document.querySelector("#grillaProd");
let btnBorrado = document.querySelector("#btnBorrado");
let formModal = document.querySelector("#formModal");

let productos = [];

// Crear una instancia de la ventana modal
const modalEditar = new bootstrap.Modal(
    document.querySelector("#modalEditar")
);
const modalBorrar = new bootstrap.Modal(
    document.querySelector("#modalCenter")
);

//Traigo el formulario
let formProd = document.querySelector("#formProd");
console.log(formProd)
formProd.addEventListener("submit",agregarProd);

function agregarProd() {
  //Creo un nuevo objeto Producto
  let nuevoProd = {codigo: uuidv4().slice(0, 10),nombre: producto.value , cantidad: cantidad.value, precio: precio.value};
  
  // Busco si ya existe un producto con el mismo nombre
  let indiceProductoExistente = productos.findIndex(prod => prod.nombre === nuevoProd.nombre);

  if (indiceProductoExistente !== -1) {
    // Si el producto existe, modifico cantidad y precio en el arreglo directamente
    productos[indiceProductoExistente].cantidad = parseInt(productos[indiceProductoExistente].cantidad) + parseInt(nuevoProd.cantidad);
    productos[indiceProductoExistente].precio = nuevoProd.precio;
  } else {
    // Si el producto no existe, lo agrego al arreglo
    productos.push(nuevoProd);
  }

  borrarTabla();
  cargarInicial();
  formProd.reset();
}

let formCompra = document.querySelector("#formCompra");
formCompra.addEventListener("submit",agregarCompra);

function agregarCompra() {
    //Creo un nuevo objeto OrdenCompra
    let nuevaCompra = new OrdenCompra(
      uuidv4().slice(0, 10),
      emision.value,
      entrega.value,
      direccion.value,
      proveedor.value,
      productos
    );
  
    //Añado al arreglo la nuevaCompra
    listaCompra.push(nuevaCompra);
    localStorage.setItem("listaCompraKey", JSON.stringify(listaCompra));
    borrarTabla();
    formCompra.reset();
}


cargarInicial();

function cargarInicial() {
    if (productos.length > 0) {
        //dibujar las filas de la tabla
        productos.forEach((producto) => {
            crearFila(producto);
        });
    }
    let resultado = productos.reduce((total, producto) => {
        return total + (producto.precio * producto.cantidad);
      }, 0);
    grillaProd.innerHTML += `<tr id="">
    <td colspan="4">Total:</td>
    <td id="total">$${resultado}</td>
    <td></td>
  </tr>`
}

function borrarTabla() {
    grillaProd.innerHTML = "";
}

function crearFila(producto) {
  //Creo las filas de los producto
  grillaProd.innerHTML += ` <tr>
  <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${producto.codigo}</strong></td>
  <td>${producto.nombre}</td>
  <td>${producto.cantidad}</td>
  <td>$${producto.precio}</td>
  <td>$${producto.precio*producto.cantidad}</td>
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

window.checkBorrado = function(codigo) {
    btnBorrado.addEventListener("click",(e)=>{
      e.preventDefault();
      borrarProd(codigo);
    });
  }
  
  function borrarProd(codigo) {
        //Buscar el producto en el arreglo y borrarlo
        let copiaListaProd = productos.filter(
          (itemProd) => itemProd.codigo != codigo
        );
        productos = copiaListaProd;

        //Actualizar la tabla
        borrarTabla();
        cargarInicial();
        modalBorrar.hide();
  };

window.editarProd= function(codigoBuscado) {
    //Buscar dentro del arreglo el producto que quiero editar
    let prodBuscado = productos.find(
      (prod) => prod.codigo === codigoBuscado
    ); //return implicito
    //Mostrar la ventana modal con el formulario cargado con todos los datos del prod que selecciono el usuario
    productoModal.value = prodBuscado.nombre;
    cantidadModal.value = prodBuscado.cantidad;
    precioModal.value = prodBuscado.precio;
    modalEditar.show();
    console.log(precio.value)
    //Asigno el codigoBuscado a la variable auxiliar de codigo
    codigoAux=codigoBuscado;
  };
  
  formModal.addEventListener("submit",(e)=>{
    e.preventDefault();
    actualizarProd(codigoAux);
  });
  
  function actualizarProd(codigoBuscado) {
    //Tomar todos los datos cargados del formulario, buscar el objeto que estoy mostrando en el formulario y actualizar sus valores
    
    let posicionProdBuscado= productos.findIndex((prod)=> codigoBuscado === prod.codigo )
 
    //Modificar los valores dentro del arreglo
    productos[posicionProdBuscado].nombre =  productoModal.value;
    productos[posicionProdBuscado].cantidad =  cantidadModal.value; 
    productos[posicionProdBuscado].precio = precioModal.value;

    //Actualizar la tabla
    borrarTabla();
    cargarInicial();
    //Cerrar la ventana modal
    modalEditar.hide();
    //Limpiar el formulario
    formModal.reset();
  }