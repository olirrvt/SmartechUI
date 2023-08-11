import { Component } from '@angular/core';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/services/Produto/produto.service';
import { CarrinhoService } from 'src/app/services/Carrinho/carrinho.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent {
  carrinhoId: number = 1;
  listaProdutos: Produto[] = [];
  produtoAdicionado: Produto | null = null;

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.carregarTodosProdutos();
  }

  carregarTodosProdutos() {
    this.produtoService.getProdutos().subscribe(produtos => {
      this.listaProdutos = produtos;
    });
  }

  adicionarAoCarrinho(produto: Produto): void {

    const itemCarrinho = {
      carrinhoId: this.carrinhoId,
      idDoProduto: produto.id,
      quantidade: 1 
    };
    
    this.produtoAdicionado = produto;
    this.carrinhoService.adicionarItem(this.carrinhoId, itemCarrinho).subscribe(res => {
      console.log(res);
    });
  }

  fecharModal() {
    this.produtoAdicionado = null;
  }
  
}