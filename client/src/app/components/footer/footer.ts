import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  openSection = signal<string | null>(null);

  toggleSection(section: string) {
    this.openSection.set(this.openSection() === section ? null : section);
  }

  isOpen(section: string) {
    return this.openSection() === section;
  }
}
