import { Component, OnInit } from '@angular/core';
import { ContaConvenio } from 'src/app/models/contaConvenio.model';
import { BlockCurrencyService } from 'src/app/shared/services/block-currency.service';
import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';
import { LancamentosReserva } from 'src/app/models/lancamentos.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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
  selector: 'app-save-provision-currency',
  templateUrl: './save-provision-currency.component.html',
  styleUrls: ['./save-provision-currency.component.css']
})

export class SaveProvisionCurrencyComponent implements OnInit {

  hoje: Date = new Date();
  conta: ContaConvenio = new ContaConvenio();
  lista: ContaConvenio[] = [];
  lancamentosReserva = new LancamentosReserva();
  public mensagemSucesso = "";
  public mensagemErro = "";
  registerForm: FormGroup;
  submitted = false;

  //Valores mocados de acordo com regra de negocio
  dataSolicitacao = this.hoje.toLocaleDateString();//Somente exibe na tela a data atual
  tipoOperacao = "BLOQUEIO";
  tipoSolicitacao = "AGENDADO";
  convenio = "0623";

  constructor(
    private blockCurrencyService: BlockCurrencyService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      dataLiberacaoPrevista: [null, [Validators.required]],
      valorSolicitado: ['', Validators.required],
    });
  }

  //Salvar Dados
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log("formulario invalido");
      return;
    }

    let dtInicio = this.f.dataLiberacaoPrevista.value[0].toLocaleDateString()
    let dtFim = this.f.dataLiberacaoPrevista.value[1].toLocaleDateString()

    let d1 = toDate(dtInicio),
      d2 = toDate(dtFim),
      intervalos = [];

    intervalos.push(toString(d1));

    while (d1 < d2) {
      d1.setDate(d1.getDate() + 1);
      intervalos.push(toString(d1));
    }
    console.log("datas - intervalos ", intervalos);

    //Montar lista de objeto para ser enviado para o backend
    this.lancamentosReserva.lancamentosReserva = []; // limpa a lista em caso de ero
    this.lista = [];// limpa a lista
    for (let index = 0; index < intervalos.length; index++) {
      var d = new Date(intervalos[index]);
      this.conta = new ContaConvenio();

      this.conta.dataLiberacaoPrevista = intervalos[index];
      this.conta.valorSolicitado = this.f.valorSolicitado.value;
      this.conta.tipoOperacao = this.tipoOperacao;
      this.conta.tipoSolicitacao = this.tipoSolicitacao;
      this.conta.usuario = this.f.usuario.value;
      this.conta.convenio = this.convenio;

      this.lista.push(this.conta);
      this.lancamentosReserva.lancamentosReserva = this.lista;

    }
    console.log("Lista de Conta Convenio: ", this.lancamentosReserva);
    // Envia um objeto ou uma lista de objeto para o serviço
    this.blockCurrencyService.
      postProvisionValue(this.lancamentosReserva)
      .subscribe(resp => {
        //,ensagem de sucesso
        this.mensagemErro = '';
        this.mensagemSucesso = 'Bloqueio Inserido com sucesso!';
        
        //limpa formulario e remove validação
        this.reset()
        this.removeValidators(this.registerForm);

        //reload na tela para atualiza a lista 
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
        error => {
          //Mensagem de erro que retorna da api
          this.mensagemSucesso = '';
          this.mensagemErro = 'Code: ' + error.error.results.code + ' - ' + error.error.results.developerMessage
        }
      )
  }

  reset() {
    console.log("here");
    this.registerForm.reset();
  }

  public removeValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key).clearValidators();
      form.get(key).updateValueAndValidity();
    }
  }

  public addValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key).setValidators(this.registerForm[key]);
      form.get(key).updateValueAndValidity();
    }
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
