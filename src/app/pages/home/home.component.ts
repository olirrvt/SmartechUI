import { Component } from '@angular/core';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/services/Produto/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  listaProdutos: Produto[] = [];
  maxProductsToShow = 8;

  constructor(
    private produtoServices: ProdutoService
  ) {}

  ngOnInit(): void {
    this.PegarTodosProdutos();
  }

  PegarTodosProdutos() {
    this.produtoServices.getProdutos().subscribe( produto => {
      this.listaProdutos = produto.slice(0, this.maxProductsToShow);
    });
  }

}
