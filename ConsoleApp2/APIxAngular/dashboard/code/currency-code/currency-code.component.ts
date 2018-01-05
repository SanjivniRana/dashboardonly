import { Component, OnInit } from '@angular/core';
import { CurrencyData, CodeService } from '../code.service';
import { CurrencyCode } from '../../../Models/CodeModel';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { AppSettingsService } from '../../../Services/App-settings.Service';
import { BsModalService } from 'ngx-bootstrap';
import { GLOBAL } from '../../../shared/global';
import {
    DxDataGridComponent,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxNumberBoxModule,
    DxButtonModule,
    DxFormModule,
    DxFormComponent,
    DxPopupModule, DxTemplateModule,
    DxTemplateHost
} from 'devextreme-angular';


@Component({
    selector: 'app-currency-code',
    templateUrl: './currency-code.component.html',
    styleUrls: ['./currency-code.component.css']
})
export class CurrencyCodeComponent implements OnInit {
    showFilterRow: boolean;
    popupVisible = false;
    currencydata: CurrencyData;
    currencycodedt: CurrencyCode[];

    constructor(private router: Router, private toastr: ToastrService, private fb: FormBuilder, private setting: AppSettingsService, private modalService: BsModalService, private codeservice: CodeService) {
        this.currencydata = this.codeservice.getCurrencyData();
        this.showFilterRow = true;
    }

    ngOnInit() {
        this.getCurrencyCodeList();
    }

    showPopup() {
        this.currencydata = this.codeservice.getCurrencyData();
        this.popupVisible = true;
    }

    HidePopup() {
        this.popupVisible = false;
    }

    //Get all Currency Details
    getCurrencyCodeList() {
        this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_CurrencyCodes_GetAllCurrency).subscribe(
            data => {
                this.currencycodedt = [];
                data.data.CurrencyList.forEach(element => {
                    this.currencycodedt.push({
                        CurrencyId: element.CurrencyId,
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

    onFormSubmit(model) {
          if(model.CurrencyId == "")    
          {
              this.AddCurrencyCode(model);
          }
         else
          {
              this.EditCurrencyCode(model);
          }
    }

    AddCurrencyCode(model) {
        var obj: any = {};
        var addcurrencycode: CurrencyCode = {
            CurrencyId: 0,
            CurrencyCode: model.CurrencyCode,
            CurrencyName: model.CurrencyName,
            CurrencyRate: model.CurrencyRate
        };
        this.codeservice.AddEditCurrencyCode(this.setting.getBaseUrl() + GLOBAL.API_CurrencyCodes_AddCurrency, addcurrencycode).subscribe(
            data => {
                if (data.StatusCode == 200) //Success
                {
                    this.toastr.success("Currency Code Added Successfully!!!");
                    this.getCurrencyCodeList();
                    this.currencydata = this.codeservice.getCurrencyData();
                    this.HidePopup();
                }
                else if (data.StatusCode == 900) {
                    this.toastr.error("Currency Code already exist!!!");
                }
                else {
                    this.toastr.error("Error!!!");
                }
            },
            error => {
                //error message
            }
        );
    }

    EditCurrencyCode(model) {
        var obj: any = {};
        var addcurrencycode: CurrencyCode = {
            CurrencyId: model.CurrencyId,
            CurrencyCode: model.CurrencyCode,
            CurrencyName: model.CurrencyName,
            CurrencyRate: model.CurrencyRate
        };
        this.codeservice.AddEditCurrencyCode(this.setting.getBaseUrl() + GLOBAL.API_CurrencyCode_EditCurrency, addcurrencycode).subscribe(
            data => {
                if (data.StatusCode == 200) //Success
                {
                    this.HidePopup();
                    this.toastr.success("Currency Code Updated Successfully!!!");
                    this.getCurrencyCodeList();
                    this.currencydata = this.codeservice.getCurrencyData();
                }
                else if (data.StatusCode == 900) {
                    this.toastr.error("Currency Code already exist!!!");
                }
                else {
                    this.toastr.error("Error!!!");
                }
            },
            error => {
                //error message
            }
        );
    }

    GetCurrencyDetailByCode(data) {

        this.currencydata.CurrencyId = data.data.CurrencyId;
        this.currencydata.CurrencyCode = data.data.CurrencyCode;
        this.currencydata.CurrencyName = data.data.CurrencyName;
        this.currencydata.CurrencyRate = data.data.CurrencyRate;
        this.popupVisible = true;
    }

}
