import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { Lancamento } from 'app/shared/model/lancamento.model';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    this.authorization(headers);
    this.filterByPaginacaoLazy(filtro, params);
    this.filterByDescricao(filtro, params);
    this.filterByDataVencimento(filtro, params);

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const lancamentos = responseJson.content;

        const resultado = {
          lancamentos,
          total: responseJson.totalElements
        };
        return resultado;
      })
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    this.authorization(headers);

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  public adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    this.authorization(headers);
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => response.json());
  }

  filterByDescricao(filtro: LancamentoFiltro, params: URLSearchParams) {
    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
  }

  filterByDataVencimento(filtro: LancamentoFiltro, params: URLSearchParams) {
    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }
  }

  filterByPaginacaoLazy(filtro: LancamentoFiltro, params: URLSearchParams) {
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());
  }

  authorization(headers: Headers) {
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
  }

}
