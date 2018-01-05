import { CodeComponent } from "./code.component";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { JournalCodeComponent } from "./journal-code/journal-code.component";
import { CodeRoutingModule } from "./code-routing.module";
import { ChartOfAccountsComponent } from './chart-of-accounts/chart-of-accounts.component';
import { DxFileUploaderModule, DxDataGridModule, DxSelectBoxModule, DxCheckBoxModule, DxNumberBoxModule, DxButtonModule, DxFormModule, DxPopupModule, DxTemplateModule, DxTabsModule, DxTreeListModule, DxLookupModule, DxTabPanelModule } from "devextreme-angular";
import { NgxPermissionsModule } from "ngx-permissions";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingModule, ANIMATION_TYPES } from "ngx-loading";
import { CodeService } from "./code.service";
import { AnalyticalCodesComponent } from './analytical-codes/analytical-codes.component';
import { CurrencyCodeComponent } from './currency-code/currency-code.component';
import { OfficeCodeComponent } from './office-code/office-code.component';
import { EmailSettingComponent } from './email-setting/email-setting.component';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { ProjectBudgetComponent } from './project-budget/project-budget.component';
import { BudgetLineComponent } from './project-budget/budget-line/budget-line.component';
import { LeavereasonTypeComponent } from "./leavereason-type/leavereason-type.component";


@NgModule({
    imports: [
        CommonModule,
        CodeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DxFileUploaderModule,
        DxDataGridModule,
        DxSelectBoxModule,
        DxCheckBoxModule,
        DxNumberBoxModule,
        DxButtonModule,
        DxFormModule,
        DxTabsModule,
        DxTabPanelModule,
        DxTreeListModule,
        DxPopupModule,
        DxLookupModule,
        DxTemplateModule,
        NgxPermissionsModule.forChild({
            permissionsIsolate: true,
            rolesIsolate: true
        }),

        TranslateModule.forChild({}),
        LoadingModule.forRoot({
            animationType: ANIMATION_TYPES.threeBounce,
            backdropBackgroundColour: 'rgba(0,0,0,0.1)',
            backdropBorderRadius: '4px',
            primaryColour: '#31c3aa',
            secondaryColour: '#000',
            tertiaryColour: '#a129'
        }),
    ],
    declarations: [
        CodeComponent,
        JournalCodeComponent,
        ChartOfAccountsComponent,
        AnalyticalCodesComponent,
        CurrencyCodeComponent,
        OfficeCodeComponent,
        EmailSettingComponent,
        ExchangeRateComponent,
        ProjectBudgetComponent,
        BudgetLineComponent,
        LeavereasonTypeComponent 
    ],
    providers: [CodeService],
})
export class CodeModule { }