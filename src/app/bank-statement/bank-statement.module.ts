import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaveContributionComponent } from './save-contribution/save-contribution.component';
import { ListContributionComponent } from './list-contribution/list-contribution.component';
import { BankStatementRoutingModule } from './bank-statement-routing.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SaveContributionComponent, ListContributionComponent],
  imports: [
    CommonModule,
    BankStatementRoutingModule,
    CurrencyMaskModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ]
})
export class BankStatementModule { }
