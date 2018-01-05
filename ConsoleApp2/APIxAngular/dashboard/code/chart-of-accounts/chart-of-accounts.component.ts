import { Component, OnInit } from '@angular/core';
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

import { CodeService, MainLevelAccount, AccountLevel, chartOfAccountsData, AccountType, ControlLevelAccount, SubLevelAccount, InputLevelAccount, ChartOfAccountLevelDetail, EditChartOfAccount } from '../code.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, Validators } from '@angular/forms';
import { AppSettingsService } from '../../../Services/App-settings.Service';

import { GLOBAL } from '../../../shared/global';

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.css']
})

export class ChartOfAccountsComponent implements OnInit {

  windows:any;
  popupVisibleAddChartOfAccount = false;
  popupVisibleEditChartOfAccount = false;
  formToggle: number;

  //popup main level filter  
  selectValue: number = 1;


  //Forms Classes
  fMainLevelAccount: MainLevelAccount;
  fControlLevelAccount: ControlLevelAccount;
  fSubLevelAccount: SubLevelAccount;
  fInputLevelAccount: InputLevelAccount;

  //Dropdowns for Add popup
  mainLevelArr: any[];
  controlLevelArr: any[];
  subLevelArr: any[];

  //dataSource
  chartOfAccountsData: chartOfAccountsData[];
  mainLeveFormlData: MainLevelAccount[];
  accountTypeDropdown: AccountType[];
  accountLevelDropdown: AccountLevel[];

  constructor(private codeService: CodeService, private setting: AppSettingsService, private toastr: ToastrService) {
    //Form Initialize
    this.allFormInitialize();
    this.windows = window;
  }

  ngOnInit() {
    this.formToggle = 1;

    //Select Account Level (Global Filter)
    // this.accountLevelDropdown = this.codeService.getAccountLevels();

    //AccountType
    this.getAccountType();
    this.getChartOfAccountsList();
  }

  //Initialize forms
  allFormInitialize() {
    //Form Main Level Account
    this.fMainLevelAccount = {
      'ParentID': null,
      'AccountLevelId': 1,
      'AccountTypeName': "Main Level Accounts",
      "AccountNote": 1,
      'AccountName': null,
      'AccountTypeId': null,
      'Show': true,
      'MDCode': null,
    };

    //Form Control Level Account    
    this.fControlLevelAccount = {
      'ParentID': null,
      'AccountLevelId': 2,
      'AccountTypeName': "Control Level Accounts",
      "AccountNote": 2,
      'MainLevel': 0,
      'AccountName': null,
      'AccountTypeId': null,
      'Show': true,
      'MDCode': null
    };

    //Form Sub Level Account
    this.fSubLevelAccount = {
      'ParentID': null,
      'AccountLevelId': 3,
      'AccountTypeName': "Sub Level Accounts",
      "AccountNote": 3,
      'ControlLevel': 0,
      'AccountName': null,
      'AccountTypeId': null,
      'Show': true,
      'MDCode': null
    };

    //Form Input Level Account
    this.fInputLevelAccount = {
      'ParentID': null,
      'AccountLevelId': 4,
      'AccountTypeName': "Input Level Accounts",
      "AccountNote": 4,
      'SubLevel': 0,
      'AccountName': null,
      'AccountTypeId': null,
      'Show': true,
      'MDCode': null,
    };
  }

  //Account Type Dropdown
  getAccountType() {
    this.codeService.getAccountType(this.setting.getBaseUrl() + GLOBAL.API_Accounting_GetAllAccoutnType).subscribe(
      data => {
        this.accountTypeDropdown = [];
        data != null || data != undefined ? data.data.AccountTypeList.forEach(element => {
          this.accountTypeDropdown.push(element
            // {
            //   ID: counter,
            //   ParentID: element.ParentID - 1,
            //   AccountName: element.AccountName,
            //   AccountCode: element.AccountCode,
            //   AccountTypeId: element.AccountTypeId
            // }
          );
        }) : null;
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

  //Get All List for Tree
  getChartOfAccountsList() {
    this.codeService.getMainLevelAccounts(this.setting.getBaseUrl() + GLOBAL.API_ChartOfAccount_GetAllChartAccountDetail).subscribe(
      data => {
        this.chartOfAccountsData = [];
        this.mainLevelArr = [];
        this.controlLevelArr = [];
        this.subLevelArr = [];
        var counter = 1;
        data != null || data != undefined ? data.data.ChartAccountList.forEach(element => {
          //TODO: To start Tree from Zero 
          if (element.AccountLevelId == 1) {
            this.chartOfAccountsData.push(
              {
                ID: counter,
                ParentID: 0,
                AccountName: element.AccountName,
                AccountCode: element.AccountCode,
                AccountTypeId: element.AccountTypeId,
                AccountLevelId: element.AccountLevelId - 1
              }
            );
            if (element.AccountLevelId == 1) {
              this.mainLevelArr.push({
                AccountCode: element.AccountCode,
                AccountName: element.AccountName
              });
            }
          }
          else {
            this.chartOfAccountsData.push(
              {
                ID: counter,
                ParentID: element.ParentID,
                AccountName: element.AccountName,
                AccountCode: element.AccountCode,
                AccountTypeId: element.AccountTypeId,
                AccountLevelId: element.AccountLevelId
              }
            );

            if (element.AccountLevelId == 2) {
              this.controlLevelArr.push({
                AccountCode: element.AccountCode,
                AccountName: element.AccountName,
              });
            }
            if (element.AccountLevelId == 3) {
              this.subLevelArr.push({
                AccountCode: element.AccountCode,
                AccountName: element.AccountName,
              });
            }
          }

          counter++;
        }) : null;
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

  //TODO: Main Account Level Filter in Dropdown
  accountLevelSelectedValue(event: any) {
    // this.toastr.success(event.value.AccountLevelName);
    this.formToggle = event.value;
  }



  //Add Main, Control, Sub, Input level Account ----
  onAddAccounts(data: any) {
    if (data.MainLevel) {
      data.ParentID = data.MainLevel;
    }
    else if (data.ControlLevel) {
      data.ParentID = data.ControlLevel;
    }
    else if (data.SubLevel) {
      data.ParentID = data.SubLevel;
    }
    this.codeService.AddMainLevelAccount(this.setting.getBaseUrl() + GLOBAL.API_ChartOfAccount_AddChartAccountDetail, data).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Account Added Successfully !");
        }
        this.getChartOfAccountsList();
      },
      error => {
        if (error.StatusCode == 500) {
          this.toastr.error("Internal Server Error....");
          this.cancelChartOfAccount();
        }
        else if (error.StatusCode == 401) {
          this.toastr.error("Unauthorized Access Error....");
          this.cancelChartOfAccount();
        }
        else if (error.StatusCode == 403) {
          this.toastr.error("Forbidden Error....");
        }
        this.getChartOfAccountsList();
      }
    );
    this.cancelChartOfAccount();
  }

  //TODO: Update Chart of Account Detail
  EditChartOfAccount(model: any) {
    //merge old data and new data
    var value = Object.assign(model.oldData, model.newData);
    this.codeService.EditChartOfAccountDetail(this.setting.getBaseUrl() + GLOBAL.API_ChartOfAccount_EditChartAccountDetail, value).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Updated Successfully !");          
        }
        this.getChartOfAccountsList();
      },
      error => {
        if (error.StatusCode == 500) {
          this.toastr.error("Internal Server Error....");
          this.getChartOfAccountsList();
        }
        else if (error.StatusCode == 401) {
          this.toastr.error("Unauthorized Access Error....");
          this.getChartOfAccountsList();
        }
        else if (error.StatusCode == 403) {
          this.toastr.error("Forbidden Error....");
          this.getChartOfAccountsList();
        }
        this.getChartOfAccountsList();
      }
    );
  }

  //on add Popup show
  onShowing() {
    this.formToggle = 1;
    this.selectValue = 1;
    this.allFormInitialize();

    //Select Account Level (Global Filter)
    this.accountLevelDropdown = this.codeService.getAccountLevels();

    //AccountType
    this.getAccountType();
    this.getChartOfAccountsList();

  }

  //EVENT: On Add Popup called
  addChartOfAccount() {
    this.popupVisibleAddChartOfAccount = true;
  }

  //EVENT: On Add Popup cancelled
  cancelChartOfAccount() {
    this.popupVisibleAddChartOfAccount = false;
  }
}

