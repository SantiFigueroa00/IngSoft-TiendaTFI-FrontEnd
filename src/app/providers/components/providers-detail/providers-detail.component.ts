import { Component } from '@angular/core';
import { ProvidersService } from '../../services/providers.service';
import { ActivatedRoute } from '@angular/router';
import { Provider } from '../../../models/Provider';

@Component({
  selector: 'app-providers-detail',
  templateUrl: './providers-detail.component.html',
  styleUrl: './providers-detail.component.css'
})
export class ProvidersDetailComponent {
  providerId: string='';
  provider:Provider={
    id:'',
    compName:'',
    item:'',
    webSite:'',
    phone:'',
    email:'',
    address:{
      street:'',
      number:0,
      zip:'',
      country:'',
      province:'',
      locality:''
    },
    taxData:{
      cuit:'',
      iva:''
    },
    logo:'',
    contact:{
      name:'',
      phone:'',
      email:'',
      role:''
    },
    orders:[],
    isDeleted:false
  }

  constructor( public providerServ : ProvidersService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    try {
      const idParam = this.route.snapshot.paramMap.get('id');

      if (idParam === null) {
        throw new Error("El parámetro 'id' es nulo");
      }

      this.providerId = idParam;
      this.providerServ.getProviderById(this.providerId).subscribe((res) => {
        this.provider = res;
      });
    } catch (error: any) {
      // Manejo de la excepción
      console.error(error.message);
    }
  }
}

