import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit, ErrorHandler } from '@angular/core';

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

  pessoas = [
    { label: 'José Robert', value: 1},
    { label: 'Ruth de França', value: 2},
    { label: 'Bryan Calleri', value: 3},
  ];


  constructor(
    private categoriaService: CategoriaService,
    private errorHandle: ErrorHandlerService
    ) { }

  ngOnInit() {
    this.carregarCategorias();
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

}
