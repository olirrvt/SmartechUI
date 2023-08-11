import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/services/Produto/produto.service';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent {
  formCadastrar!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.formCadastrar = this.formBuilder.group({
      nome: ['', [Validators.required]],
      preco: [0, [Validators.required]],
      categoria: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      idDaPromocao: [1],
    });
  }

  cadastrarProduto(): void {

    if (this.formCadastrar.valid) {

      const novoProduto: Produto = this.formCadastrar.value;

      this.produtoService.inserirProduto(novoProduto).subscribe((res: Produto) => {
        console.log('Produto cadastrado:', res);
        this.formCadastrar.reset(); // Limpa o formulário após o cadastro bem-sucedido
      });
    }

  }
  
}