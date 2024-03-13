import { Component, Inject, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProvidersService } from '../../../providers/services/providers.service';
import { v4 as uuidv4, v4 } from 'uuid';
import { Product } from '../../../models/Product';
import { Provider } from '../../../models/Provider';
import { ProductsService } from '../../../products-services/services/products.service';
import { Order } from '../../../models/Order';
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

@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrl: './orders-add.component.css',
})
export class OrdersAddComponent  {





  @ViewChild('successTpl') successTpl!: TemplateRef<any>;

  sesion: Sesion = JSON.parse(localStorage.getItem('sesion')!);

  modalService = inject(NgbModal);

  auxOrder: any={};
  nuevaVenta:Venta={
    id:'',
    creadaUtc:new Date,
    confirmada:false,
    confirmadaUtc:new Date,
    vendedor:undefined,
    puntoDeVenta:undefined,
    cliente:undefined,
    tipoDeComprobante:undefined,
    lineasDeVenta:[],
    pago:undefined,
    total:0,
  };

  idEditLinea:string='';
  idProdDelete:string='';
  descripArticuloEdit:string='';
  editLineaDeVenta:{lineaDeVentaId:string, cantidad:number}={
    lineaDeVentaId:'',
    cantidad:0
  };
  borrarLineaDeVenta:{lineaDeVentaId:string, cantidad:number}={
    lineaDeVentaId:'',
    cantidad:0
  };

  filtroBusqueda: string='';
  articuloBusqueda:Articulo={
    id:'',
    codigoArticulo:'',
    marca:{
      nombre:'',
    },
    categoria:{
      descripcion:'',
    },
    descripcion:'',
    precioFinal:0,
    stocks: []
  };
  stocksBusqueda: Stock[]=[];

  clientes:Cliente[]=[];

  nuevaTarjeta:TarjetaReq={
    numeroTarjeta:'',
    mesExpiracion:0,
    anioExpiracion:0,
    codigoDeSeguridad:0,
    nombreTitular:'',
    apellidoTitular:'', 
    dniTitular:''
  }

  // REACTIVE FORM
  myFormReactivoProd: FormGroup;
  myFormReactivoPago: FormGroup;
  myFormReactivoEfectivo: FormGroup;
  

  router = inject(Router)

  clienteServ = inject(ClienteService);
  

  constructor(
    private fb: FormBuilder,
    public providerServ: ProvidersService,
    public productServ: ProductsService,
    public orderServ: OrdersService,
    public toastServ:ToastServiceSuccess
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
        monto: [
          '',
          [Validators.required, Validators.min(1)],
        ],
        vuelto:[{ value: '', disabled: true }]
      });

    }

    ngOnInit(): void {
      this.orderServ.createOrder(this.auxOrder).pipe(
        catchError(error=>{
          console.log(error);
          this.mostrarVentaActual();
          return EMPTY;
        })
      ).subscribe(res=>{
        console.log(res);
        this.nuevaVenta=res;
      });

      this.clienteServ.obtenerClientes().subscribe(res=>{
        console.log(res);
        this.clientes=res.clientes;
      })
    }
    

    mostrarVentaActual(){
      this.orderServ.obtenerVentaActual().subscribe(res=>{
        this.nuevaVenta=res;
      })
    }

    onSubmitPago() {
      if (this.myFormReactivoPago.valid) {
        console.log('Formulario válido:', this.myFormReactivoPago.value);
        this.mapFormValuesToTarjeta();

        this.orderServ.pagoTarjeta(this.nuevaVenta.id,this.nuevaTarjeta).subscribe(res=>{
          console.log(res);
          this.myFormReactivoPago.reset();
          this.mostrarVentaActual();
        });
      } else {
        console.log('form invalido:', this.myFormReactivoPago.value);
      }
    }

    mapFormValuesToTarjeta() {
      this.nuevaTarjeta.numeroTarjeta = this.myFormReactivoPago.get('numeroTarjeta')?.value || '';
      this.nuevaTarjeta.mesExpiracion = this.myFormReactivoPago.get('mesVenc')?.value || 0;
      this.nuevaTarjeta.anioExpiracion = this.myFormReactivoPago.get('anioVenc')?.value || 0;
      this.nuevaTarjeta.codigoDeSeguridad = this.myFormReactivoPago.get('codSeg')?.value || '';
      this.nuevaTarjeta.nombreTitular = this.myFormReactivoPago.get('nombre')?.value || '';
      this.nuevaTarjeta.apellidoTitular = this.myFormReactivoPago.get('apellido')?.value || '';
      this.nuevaTarjeta.dniTitular = this.myFormReactivoPago.get('dni')?.value || '';
    }

    showSuccessToast(template : TemplateRef<any>) {
      this.toastServ.show({ template, classname: 'bg-success text-dark', delay: 10000 });
    }

    onSubmitProd() {
      if (this.myFormReactivoProd.valid) {
        console.log('Formulario válido:', this.myFormReactivoProd.value);
        this.mapFormValuesToProduct();

        this.orderServ.modificarLinea(this.editLineaDeVenta,this.nuevaVenta.id).subscribe(res=>{
          console.log(res);
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
    this.editLineaDeVenta.cantidad = this.myFormReactivoProd.get('quantity')?.value || 0;
  }

  checkDelete(id: string) {
    this.idProdDelete=id;
  }
  
  deleteProd(){
    this.borrarLineaDeVenta.lineaDeVentaId = this.idProdDelete;
    this.borrarLineaDeVenta.cantidad = 0;

    this.orderServ.eliminarLinea(this.borrarLineaDeVenta,this.nuevaVenta.id).subscribe(res=>{
      console.log(res);
      this.mostrarVentaActual();
    });

  }
  
  editProd(lineaDeVenta:LineaDeVenta) {
    this.myFormReactivoProd.setValue({
      quantity: lineaDeVenta.cantidad,
    });
    this.descripArticuloEdit=lineaDeVenta.stock.articulo.descripcion;
    this.idEditLinea=lineaDeVenta.id;
    
  }

  openModal(content: TemplateRef<any>) {
    
    this.modalService.open(content); 
  }

  onRowDoubleClick(idSeleccionado: string) {
    let lineaDeVentaReq : LineaDeVentaReq= {
      codigoArticulo:this.articuloBusqueda.codigoArticulo,
      stockId:idSeleccionado,
      cantidad:1
    };

    this.orderServ.agregarLineaDeVenta(lineaDeVentaReq,this.nuevaVenta.id).subscribe(res=>{
      console.log(res);
      this.mostrarVentaActual();
    }
    );
  }

  buscarArticulo() {
    this.orderServ.buscarArticulo(this.filtroBusqueda).subscribe((res:any) => {
      this.articuloBusqueda=res;
    });
  }


  onSelectChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'external-link') {
      this.router.navigate(['orders', 'nuevo-cliente']);
    }
  }

  onSubmitMonto(modalAdd: TemplateRef<any>) {
    if (this.myFormReactivoEfectivo.valid) {
      console.log('Formulario válido:', this.myFormReactivoEfectivo.value);
      const pago : number = this.myFormReactivoEfectivo.get('monto')?.value;

      console.log(pago);
      this.orderServ.pagoEfectivo(this.nuevaVenta.id,pago).subscribe(res=>{
        console.log(res);
        this.modalService.open(modalAdd,{size:'lg'});
        this.myFormReactivoEfectivo.reset();
      });
    } else {
      console.log('form invalido:', this.myFormReactivoEfectivo.value);
    }
  }

  calcularVuelto() {
    if(this.myFormReactivoEfectivo.get('monto')?.value>this.nuevaVenta.total){
      const vuelto = this.myFormReactivoEfectivo.get('monto')?.value - this.nuevaVenta.total;
      this.myFormReactivoEfectivo.get('vuelto')?.setValue(vuelto);
    }else{
      this.myFormReactivoEfectivo.get('vuelto')?.setValue('');
    }
  }
}
