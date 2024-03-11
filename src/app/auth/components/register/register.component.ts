import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
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

      this.myFormReactivo.reset();
    }else{
      console.log('form invalido:', this.myFormReactivo.value);
    }
  }
}
