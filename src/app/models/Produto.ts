import { Promocao } from "./Promocao";

export class Produto {
  id!: number;
  nome!: string;
  preco!: number;
  categoria!: string;
  descricao!: string;
  idDaPromocao!: number | null;
  idDaPromocaoNavigation?: Promocao;
  itensCarrinhos!: any[];
}
