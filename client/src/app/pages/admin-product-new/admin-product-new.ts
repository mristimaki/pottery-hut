import { Component, inject } from '@angular/core';
import { ProductService, NewProduct } from '../../services/product';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-admin-product-new',
  styleUrl: './admin-product-new.css',
  templateUrl: './admin-product-new.html',
})
export class AdminProductNew {
  private productService = inject(ProductService);
  private router = inject(Router);

  name = '';
  description = '';
  sku = '';
  brand = '';
  imageUrl = '';
  price = 0;
  publishedDate = '';

  onSubmit() {
    const newProduct = {
      name: this.name,
      description: this.description,
      sku: this.sku,
      brand: this.brand,
      imageUrl: this.imageUrl,
      price: this.price,
      publishedDate: this.publishedDate
    };

    this.productService.createProduct(newProduct).subscribe(() => {
      this.router.navigate(['/admin/products']);
    });
  }
}
