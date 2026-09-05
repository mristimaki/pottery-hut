import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { ProductService, Product } from '../../services/product';
import { ProductCard } from '../../components/product-card/product-card';

interface HeroSlide {
  image: string;
  title: string;
  text: string;
}

@Component({
  imports: [ProductCard],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home  implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private intervalId?: ReturnType<typeof setInterval>;

  products = signal<Product[]>([]);

  heroSlides: HeroSlide[] = [
    {
      image: '/hero/mud-collection.png',
      title: 'Mud Collection',
      text: 'Jordnära toner och råa strukturer, inspirerade av leran den formats av.'
    },
    {
      image: '/hero/ocean-collection.png',
      title: 'Ocean Collection',
      text: 'Svala blåa nyanser som för tankarna till havets lugn.'
    },
    {
      image: '/hero/sand-collection.png',
      title: 'Sand Collection',
      text: 'Ljusa, jordnära nyanser som fångar solens värme. Enkelhet i sin vackraste form.'
    },
  ];

  currentSlide = signal(0);

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products.set(data.slice(0, 8));
    });

    this.startAutoRotate();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoRotate() {
    this.intervalId = setInterval(() => this.nextSlide(), 7000);
  }

  resetAutoRotate() {
    clearInterval(this.intervalId);
    this.startAutoRotate();
  }

  nextSlide() {
    this.currentSlide.update(i => (i + 1) % this.heroSlides.length);
  }

  prevSlide() {
    this.currentSlide.update(i => (i - 1 + this.heroSlides.length) % this.heroSlides.length);
  }

  onNextClick() {
    this.nextSlide();
    this.resetAutoRotate();
  }

  onPrevClick() {
    this.prevSlide();
    this.resetAutoRotate();
  }
}
