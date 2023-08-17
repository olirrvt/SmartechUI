import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { CadastrarProdutosComponent } from './pages/cadastrar-produtos/cadastrar-produtos.component';
import { CadastrarPromocaoComponent } from './pages/cadastrar-promocao/cadastrar-promocao.component';
import { BuscarProdutosComponent } from './pages/buscar-produtos/buscar-produtos.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "carrinho", component: CarrinhoComponent },
  { path: "produtos", component: ProdutoComponent },
  { path: "cadastrar-produtos", component: CadastrarProdutosComponent },
  { path: "cadastrar-promocao", component: CadastrarPromocaoComponent },
  { path: "buscar-produtos", component: BuscarProdutosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
