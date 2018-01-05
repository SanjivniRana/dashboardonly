import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountsService, Ledger } from '../accounts.service';
import { AppSettingsService } from '../../../Services/App-settings.Service';
import { ToastrService } from 'ngx-toastr';
import { commonService } from '../../../Services/common.service';
import { GLOBAL } from '../../../shared/global';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { CodeService } from '../../code/code.service';

interface LedgerFilter{
    CurrencyId: number;
    OfficeCode: number;
    RecordType: number;
    FromDate: string;
    ToDate: string; 
    AccountId : number;
  }

@Component({
    selector: 'app-ledger',
    templateUrl: './ledger.component.html'
})
export class LedgerComponent implements OnInit {
    dataSource: Ledger[];

    currencyDropdown: any[];
    officeDropdown: any[];
    recordTypeDropdown: any[];
    accountDropdown: any[];
    ledgerFilter: LedgerFilter;
    loading: any;
    pivotGridDataSource: any;

    OpenningBalance: any = 0.00;
    ClosingBalance: any = 0.00;
    OpenningBalanceType: any = null;
    ClosingBalanceType: any = null;
    FromDate:any;
    currentDateFinal:any;

    constructor(private accountservice: AccountsService, private codeservice: CodeService, private setting: AppSettingsService, private toastr: ToastrService) {
        this.FromDate = "01/01/" + (new Date()).getFullYear();
        var currentDate = new Date().getDate();
        var currentMonth = new Date().getMonth() + 1;
        var currentYear = new Date().getFullYear();
        this.currentDateFinal = currentMonth+"/"+currentDate+"/"+currentYear;
        this.recordTypeDropdown = [{
            "Id": 1,
            "Name": "Single",
        },
        {
            "Id": 2,
            "Name": "Consolidate",
        }];

        this.ledgerFilter = {
            CurrencyId: 1,
            OfficeCode: null,
            RecordType: 1,
            AccountId: null,
            FromDate: this.FromDate,
            ToDate: this.currentDateFinal
        };
    }

    ngOnInit() {
        this.GetLedgerDetails();
        this.getCurrencyCodeList();
        this.getOfficeCodeList();
        this.GetAccountDetails();
    }

    getCurrencyCodeList() {
        this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_CurrencyCodes_GetAllCurrency).subscribe(
            data => {
                this.currencyDropdown = [];
                if (data.data.CurrencyList != null) {
                    data.data.CurrencyList.forEach(element => {
                        this.currencyDropdown.push(element);
                    });
                }
            },
            error => {
                if (error.StatusCode == 500) {
                    this.toastr.error("Internal Server Error....");
                }
                else if (error.StatusCode == 401) {
                    this.toastr.error("Unauthorized Access Error....");
                }
                else if (error.StatusCode == 403) {
                    this.toastr.error("Forbidden Error....");
                }
            }
        )
    }

    //Get Office Code in Add, Edit Dropdown 
    getOfficeCodeList() {
        this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_OfficeCode_GetAllOfficeDetails).subscribe(
            data => {
                if (data.data.OfficeDetailsList != null) {
                    this.officeDropdown = [];
                    data.data.OfficeDetailsList.forEach(element => {
                        this.officeDropdown.push(element);
                    });
                }
            },
            error => {
                if (error.StatusCode == 500) {
                    this.toastr.error("Internal Server Error....");
                }
                else if (error.StatusCode == 401) {
                    this.toastr.error("Unauthorized Access Error....");
                }
                else if (error.StatusCode == 403) {
                    this.toastr.error("Forbidden Error....");
                }
            }
        )
    }

    GetAccountDetails() {
        this.accountservice.GetAccountDetails(this.setting.getBaseUrl() + GLOBAL.API_Accounting_GetAccountDetails).subscribe(
            data => {
                this.accountDropdown = [];
                if (data.StatusCode == 200) {
                    data.data.AccountDetailList.forEach(element => {
                        this.accountDropdown.push(
                            {
                                AccountCode: element.AccountCode,
                                AccountName: element.AccountName
                            }
                        );
                    });
                }
            },
            error => {
                if (error.StatusCode == 500) {
                    this.toastr.error("Internal Server Error....");
                }
                else if (error.StatusCode == 401) {
                    this.toastr.error("Unauthorized Access Error....");
                }
                else if (error.StatusCode == 403) {
                    this.toastr.error("Forbidden Error....");
                }
                else {
                }
            }
        )
    }

    onApplyingFilter(value) {
        this.ledgerFilter.CurrencyId = value.CurrencyId;
        this.ledgerFilter.OfficeCode = value.OfficeCode;
        this.ledgerFilter.RecordType = value.RecordType;
        this.ledgerFilter.AccountId = value.AccountId;
        this.ledgerFilter.FromDate = value.FromDate;
        this.ledgerFilter.ToDate = value.ToDate;
        this.GetLedgerDetails();
    }

    GetLedgerDetails() {
        this.loading = true;
        this.accountservice.GetAllLedgerDetails(this.setting.getBaseUrl() + GLOBAL.API_Accounting_GetAllLedgerDetails, this.ledgerFilter).subscribe(
            data => {
                this.dataSource = [];
                if (data.StatusCode == 200) {
                    this.loading = false;
                    data.data.LedgerList.forEach(element => {
                        this.dataSource.push(element);
                    });
                    if (data.data.AccountOpendingAndClosingBL != null) {
                        this.ClosingBalance = data.data.AccountOpendingAndClosingBL.ClosingBalance;
                        this.OpenningBalance = data.data.AccountOpendingAndClosingBL.OpenningBalance;
                        this.OpenningBalanceType = data.data.AccountOpendingAndClosingBL.OpenningBalanceType;
                        this.ClosingBalanceType = data.data.AccountOpendingAndClosingBL.ClosingBalanceType;
                    }
                    this.pivotGridDataSource = new PivotGridDataSource({
                        fields: [{
                            caption: 'MainLevel',
                            dataField: 'MainLevel',
                            area: 'row'
                        },
                        {
                            caption: 'ControlLevel',
                            dataField: 'ControlLevel',
                            area: 'row'
                        },
                        {
                            caption: 'SubLevel',
                            dataField: 'SubLevel',
                            area: 'row'
                        },
                        {
                            caption: 'ChartAccountName',
                            dataField: 'ChartAccountName',
                            area: 'row'
                        },
                        {
                            caption: 'AccountName',
                            dataField: 'AccountName',
                            area: 'row',
                        },
                        {
                            caption: 'TransactionType',
                            dataField: 'TransactionType',
                            area: 'column'
                        },
                        {
                            caption: 'Amount',
                            dataField: 'Amount',
                            dataType: 'number',
                            summaryType: 'sum',
                            format: 'currency',
                            area: 'data'
                        }],
                        store: this.dataSource
                    })
                };
            },
            error => {
                if (error.StatusCode == 500) {
                    this.toastr.error("Internal Server Error....");
                }
                else if (error.StatusCode == 401) {
                    this.toastr.error("Unauthorized Access Error....");
                }
                else if (error.StatusCode == 403) {
                    this.toastr.error("Forbidden Error....");
                }
            }
        )
    }
}