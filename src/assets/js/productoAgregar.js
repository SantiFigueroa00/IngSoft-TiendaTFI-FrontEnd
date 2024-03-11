import { Producto } from "./classProducto.js";

let listaProd = JSON.parse(localStorage.getItem("listaProdKey")) || [];

//Traigo los Inputs
let nombreProd = document.querySelector("#nombreProd");
let categoria = document.querySelector("#categoria");
let proveedor = document.querySelector("#proveedor");
let precio = document.querySelector("#precio");
let descripcion = document.querySelector("#descripcion");

//Traigo el formulario
let formProd = document.querySelector("#formProd");

formProd.addEventListener("submit",agregarProd)

function agregarProd() {
  //Creo un nuevo objeto Producto
  let nuevoProd = new Producto(
    uuidv4().slice(0, 10),
    nombreProd.value,
    categoria.value,
    proveedor.value,
    precio.value,
    descripcion.value
  );

  //Añado al arreglo el nuevo Producto
  listaProd.push(nuevoProd);
  localStorage.setItem("listaProdKey", JSON.stringify(listaProd));
  formProd.reset();
}
