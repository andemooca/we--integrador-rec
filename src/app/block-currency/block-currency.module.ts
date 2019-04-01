import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockCurrencyRoutingModule } from './block-currency-routing.module';
import { ListProvisionCurrencyComponent } from './list-provision-currency/list-provision-currency.component';
import { SaveProvisionCurrencyComponent } from './save-provision-currency/save-provision-currency.component';
import { SharedModule } from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [ListProvisionCurrencyComponent, SaveProvisionCurrencyComponent],
  imports: [
    CommonModule,
    BlockCurrencyRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DateRangePickerModule,
    CurrencyMaskModule,
  ]
})
export class BlockCurrencyModule { }
