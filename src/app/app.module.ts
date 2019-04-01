import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './routes/app.routing.module';
import { BankStatementService } from './shared/services/bank-statement.service';
import { BlockCurrencyService } from './shared/services/block-currency.service';
import { LoginService } from './shared/services/login.service';
import { SharedModule } from './shared/shared.module';
import {HttpClientModule} from "@angular/common/http";
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
 registerLocaleData(localePt, 'pt');
import { CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { CustomCurrencyMaskConfig } from './block-currency/save-provision-currency/save-provision-currency.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,   
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    BankStatementService, 
    LoginService,
    BlockCurrencyService, 
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
