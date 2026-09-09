import { Component, inject } from '@angular/core';
import { Cart } from '../../services/cart';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-basket',
  styleUrl: './basket.css',
  templateUrl: './basket.html',
})
export class Basket {
  cart = inject(Cart);
}
