import { Carrinho } from "./Carrinho";
import { Produto } from "./Produto";

export class ItensCarrinho {
  id!: number;
  idDoCarrinho!: number;
  idDoProduto!: number;
  quantidade!: number;
  precoComPromocao!: number;
  idDoCarrinhoNavigation?: Carrinho; // Se você também estiver usando o modelo de Carrinho
  idDoProdutoNavigation?: Produto;
}