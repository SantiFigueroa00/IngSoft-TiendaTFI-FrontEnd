import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Provider } from '../../../models/Provider';
import { ProvidersService } from '../../services/providers.service';
import { v4 as uuidv4, v4 } from 'uuid';
import { Toast, ToastServiceSuccess } from '../../../shared/components/toast/toast-success/toast-service';

@Component({
  selector: 'app-providers-add',
  templateUrl: './providers-add.component.html',
  styleUrl: './providers-add.component.css',
})
export class ProvidersAddComponent  implements OnInit{
  @ViewChild('successTpl') successTpl!: TemplateRef<any>;

  newProvider: Provider = {
    id: '',
    compName: '',
    item: '',
    webSite: '',
    phone: '',
    email: '',
    address: {
      street: '',
      number: 0,
      zip: '',
      country: '',
      province: '',
      locality: '',
    },
    taxData: {
      cuit: '',
      iva: '',
    },
    logo: '',
    contact: {
      name: '',
      phone: '',
      email: '',
      role: '',
    },
  };

  countries: any[]=[];
  provinces: any[]=[];
  countrySelected: string=''

  ngOnInit(): void {
    this.providerServ.getCountries().subscribe((data)=>{
      this.countries = data;
    })
  }

  selectedCount() {
    this.provinces = [];
    this.countrySelected = this.myFormReactivo.get('country')?.value || '';
    let countrySelect = this.countries.find(country => country.name === this.countrySelected);
    this.provinces= countrySelect.states;
}

  onSubmit() {
    if (this.myFormReactivo.valid) {
      console.log('Formulario válido:', this.myFormReactivo.value);
      this.mapFormValuesToProvider();
      this.providerServ.createProvider(this.newProvider).subscribe((res)=>{
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

  constructor(private fb: FormBuilder, private providerServ: ProvidersService, public toastServ:ToastServiceSuccess) {
    this.myFormReactivo = this.fb.group({
      logo: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^https:\/\/.*\.(png|jpg|jpeg|gif|webp)$/)]],
      compName: ['', [Validators.required, Validators.minLength(4)]],
      item: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      web: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]],
      phone: ['', [Validators.required, Validators.maxLength(15)]],
      street: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      number: [null, [Validators.required, Validators.max(10000),, Validators.min(1)]],
      zip: ['', [Validators.required, Validators.pattern(/^\d{1,5}$/)]],
      country: ['', [Validators.required, Validators.maxLength(50)]],
      province: ['', [Validators.required]],
      locality: ['', [Validators.required, Validators.maxLength(50)]],
      cuit: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{8}-\d{1}$/)]],
      ivaCondition: ['', [Validators.required, Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      emailProv: ['', [Validators.required, Validators.email]],
      telProv: ['', [Validators.required, Validators.maxLength(15)]],
      role: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  mapFormValuesToProvider() {
    this.newProvider.id = v4().slice(0,5)
    this.newProvider.compName = this.myFormReactivo.get('compName')?.value || '';
    this.newProvider.item = this.myFormReactivo.get('item')?.value || '';
    this.newProvider.webSite = this.myFormReactivo.get('web')?.value || '';
    this.newProvider.phone = this.myFormReactivo.get('phone')?.value || '';
    this.newProvider.email = this.myFormReactivo.get('email')?.value || '';
    this.newProvider.address.street = this.myFormReactivo.get('street')?.value || '';
    this.newProvider.address.number = this.myFormReactivo.get('number')?.value || 0;
    this.newProvider.address.zip = this.myFormReactivo.get('zip')?.value || '';
    this.newProvider.address.country = this.myFormReactivo.get('country')?.value || '';
    this.newProvider.address.province = this.myFormReactivo.get('province')?.value || '';
    this.newProvider.address.locality = this.myFormReactivo.get('locality')?.value || '';
    this.newProvider.taxData.cuit = this.myFormReactivo.get('cuit')?.value || '';
    this.newProvider.taxData.iva = this.myFormReactivo.get('ivaCondition')?.value || '';
    this.newProvider.contact.name = this.myFormReactivo.get('name')?.value || '';
    this.newProvider.contact.phone = this.myFormReactivo.get('telProv')?.value || '';
    this.newProvider.contact.email = this.myFormReactivo.get('emailProv')?.value || '';
    this.newProvider.contact.role = this.myFormReactivo.get('role')?.value || '';
    this.newProvider.logo = this.myFormReactivo.get('logo')?.value || '';
    this.newProvider.isDeleted = false;
  }
  

}
