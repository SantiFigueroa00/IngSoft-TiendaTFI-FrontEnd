import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from '../../../models/LoginUser';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

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


  router = inject(Router);
  authService = inject(UserService);

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

      this.authService.onLogin(this.dataLogin).subscribe(res=>{
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

  visible:boolean = true;
  changetype:boolean =true;

  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}
