import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvidersService } from '../../../providers/services/providers.service';
import { ProductsService } from '../../../products-services/services/products.service';
import { OrdersService } from '../../services/orders.service';
import { ToastServiceSuccess } from '../../../shared/components/toast/toast-success/toast-service';
import { Sesion } from '../../../models/Sesion';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LineaDeVenta, Venta } from '../../../models/Venta';
import { EMPTY, catchError } from 'rxjs';
import { Articulo } from '../../../models/Articulo';
import { Stock } from '../../../models/Stock';
import { LineaDeVentaReq } from '../../../models/LineaDeVentaReq';
import { Router } from '@angular/router';
import { Cliente } from '../../../models/Cliente';
import { ClienteService } from '../../../clientes/services/cliente.service';
import { TarjetaReq } from '../../../models/TarjetaReq';
import { AppToastService } from '../../../shared/components/toast/toast-info/toast-info-service';

@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrl: './orders-add.component.css',
})
export class OrdersAddComponent {
  @ViewChild('successTpl') successTpl!: TemplateRef<any>;

  sesion: Sesion = JSON.parse(localStorage.getItem('sesion')!);

  modalService = inject(NgbModal);

  auxOrder: any = {};
  nuevaVenta: Venta = {
    id: '',
    creadaUtc: new Date(),
    confirmada: false,
    confirmadaUtc: new Date(),
    vendedor: undefined,
    puntoDeVenta: undefined,
    cliente: {
      id: '',
      nombre: '',
      apellido: '',
      condicionTributaria: {
        id: '',
        descripcion: '',
        tipo: 0,
      },
      numeroDocumento: {
        numero: '',
        descripcion: '',
        tipoDocumento: 0,
      },
    },
    tipoDeComprobante: undefined,
    lineasDeVenta: [],
    pago: undefined,
    total: 0,
  };

  idEditLinea: string = '';
  idProdDelete: string = '';
  descripArticuloEdit: string = '';
  editLineaDeVenta: { lineaDeVentaId: string; cantidad: number } = {
    lineaDeVentaId: '',
    cantidad: 0,
  };
  borrarLineaDeVenta: { lineaDeVentaId: string; cantidad: number } = {
    lineaDeVentaId: '',
    cantidad: 0,
  };

  filtroBusqueda: string = '';
  articuloBusqueda: Articulo = {
    id: '',
    codigoArticulo: '',
    marca: {
      nombre: '',
    },
    categoria: {
      descripcion: '',
    },
    descripcion: '',
    precioFinal: 0,
    stocks: [],
  };
  stocksBusqueda: Stock[] = [];

  clientes: Cliente[] = [];

  nuevaTarjeta: TarjetaReq = {
    numeroTarjeta: '',
    mesExpiracion: 0,
    anioExpiracion: 0,
    codigoDeSeguridad: 0,
    nombreTitular: '',
    apellidoTitular: '',
    dniTitular: '',
  };

  // REACTIVE FORM
  myFormReactivoProd: FormGroup;
  myFormReactivoPago: FormGroup;
  myFormReactivoEfectivo: FormGroup;

  router = inject(Router);

  clienteServ = inject(ClienteService);

  @ViewChild('errorTpl') errorTpl!: TemplateRef<any>;
  @ViewChild('infoTpl') infoTpl!: TemplateRef<any>;
  toastService = inject(AppToastService);
  infoError: string = '';
  infoString: string = '';
  showErrorToast(template: TemplateRef<any>) {
    this.toastService.show({
      template,
      classname: 'bg-danger text-dark',
      delay: 5000,
    });
  }
  showInfoToast(template: TemplateRef<any>) {
    this.toastService.show({
      template,
      classname: 'bg-primary text-white',
      delay: 5000,
    });
  }
  showDeleteToast(template: TemplateRef<any>) {
    this.toastService.show({
      template,
      classname: 'bg-danger text-black',
      delay: 5000,
    });
  }

  constructor(
    private fb: FormBuilder,
    public providerServ: ProvidersService,
    public productServ: ProductsService,
    public orderServ: OrdersService,
    public toastServ: ToastServiceSuccess
  ) {
    this.myFormReactivoPago = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      numeroTarjeta: ['', [Validators.required]],
      codSeg: ['', [Validators.required]],
      mesVenc: ['', [Validators.required]],
      anioVenc: ['', [Validators.required]],
    });
    this.myFormReactivoProd = this.fb.group({
      quantity: [
        '',
        [Validators.required, Validators.max(1000), Validators.min(1)],
      ],
    });
    this.myFormReactivoEfectivo = this.fb.group({
      monto: ['', [Validators.required, Validators.min(1)]],
      vuelto: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    this.orderServ
      .createOrder(this.auxOrder)
      .pipe(
        catchError((error) => {
          if (error.error.status == 400) {
            for (const key in error.error.errors) {
              this.infoError = key + ': ' + error.error.errors[key];
              this.showErrorToast(this.errorTpl);
            }
          } else if(error.error.title == 'Ya hay una venta en proceso para esta sesion'){
            this.mostrarVentaActual();
            this.infoString = 'Venta Actual';
            this.showInfoToast(this.infoTpl);
          } else{
            this.infoError = error.error.title;
            this.showErrorToast(this.errorTpl);
          }
          return EMPTY;
        })
      ).subscribe((res) => {
        this.infoString = 'Venta creada correctamente';
        this.showInfoToast(this.infoTpl);
        this.nuevaVenta = res;
      });

    this.clienteServ
      .obtenerClientes()
      .pipe(
        catchError(error=>{
          if(error.error.status == 400){
            for (const key in error.error.errors) {
              this.infoError = key + ": " + error.error.errors[key];
              this.showErrorToast(this.errorTpl);
            }
          }else{
            this.infoError = error.error.title;
            this.showErrorToast(this.errorTpl);
          }
          return EMPTY
        })
      ).subscribe((res) => {
        console.log(res);
        this.clientes = res.clientes;
      });
  }

  mostrarVentaActual() {
    this.orderServ
      .obtenerVentaActual()
      .pipe(
        catchError(error=>{
          if(error.error.status == 400){
            for (const key in error.error.errors) {
              this.infoError = key + ": " + error.error.errors[key];
              this.showErrorToast(this.errorTpl);
            }
          }else{
            this.infoError = error.error.title;
            this.showErrorToast(this.errorTpl);
          }
          return EMPTY
        })
      ).subscribe((res) => {
        
        this.nuevaVenta = res;
      });
  }

  onSubmitPago(modalAdd: TemplateRef<any>) {
    if (this.myFormReactivoPago.valid) {
      console.log('Formulario válido:', this.myFormReactivoPago.value);
      this.mapFormValuesToTarjeta();
      this.orderServ
        .pagoTarjeta(this.nuevaVenta.id, this.nuevaTarjeta)
        .pipe(
          catchError(error=>{
            if(error.error.status == 400){
              for (const key in error.error.errors) {
                this.infoError = key + ": " + error.error.errors[key];
                this.showErrorToast(this.errorTpl);
              }
            }else{
              this.infoError = error.error.title;
              this.showErrorToast(this.errorTpl);
            }
            return EMPTY
          })
        ).subscribe((res) => {
          console.log(res);
          this.orderServ
            .confirmarVenta(this.nuevaVenta.id)
            .pipe(
              catchError(error=>{
                if(error.error.status == 400){
                  for (const key in error.error.errors) {
                    this.infoError = key + ": " + error.error.errors[key];
                    this.showErrorToast(this.errorTpl);
                  }
                }else{
                  this.infoError = error.error.title;
                  this.showErrorToast(this.errorTpl);
                }
                return EMPTY
              })
            ).subscribe((res) => {
              this.infoString = 'Pago con Tarjeta Confirmado';
              this.showInfoToast(this.infoTpl);
              this.myFormReactivoPago.reset();
              this.modalService.open(modalAdd, { size: 'lg' });
            });
        });
    } else {
      console.log('form invalido:', this.myFormReactivoPago.value);
    }
  }

  mapFormValuesToTarjeta() {
    this.nuevaTarjeta.numeroTarjeta =
      this.myFormReactivoPago.get('numeroTarjeta')?.value || '';
    this.nuevaTarjeta.mesExpiracion =
      this.myFormReactivoPago.get('mesVenc')?.value || 0;
    this.nuevaTarjeta.anioExpiracion =
      this.myFormReactivoPago.get('anioVenc')?.value || 0;
    this.nuevaTarjeta.codigoDeSeguridad =
      this.myFormReactivoPago.get('codSeg')?.value || '';
    this.nuevaTarjeta.nombreTitular =
      this.myFormReactivoPago.get('nombre')?.value || '';
    this.nuevaTarjeta.apellidoTitular =
      this.myFormReactivoPago.get('apellido')?.value || '';
    this.nuevaTarjeta.dniTitular =
      this.myFormReactivoPago.get('dni')?.value || '';
  }

  showSuccessToast(template: TemplateRef<any>) {
    this.toastServ.show({
      template,
      classname: 'bg-success text-dark',
      delay: 10000,
    });
  }

  onSubmitProd() {
    if (this.myFormReactivoProd.valid) {
      console.log('Formulario válido:', this.myFormReactivoProd.value);
      this.mapFormValuesToProduct();

      this.orderServ
        .modificarLinea(this.editLineaDeVenta, this.nuevaVenta.id)
        .pipe(
          catchError(error=>{
            if(error.error.status == 400){
              for (const key in error.error.errors) {
                this.infoError = key + ": " + error.error.errors[key];
                this.showErrorToast(this.errorTpl);
              }
            }else{
              this.infoError = error.error.title;
              this.showErrorToast(this.errorTpl);
            }
            return EMPTY
          })
        ).subscribe((res) => {
          this.infoString = 'Linea de Venta modificada correctamente';
          this.showInfoToast(this.infoTpl);
          this.myFormReactivoProd.reset();
          this.mostrarVentaActual();
        });
    } else {
      console.log('form invalido:', this.myFormReactivoProd.value);
    }
  }

  mapFormValuesToProduct() {
    console.log(this.idEditLinea);
    this.editLineaDeVenta.lineaDeVentaId = this.idEditLinea;
    this.editLineaDeVenta.cantidad =
      this.myFormReactivoProd.get('quantity')?.value || 0;
  }

  checkDelete(id: string) {
    this.idProdDelete = id;
  }

  deleteProd() {
    this.borrarLineaDeVenta.lineaDeVentaId = this.idProdDelete;
    this.borrarLineaDeVenta.cantidad = 0;

    this.orderServ
      .eliminarLinea(this.borrarLineaDeVenta, this.nuevaVenta.id)
      .pipe(
        catchError(error=>{
          if(error.error.status == 400){
            for (const key in error.error.errors) {
              this.infoError = key + ": " + error.error.errors[key];
              this.showErrorToast(this.errorTpl);
            }
          }else{
            this.infoError = error.error.title;
            this.showErrorToast(this.errorTpl);
          }
          return EMPTY
        })
      ).subscribe((res) => {
        this.infoString = 'Linea de Venta eliminada correctamente';
        this.showDeleteToast(this.infoTpl);
        this.mostrarVentaActual();
      });
  }

  editProd(lineaDeVenta: LineaDeVenta) {
    this.myFormReactivoProd.setValue({
      quantity: lineaDeVenta.cantidad,
    });
    this.descripArticuloEdit = lineaDeVenta.stock.articulo.descripcion;
    this.idEditLinea = lineaDeVenta.id;
  }

  

  onRowDoubleClick(idSeleccionado: string) {
    let lineaDeVentaReq: LineaDeVentaReq = {
      codigoArticulo: this.articuloBusqueda.codigoArticulo,
      stockId: idSeleccionado,
      cantidad: 1,
    };

    this.orderServ
      .agregarLineaDeVenta(lineaDeVentaReq, this.nuevaVenta.id)
      .pipe(
        catchError(error=>{
          if(error.error.status == 400){
            for (const key in error.error.errors) {
              this.infoError = key + ": " + error.error.errors[key];
              this.showErrorToast(this.errorTpl);
            }
          }else{
            this.infoError = error.error.title;
            this.showErrorToast(this.errorTpl);
          }
          return EMPTY
        })
      ).subscribe((res) => {
        this.infoString = 'Linea de Venta creada correctamente';
        this.showInfoToast(this.infoTpl);
        this.mostrarVentaActual();
      });
  }

  buscarArticulo(content: TemplateRef<any>) {
    this.orderServ
      .buscarArticulo(this.filtroBusqueda)
      .pipe(
        catchError(error=>{
          if(error.error.status == 400){
            for (const key in error.error.errors) {
              this.infoError = key + ": " + error.error.errors[key];
              this.showErrorToast(this.errorTpl);
            }
          }else{
            this.infoError = error.error.title;
            this.showErrorToast(this.errorTpl);
          }
          return EMPTY
        })
      ).subscribe((res) => {
        this.articuloBusqueda = res;
        this.modalService.open(content)
      });
  }

  onSelectChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'external-link') {
      this.router.navigate(['orders', 'nuevo-cliente']);
    } else {
      this.orderServ
        .asociarCliente(this.nuevaVenta.id, selectedValue)
        .pipe(
          catchError(error=>{
            if(error.error.status == 400){
              for (const key in error.error.errors) {
                this.infoError = key + ": " + error.error.errors[key];
                this.showErrorToast(this.errorTpl);
              }
            }else{
              this.infoError = error.error.title;
              this.showErrorToast(this.errorTpl);
            }
            return EMPTY
          })
        ).subscribe((res) => {
          this.infoString = 'Cliente asociado correctamente';
          this.showInfoToast(this.infoTpl);
          this.mostrarVentaActual();
        });
    }
  }

  onSubmitMonto(modalAdd: TemplateRef<any>) {
    if (this.myFormReactivoEfectivo.valid) {
      console.log('Formulario válido:', this.myFormReactivoEfectivo.value);
      const pago: number = this.myFormReactivoEfectivo.get('monto')?.value;

      console.log(pago);
      this.orderServ
        .pagoEfectivo(this.nuevaVenta.id, pago)
        .pipe(
          catchError(error=>{
            if(error.error.status == 400){
              for (const key in error.error.errors) {
                this.infoError = key + ": " + error.error.errors[key];
                this.showErrorToast(this.errorTpl);
              }
            }else{
              this.infoError = error.error.title;
              this.showErrorToast(this.errorTpl);
            }
            return EMPTY
          })
        ).subscribe((res) => {
          console.log(res);
          this.orderServ
            .confirmarVenta(this.nuevaVenta.id)
            .pipe(
              catchError(error=>{
                if(error.error.status == 400){
                  for (const key in error.error.errors) {
                    this.infoError = key + ": " + error.error.errors[key];
                    this.showErrorToast(this.errorTpl);
                  }
                }else{
                  this.infoError = error.error.title;
                  this.showErrorToast(this.errorTpl);
                }
                return EMPTY
              })
            ).subscribe((res) => {
              this.infoString = 'Pago en Efectivo Confirmado';
              this.showInfoToast(this.infoTpl);
              this.myFormReactivoPago.reset();
              this.modalService.open(modalAdd, { size: 'lg' });
            });
        });
    } else {
      console.log('form invalido:', this.myFormReactivoEfectivo.value);
    }
  }

  calcularVuelto() {
    if (
      this.myFormReactivoEfectivo.get('monto')?.value > this.nuevaVenta.total
    ) {
      const vuelto =
        this.myFormReactivoEfectivo.get('monto')?.value - this.nuevaVenta.total;
      this.myFormReactivoEfectivo.get('vuelto')?.setValue(vuelto);
    } else {
      this.myFormReactivoEfectivo.get('vuelto')?.setValue('');
    }
  }

  confirmarVenta() {
    this.router.navigate(['orders', 'list']);
  }

  cancelarVenta() {
    this.orderServ
      .cancelarVenta(this.nuevaVenta.id)
      .pipe(
        catchError(error=>{
          if(error.error.status == 400){
            for (const key in error.error.errors) {
              this.infoError = key + ": " + error.error.errors[key];
              this.showErrorToast(this.errorTpl);
            }
          }else{
            this.infoError = error.error.title;
            this.showErrorToast(this.errorTpl);
          }
          return EMPTY
        })
      ).subscribe((res) => {
        this.infoString = 'Venta cancelada correctamente';
        this.showDeleteToast(this.infoTpl);
        this.router.navigate(['orders', 'list']);
      });
  }
}
