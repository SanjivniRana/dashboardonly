import { Component, OnInit } from '@angular/core';
import { HrService } from '../hr.service';
import { CodeService } from '../../code/code.service';
import { AppSettingsService } from '../../../Services/App-settings.Service';
import { ToastrService } from 'ngx-toastr';
import { GLOBAL } from '../../../shared/global';

@Component({
  selector: 'app-prospective-employees',
  templateUrl: './prospective-employees.component.html',
  styleUrls: ['./prospective-employees.component.css']
})
export class ProspectiveEmployeesComponent implements OnInit {

  //datasource
  genderType: any;  
  prospectiveEmployee: any;

  //dropdown
  officeCode: any;
  currency: any;


  constructor(private hrService: HrService, private codeService: CodeService, private setting: AppSettingsService, private toastr: ToastrService) {

    //datasource
    this.genderType = this.hrService.getGender();    
    this.prospectiveEmployee = this.hrService.getProspectiveEmployee();

    //dropdown
    this.getOfficeCodeList();
    this.getCurrencyCodeList();
  }

  ngOnInit() {
  }


  //#region Dropdowns

  // OfficeCode
  getOfficeCodeList() {

    this.codeService.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_OfficeCode_GetAllOfficeDetails).subscribe(
      data => {
        this.officeCode = [];
        data.data.OfficeDetailsList.forEach(element => {
          this.officeCode.push({
            OfficeId: element.OfficeId,
            OfficeCode: element.OfficeCode,
            OfficeName: element.OfficeName,
            OfficeKey: element.OfficeKey,
            SupervisorName: element.SupervisorName,
            PhoneNo: element.PhoneNo,
            FaxNo: element.FaxNo
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
    );
  }

  //Currency
  getCurrencyCodeList() {
    this.codeService.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_CurrencyCodes_GetAllCurrency).subscribe(
      data => {
        this.currency = [];
        if (data.data.CurrencyList != null) {
          data.data.CurrencyList.forEach(element => {
            this.currency.push(element);
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



  //#endregion




}
