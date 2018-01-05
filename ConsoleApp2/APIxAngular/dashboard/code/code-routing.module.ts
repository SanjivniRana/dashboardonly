import { Routes, RouterModule } from "@angular/router";
import { CodeComponent } from "./code.component";
import { JournalCodeComponent } from "./journal-code/journal-code.component";
import { NgModule } from "@angular/core";
import { ChartOfAccountsComponent } from "./chart-of-accounts/chart-of-accounts.component";
import { AnalyticalCodesComponent } from "./analytical-codes/analytical-codes.component";
import { CurrencyCodeComponent } from "./currency-code/currency-code.component";
import { OfficeCodeComponent } from "./office-code/office-code.component";
import { EmailSettingComponent } from "./email-setting/email-setting.component";
import { ExchangeRateComponent } from "./exchange-rate/exchange-rate.component";
import { ProjectBudgetComponent } from "./project-budget/project-budget.component";
import { LeavereasonTypeComponent } from "./leavereason-type/leavereason-type.component";


const appRouter: Routes =
    [{
        path: '', component: CodeComponent,
        children:
            [
                { path: 'journal-code', component: JournalCodeComponent },
                { path: 'chart-of-accounts', component: ChartOfAccountsComponent },
                { path: 'analytical-codes', component: AnalyticalCodesComponent },
                { path: 'currency-code', component: CurrencyCodeComponent },
                { path: 'office-code', component: OfficeCodeComponent },
                { path: 'email-setting', component: EmailSettingComponent },
                { path: 'exchange-rate', component: ExchangeRateComponent },
                { path: 'project-budget', component: ProjectBudgetComponent },
                { path: 'leavereason-type', component: LeavereasonTypeComponent },
            ]
    }];

@NgModule({
    imports: [RouterModule.forChild(appRouter)],
    exports: [RouterModule]
})
export class CodeRoutingModule { }

