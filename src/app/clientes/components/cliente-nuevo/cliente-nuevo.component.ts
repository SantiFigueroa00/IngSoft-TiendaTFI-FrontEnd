import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, catchError } from 'rxjs';
import { Cliente } from '../../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { CondicionTributaria } from '../../../models/CondicionTributaria';

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

  nuevoCliente: any={
    dni: '',
    cuil: '',
    nombre: '',
    apellido:'',
    condicionTributariaId:''
  };
  condicionesTrib:CondicionTributaria[] = [];

  clienteServ = inject(ClienteService)
  router = inject(Router);

  ngOnInit(): void {
    this.clienteServ.obtenerCondTrib().subscribe(res=>{
      this.condicionesTrib=res.condicionesTributarias;
    })
  }


  onSubmit() {
    if (this.myFormReactivo.valid) {
      console.log('Formulario válido:', this.myFormReactivo.value);
      this.mapFormValuesToProvider();
      console.log(this.nuevoCliente)
      this.clienteServ.agregarCliente(this.nuevoCliente).subscribe(res=>{
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
      dni: ['', [Validators.required]],
      // cuil: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{8}-\d{1}$/)]],
      cuil: ['', [Validators.required]],
      conTrib: ['', [Validators.required]],
    });
  }

  mapFormValuesToProvider() {
    this.nuevoCliente.nombre = this.myFormReactivo.get('nombre')?.value || '';
    this.nuevoCliente.apellido = this.myFormReactivo.get('apellido')?.value || '';
    this.nuevoCliente.dni = this.myFormReactivo.get('dni')?.value || '';
    this.nuevoCliente.cuil = this.myFormReactivo.get('cuil')?.value || '';
    this.nuevoCliente.condicionTributariaId = this.myFormReactivo.get('conTrib')?.value || '';
  }
  

}
