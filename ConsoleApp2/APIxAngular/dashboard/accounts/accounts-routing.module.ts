import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { UserComponent } from '../admin/user.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { JournalComponent } from './journal/journal.component';
import { LedgerComponent } from './ledger/ledger.component';
import { TrailBalanceComponent } from './trialBalance/trialBalance.component';
import { AdvanceDeductionComponent } from './advanceDeduction/advanceDeduction.component';
import { FinancialReportComponent } from './financial-report/financial-report.component';
import { NgModule } from '@angular/core';
import { BudgetBalanceComponent } from './budget-balance/budget-balance.component';
import { TransactionComponent } from './vouchers/transaction/transaction.component';
import { DocumentComponent } from './vouchers/document/document.component';

const Account_Router: Routes =
    [{
        path: '', component: AccountsComponent,
        children: [
            // { path: '', redirectTo: 'vouchers', pathMatch: 'full' },
            { path: 'vouchers', component: VouchersComponent },
            { path: 'journal', component: JournalComponent },
            { path :'vouchers/document',component: DocumentComponent},
            { path :'vouchers/transaction',component: TransactionComponent},
            { 
                path: 'ledger', 
                component: LedgerComponent
            },
            { 
                path: 'budgetbalance', 
                component: BudgetBalanceComponent
            },
            {        
                path: 'trialbalance', 
                component: TrailBalanceComponent        
            },
            {        
                path: 'advanceDeduction', 
                component: AdvanceDeductionComponent        
            },
            {        
                path: 'financialreport', 
                component: FinancialReportComponent        
            }
        ]
    }];
@NgModule({
    imports: [RouterModule.forChild(Account_Router)],
    exports: [RouterModule]
})
export class AccountsRoutingModule { }