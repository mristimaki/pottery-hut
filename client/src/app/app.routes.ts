import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SearchResults } from './pages/search-results/search-results';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Basket } from './pages/basket/basket';
import { Checkout } from './pages/checkout/checkout';
import { AdminProductList } from './pages/admin-product-list/admin-product-list';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'search', component: SearchResults },
    { path: 'products/:slug', component: ProductDetail },
    { path: 'basket', component: Basket },
    { path: 'checkout', component: Checkout },
    { path: 'admin/products', component: AdminProductList }
];
