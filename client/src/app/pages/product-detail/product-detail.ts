import { Component, inject, signal, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../services/product';
import { ProductCard } from '../../components/product-card/product-card';
import { Cart } from '../../services/cart';
import { Title } from '@angular/platform-browser';

@Component({
  imports: [ProductCard],
  selector: 'app-product-detail',
  styleUrl: './product-detail.css',
  templateUrl: './product-detail.html',
})
export class ProductDetail implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private cart = inject(Cart);
  private titleService = inject(Title);

  product = signal<Product | undefined>(undefined);
  similarProducts = signal<Product[]>([]);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');

      if (slug) {
        this.productService.getProductBySlug(slug).subscribe(data => {
        this.product.set(data);
        this.titleService.setTitle(data.name);
        
        this.productService.getSimilarProducts(data).subscribe(similar => {
          this.similarProducts.set(similar);
        });
      });
      }
    });
  }

  onAddToCart() {
    const currentProduct = this.product();
    if (currentProduct) {
      this.cart.addToCart(currentProduct);
    }
  }
}
