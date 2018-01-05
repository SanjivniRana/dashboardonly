import { Component, OnInit } from '@angular/core';
import { HrService, SelectInfoDropdown, GeneralInfo } from '../../hr.service';
import { CodeService } from '../../../code/code.service';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsService } from '../../../../Services/App-settings.Service';
import { GLOBAL } from '../../../../shared/global';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {

  //Global Dropdown to select Employee Detail Type
  selectInfo: SelectInfoDropdown[];
  selectEmployeeInfoDropdown: number;

  //dataSource
  generalInfo: any;
  professionalInfo: any;
  analyticalInfo: any;
  historyInfo: any;
  advanceHistoryInfo: any;
  payrollHistoryInfo: any;
  leaveRecordsInfo: any;
  documentsInfo: any;
  pensionSalaryTaxInfo: any;

  //dropdowns
  deductionType: any;
  officeCode: any;
  currency: any;

  constructor(private hrService: HrService, private codeService: CodeService, private setting: AppSettingsService, private toastr: ToastrService) {
    this.selectInfo = this.hrService.getSelectInfoDropdown();
    this.InitializeGeneralInfoForm();

    //dataSource
    this.analyticalInfo = this.hrService.getAnalyticalInfo();
    this.historyInfo = this.hrService.getHistories();
    this.advanceHistoryInfo = this.hrService.getAdvanceHistories();
    this.payrollHistoryInfo = this.hrService.getPayrollHistories();
    this.leaveRecordsInfo = this.hrService.getLeaveRecords();
    this.documentsInfo = this.hrService.getdocuments();
    this.pensionSalaryTaxInfo = this.hrService.getPensionSalaryTax();

    //dropdowns
    this.getOfficeCodeList();
    this.getCurrencyCodeList();
    this.deductionType = this.hrService.getDeductionType();

  }

  ngOnInit() {
  }

  //InitializeGeneralInfoForm
  InitializeGeneralInfoForm() {

    this.generalInfo = {
      ID: null,
      ProfileImage: null,
      EmployeeCode: null,
      EmployeeName: null,
      IDCardNo: null,
      FatherName: null,
      Office: null,
      Department: null,
      Grade: null,
      Designation: null,
      PermanentAddress: null,
      Village: null,
      City: null,
      District: null,
      Province: null,
      Country: null,
      Phone: null,
      Fax: null,
      Email: null,
      ReferredBy: null,
      PassportNo: null,
      Nationality: null,
      Language: null,
      Sex: null,
      BirthDate: null,
      BirthPlace: null,
      Qualification: null,
      CurrentAddress: null,
      Experience: null,
      Profession: null,
      PreviousWork: null,
      PreviousExperience: null,
      Remarks: null,
    };

    this.professionalInfo = {
      //Contact Info
      ID: null,
      Status: null,
      Type: null,
      StartDate: null,
      EndDate: null,
      ContactNo: null,
      ContractPeriod: null,
      HiredOn: null,
      FiredOn: null,
      FiredReason: null,
      ResignedOn: null,
      ResignedReason: null,

      //Salary & Allowances
      Currency: null,
      MonthlyRate: null,
      HourlyRate: null,
      FoodAllowance: null,
      TRAllowance: null,
      MedicalAllowance: null,
      OtherAllowance: null,
      OtherDescription: null,

      //Deductibles
      CapacityBuilding: null,
      Security: null,
      Fines: null,
      Other: null,
      FineReason: null,

      JobDescription: null,
      TrainingBenefits: null,
    };
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



  onSelectInfoDropdown(event) {
    this.selectEmployeeInfoDropdown = event.value;
  }


  //onGeneralInfoFormSubmit
  onGeneralInfoFormSubmit(data: any) {
  }

  logEvent(event) {
  }
}
