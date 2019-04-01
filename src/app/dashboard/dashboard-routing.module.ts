import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelComponent } from './painel/painel.component';
import { SaveProvisionCurrencyComponent } from '../block-currency/save-provision-currency/save-provision-currency.component';

const routes: Routes = [
   {path: '/save-provision-currency', component: SaveProvisionCurrencyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
