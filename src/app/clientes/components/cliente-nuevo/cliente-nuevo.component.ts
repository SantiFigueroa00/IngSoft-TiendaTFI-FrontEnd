import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, catchError } from 'rxjs';
import { Cliente } from '../../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { CondicionTributaria } from '../../../models/CondicionTributaria';
import { AppToastService } from '../../../shared/components/toast/toast-info/toast-info-service';

@Component({
  selector: 'app-cliente-nuevo',
  templateUrl: './cliente-nuevo.component.html',
  styleUrl: './cliente-nuevo.component.css'
})
export class ClienteNuevoComponent implements OnInit{

  @ViewChild('successTpl') successTpl!: TemplateRef<any>;
  @ViewChild('infoTpl') infoTpl!: TemplateRef<any>;
  @ViewChild('invalidTpl') invalidTpl!: TemplateRef<any>;
  // toastService = inject(AppToastService);

  @ViewChild('errorTpl') errorTpl!: TemplateRef<any>;
  toastService = inject(AppToastService);
  infoError:string = '';
  showErrorToast(template : TemplateRef<any>) {
      this.toastService.show({ template, classname: 'bg-danger text-dark', delay: 5000 });
  }

  nuevoCliente: any={
    tipoDocumento: 0,
    numero:'',
    nombre: '',
    apellido:'',
    condicionTributariaId:''
  };
  condicionesTrib:CondicionTributaria[] = [];
  condTrib : any;
  showDoc: boolean = true;

  clienteServ = inject(ClienteService)
  router = inject(Router);

  ngOnInit(): void {
    this.clienteServ.obtenerCondTrib().pipe(
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
    ).subscribe(res=>{
      this.condicionesTrib=res.condicionesTributarias;
      this.condicionesTrib =this.condicionesTrib.filter(cond=>cond.tipo!=4);
    })
  }


  onSubmit() {
    if (this.myFormReactivo.valid) {
      console.log('Formulario válido:', this.myFormReactivo.value);
      this.mapFormValuesToProvider();
      console.log(this.nuevoCliente)
      this.clienteServ.agregarCliente(this.nuevoCliente).pipe(
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
      ).subscribe(res=>{
        console.log(res);
        this.myFormReactivo.get('condTrib')?.setValue('');
        this.myFormReactivo.reset();
        this.router.navigate(['orders', 'add'])
      });
    }else{
      console.log('form invalido:', this.myFormReactivo.value);
    }
  }


  // REACTIVE FORM
  myFormReactivo: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myFormReactivo = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4)]],
      numero: ['', [Validators.required]],
      conTrib: ['', [Validators.required]],
    });
  }

  mapFormValuesToProvider() {
    const condTrib = this.myFormReactivo.get('conTrib')?.value;
    this.nuevoCliente.nombre = this.myFormReactivo.get('nombre')?.value || '';
    this.nuevoCliente.apellido = this.myFormReactivo.get('apellido')?.value || '';
    if(this.showDoc){
      this.nuevoCliente.tipoDocumento = 1;
    }else{
      this.nuevoCliente.tipoDocumento = 2;
    }
    this.nuevoCliente.numero = this.myFormReactivo.get('numero')?.value || '';
    this.nuevoCliente.condicionTributariaId = condTrib.id;
  }
  

  onChangeCondTrib() {
    const condTrib : CondicionTributaria = this.myFormReactivo.get('conTrib')?.value;

    if(condTrib.tipo<=1){
      this.showDoc=false;
    }else if(condTrib.tipo<=2 && condTrib.tipo<=4){
      this.showDoc=true;
    }
  }


}
