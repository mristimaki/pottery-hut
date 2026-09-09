import { Component, inject } from '@angular/core';
import { Cart } from '../../services/cart';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-checkout',
  styleUrl: './checkout.css',
  templateUrl: './checkout.html',
})
export class Checkout {
  cart = inject(Cart);

  firstName = '';
  lastName = '';
  email = '';
  street = '';
  postalCode = '';
  city = '';
  newsletter = false;

  onSubmit() {
    // Gör medvetet ingenting (enligt wireframe-krav)
  }
}
