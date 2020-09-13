import { RouterModule } from '@angular/router';
import { CategoriaService } from './../categorias/categoria.service';
import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmationService, ConfirmDialogModule } from 'primeng/primeng';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LancamentoService } from 'app/lancamentos/lancamento.service';
import { PessoaService } from 'app/pessoas/pessoa.service';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule

  ],
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,
    ErrorHandlerService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR'},
  ]
})
export class CoreModule { }
