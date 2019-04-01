import { Component, OnInit } from '@angular/core';
import { ContaConvenio } from 'src/app/models/contaConvenio.model';
import { BlockCurrencyService } from 'src/app/shared/services/block-currency.service';
import { Dados } from 'src/app/models/dados.model';

@Component({
  selector: 'app-list-provision-currency',
  templateUrl: './list-provision-currency.component.html',
  styleUrls: ['./list-provision-currency.component.css']
})
export class ListProvisionCurrencyComponent implements OnInit {

  public lista: ContaConvenio[];
  public mensagem;

  constructor(private servico: BlockCurrencyService) { }

  ngOnInit() {

    this.servico.getListProvision().subscribe((dados: Dados) => {
      this.lista = dados.results.lancamentosReserva
      console.log(dados);
    },
      error => {
        this.mensagem = '[ Código do erro: ' + error.status + '] Problemas ao consultar dados ';
      },
    );
  }

}
