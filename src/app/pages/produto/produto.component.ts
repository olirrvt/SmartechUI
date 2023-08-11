import { Component } from '@angular/core';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/services/Produto/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent {
  listaProdutos: Produto[] = [];

  constructor(private produtoServices: ProdutoService) {}

  ngOnInit(): void {
    this.CarregarTodosProdutos();
  }

  CarregarTodosProdutos() {
    this.produtoServices.getProdutos().subscribe(produtos => {
      this.listaProdutos = produtos;
    });
  }

}
