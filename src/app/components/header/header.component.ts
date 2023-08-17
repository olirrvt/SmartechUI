import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  pesquisa: string = '';

  constructor(private router: Router) {}

  pesquisar(): void {
    if (this.pesquisa.trim() !== '') {
      this.router.navigate(['/buscar-produtos'], { queryParams: { q: this.pesquisa } });
    }
  }
}