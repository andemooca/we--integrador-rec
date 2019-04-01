import { Component, OnInit, Directive, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Bloqueio, Identifier } from 'src/app/models/report.interface';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BankStatementService } from 'src/app/shared/services/bank-statement.service';

@Directive({
  selector: '[appZero]'
})
export class AppZeroDirective {

  private _restStage: boolean = false;

  constructor(
    private _model: NgModel,
    private _elementRef: ElementRef
  ) {
    this._model.control.valueChanges.subscribe((value: any) => {
      if ((value === null || value === 0) && !this._restStage) {
        this._restStage = true;
        this._elementRef.nativeElement.value = null;
        this._model.control.setValue(null);
        return;
      }
      this._restStage = false;
    });
  }
}

@Component({
  selector: 'app-list-contribution',
  templateUrl: './list-contribution.component.html',
  styleUrls: ['./list-contribution.component.css']
})
export class ListContributionComponent implements OnInit {

  closeResult: string;
  public mensagem;

  public balanceAvailable;
  public actualBalance;

  public totalProvisionValue;

  public totalIdsGenerated;
  public totalIdsPaid;
  public totalIdsNotPaid;

  public bloqueios: Bloqueio[];
  public gerados: Identifier[];
  public pagos: Identifier[];
  public pendentes: Identifier[];

  ngOnInit() {

    this.bankStatementService
      .getReport()
      .subscribe(
        (dados) => {
          this.balanceAvailable = numberToCurrency(dados.results.saldoDisponivel),
            this.actualBalance = numberToCurrency(dados.results.saldoReal),
            this.totalProvisionValue = numberToCurrency(dados.results.totalBloqueado),
            this.totalIdsGenerated = numberToCurrency(dados.results.totalIdentificadorGerado),
            this.totalIdsPaid = numberToCurrency(dados.results.totalIdentificadorPago),
            this.totalIdsNotPaid = numberToCurrency(dados.results.totalIdentificadorPendente),
            this.bloqueios = dados.results.bloqueios,
            this.gerados = dados.results.gerados,
            this.pagos = dados.results.pagos,
            this.pendentes = dados.results.pendentes
        },
        error => {
          this.mensagem = '[ Código do erro: ' + error.status + '] Problemas ao consultar dados ';
        }
      )
  }

  constructor(private modalService: NgbModal, private bankStatementService: BankStatementService) { }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

export const currencyToNumber = value => {
  if (typeof value !== 'string') {
    return value;
  }
  return parseFloat(value.replace(/[R$\.\s]/g, '').replace(',', '.'));
};

export const numberToCurrency = value => {
  value = currencyToNumber(value);

  return (value).toFixed(2)
    .replace('.', ',')
    .replace(/\d(?=(\d{3})+\,)/g, '$&.');
};
