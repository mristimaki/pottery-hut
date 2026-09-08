import { Component, inject } from '@angular/core';
import { Cart } from '../../services/cart';
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: 'app-basket',
  styleUrl: './basket.css',
  templateUrl: './basket.html',
})
export class Basket {
  cart = inject(Cart);
}
