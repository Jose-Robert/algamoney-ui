import { Component, OnInit } from '@angular/core';

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

  categorias = [
    { label: 'Alimentação', value: 1},
    { label: 'Transporte', value: 2},
    { label: 'Lazer', value: 3}
  ];

  pessoas = [
    { label: 'José Robert', value: 1},
    { label: 'Ruth de França', value: 2},
    { label: 'Bryan Calleri', value: 3},
  ];


  constructor() { }

  ngOnInit() {
  }

}
