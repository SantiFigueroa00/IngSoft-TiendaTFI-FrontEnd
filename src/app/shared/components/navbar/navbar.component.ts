import { Component, inject } from '@angular/core';
import { UserService } from '../../../auth/services/user.service';
import { Router } from '@angular/router';
import { Sesion } from '../../../models/Sesion';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  userService=inject(UserService);
  router =inject(Router);
  sesion: Sesion = JSON.parse(localStorage.getItem('sesion')!);


  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}
