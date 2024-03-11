export class OrdenCompra {
    constructor(numeroOrden, fechaEmision, fechaEntregaEsperada, infoRecepcion, proveedor, productos) {
      this.numeroOrden = numeroOrden;
      this.fechaEmision = fechaEmision;
      this.fechaEntregaEsperada = fechaEntregaEsperada;
      this.infoRecepcion = infoRecepcion;
      this.proveedor = proveedor;
      this.productos = productos; // Se espera que productos sea un array de objetos { nombre, cantidad }
    }
  
    calcularTotal() {
      return this.productos.reduce((total, producto) => {
        return total + (producto.precio * producto.cantidad);
      }, 0);
    }
  }