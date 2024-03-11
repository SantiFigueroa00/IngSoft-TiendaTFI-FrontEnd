import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrl: './orders-add.component.css',
})
export class OrdersAddComponent  {
  @ViewChild('successTpl') successTpl!: TemplateRef<any>;

  sesion: Sesion = JSON.parse(localStorage.getItem('sesion')!);
  providers: Provider[] = [];
  products: Product[] = [];
  productsOrder: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[] = [];
  total: number = 0;
  providerIdSelect: string = '';
  newOrder: Order={
    id : '',
    dateE : new Date,
    dateR : new Date,
    info : '',
    provider : '',
    products: [{
      id: '',
      name: '',
      quantity: 0,
      price: 0
    }],
    total: 0,
    state: false
  };
  flag:boolean=false;
  idProdEdit:string='';
  idProdDelete:string='';
  
  // REACTIVE FORM
  myFormReactivoProd: FormGroup;
  myFormReactivoOrd: FormGroup;

  constructor(
    private fb: FormBuilder,
    public providerServ: ProvidersService,
    public productServ: ProductsService,
    public orderServ: OrdersService,
    public toastServ:ToastServiceSuccess
    ) {
      
      const currentDate = new Date();
      const formattedDate = this.formatDate(currentDate);
      this.myFormReactivoOrd = this.fb.group({
        provider: ['', [Validators.required]],
        address: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
          ],
        ],
        dateE: [{ value: formattedDate, disabled: true }, [Validators.required]],
        dateR: ['', [Validators.required,this.dateValidator]],
      });
      this.myFormReactivoProd = this.fb.group({
        product: ['', [Validators.required]],
        quantity: [
          '',
          [Validators.required, Validators.max(1000), Validators.min(1)],
        ],
      });
    }

    ngOnInit(): void {
      this.providerServ.getProviders().subscribe((res) => {
        let auxProviders:Provider[] = res;
        this.providers = auxProviders.filter(provider => provider.isDeleted === false);
      });
    }
    
    onSubmitOrd() {
      if (this.myFormReactivoOrd.valid) {
        console.log('Formulario válido:', this.myFormReactivoOrd.value);
        if(this.productsOrder.length > 0){
          this.mapFormValuesToOrder();
          console.log(this.newOrder)
          this.orderServ.createOrder(this.newOrder).subscribe((res)=>{
            console.log(res);
            this.showSuccessToast(this.successTpl);
          });
          this.myFormReactivoOrd.reset();
          this.productsOrder = [];
          this.total=0;
        }else{
          alert('Debe seleccionar al menos un producto');
        }
      } else {
        console.log('form invalido:', this.myFormReactivoOrd.value);
      }
    }

    showSuccessToast(template : TemplateRef<any>) {
      this.toastServ.show({ template, classname: 'bg-success text-dark', delay: 10000 });
    }

    onSubmitProd() {
      if (this.myFormReactivoProd.valid) {
        console.log('Formulario válido:', this.myFormReactivoProd.value);
        this.mapFormValuesToProduct();
        this.myFormReactivoProd.reset();
      } else {
        console.log('form invalido:', this.myFormReactivoProd.value);
      }
    }

    selectedProv() {
      this.productsOrder = [];
    this.total = 0;
    this.providerIdSelect = this.myFormReactivoOrd.get('provider')?.value || '';
    console.log(this.providerIdSelect);
    this.productServ
      .getProductsByIdProvider(this.providerIdSelect)
      .subscribe((res) => {
        this.products = res;
      });
  }


  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
  
    if (selectedDate < currentDate) {
      return { pastDate: true };
    }
  
    return null;
  }

  mapFormValuesToProduct() {
    const prodId = this.myFormReactivoProd.get('product')?.value || '';
    const quantityValue = this.myFormReactivoProd.get('quantity')?.value || 0;

    if(this.flag){
      const product = this.products.find((prod) => prod.id === prodId) ;
      if (product) {
        const indiceProductoExistente = this.productsOrder.findIndex(
          (prod) => prod.id === this.idProdEdit
        );
    
        if (indiceProductoExistente !== -1) {
          // this.productsOrder[indiceProductoExistente].quantity =
          //   parseInt(quantityValue);
          // this.productsOrder[indiceProductoExistente].id = product.id;
          // this.productsOrder[indiceProductoExistente].name = product.name;
          // this.productsOrder[indiceProductoExistente].price = product.price;
        }
      }
      this.idProdEdit='';
      this.flag=false;
    }else{
      const product = this.products.find((prod) => prod.id === prodId) ;

      if (product) {
        const indiceProductoExistente = this.productsOrder.findIndex(
          (prod) => prod.id === product.id
        );
    
        if (indiceProductoExistente !== -1) {
          this.productsOrder[indiceProductoExistente].quantity +=
            parseInt(quantityValue);
        } else {
          // this.productsOrder.push({
          //   id: product.id,
          //   name: product.name,
          //   quantity: quantityValue,
          //   price: product.price,
          // });
        } 
      }
    }
    
    this.calcTotal();
  }
  mapFormValuesToOrder() {
    this.newOrder.id = v4().slice(0,10)
    this.newOrder.dateE = this.myFormReactivoOrd.get('dateE')?.value || '';
    this.newOrder.dateR = this.myFormReactivoOrd.get('dateR')?.value || '';
    this.newOrder.info = this.myFormReactivoOrd.get('address')?.value || '';
    this.newOrder.provider = this.myFormReactivoOrd.get('provider')?.value || '';
    this.newOrder.products = this.productsOrder;
    this.newOrder.total = this.total
    this.newOrder.state = true;
  }

  checkDelete(id: string) {
    this.idProdDelete=id;
  }
  
  deleteProd(){
    this.productsOrder = this.productsOrder.filter((prod) => prod.id !== this.idProdDelete);
    this.calcTotal();
  }
  
  editProd(prod: { id: string; name: string; quantity: number; price: number; }) {
    this.myFormReactivoProd.setValue({
      product: prod.id,
      quantity: prod.quantity,
    });
    this.idProdEdit=prod.id;
    this.flag=true;
  }
  
  calcTotal(){
    this.total = this.productsOrder.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
  }
}
