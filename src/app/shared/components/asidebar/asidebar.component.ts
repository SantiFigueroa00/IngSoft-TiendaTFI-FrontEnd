import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../../auth/services/user.service';

@Component({
  selector: 'app-asidebar',
  templateUrl: './asidebar.component.html',
  styleUrl: './asidebar.component.css',
})
export class AsidebarComponent implements OnInit {

  userService = inject(UserService);

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveButton(event.url);
      }
    });
  }

  activeButton: string = '';

  updateActiveButton(url: string) {
    if (url.includes('providers')) {
      this.activeButton = 'providers';
    } else if (url.includes('products')) {
      this.activeButton = 'products';
    } else if (url.includes('orders')) {
      this.activeButton = 'orders';
    } else {
      this.activeButton = ''; // Puedes manejar otras rutas aquí
    }
  }
}
