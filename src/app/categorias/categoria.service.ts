import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoriaService {

  baseUrl = 'http://localhost:8080/categorias';

  constructor(private http: Http) { }

  public listarTodas(): Promise<any> {
    const headers = new Headers();
    this.authorization(headers);

    return this.http.get(this.baseUrl, { headers })
      .toPromise()
      .then(response => response.json());
  }


  private authorization(headers: Headers) {
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
  }

}
