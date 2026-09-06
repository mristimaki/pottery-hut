import { Component, inject, signal, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../services/product';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  imports: [ProductCard],
  selector: 'app-search-results',
  styleUrl: './search-results.css',
  templateUrl: './search-results.html',
})
export class SearchResults implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  searchResult = signal<Product[]>([]);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const { q } = params;

      this.productService.searchProducts(q).subscribe(data => {
      this.searchResult.set(data);
      });
    });
  }
}
