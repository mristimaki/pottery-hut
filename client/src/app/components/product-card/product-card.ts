import { Component, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../services/product';

@Component({
  imports: [RouterLink],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Product>();

  isNew = computed(() => {
    const published = new Date(this.product().published_date);
    const now = new Date();
    const daysSincePublished = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
    return daysSincePublished < 7;
  });
}
