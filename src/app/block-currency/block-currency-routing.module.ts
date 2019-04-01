import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProvisionCurrencyComponent } from './list-provision-currency/list-provision-currency.component';
import { SaveProvisionCurrencyComponent } from './save-provision-currency/save-provision-currency.component';

const routes: Routes = [
  { path: 'save-provision-currency', component: SaveProvisionCurrencyComponent },
  { path: 'list-provision-currency', component: ListProvisionCurrencyComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockCurrencyRoutingModule { }
