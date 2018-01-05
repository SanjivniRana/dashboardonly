import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';
import { AppSettingsService } from '../../../Services/App-settings.Service';
import { ToastrService } from 'ngx-toastr';
import { GLOBAL } from '../../../shared/global';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {
  exchangeRateDetails: any[];
  currencycodedt: any[];
  editingFlag: boolean = true;
  windows:any;

  constructor(private codeService: CodeService, private setting: AppSettingsService, private toastr: ToastrService) {
    this.windows = window;
  }

  ngOnInit() {
    this.GetAllExchangeRate();
    this.getCurrencyCodeList();
  }

  GetAllExchangeRate() {
    this.codeService.GetAllExchangeRate(this.setting.getBaseUrl() + GLOBAL.API_ExchangeRate_GetExchangeRate).subscribe(
      data => {
        this.exchangeRateDetails = [];
        if (data.StatusCode == 200) {
          data.data.ExchangeRateList.forEach(element => {
            this.exchangeRateDetails.push(element);
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
    );
  }

  logEvent(eventName, obj) {
    this.editingFlag = false;
    if (eventName == "RowUpdating") {
      var value = Object.assign(obj.oldData, obj.newData);     // Merge old data with new Data 
      this.EditExchangeRate(value);
    }
    else if (eventName == "RowInserting") {
      this.AddExchangeRate(obj.data);
    }
    if (eventName == "InitNewRow") {
      this.editingFlag = true;      
      // setInterval(() =>{
      //   this.editingFlag = true
      //   // this.toastr.success("flag set");
      // },5);
    }
      
    if (eventName == "EditingStart") {
        this.editingFlag = false;
      //   setInterval(() =>{
      //   this.editingFlag = false
      //   // this.toastr.success("flag set");
      // },5);
    }

    this.GetAllExchangeRate();
  }

  AddExchangeRate(obj) {
    this.codeService.AddExchangeRate(this.setting.getBaseUrl() + GLOBAL.API_ExchangeRate_AddExchangeRate, obj).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Exchange Rate Added Successfully!!!");
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
    );
  }

  EditExchangeRate(obj) {
    this.codeService.EditExchangeRate(this.setting.getBaseUrl() + GLOBAL.API_ExchangeRate_EditExchangeRate, obj).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Exchange Rate Updated Successfully!!!");
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
    );
  }

  getCurrencyCodeList() {
    this.codeService.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_CurrencyCodes_GetAllCurrency).subscribe(
      data => {
        this.currencycodedt = [];
        data.data.CurrencyList.forEach(element => {
          this.currencycodedt.push({
            FromCurrency: element.CurrencyId,
            ToCurrency: element.CurrencyId,
            CurrencyCode: element.CurrencyCode,
            CurrencyName: element.CurrencyName,
            CurrencyRate: element.CurrencyRate
          });
        });
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
