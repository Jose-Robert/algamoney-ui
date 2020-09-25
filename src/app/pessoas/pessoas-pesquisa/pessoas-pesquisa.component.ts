import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/primeng';
import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') grid;

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de pessoas');
  }

  public pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      });
  }

  public aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  public confirmaExclusao(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  public excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
          if (this.grid.first === 0) {
            this.pesquisar();
          } else {
            this.grid.first = 0;
          }
          this.toasty.success('Pessoa excluida com sucesso')
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  public alternarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.toasty.success(`Pessoa ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
