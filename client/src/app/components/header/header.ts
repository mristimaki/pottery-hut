import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private router = inject(Router);
  searchTerm = '';

  OnSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
    }
  }
}
