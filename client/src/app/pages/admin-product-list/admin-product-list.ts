import { Component, inject, signal, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product';
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: 'app-admin-product-list',
  styleUrl: './admin-product-list.css',
  templateUrl: './admin-product-list.html',
})
export class AdminProductList implements OnInit {
  private productService = inject(ProductService)

  products = signal<Product[]>([]);

  ngOnInit() {
    this.productService.getAdminProducts().subscribe(data => {
      this.products.set(data);
    });
  }

  onDelete(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products.update(current => current.filter(product => product.id !== id));
    });
  }
}
