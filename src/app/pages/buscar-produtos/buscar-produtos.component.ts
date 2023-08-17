import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/models/Produto';
import { CarrinhoService } from 'src/app/services/Carrinho/carrinho.service';
import { ProdutoService } from 'src/app/services/Produto/produto.service';

@Component({
  selector: 'app-buscar-produtos',
  templateUrl: './buscar-produtos.component.html',
  styleUrls: ['./buscar-produtos.component.css']
})
export class BuscarProdutosComponent implements OnInit {
  carrinhoId: number = 1;
  produtos: Produto[] = [];
  produtoAdicionado: Produto | null = null;
  pesquisa: string = '';

  constructor(
    private route: ActivatedRoute, 
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pesquisa = params['q'] || '';
      this.carregarProdutos();
    });
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      (produtos) => {
        if (this.pesquisa.trim() !== '') {
          this.produtos = produtos.filter(
            (produto) => produto.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
          );
        } else {
          this.produtos = produtos;
        }
      },
      (erro) => {
        console.error('Erro ao carregar produtos:', erro);
      }
    );
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