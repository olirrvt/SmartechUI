// Módulos do Angular

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';

// Components do Angular

import { AppComponent } from './app.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { HomeComponent } from './pages/home/home.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { CadastrarProdutosComponent } from './pages/cadastrar-produtos/cadastrar-produtos.component';
import { CadastrarPromocaoComponent } from './pages/cadastrar-promocao/cadastrar-promocao.component';
import { HeaderComponent } from './components/header/header.component';
import { BuscarProdutosComponent } from './pages/buscar-produtos/buscar-produtos.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CarrinhoComponent,
    HomeComponent,
    ProdutoComponent,
    CadastrarProdutosComponent,
    CadastrarPromocaoComponent,
    HeaderComponent,
    BuscarProdutosComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
