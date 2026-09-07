import { Component, inject, signal, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../services/product';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  imports: [ProductCard],
  selector: 'app-product-detail',
  styleUrl: './product-detail.css',
  templateUrl: './product-detail.html',
})
export class ProductDetail implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  product = signal<Product | undefined>(undefined);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');

      if (slug) {
        this.productService.getProductBySlug(slug).subscribe(data => {
        this.product.set(data);
      });
      }
    });
  }
}
