import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Promocao } from 'src/app/models/Promocao';
import { PromocaoService } from 'src/app/services/Promocao/promocao.service';

@Component({
  selector: 'app-cadastrar-promocao',
  templateUrl: './cadastrar-promocao.component.html',
  styleUrls: ['./cadastrar-promocao.component.css']
})
export class CadastrarPromocaoComponent {
  formCadastrar!: FormGroup;
  showModal: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private promocaoService: PromocaoService) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.formCadastrar = this.formBuilder.group({
      nomeDaPromocao: ['', [Validators.required]],
      descricao: [''],
    });
  }

  cadastrarPromocao(): void {
    if (this.formCadastrar.valid) {
      const novaPromocao: Promocao = this.formCadastrar.value;
      this.promocaoService.cadastrarPromocao(novaPromocao).subscribe(res => {
        console.log('Promoção cadastrada:', res);
        this.formCadastrar.reset(); // Limpa o formulário após o cadastro bem-sucedido
        this.showModal = true;
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

}