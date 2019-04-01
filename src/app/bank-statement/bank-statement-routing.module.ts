import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaveContributionComponent } from './save-contribution/save-contribution.component';

const routes: Routes = [
  { path: 'save-contribution', component: SaveContributionComponent }
  //{ path: 'list-contribution', component: ListContributionComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankStatementRoutingModule { }
