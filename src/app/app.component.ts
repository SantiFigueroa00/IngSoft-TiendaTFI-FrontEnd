import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '2DO-ENTREGABLE';
  login: boolean = false;
  userValid='Admin';
  passwordValid='1234';


// REACTIVE FORM
myFormReactivo: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myFormReactivo = this.fb.group({
      user: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });
  }


  onSubmit() {
    if (this.myFormReactivo.valid) {
      let userInput = this.myFormReactivo.get('user')?.value || '';
      let passInput = this.myFormReactivo.get('pass')?.value || '';

      if (userInput === this.userValid && passInput === this.passwordValid) {
        this.login = true;
      } else {
        this.login = false;
        alert('User or password incorrect')
      }
      this.myFormReactivo.reset();
    }else{
      console.log('form invalido:', this.myFormReactivo.value);
    }
  }
}
