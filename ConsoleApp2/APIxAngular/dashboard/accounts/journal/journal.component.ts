import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountsService, JournalVoucherModel } from '../accounts.service';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsService } from '../../../Services/App-settings.Service';
import { GLOBAL } from '../../../shared/global';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { CodeService } from '../../code/code.service';

 interface JournalFilter{
  CurrencyId: number;
  OfficeId: number;
  RecordType: number;
  FromDate: string;
  ToDate: string; 
}

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})


export class JournalComponent implements OnInit {

  pivotGridDataSource: any;
  drillDownDataSource: any;
  journalVoucher: JournalVoucherModel[];

  currencyDropdown: any[];
  officeDropdown: any[];
  recordTypeDropdown: any[];
  journalFilter: JournalFilter;
  loading: any;
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
    this.journalFilter = {
      CurrencyId: 1,
      OfficeId: null,
      RecordType: 1,
      FromDate: this.FromDate,
      ToDate: this.currentDateFinal
    };
  }

  ngOnInit() {
    this.GetAllJournalDetails();
    this.getCurrencyCodeList();
    this.getOfficeCodeList();
  }

  onApplyingFilter(value)
  {
      this.journalFilter.CurrencyId = value.CurrencyId;
      this.journalFilter.OfficeId = value.OfficeId;
      this.journalFilter.RecordType = value.RecordType;
      this.journalFilter.FromDate = value.FromDate;
      this.journalFilter.ToDate = value.ToDate;
      this.GetAllJournalDetails();
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

  GetAllJournalDetails() {
    this.loading = true;
    this.accountservice.GetAllJournalDetails(this.setting.getBaseUrl() + GLOBAL.API_Accounting_GetAllJournalDetails,this.journalFilter).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.loading = false;
          this.journalVoucher = [];
          data.data.JournalVoucherViewList.forEach(element => {
            this.journalVoucher.push(element);
          });
          this.pivotGridDataSource = new PivotGridDataSource({
            fields: [
              {
                caption: "Journal",
                width: 120,
                dataField: "JournalCode",
                showTotals: false,
                area: "row"
              }, {
                caption: "Voucher",
                dataField: "VoucherNo",
                width: 150,

                area: "row"
              },
              {
                caption: "Transaction No.",
                dataField: "TransactionNo",
                showTotals: false,
                width: 150,
                area: "row"
              },
              {
                caption: "Account Code",
                dataField: "AccountCode",
                showTotals: false,
                width: 150,
                area: "row"
              },
              {
                caption: "Transaction Date",
                dataField: "TransactionDate",
                width: 150,
                area: "row"
              },
              {
                dataField: "TransactionType",
                dataType: "string",
                area: "column"
              }, {
                caption: "Total",
                dataField: "Amount",
                dataType: "number",
                summaryType: "sum",
                format: "currency",
                area: "data"
              }
            ],
            store: this.journalVoucher
          });
        }
        else if (data.StatusCode == 400) {
          this.loading = false;
          this.toastr.error("Something went wrong TRY Again !");
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

}

