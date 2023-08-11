import { Produto } from "./Produto";

export class Promocao {
    idDaPromocao!: number;
    nomeDaPromocao!: string | null;
    descricao!: string | null;
    produtos!: Produto[]; // Certifique-se de importar o modelo de produto se houver
  }
  