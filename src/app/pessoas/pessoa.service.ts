import { Pessoa } from './../shared/model/pessoa.model';
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

  public pesquisar(filtro: PessoaFiltro): Promise<any> {
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

  public listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.pessoasUrl, { headers })
      .toPromise()
      .then(response => response.json().content);
  }

  public excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    this.authorization(headers);

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  public mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new Headers();
    this.authorization(headers);
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  public adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    this.authorization(headers);
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => response.json());
  }

  public atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    this.authorization(headers);
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`,
        JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => response.json() as Pessoa);
  }

  public buscarPorCodigo(codigo: number): Promise<Pessoa> {
    const headers = new Headers();
    this.authorization(headers);

    return this.http.get(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => response.json() as Pessoa);
  }

  public filterByPaginacaoLazy(filtro: PessoaFiltro, params: URLSearchParams) {
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());
  }

  private authorization(headers: Headers) {
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
  }

  public filterByName(filtro: PessoaFiltro, params: URLSearchParams) {
    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }
  }

}
