import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProvidersService } from '../../../providers/services/providers.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.css'
})
export class ProductsDetailComponent {
  // productId: string|null='';
  // product:Product={
  //   id:'',
  //   name:'',
  //   category:'',
  //   provider:'',
  //   price:0,
  //   description:'',
  //   imageP:''
  // }
  // products:Product[] = [];

  // constructor(public productServ: ProductsService, private route: ActivatedRoute) { }
  // ngOnInit(): void {
  //   this.route.paramMap.subscribe(params => {
  //     this.productId = params.get('id');
  //     this.productServ.getProductById(this.productId).subscribe((res)=>{
  //       this.product=res;
  //       this.productServ.getProductsByIdProvider(this.product.provider).subscribe((res:any[])=>{
  //         this.products=res.filter(product => product.id !== this.productId);
  //       })
  //     })
  //   });
  // }
}
