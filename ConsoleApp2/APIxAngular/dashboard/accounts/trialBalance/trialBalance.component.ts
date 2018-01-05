import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { AppSettingsService } from '../../../Services/App-settings.Service';
import { ToastrService } from 'ngx-toastr';
import { GLOBAL } from '../../../shared/global';
import { CodeService } from '../../code/code.service';
import { DatePipe } from '@angular/common';

interface TrialFilter{
    CurrencyId: number;
    OfficeId: number;
    RecordType: number;
    Fromdate: string;
    Todate: string; 
  }

@Component({
    selector: 'app-trialBalance',
    templateUrl: './trialBalance.component.html'
})
export class TrailBalanceComponent implements OnInit {
    trailBalanceData: any[];
    trailFilters: TrialFilter;
    loading = false;
    FromDate:any;
    currentDateFinal:any;

    currencyDropdown: any[];
    officeDropdown: any[];
    recordTypeDropdown: any[];

    constructor(private accountservice: AccountsService, private codeservice: CodeService, private setting: AppSettingsService, private toastr: ToastrService) {
        this.FromDate = "01/01/" + (new Date()).getFullYear();
        var currentDate = new Date().getDate();
        var currentMonth = new Date().getMonth() + 1;
        var currentYear = new Date().getFullYear();
        this.currentDateFinal = currentMonth+"/"+currentDate+"/"+currentYear;
        this.trailFilters = {
            CurrencyId: 1,
            OfficeId: null,
            RecordType: 1,
            Fromdate: this.FromDate,
            Todate: this.currentDateFinal
        };
        this.recordTypeDropdown = [{
            "Id": 1,
            "Name": "Single",
        },
        {
            "Id": 2,
            "Name": "Consolidate",
        }];
    }
    ngOnInit() {
        this.GetAllTrailBalance();
        this.getCurrencyCodeList();
        this.getOfficeCodeList();
    }

    onApplyingFilter(value) {
        this.trailFilters.CurrencyId = value.CurrencyId;
        this.trailFilters.OfficeId = value.OfficeId;
        this.trailFilters.RecordType = value.RecordType;
        this.trailFilters.Fromdate = value.Fromdate;
        this.trailFilters.Todate = value.Todate;
        this.GetAllTrailBalance();
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

    GetAllTrailBalance() {
        this.loading = true;
        this.accountservice.GetAllTrailBalance(this.setting.getBaseUrl() + GLOBAL.API_Accounting_GetAllTrailBalanceDetails, this.trailFilters).subscribe(
            data => {
                if (data.StatusCode == 200) {
                    this.loading = false;
                    this.trailBalanceData = [];
                    data.data.TrailBlanceList.forEach(element => {
                        this.trailBalanceData.push(element);
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

}