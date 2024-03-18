import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from '../../../models/LoginUser';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { AppToastService } from '../../../shared/components/toast/toast-info/toast-info-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  myFormReactivo: FormGroup; 

  dataLogin: LoginUser={
    email:'',
    password:'',
    puntoDeVentaId:'3C215AC9-2597-4BBD-B055-5C64B86BA791'
  };

  @ViewChild('errorTpl') errorTpl!: TemplateRef<any>;

  router = inject(Router);
  authService = inject(UserService);
  toastService = inject(AppToastService);

  infoError:string = '';

  constructor(private fb: FormBuilder) {
    this.myFormReactivo = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  onSubmit() {
    if (this.myFormReactivo.valid) {

      let userInput = this.myFormReactivo.get('email')?.value || '';
      let passInput = this.myFormReactivo.get('password')?.value || '';
      
      this.dataLogin.email=userInput;
      this.dataLogin.password=passInput;

      this.authService.onLogin(this.dataLogin).pipe(
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
        if(!res.error){
          localStorage.setItem('token', res.token);
          localStorage.setItem('sesion', JSON.stringify(res.sesion));
          this.router.navigate(['/dashboard']);
        }
      })

      this.myFormReactivo.reset();
    }else{
      console.log('form invalido:', this.myFormReactivo.value);
    }
  }

  showErrorToast(template : TemplateRef<any>) {
    this.toastService.show({ template, classname: 'bg-danger text-dark', delay: 5000 });
  }

  visible:boolean = true;
  changetype:boolean =true;

  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}
