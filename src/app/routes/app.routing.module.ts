import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PainelComponent } from '../dashboard/painel/painel.component';
import { BlockCurrencyModule } from '../block-currency/block-currency.module';
import { SaveProvisionCurrencyComponent } from '../block-currency/save-provision-currency/save-provision-currency.component';
import { BankStatementModule } from '../bank-statement/bank-statement.module';
import { SaveContributionComponent } from '../bank-statement/save-contribution/save-contribution.component';
import { ListContributionComponent } from '../bank-statement/list-contribution/list-contribution.component';


const appRoutes: Routes = [
    // {path: '', component: PainelComponent},
    // {path: 'dashboard', component: PainelComponent}
    // {path: '', component: SaveContributionComponent},
    // {path: 'dashboard', component: ListContributionComponent},
    { path: '', component: SaveProvisionCurrencyComponent },
    { path: 'dashboard', component: SaveProvisionCurrencyComponent },
    { path: 'save-contribution', component: SaveContributionComponent },
    { path: 'list-contribution', component: ListContributionComponent }
];

@NgModule({
    declarations: [
        //SaveProvisionCurrencyComponent,
    ],
    imports: [
        BlockCurrencyModule,
        BankStatementModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})

export class AppRoutingModule {
}