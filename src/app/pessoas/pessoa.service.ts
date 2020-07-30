import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: Http) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    this.authorization(headers);
    this.filterByPaginacaoLazy(filtro, params);
    this.filterByName(filtro, params);

    return this.http.get(`${this.pessoasUrl}`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pessoas = responseJson.content;

        const resultado = {
          pessoas,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.pessoasUrl, { headers })
      .toPromise()
      .then(response => response.json().content);
  }

  filterByPaginacaoLazy(filtro: PessoaFiltro, params: URLSearchParams) {
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());
  }

  authorization(headers: Headers) {
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
  }

  filterByName(filtro: PessoaFiltro, params: URLSearchParams) {
    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }
  }

}
