import { Component } from '@angular/core';
import { ItensCarrinho } from 'src/app/models/ItensCarrinhos';
import { Produto } from 'src/app/models/Produto';
import { CarrinhoService } from 'src/app/services/Carrinho/carrinho.service';
import { ProdutoService } from 'src/app/services/Produto/produto.service';
import { PromocaoService } from 'src/app/services/Promocao/promocao.service';
import { Promocao } from 'src/app/models/Promocao';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent {
  produtosNoCarrinho: Produto[] = [];
  carrinhoId: number = 1;
  itensCarrinho: ItensCarrinho[] = [];
  total: number = 0;

  promocoes: Promocao[] = []; // Armazena as promoções

  constructor(
    private carrinhoService: CarrinhoService,
    private produtoService: ProdutoService,
    private promocaoService: PromocaoService
  ) {}

  ngOnInit(): void {
    this.carregarPromocoes(); // Carrega as promoções disponíveis
    this.atualizarItensCarrinho();
  }

  carregarPromocoes(): void {
    this.promocaoService.getPromocoes().subscribe(promocoes => {
      this.promocoes = promocoes;
    });
  }

  atualizarItensCarrinho(): void {
    this.carrinhoService.verItensCarrinho(this.carrinhoId).subscribe(itens => {
      this.itensCarrinho = itens;
      this.atualizarPrecosDosProdutos();
      this.calcularTotal();
    });
  }

  atualizarPrecosDosProdutos(): void {
    for (const item of this.itensCarrinho) {
      this.produtoService.getProdutoById(item.idDoProduto).subscribe(produto => {
        this.produtosNoCarrinho.push(produto);
        item.idDoProdutoNavigation = produto;

        // Aplicar promoção, se existir uma promoção vinculada ao produto
        const promocao = this.promocoes.find(p => p.idDaPromocao === produto.idDaPromocao);
        if (promocao) {
          this.aplicarPromocaoAoProduto(item, promocao);
        }

        this.calcularTotal();
      });
    }
  }

  atualizarQuantidade(itemId: number, novaQuantidade: number, index: number): void {
    this.carrinhoService.atualizarQuantidadeItem(this.carrinhoId, itemId, novaQuantidade).subscribe(response => {
      console.log(response);
      this.itensCarrinho[index].quantidade = novaQuantidade;
      this.atualizarPrecosDosProdutos();
    });
  }

  aplicarPromocaoAoProduto(item: ItensCarrinho, promocao: Promocao): void {
    if (item.idDoProdutoNavigation) {

      if (promocao.nomeDaPromocao === 'Leve 2 e pague 1') {

      const quantidadeDescontada = Math.floor(item.quantidade / 2);
      const quantidadeSemDesconto = item.quantidade - quantidadeDescontada;

      console.log('Quantidade Descontada:', quantidadeDescontada);
      console.log('Quantidade Sem Desconto:', quantidadeSemDesconto);
      console.log('Preço Original:', item.idDoProdutoNavigation.preco);

      const precoComDesconto = quantidadeDescontada * item.idDoProdutoNavigation.preco + quantidadeSemDesconto * item.idDoProdutoNavigation.preco;

      item.precoComPromocao = precoComDesconto / item.quantidade;

      } else if (promocao.nomeDaPromocao === 'Leve 3 por 10') {

        let quantidadeDescontada = Math.floor(item.quantidade / 3 );

        console.log('Quantidade Descontada:', quantidadeDescontada);
        console.log('Preço Original:', item.idDoProdutoNavigation.preco);
      
        const precoSemDesconto = item.idDoProdutoNavigation.preco * item.quantidade;
        const precoComDesconto = precoSemDesconto - (quantidadeDescontada * 10);
      
        item.precoComPromocao = precoComDesconto / item.quantidade;

      } else {
        item.precoComPromocao = item.idDoProdutoNavigation.preco;
      }
    }
  }  

  calcularTotal(): void {
    this.total = this.itensCarrinho.reduce((acc, item) => acc + (item.precoComPromocao || 0) * item.quantidade, 0);
  }

  removerItem(itemId: number): void {
    this.carrinhoService.removerItem(this.carrinhoId, itemId).subscribe(() => {
      this.atualizarItensCarrinho();
    });
  }
  
}