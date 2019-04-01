import { Component, OnInit } from '@angular/core';
import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContaConvenio } from 'src/app/models/contaConvenio.model';
import { LancamentoReserva } from 'src/app/models/lancamento.model';
import { BankStatementService } from 'src/app/shared/services/bank-statement.service';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@Component({
  selector: 'app-save-contribution',
  templateUrl: './save-contribution.component.html',
  styleUrls: ['./save-contribution.component.css']
})
export class SaveContributionComponent implements OnInit {

  form: FormGroup;
  conta: ContaConvenio = new ContaConvenio();
  lancamentoReserva = new LancamentoReserva();

  hoje: Date = new Date();
  submitted = false;

  public mensagemSucessoAporte = "";
  public mensagemErroAporte = "";

  dataLiberacaoPrevista = this.hoje.toLocaleDateString();//Somente exibe na tela a data atual
  tipoOperacao = "BLOQUEIO"; // valor mocado
  tipoSolicitacao = "Solicitado"; // valor mocado
  convenio = "0623";

  constructor(
    private bankStatementService : BankStatementService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      usuarioAporte: ['', Validators.required],
      valorAporte: ['', Validators.required],
    });
  }
  get f() { return this.form.controls; }
  onSubmit() {
    console.log("here");
    this.submitted = true;
    console.log("form", this.form.invalid);

    if (this.form.invalid) {
      this.mensagemSucessoAporte = "";
      this.mensagemErroAporte = "Erro ao realizar aporte";
      console.log("formulario invalido");
      return;
    }
    //  Inicio Teste Mocado
    //   this.mensagemSucessoAporte = "Sucesso ao realizar o aporte";
    //   this.mensagemErroAporte = "";

    //   this.form.reset();
    //   this.removeValidators(this.form);

    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 2000); 

    // // alert('SUCCESS!! :-)')
    // Fim teste Mocado

    this.conta.usuario = this.form.value.usuarioAporte;
    this.conta.valorSolicitado = this.form.value.valorAporte;
    this.conta.convenio = this.convenio;
    this.conta.dataLiberacaoPrevista = toString(this.hoje);
    this.conta.tipoOperacao = this.tipoOperacao;
    this.conta.tipoSolicitacao = this.tipoSolicitacao;

    this.lancamentoReserva.lancamentoReserva = this.conta;

    console.log(this.lancamentoReserva);

    this.bankStatementService.
      postContribution(this.lancamentoReserva)
      .subscribe(resp => {
        console.log("Sucesso");
        this.mensagemErroAporte = '';
        this.mensagemSucessoAporte = 'Bloqueio Inserido com sucesso!';

        this.reset()
        this.removeValidators(this.form);

        setTimeout(() => {
          window.location.reload();
        }, 2000);

      },
        error => {
          console.log("Erro");
          this.mensagemSucessoAporte = '';
          this.mensagemErroAporte = 'Code: ' + error.error.results.code + ' - ' + error.error.results.userMessage
        }
      )
  }

  public removeValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key).clearValidators();
      form.get(key).updateValueAndValidity();
    }
  }

  reset() {
    console.log("here");
    this.form.reset();
  }

}

function toDate(texto) {
  let partes = texto.split('/');
  return new Date(partes[2], partes[1] - 1, partes[0]);
}

function toString(date) {
  return date.getFullYear("") + '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('0' + date.getDate()).slice(-2);
}
