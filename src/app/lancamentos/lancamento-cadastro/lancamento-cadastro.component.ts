import { FormControl } from '@angular/forms';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Lancamento } from 'app/shared/model/lancamento.model';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'},
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();


  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandle: ErrorHandlerService
    ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  public carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => {
          return { label: c.nome, value: c.codigo};
        });
      })
      .catch(error => this.errorHandle.handle(error));
  }

  public carregarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => {
          return { label: p.nome, value: p.codigo};
        });
      })
      .catch(error => this.errorHandle.handle(error));
  }

  public salvar(form: FormControl) {
    console.log(this.lancamento);
  }

}
