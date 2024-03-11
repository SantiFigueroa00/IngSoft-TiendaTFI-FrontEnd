//Aqui voy a guardar todos los proveedores
let listaProv = JSON.parse(localStorage.getItem("listaProvKey")) || [];
//Variable para guardar el codigo del proveedor que se editara
let codigoAux 
//Traer los input
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
    if (listaProv.length > 0) {
        //dibujar las filas de la tabla
        listaProv.forEach((itemProv) => {
            crearFila(itemProv);
        });
    }
}

function crearFila(proveedor) {
  let grillaProv = document.querySelector("#grillaProv");
  //Creo las cards de los proveedores
  grillaProv.innerHTML += ` <div class="col-md-12">
  <div class="card mb-3">
    <div class="row g-0 ">
      <div class="col-md-4">
        <img class="card-img card-img-left img-prov" src="${proveedor.imagen}" alt="Card image" />
      </div>
      <div class="col-md-8">
        <div class="card-body ">
          <div class="row ">
            <div class="col-md-12">
              <h5 class="card-title mb-3">${proveedor.razSoc} - ${proveedor.codigo}</h5>
            </div>
            <div class="col-md-6">
              <h6 class="card-subtitle text-muted">Rubro</h6>
              <p class="card-text">
                ${proveedor.rubro}
              </p>
              <h6 class="card-subtitle text-muted">Email</h6>
              <p class="card-text">
                ${proveedor.email}
              </p>
              <h6 class="card-subtitle text-muted">Telefono</h6>
              <p class="card-text">
                ${proveedor.telefonoEmp}
              </p>
            </div>
            <div class="col-md-6">
              <h6 class="card-subtitle text-muted mb-2">Datos de contacto</h6>
              <h6 class="card-subtitle text-muted">Nombre y Apellido</h6>
              <p class="card-text">
                ${proveedor.nombre}
              </p>
              <h6 class="card-subtitle text-muted">Rol</h6>
              <p class="card-text">
                ${proveedor.rol}
              </p>
              <h6 class="card-subtitle text-muted">Telefono</h6>
              <p class="card-text">
                ${proveedor.telProv}
              </p>
            </div>
            <div class="col-md-12 mt-4">
              <div class="d-flex justify-content-end">
              
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modalEditar" onclick='editarProv("${proveedor.codigo}")'>
                  Editar
                </button>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-outline-danger ms-2" data-bs-toggle="modal" data-bs-target="#modalCenter" onclick='checkBorrado("${proveedor.codigo}")'>
                                      Eliminar
                </button>
              </div>
            </div>
          </div>    
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function guardarProvsEnLocalStorage() {
    localStorage.setItem("listaProvKey", JSON.stringify(listaProv));
}

function checkBorrado(codigo) {
  btnBorrado.addEventListener("click",(e)=>{
    e.preventDefault();
    borrarProv(codigo);
  });
}

function borrarProv(codigo) {
      //Buscar el proveedor en el arreglo y borrarla
      let copiaListaProv = listaProv.filter(
        (itemProv) => itemProv.codigo != codigo
      );
      listaProv = copiaListaProv;
      //Actualizar el localstorage
      guardarProvsEnLocalStorage();
      //Actualizar la tabla
      borrarTabla();
      cargarInicial();
      modalBorrar.hide();
};

function borrarTabla() {
  let grillaProv = document.querySelector("#grillaProv");
  grillaProv.innerHTML = "";
}

function editarProv(codigoBuscado) {
  //Buscar dentro del arreglo el proveedor que quiero editar
  let provBuscado = listaProv.find(
    (prov) => prov.codigo === codigoBuscado
  ); //return implicito
  console.log(provBuscado);
  //Mostrar la ventana modal con el formulario cargado con todos los datos del prov que selecciono el usuario
  razSoc.value = provBuscado.razSoc;
  rubro.value = provBuscado.rubro;
  email.value = provBuscado.email;
  web.value = provBuscado.web;
  telefono.value = provBuscado.telefonoEmp;
  direccion.value = provBuscado.direc;
  codPos.value = provBuscado.codPos;
  pais.value = provBuscado.pais;
  provincia.value = provBuscado.provincia;
  localidad.value = provBuscado.localidad;
  cuit.value = provBuscado.cuit;
  ivaCondition.value = provBuscado.iva;
  nombre.value = provBuscado.nombre;
  emailProv.value = provBuscado.emailProv;
  telProv.value = provBuscado.telProv;
  rol.value = provBuscado.rol;
  //Asigno el codigoBuscado a la variable auxiliar de codigo
  codigoAux=codigoBuscado;
};

formEditar.addEventListener("submit",(e)=>{
  e.preventDefault();
  actualizarProv(codigoAux);
});

function actualizarProv(codigoBuscado) {
  //Tomar todos los datos cargados del formulario, buscar el objeto que estoy mostrando en el formulario y actualizar sus valores
  
  let posicionProvBuscado= listaProv.findIndex((prov)=> codigoBuscado === prov.codigo )
  console.log(posicionProvBuscado);
  //Modificar los valores dentro del arreglo
  listaProv[posicionProvBuscado].razSoc =  razSoc.value 
  listaProv[posicionProvBuscado].rubro =  rubro.value 
  listaProv[posicionProvBuscado].email = email.value
  listaProv[posicionProvBuscado].web =  web.value
  listaProv[posicionProvBuscado].telefonoEmp = telefono.value
  listaProv[posicionProvBuscado].direc = direccion.value
  listaProv[posicionProvBuscado].codPos = codPos.value
  listaProv[posicionProvBuscado].pais = pais.value
  listaProv[posicionProvBuscado].provincia = provincia.value
  listaProv[posicionProvBuscado].localidad = localidad.value
  listaProv[posicionProvBuscado].cuit =  cuit.value 
  listaProv[posicionProvBuscado].ivaCondition = ivaCondition.value
  listaProv[posicionProvBuscado].nombre =  nombre.value
  listaProv[posicionProvBuscado].emailProv = emailProv.value 
  listaProv[posicionProvBuscado].telProv = telProv.value
  listaProv[posicionProvBuscado].rol =  rol.value 
  //Actualizar el localstorage
  guardarProvsEnLocalStorage()
  //Actualizar la tabla
  borrarTabla();
  cargarInicial();
  //Cerrar la ventana modal
  modalEditar.hide();
  //Limpiar el formulario
  formEditar.reset();
}
