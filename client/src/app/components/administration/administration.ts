import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-administration',
  styleUrl: './administration.css',
  templateUrl: './administration.html',
})
export class Administration {}
