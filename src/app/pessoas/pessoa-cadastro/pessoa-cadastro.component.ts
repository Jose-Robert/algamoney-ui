import { Pessoa } from './../../shared/model/pessoa.model';
import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandle: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  public salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.toasty.success('Registro adicionado com sucesso!');

        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(error => this.errorHandle.handle(error));
  }

}
