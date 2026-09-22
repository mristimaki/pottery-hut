import { Component, inject, signal } from '@angular/core';
import { Cart } from '../../services/cart';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
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

  orderComplete = signal(false);

  onSubmit() {
    this.orderComplete.set(true);
    this.cart.clearCart();
  }
}
