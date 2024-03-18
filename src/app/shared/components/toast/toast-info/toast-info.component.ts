import { Component, inject } from '@angular/core';
import { AppToastService } from './toast-info-service';

@Component({
  selector: 'app-toast-info',
  templateUrl: './toast-info.component.html',
  styleUrl: './toast-info.component.css',
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' }
})
export class ToastInfoComponent {
  toastService = inject(AppToastService);
}
