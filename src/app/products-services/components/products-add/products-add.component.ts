import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4, v4 } from 'uuid';
import { Product } from '../../../models/Product';
import { Provider } from '../../../models/Provider';
import { ProductsService } from '../../services/products.service';
import { ToastServiceSuccess } from '../../../shared/components/toast/toast-success/toast-service';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrl: './products-add.component.css'
})
export class ProductsAddComponent implements OnInit{

  @ViewChild('successTpl') successTpl!: TemplateRef<any>;

  providers: Provider[]=[];
  newProduct: Product={
    id:'',
    code: '',
    description: '',
    cost: 0,
    revenue: 0,
    idBranch: '',
    idCategory: '',
    imageP: ''
  }
  
  ngOnInit(): void {
    // this.providerServ.getProviders().subscribe((res)=>{
    //   let auxProviders:Provider[] = res;
    //   this.providers = auxProviders.filter(provider => provider.isDeleted === false);
    // });
  }
  onSubmit() {
    if (this.myFormReactivo.valid) {
      console.log('Formulario válido:', this.myFormReactivo.value);
      this.mapFormValuesToProduct();
      this.productServ.createProduct(this.newProduct).subscribe((res)=>{
        console.log(res);
        this.showSuccessToast(this.successTpl);
      });
      this.myFormReactivo.reset();
    }else{
      console.log('form invalido:', this.myFormReactivo.value);
    }
  }

  showSuccessToast(template : TemplateRef<any>) {
    this.toastServ.show({ template, classname: 'bg-success text-dark', delay: 10000 });
  }

  // REACTIVE FORM
  myFormReactivo: FormGroup;

  constructor(private fb: FormBuilder, public productServ : ProductsService, public toastServ:ToastServiceSuccess) {
    this.myFormReactivo = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', [Validators.required, Validators.maxLength(50)]],
      branch: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      cost: [null, [Validators.required, Validators.max(10000000), Validators.min(1)]],
      revenue: [null, [Validators.required, Validators.max(10000000), Validators.min(1)]],
      imageP: ['', [Validators.required, Validators.pattern(/^https:\/\/.*\.(png|jpg|jpeg|gif|webp)$/)]],
    });
  }

  mapFormValuesToProduct() {
    this.newProduct.id = v4().slice(0,8)
    this.newProduct.code = this.myFormReactivo.get('code')?.value || '';
    this.newProduct.description = this.myFormReactivo.get('description')?.value || '';
    this.newProduct.cost = this.myFormReactivo.get('cost')?.value || null;
    this.newProduct.idCategory = this.myFormReactivo.get('category')?.value || '';
    this.newProduct.idBranch = this.myFormReactivo.get('branch')?.value || '';
    this.newProduct.revenue = this.myFormReactivo.get('revenue')?.value || null;
    this.newProduct.imageP = this.myFormReactivo.get('imageP')?.value || '';
  }
  
}