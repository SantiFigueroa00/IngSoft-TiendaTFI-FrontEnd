import { Proveedor } from "./classProveedor.js";

let listaProv = JSON.parse(localStorage.getItem("listaProvKey")) || [];

//Traigo los Inputs
let razSoc = document.querySelector("#razSoc");
let rubro = document.querySelector("#rubro");
let imagen = document.querySelector("#uploadedAvatar");
let email = document.querySelector("#email");
let web = document.querySelector("#web");
let telefono = document.querySelector("#telefono");
let direccion = document.querySelector("#direccion");
let codPos = document.querySelector("#codPos");
let pais = document.querySelector("#pais");
let provincia = document.querySelector("#provincia");
let localidad = document.querySelector("#localidad");
let cuit = document.querySelector("#cuit");
let ivaCondition = document.querySelector("#ivaCondition");
let nombre = document.querySelector("#nombre");
let emailProv = document.querySelector("#emailProv");
let telProv = document.querySelector("#telProv");
let rol = document.querySelector("#rol");

//Traigo el formulario
let formProv = document.querySelector("#formProv");

formProv.addEventListener("submit",agregarProv)

function agregarProv() {
  //Creo un nuevo objeto Proveedor
  let nuevoProv = new Proveedor(
    uuidv4().slice(0, 10),
    razSoc.value,
    rubro.value,
    uploadedAvatar.src,
    email.value,
    web.value,
    telefono.value,
    direccion.value,
    codPos.value,
    pais.value,
    provincia.value,
    localidad.value,
    cuit.value,
    ivaCondition.value,
    nombre.value,
    emailProv.value,
    telProv.value,
    rol.value,
  );

  //Añado al arreglo el nuevo proveedor
  listaProv.push(nuevoProv);
  localStorage.setItem("listaProvKey", JSON.stringify(listaProv));
  formProv.reset();
}
