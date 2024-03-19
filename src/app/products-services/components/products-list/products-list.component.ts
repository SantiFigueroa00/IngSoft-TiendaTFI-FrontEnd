import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Product } from '../../../models/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { v4 as uuidv4, v4 } from 'uuid';
import { Provider } from '../../../models/Provider';
import { ToastServiceEdit } from '../../../shared/components/toast/toast-edit/toast-service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  @ViewChild('editTpl') editTpl!: TemplateRef<any>;

  providers: Provider[]=[];
  products: Product[]=[];
  productEdit: Product={
    id:'',
    code: '',
    description: '',
    cost: 0,
    revenue: 0,
    idBranch: '',
    idCategory: '',
    imageP: ''
  }
  
  idDelete?:string='';
  ngOnInit(): void {
    this.listProducts();
  }
  
  setCompName(id:string){
    const provider = this.providers.find((prov) => prov.id === id);
    return provider ? provider.compName : '';
  }


  listProducts(){
    this.productServ.getProducts().subscribe((res)=>{
      let auxProviders:Product[] = res.sort((a:Product, b:Product) => {
        const nameA = a.description.toUpperCase(); // convertir a mayúsculas para ordenar de manera no sensible a mayúsculas/minúsculas
        const nameB = b.description.toUpperCase();
  
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      this.products = auxProviders;
    });
  }
  
  checkDelete(id?:string){
    this.idDelete=id;
  }
  deleteProd() {
    this.productServ.deleteProduct(this.idDelete).subscribe((res)=>{
      console.log(res);
      this.listProducts();
    });
  }
  
  editProd(p: Product) {
    this.myFormReactivo.setValue({
      code: p.code,
      description: p.description,
      category: p.idCategory,
      branch: p.idBranch,
      cost: p.cost,
      revenue: p.revenue,
      imageP: p.imageP
    });
    this.productEdit=p;
  }
  
  onSubmit() {
    if (this.myFormReactivo.valid) {
      console.log('Formulario válido:', this.myFormReactivo.value);
      this.mapFormValuesToProduct();
      this.productServ.putProduct(this.productEdit).subscribe((res)=>{
        console.log(res);
        this.showEditToast(this.editTpl);
      });
      this.myFormReactivo.reset();
    
    }else{
      console.log('form invalido:', this.myFormReactivo.value);
    }
  }

  showEditToast(template : TemplateRef<any>) {
    this.toastServ.show({ template, classname: 'bg-primary text-white', delay: 2000 });
  }
  
  mapFormValuesToProduct() {
    this.productEdit.code = this.myFormReactivo.get('code')?.value || '';
    this.productEdit.description = this.myFormReactivo.get('description')?.value || '';
    this.productEdit.cost = this.myFormReactivo.get('cost')?.value || null;
    this.productEdit.idCategory = this.myFormReactivo.get('category')?.value || '';
    this.productEdit.idBranch = this.myFormReactivo.get('branch')?.value || '';
    this.productEdit.revenue = this.myFormReactivo.get('revenue')?.value || null;
    this.productEdit.imageP = this.myFormReactivo.get('imageP')?.value || '';
  }

  myFormReactivo: FormGroup;

  constructor(private fb: FormBuilder, public productServ : ProductsService, public toastServ:ToastServiceEdit) {
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
}
