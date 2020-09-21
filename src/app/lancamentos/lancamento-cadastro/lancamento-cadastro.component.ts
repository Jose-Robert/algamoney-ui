import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from 'app/lancamentos/lancamento.service';
import { FormControl } from '@angular/forms';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Lancamento } from 'app/shared/model/lancamento.model';
import { ActivatedRoute } from '@angular/router';

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
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private errorHandle: ErrorHandlerService,
    private router: ActivatedRoute
    ) { }

  ngOnInit() {
    this.hasCodigoLancamento();
    this.carregarCategorias();
    this.carregarPessoas();
  }

  private hasCodigoLancamento() {
    const codigoLancamento = this.router.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }
  }

  public carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
      })
      .catch(error => this.errorHandle.handle(error));
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
    if (this.isEdit) {
      this.atualizarLancamento(form);
      console.log(form)
    } else {
      this.adicionarLancamento(form);
    }
  }

  public adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.toasty.success('Lançamento adicionado com sucesso!');

        form.reset();
        this.lancamento = new Lancamento();
      })
      .catch(error => this.errorHandle.handle(error));
  }

  public atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamento = lancamento;

        this.toasty.success('Lançamento alterado com sucesso!');
      })
      .catch(erro => this.errorHandle.handle(erro));
  }

  get isEdit(): boolean {
    return this.lancamento.codigo ? true : false;
  }

}
