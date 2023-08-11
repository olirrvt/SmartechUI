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
  totalComDesconto: number = 0;
  total: number = 0;
  produtosComprados: Produto[] = [];
  showModal: boolean = false;

  promocoes: Promocao[] = [];

  constructor(
    private carrinhoService: CarrinhoService,
    private produtoService: ProdutoService,
    private promocaoService: PromocaoService
  ) {}

  ngOnInit(): void {
    this.carregarPromocoes();
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
    });
  }

  atualizarPrecosDosProdutos(): void {
    this.produtosNoCarrinho = []; // Limpa a lista para evitar duplicações
    this.total = 0;
    
    for (const item of this.itensCarrinho) {
      this.produtoService.getProdutoById(item.idDoProduto).subscribe(produto => {
        this.produtosNoCarrinho.push(produto);
        item.idDoProdutoNavigation = produto;
  
        // Aplicar promoção, se existir uma promoção vinculada ao produto
        const promocao = this.promocoes.find(p => p.idDaPromocao === produto.idDaPromocao);
        if (promocao) {
          this.aplicarPromocaoAoProduto(item, promocao);
        }
  
        // Atualizar o total com o preço com promoção aplicada
        this.totalComDesconto += item.precoComPromocao;
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
    const precoPorItem = item.idDoProdutoNavigation?.preco;
    const quantidade = item.quantidade;
    const tipoDePromocao = item.idDoProdutoNavigation?.idDaPromocao;
  
    let precoTotal = 0;
  
    if (tipoDePromocao === 2 && quantidade === 2) { // Leve 2 e pague por 1
      if (precoPorItem !== undefined) {
        console.log(precoPorItem);
        precoTotal = precoPorItem;
      } else {
        console.error("Preço por item não está definido.");
      }
    } else if (tipoDePromocao === 3 && quantidade === 3) { // Leve 3 por 10
      precoTotal = 10;
    } else {
      if (precoPorItem !== undefined) {
        precoTotal = precoPorItem * quantidade;
        console.log(precoTotal);
      } else {
        console.error("Preço por item não está definido.");
      }
    }

    item.precoComPromocao = precoTotal;
  }

  comprar(): void {
    this.atualizarPrecosDosProdutos();
    this.produtosComprados = this.produtosNoCarrinho.slice();
    this.showModal = true;
  }

  fecharModal(): void {
    this.showModal = false;
  }

  removerItem(itemId: number): void {
    this.carrinhoService.removerItem(this.carrinhoId, itemId).subscribe(() => {
      this.atualizarItensCarrinho();
    });
  }
  
}