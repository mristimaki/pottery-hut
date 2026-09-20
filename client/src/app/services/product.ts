import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { map } from 'rxjs';

export interface Product {
    id: number;
    slug: string;
    name: string;
    description: string;
    sku: string;
    brand: string;
    type: string;
    image_url: string;
    price: number;
    published_date: string;
}

export interface NewProduct {
    name: string;
    description: string;
    sku: string;
    brand: string;
    type: string;
    imageUrl: string;
    price: number;
    publishedDate: string;
}

@Service()
export class ProductService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/products';
    private adminUrl = 'http://localhost:3000/admin/products';

    getProducts() {
        return this.http.get<Product[]>(this.apiUrl);
    }

    getProductBySlug(slug: string) {
        return this.http.get<Product>(`${this.apiUrl}/${slug}`);
    }

    searchProducts(query: string) {
        return this.http.get<Product[]>(`${this.apiUrl}/search?q=${query}`);
    }

    getSimilarProducts(currentProduct: Product) {
        return this.http.get<Product[]>(this.apiUrl).pipe(
            map(products => {
                const others = products.filter(p => p.id !== currentProduct.id);

                const sameCollection = others.filter(p => p.brand === currentProduct.brand);
                const sameType = others.filter(
                    p => p.type === currentProduct.type && p.brand !== currentProduct.brand
                );

                return [...sameCollection, ...sameType];
            })
        );
    }

    getAdminProducts() {
        return this.http.get<Product[]>(this.adminUrl);
    }

    deleteProduct(id: number) {
        return this.http.delete(`${this.adminUrl}/${id}`);
    }

    createProduct(product: NewProduct) {
        return this.http.post(this.adminUrl, product);
    }
}
