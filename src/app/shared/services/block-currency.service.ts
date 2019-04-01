import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dados } from 'src/app/models/dados.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LancamentosReserva } from 'src/app/models/lancamentos.model';

@Injectable({
  providedIn: 'root'
})
export class BlockCurrencyService {

  constructor(private http: HttpClient) { }

  //lista de lancamentos
  getListProvision(): Observable<Dados> {

    return this.http.get<Dados>(`${environment.API}/api/rec/tesouraria/lancamentos/listar`,
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

  //bloqueio em lote 
  postProvisionValue(lancamentosReserva: LancamentosReserva): Observable<any> {
    return this.http.post(`${environment.API}/api/rec/tesouraria/lancamentos/incluir/bloqueio/lote`,
      JSON.stringify(lancamentosReserva), {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  //Tratamento de Erro
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
