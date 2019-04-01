import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Report } from 'src/app/models/report.interface';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { LancamentoReserva } from 'src/app/models/lancamento.model';

@Injectable({
  providedIn: 'root'
})
export class BankStatementService {

  constructor(private http: HttpClient) { }

  //Resumo Saldo do dia
  getReport(): Observable<Report> {

    return this.http.get<Report>(`${environment.API}/api/rec/tesouraria/convenio/visualizar/extrato`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
          'Access-Control-Allow-Headers': 'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        }
      }
    )
      .pipe(catchError(error => this.handleError(error)));
  }

    //bloqueio único - aporte
    postContribution(lancamentoReserva: LancamentoReserva): Observable<any> {
      console.log("Service Bloqueio Aporte");
      return this.http.post(`${environment.API}/api/rec/tesouraria/lancamentos/incluir/bloqueio`,
        JSON.stringify(lancamentoReserva), {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Erro: ${error.error.message}`;
      console.log('Ocorreu um erro: ' + errorMessage);
      console.log();
    } else {
      // server-side error
      errorMessage = `Código: ${error.status}\n Mensagem: ${error.message}`;
      console.log(
        ' Erro retornado pelo servidor ' + error.status +
        ' Conteúdo: ' + error.error);
    }
    return throwError(error || ' Erro ao consultar dados.  ');
  }
}
