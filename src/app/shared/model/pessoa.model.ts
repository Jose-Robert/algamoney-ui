import { Endereco } from './endereco.model';
export class Pessoa {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo = true;
}
