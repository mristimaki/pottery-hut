import { Service, signal, computed } from '@angular/core';
import { Product } from './product';

export interface CartItem {
    product: Product;
    quantity: number;
}

@Service()
export class Cart {
    private items = signal<CartItem[]>([]);

    cartItems = computed(() => this.items());

    totalItemCount = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
    );

    totalPrice = computed(() =>
        this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    );

    addToCart(product: Product) {
        const existing = this.items().find(item => item.product.id === product.id);

        if (existing) {
            this.items.update(current =>
                current.map(item =>
                    item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
            );
        } else {
            this.items.update(current => [...current, { product, quantity: 1 }])
        }
    }

    removeFromCart(productId: number) {
        this.items.update(current => current.filter(item => item.product.id !== productId));
    }

    updateQuantity(productId: number, quantity: number) {
        this.items.update(current => 
            current.map(item =>
                item.product.id === productId
                ? { ...item, quantity: quantity }
                : item
            )
        );
    }
}
