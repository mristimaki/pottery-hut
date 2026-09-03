import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';

export interface Product {
    id: number;
    slug: string;
    name: string;
    description: string;
    sku: string;
    brand: string;
    image_url: string;
    price: number;
    published_date: string;
}

@Service()
export class ProductService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/products';

    getProducts() {
        return this.http.get<Product[]>(this.apiUrl);
    }

    getProductBySlug(slug: string) {
        return this.http.get<Product>(`${this.apiUrl}/${slug}`);
    }

    searchProducts(query: string) {
        return this.http.get<Product[]>(`${this.apiUrl}/search?q=${query}`);
    }
}
