import { Component, OnInit } from '@angular/core';
import { Tab, HrService, SexTypes, OfficeTypes, QualificationTypes, DesgnTypes, GradeTypes, CountryTypes, ProvinceTypes, ProfessionTypes, DeleteDocument, DeleteEmployeeHistory } from '../hr.service';
import { Router } from '@angular/router';
import { AppSettingsService } from '../../../Services/App-settings.Service';
import { ToastrService } from 'ngx-toastr';
import { GLOBAL } from '../../../shared/global';
import { empty } from 'rxjs/observable/empty';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  //#region "VARIABLES"
  openInfoTab = 0;
  openaddform = 1;
  displayEmpInfoTab = 0;

  showData: any;
  empGeneral: any;
  imageURL: string;
  fileURL: string;
  docURL: string;
  countryId: number;
  officeId: number;
  employeeId: number;
  tabEventValue: number;
  //for edit form (two way binding)
  CountryId: number;
  ProvinceId: number;
  SexId: number;
  OfficeId: number;
  DepartmentId: number;


  //loader
  loading: boolean;

  activeEmployeeInfo: any[];
  prospectiveEmployeeInfo: any[];
  terminatedEmployeeInfo: any[];

  showActiveEmployeeData: any[];
  showProspectiveEmployeeData: any[];
  showTerminatedEmployeeData: any[];

  // Professional Info
  professionalData: any;
  displayProfInfoTab = 0;
  professionalDetails: any;

  employeeListDetail: any;

  //Leave Info
  popupAssignLeaveVisible: boolean;
  leaveInfoData: any;
  leaveInfoDataSource: any;
  financialYearDropdown: any;
  leaveReasonTypeDropdown: any;
  leaveReasonId: number;

  sexTypes: SexTypes[];
  officeTypes: OfficeTypes[];
  desgnTypes: DesgnTypes[];
  gradeTypes: GradeTypes[];
  professionTypeDropdown: any[];
  qualificationTypeDropdown: any[];
  countryTypeDropdown: any[];
  stateTypeDropdown: any[];
  employeeTypeDropdown: any[];
  officeTypeDropdown: any[];
  designationDropdown: any[];
  departmentTypeDropdown: any[];


  windows: any;
  rules: any;
  maxDate: Date = new Date();
  pattern: any = /^\(\d{3}\)\ \d{3}-\d{4}$/i;
  namePattern: any = /^[^0-9]+$/;

  empDocuments: any;
  showDocumentData: any[];
  popupAddDocumentVisible = false;
  popupEditDocumentVisible = false;
  popupEmpHistoryVisible: any;
  EmployeeId: any;
  popupEditEmployeeHistoryVisible = false;

  empHistory: any;
  showEmployeeHistoryData: any[];
  empHealthInfo: any;

  defaultDoc:any;
  docpath:any;
  docPopupVisible = false;
  popupVisibleDocument = false;
  //#endregion "VARIABLES"

  constructor(private hrService: HrService, private router: Router, private setting: AppSettingsService, private toastr: ToastrService, private _DomSanitizer: DomSanitizer) {

    this.allFormInitialize();
    this.windows = window;
    this.rules = { "X": /[02-9]/ };
    this.maxDate = new Date(this.maxDate.setFullYear(this.maxDate.getFullYear() - 18));
    this.sexTypes = hrService.getSexTypes();
    this.officeTypes = hrService.getOfficeTypes();
    this.desgnTypes = hrService.getDesgnTypes();
    this.gradeTypes = hrService.getGradeTypes();

    this.tabEventValue = 1;
    this.employeeId = 0;

    this.showDocumentData=[{DocumentGUID:"",DocumentName:""}]
    this.windows = window;
    this.docpath=_DomSanitizer.bypassSecurityTrustResourceUrl(this.setting.getDocUrl()+ "nodoc.pdf");
  }

  ngOnInit() {
    this.imageURL = "../../../../assets/images/profile-pic.jpg";

    this.GetAllEmployeeDetails(1);
    this.getProfessionType();
    this.getQualificationType();
    this.getCountryType();

    //Employee Type
    this.getEmployeeTypeDropdown();
    this.getOfficeTypeDropdown();
    this.GetAllDesignationDropdown();

    //Leave Info
    this.GetFinancialYearDropdown();
    this.GetLeaveReasonTypeDropdown();
  }

  allFormInitialize() {

    this.empGeneral = {
      'EmployeeName': null,
      'EmployeeTypeId': null,
      'FatherName': null,
      'PermanentAddress': null,
      'City': null,
      'ProvinceId': null,
      'CountryId': null,
      'Phone': null,
      'Email': null,
      'SexId': null,
      'DateOfBirth': null,
      'Age': null,
      'CurrentAddress': null,
      'EmployeePhoto': null,
      'Resume': null,
      'HigherQualificationId': null,
      'ExperienceYear': null,
      'ProfessionId': null,
      'PreviousWork': null,
      'ExperienceMonth': null,
      'Remarks': null,
      'ReferBy': null
    };

    this.professionalDetails = {
      'EmployeeTypeId': null,
      'Status': null,
      'OfficeId': null,
      'DepartmentId': null,
      'DesignationId': null,
      'HiredOn': null,
      'FiredOn': null,
      'FiredReason': null,
      'ResignationOn': null,
      'ResignationReason': null,
      'JobDescription': null,
      'TrainingBenefits': null
    }

    this.empDocuments = {

      'DocumentName': null,
      'DocumentDate': null,
      'DocumentFilePath': null,
      'EmployeeID': null

    }

    this.empHistory = {

      'EmployeeID': null,
      'HistoryDate': null,
      'Description': null

    }

    this.empHealthInfo = {

      'EmployeeID': null,
      'BloodGroup': null,
      'Allergies': null,
      'PastSurgery': null,
      'ChronicDisease': null,
      'CurrentMedication': null

    }

    //Professional Info
    this.professionalData = {
      'EmployeeTypeId': 0,
      'Status': null,
      'OfficeId': 0,
      'DepartmentId': 0,
      'DesignationId': 0,
      'HiredOn': null,
      'FiredOn': null,
      'FiredReason': null,
      'ResignationOn': null,
      'ResignationReason': null,
      'JobDescription': null,
      'TrainingBenefits': null
    }

    //Leave Info
    this.leaveInfoData = {
      'FinancialYearId': null,
      'LeaveReasonId': null,
      'Unit': null,
      'AssignUnit': null,
      'Description': null
    }

  }

  //SANJU
  //#region "TABS"
  showInfoTabs: Tab[] = [
    {
      id: 0,
      text: "General Info"
    },
    {
      id: 1,
      text: "Professional Info"
    },
    {
      id: 2,
      text: "Documents"
    },
    {
      id: 3,
      text: "Employee History"
    },
    {
      id: 4,
      text: "Leave Info"
    },
    {
      id: 5,
      text: "Health Info"
    },
    {
      id: 6,
      text: "Skills Set"
    }
  ];
  
  //Tab Events
  tabOnClick(e: number) {
    console.log(e);
    this.tabEventValue = e;
    this.employeeId = 0;
    this.GetAllEmployeeDetails(e);

  }

  openInfoTabs(e) {
    this.openInfoTab = e.itemIndex;
  }

  openAddForm(e) {
    this.openaddform = 0;
    this.allFormInitialize();
  }

  showEditForm(showData) {
    this.displayEmpInfoTab = 1;
    this.CountryId = this.showData.CountryId;
    this.getStateType(this.CountryId);
    this.ProvinceId = this.showData.ProvinceId;
    this.SexId = this.showData.SexId;
  }

  //Professional Info
  showProfEditForm(professionalDetails) {
    this.displayProfInfoTab = 1;
    this.OfficeId = this.professionalDetails.OfficeId;
    this.getDepartmentType(this.OfficeId);
    this.DepartmentId = this.professionalDetails.DepartmentId;
  }
  closeProfForm() {
    this.displayProfInfoTab = 0;
  }

  closeForm(e) {
    this.displayEmpInfoTab = 0;
    this.openaddform = 1;
  }

  activeEmployee(e) {
    this.openaddform = 1;
    this.showData = this.showActiveEmployeeData;
  }

  prospectiveEmployee(e) {
    this.openaddform = 1;
    this.showData = this.showProspectiveEmployeeData;
  }

  terminatedEmployee(e) {
    this.openaddform = 1;
    this.showData = this.showTerminatedEmployeeData;
  }

  displayProspectiveEmpDetails(model) {
    this.openaddform = 1;
    this.displayEmpInfoTab = 0;
    this.showProspectiveEmployeeData = model;
    this.GetEmployeeDetailsByEmployeeId(model.EmployeeID);
    this.employeeId = model.EmployeeID;
    // this.showData = this.showProspectiveEmployeeData;
  }

  displayActiveEmpDetails(model) {
    this.openaddform = 1;
    this.displayEmpInfoTab = 0;
    this.showActiveEmployeeData = model;
    this.GetEmployeeDetailsByEmployeeId(model.EmployeeID);
    this.employeeId = model.EmployeeID;
    // this.showData =this.employeeListDetail;
  }

  displayTerminatedEmpDetails(model) {
    this.openaddform = 1;
    this.displayEmpInfoTab = 0;
    this.showTerminatedEmployeeData = model;
    this.showData = this.showTerminatedEmployeeData;
  }
  //#endregion "TABS"

  //#region "ADD EMPLOYEE"
  AddEmployeeDetails(model: any) {
    this.empGeneral.EmployeeTypeId = 1;
    this.empGeneral.EmployeePhoto = this.imageURL;
    this.empGeneral.Resume = this.fileURL;
    this.empGeneral.CountryId = this.countryId;
    this.hrService.addEmployee(this.setting.getBaseUrl() + GLOBAL.API_Hr_AddEmployees, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Employee Added Successfully!!!");
          this.allFormInitialize();
          this.GetAllEmployeeDetails(this.tabEventValue);
          this.GetEmployeeDetailsByEmployeeId(this.employeeId);
          this.displayEmpInfoTab = 0;
          this.openaddform = 1;
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
        this.allFormInitialize();
        this.GetEmployeeDetailsByEmployeeId(this.employeeId);
        this.displayEmpInfoTab = 0;
      });
  }
  //#endregion "ADD EMPLOYEE"

  //#region "EDIT EMPLOYEE"
  EditEmployeeDetails(value) {
    this.empGeneral.EmployeeID = this.employeeId;
    this.empGeneral.EmployeePhoto = this.imageURL;
    this.empGeneral.Resume = this.fileURL;
    this.empGeneral.CountryId = this.countryId;
    this.empGeneral.Age = value.Age;
    this.empGeneral.City = value.City;
    this.empGeneral.CurrentAddress = value.CurrentAddress;
    this.empGeneral.DateOfBirth = value.DateOfBirth;
    this.empGeneral.Email = value.Email;
    this.empGeneral.EmployeeName = value.EmployeeName;
    this.empGeneral.EmployeePhoto = value.EmployeePhoto;
    this.empGeneral.EmployeeTypeId = value.EmployeeTypeId;
    this.empGeneral.ExperienceMonth = value.ExperienceMonth;
    this.empGeneral.ExperienceYear = value.ExperienceYear;
    this.empGeneral.FatherName = value.FatherName;
    this.empGeneral.HigherQualificationId = value.HigherQualificationId;
    this.empGeneral.PermanentAddress = value.PermanentAddress;
    this.empGeneral.Phone = value.Phone;
    this.empGeneral.PreviousWork = value.PreviousWork;
    this.empGeneral.ProfessionId = value.ProfessionId;
    this.empGeneral.ProvinceId = value.ProvinceId;
    this.empGeneral.ReferBy = value.ReferBy;
    this.empGeneral.Remarks = value.Remarks;
    this.empGeneral.Resume = value.Resume;
    this.empGeneral.SexId = value.SexId;

    this.hrService.EditEmployee(this.setting.getBaseUrl() + GLOBAL.API_Hr_EditEmployees, this.empGeneral).subscribe(
      data => {

        if (data.StatusCode == 200) {
          this.toastr.success("Employee Updated Successfully!!!");
        }
        debugger;
        this.GetAllEmployeeDetails(this.tabEventValue);
        this.displayEmpInfoTab = 0;

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
  //#endregion "EDIT EMPLOYEE"

  //#region "GET ALL EMPLOYEES"
  GetAllEmployeeDetails(EmployeeType: number) {
    this.loading = true;
    this.hrService.GetAllEmployees(this.setting.getBaseUrl() + GLOBAL.API_Hr_GetAllEmployeeDetail, EmployeeType).subscribe(
      data => {

        this.showData = [];
        this.showProspectiveEmployeeData = [];
        this.showActiveEmployeeData = [];
        this.showTerminatedEmployeeData = [];

        data.data.EmployeeDetailsList.forEach(element => {
          this.showData.push(element);
        });

        console.log(this.showData);

        if (this.showData != null) {

          if (this.tabEventValue == 1)
            this.prospectiveEmployeeInfo = this.showData;
          if (this.tabEventValue == 2)
            this.activeEmployeeInfo = this.showData;
          if (this.tabEventValue == 3)
            this.terminatedEmployee = this.showData;

          //Default call For Prospective Employee
          //method call onClick
          if (this.employeeId == 0) {
            if (this.showData != null && this.showData != empty && this.showData.length > 0) {
              this.GetEmployeeDetailsByEmployeeId(this.showData[0].EmployeeID);
              this.employeeId = this.showData[0].EmployeeID;
            }
          }
          else {
            this.GetEmployeeDetailsByEmployeeId(this.employeeId);
          }
        }        
        this.loading = false;
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
  //#endregion "GET ALL METHOD"

  //#region "GET ALL PROFESSION"
  getProfessionType() {
    this.hrService.GetAllProfession(this.setting.getBaseUrl() + GLOBAL.API_Code_GetAllProfession).subscribe(
      data => {
        this.professionTypeDropdown = [];
        data != null || data != undefined ? data.data.ProfessionList.forEach(element => {
          this.professionTypeDropdown.push(element);
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
  //#endregion "GET ALL PROFESSION"

  //#region "GET ALL QUALIFICATION"
  getQualificationType() {
    this.hrService.GetAllQualification(this.setting.getBaseUrl() + GLOBAL.API_Code_GetAllQualification).subscribe(
      data => {
        this.qualificationTypeDropdown = [];
        data != null || data != undefined ? data.data.QualificationDetailsList.forEach(element => {
          this.qualificationTypeDropdown.push(element);
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
  //#endregion "GET ALL QUALIFICATION"

  //#region "GET ALL COUNTRY"
  getCountryType() {
    this.hrService.GetAllCountry(this.setting.getBaseUrl() + GLOBAL.API_Code_GetAllCountry).subscribe(
      data => {
        this.countryTypeDropdown = [];
        data != null || data != undefined ? data.data.CountryDetailsList.forEach(element => {
          this.countryTypeDropdown.push(element);
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
  //#endregion "GET ALL COUNTRY"

  //#region "GET ALL STATE"
  getStateType(e) {

    //TODO: Set Value Foe Add Employee
    this.countryId = e;

    this.hrService.GetAllProvinceDetails(this.setting.getBaseUrl() + GLOBAL.API_Code_GetAllProvinceDetails, e).subscribe(
      data => {
        this.stateTypeDropdown = [];
        data != null || data != undefined ? data.data.ProvinceDetailsList.forEach(element => {
          // this.stateTypeDropdown.filter((element) => element.CountryId == e.value);
          this.stateTypeDropdown.push(element);
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
  //#endregion "GET ALL STATE"

  //#region "FILE UPLOAD"
  onImageSelect(event: any) {
    var file: File = event.value[0];
    var myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = (e) => {
      this.imageURL = myReader.result;
    }
  }

  onFileSelect(event: any) {
    var file: File = event.value[0];
    var myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = (e) => {
      this.fileURL = myReader.result;
    }
  }

  onDocSelect(event: any) {
    var file: File = event.value[0];
    var myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = (e) => {
      this.docURL = myReader.result;
    }
  }
  //#endregion

  //#region "ADD DOCUMENTS"
  addDocumentDetails(model: any) {
    this.empDocuments.DocumentFilePath = this.docURL;
    this.empDocuments.EmployeeID = this.showData.EmployeeID;
    this.hrService.AddDocumentDetails(this.setting.getBaseUrl() + GLOBAL.API_Hr_AddDocumentDetail, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Document Added Successfully!!!");
        }
        this.HideAddDocPopup();
        this.getAllDocumentDetails(this.employeeId);
        this.allFormInitialize();
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
        this.getAllDocumentDetails(this.employeeId);
      });
  }
  //#endregion "ADD DOCUMENTS"

  //#region "GET ALL DOCUMENTS"
  getAllDocumentDetails(employeeId: number) {
    debugger;
    this.hrService.GetAllDocumentDetails(this.setting.getBaseUrl() + GLOBAL.API_Hr_GetAllDocumentDetails, employeeId).subscribe(
      data => {
        this.showDocumentData = [];

        if (data.data.EmployeeDocumentList != null && data.StatusCode == 200) {
          data.data.EmployeeDocumentList.forEach(element => {
            this.showDocumentData.push(element);
          });
        }

        if(this.showDocumentData.length > 0)
        {
            this.defaultDoc = this._DomSanitizer.bypassSecurityTrustResourceUrl(this.setting.getDocUrl()+ this.showDocumentData[this.showDocumentData.length - 1].DocumentGUID);
        }
        else{
            this.defaultDoc = this._DomSanitizer.bypassSecurityTrustResourceUrl(this.setting.getDocUrl()+ "nodoc.pdf");
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
  //#endregion "GET ALL DOCUMENTS"

  //#region "EDIT DOCUMENTS"
  editDocumentDetails(value) {
    debugger;
    this.empDocuments.DocumentFilePath = this.docURL;
    this.empDocuments.EmployeeID = this.showData.EmployeeID;
    this.hrService.EditDocumentDetails(this.setting.getBaseUrl() + GLOBAL.API_Hr_EditDocumentDetail, value).subscribe(
      data => {

        if (data.StatusCode == 200) {
          this.toastr.success("Document Updated Successfully!!!");
        }
        this.getAllDocumentDetails(this.employeeId);
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
        this.getAllDocumentDetails(this.employeeId);
      }
    );
  }
  //#endregion "EDIT DOCUMENTS"

  //#region "DELETE DOCUMENTS"
  deleteDocumentDetail(model) {
    var deleteDocument: DeleteDocument = {
      DocumentId: model.key.DocumentId
    };
    this.hrService.DeleteDocumentDetail(this.setting.getBaseUrl() + GLOBAL.API_Hr_DeleteDocumentDetail, deleteDocument).subscribe(
      data => {
        if (data.StatusCode == 200) //Success
        {
          this.toastr.success("Document Deleted Successfully!!!");
          this.getAllDocumentDetails(model);
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
  //#endregion "DELETE DOCUMENTS"

  //#region "POPUPS"
  ShowAddDocPopup() {
    this.popupAddDocumentVisible = true;
  }

  HideAddDocPopup() {
    this.popupAddDocumentVisible = false;
    this.allFormInitialize();
  }

  ShowAddEmpHistoryPopup() {
    this.popupEmpHistoryVisible = true;
  }

  HideAddEmpHistoryPopup() {
    this.popupEmpHistoryVisible = false;
    this.allFormInitialize();
  }

  //#endregion "POPUPS"

  //#region "ADD EMPLOYEE HISTORY"
  addEmployeeHistoryDetail(model: any) {
    debugger;
    this.empHistory.EmployeeID = this.showData.EmployeeID;
    this.hrService.AddEmployeeHistoryDetail(this.setting.getBaseUrl() + GLOBAL.API_Hr_AddEmployeeHistoryDetail, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Employee History Added Successfully!!!");
        }
        this.HideAddEmpHistoryPopup();
        this.getAllEmployeeHistoryByEmployeeId(this.employeeId);
        this.allFormInitialize();
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
        this.getAllEmployeeHistoryByEmployeeId(this.employeeId);
      });
  }
  //#endregion "ADD EMPLOYEE HISTORY"

  //#region "EDIT EMPLOYEE HISTORY"
  editEmployeeHistoryDetail(value) {
    debugger;
    this.empHistory.EmployeeID = this.showData.EmployeeID;
    this.hrService.EditEmployeeHistoryDetail(this.setting.getBaseUrl() + GLOBAL.API_Hr_EditEmployeeHistoryDetail, value).subscribe(
      data => {

        if (data.StatusCode == 200) {
          this.toastr.success("Employee history Updated Successfully!!!");
        }
        // this.HideEditDocPopup();
        this.getAllEmployeeHistoryByEmployeeId(this.employeeId);
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
        this.getAllEmployeeHistoryByEmployeeId(this.employeeId);
      }
    );
  }
  //#endregion "EDIT EMPLOYEE HISTORY"

  //#region "GET ALL EMPLOYEE HISTORY"
  getAllEmployeeHistoryByEmployeeId(employeeId: number) {
    debugger;
    this.hrService.GetAllEmployeeHistoryByEmployeeId(this.setting.getBaseUrl() + GLOBAL.API_Hr_GetAllEmployeeHistoryByEmployeeId, employeeId).subscribe(
      data => {
        this.showEmployeeHistoryData = [];

        if (data.data.EmployeeHistoryDetailList != null && data.StatusCode == 200) {
          data.data.EmployeeHistoryDetailList.forEach(element => {
            this.showEmployeeHistoryData.push(element);
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
  //#endregion "GET ALL DOCUMENTS"

  //#region "DELETE EMPLOYEE HISTORY"
  deleteEmployeeHistoryDetail(model) {
    var deleteEmployeeHistory: DeleteEmployeeHistory = {
      HistoryID: model.key.HistoryID
    };
    this.hrService.DeleteEmployeeHistoryDetail(this.setting.getBaseUrl() + GLOBAL.API_Hr_DeleteEmployeeHistoryDetail, deleteEmployeeHistory).subscribe(
      data => {
        if (data.StatusCode == 200) //Success
        {
          this.toastr.success("History Detail Deleted Successfully!!!");
          this.getAllEmployeeHistoryByEmployeeId(model);
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
  //#endregion "DELETE EMPLOYEE HISTORY"

  //#region "Event for ADD, UPDATE, DELETE"
  logEvent(eventName, obj) {
    if (eventName == "RowUpdating") {
      var value = Object.assign(obj.oldData, obj.newData);
      this.editEmployeeHistoryDetail(value);
    }
    // if (eventName == "RowRemoving") {
    //     this.deleteEmployeeHistoryDetail(value);
    // }        
  }

  logEvents(eventName, obj) {
    if (eventName == "RowUpdating") {
      var value = Object.assign(obj.oldData, obj.newData)
      this.editDocumentDetails(value);
    }
    // if (eventName == "RowRemoving") {
    //     this.deleteDocumentDetail(value);
    // }        
  }
  //#endregion "Event for ADD, UPDATE, DELETE"

  //#region "EMPLOYEE DOCUMENT POPUP"

  // getfilename(docpath) {
  //   return this._DomSanitizer.bypassSecurityTrustResourceUrl(docpath);
  // }

  // docPreview(){
  //   this.docPopupVisible = true;
  // }

  selectDoc(e) {
      debugger;
      this.docpath = this._DomSanitizer.bypassSecurityTrustResourceUrl(this.setting.getDocUrl() + e.value);
  }

  openDocPreview(e) {
    debugger;
    this.popupVisibleDocument = true; 
    this.getAllDocumentDetails(this.employeeId);      
  }
  //#endregion "EMPLOYEE DOCUMENT POPUP"

  //ALPIT
  //#region "Get Employee Type"

  getEmployeeTypeDropdown() {
    this.hrService.GetAllDropdown(this.setting.getBaseUrl() + GLOBAL.API_Code_GetAllEmployeeType).subscribe(
      data => {
        this.employeeTypeDropdown = [];
        data.data.EmployeeTypeList.forEach(element => {
          this.employeeTypeDropdown.push(element);
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
      }
    );
  }

  //#endregion

  //#region "Get Office Type"
  getOfficeTypeDropdown() {
    this.hrService.GetAllDropdown(this.setting.getBaseUrl() + GLOBAL.API_AllOffice_URL).subscribe(
      data => {
        this.officeTypeDropdown = [];
        data.data.OfficeDetailsList.forEach(element => {
          this.officeTypeDropdown.push(element);
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
      }
    );
  }
  //#endregion

  //#region "Get Department Type"
  getDepartmentType(eventId: any) {
    this.officeId = eventId;
    this.hrService.GetDepartmentDropdown(this.setting.getBaseUrl() + GLOBAL.API_Code_GetDepartmentsByOfficeId, eventId).subscribe(
      data => {
        this.departmentTypeDropdown = [];
        data.data.Departments.forEach(element => {
          this.departmentTypeDropdown.push(element);
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
      }
    );
  }
  //#endregion

  //#region "Get Designation Type"
  GetAllDesignationDropdown() {
    this.hrService.GetAllDropdown(this.setting.getBaseUrl() + GLOBAL.API_Code_GetAllDesignation).subscribe(
      data => {
        this.designationDropdown = [];
        data.data.DesignationList.forEach(element => {
          this.designationDropdown.push(element);
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
      }
    );
  }
  //#endregion

  //#region "Professional Info"
  EditProfessionalDetails(model: any) {
    this.professionalData.OfficeId = this.officeId;
    this.professionalData.EmployeeId = this.employeeId;
    this.professionalData.DepartmentId = model.DepartmentId;
    this.professionalData.DesignationId = model.DesignationId;
    this.professionalData.EmployeeTypeId = model.EmployeeTypeId;
    this.professionalData.FiredOn = model.FiredOn;
    this.professionalData.FiredReason = model.FiredReason;
    this.professionalData.HiredOn = model.HiredOn;
    this.professionalData.JobDescription = model.JobDescription;
    this.professionalData.ResignationOn = model.ResignationOn;
    this.professionalData.ResignationReason = model.ResignationReason;
    this.professionalData.Status = model.Status;
    this.professionalData.TrainingBenefits = model.TrainingBenefits;
    this.hrService.addProfessionalInfo(this.setting.getBaseUrl() + GLOBAL.API_Hr_AddEmployeeProfessionalDetail, this.professionalData).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Employee Updated Successfully!!!");
          //this.GetAllEmployeeDetails(this.tabEventValue);
          //call this-->
          // this.employeeprofessionallist = GetEmployeeProfessionalDetail()
          this.displayProfInfoTab = 0;
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
      });
  }
  //#endregion

  //#region "Get All Financial Year"
  GetFinancialYearDropdown() {
    this.hrService.GetAllDropdown(this.setting.getBaseUrl() + GLOBAL.API_Code_GetAllFinancialYearDetail).subscribe(
      data => {
        this.financialYearDropdown = [];
        data.data.FinancialYearDetailList.forEach(element => {
          this.financialYearDropdown.push(element);
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
      }
    );
  }
  //#endregion

  //#region "Get All Leave Reason Type"
  GetLeaveReasonTypeDropdown() {
    this.hrService.GetAllDropdown(this.setting.getBaseUrl() + GLOBAL.API_Code_LeaveReasonType).subscribe(
      data => {
        this.leaveReasonTypeDropdown = [];
        data.data.LeaveReasonList.forEach(element => {
          this.leaveReasonTypeDropdown.push(element);
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
      }
    );
  }
  //#endregion

  //#region "Add Leave Info"
  onFormSubmit(model) {
    // if(model.LeaveReasonId == "")
    // {
    //   this.AddLeaveReasonDetail(model);
    // }
    // else
    // {
    //   this.EditLeaveReasonDetail(model);
    // }

    this.AddLeaveInfo(model);
  }

  AddLeaveInfo(model: any) {
    model.EmployeeId = this.employeeId;
    model.LeaveReasonId = this.leaveReasonId;

    this.hrService.addLeaveInfo(this.setting.getBaseUrl() + GLOBAL.API_HR_AssignLeaveToEmployeeDetail, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Added Successfully!!!");
        }
        this.GetAllLeaveInfo(this.employeeId);
        this.hideAssignUnitPopup();
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
        this.hideAssignUnitPopup();
      });
  }

  //#endregion

  //#region "Get All Leave Info"
  GetAllLeaveInfo(employeeId: number) {
    this.hrService.GetAllLeaveInfoById(this.setting.getBaseUrl() + GLOBAL.API_HR_GetAllEmployeeAssignLeave, employeeId).subscribe(
      data => {
        this.leaveInfoDataSource = [];
        data.data.AssignLeaveToEmployeeList.forEach(element => {
          this.leaveInfoDataSource.push(element);
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
      }
    );
  }
  //#endregion

  //#region "Leave Info"
  showAssignUnitPopup() {
    this.allFormInitialize();
    this.popupAssignLeaveVisible = true;
  }

  hideAssignUnitPopup() {
    this.popupAssignLeaveVisible = false;
  }
  //#endregion

  //#region "getUnitType"
  getUnitType(e: any) {
    this.leaveReasonId = e.value;
    var days = this.leaveReasonTypeDropdown.filter(a => a.LeaveReasonId == e.value);
    this.leaveInfoData.Unit = days[0].Unit;
    this.leaveInfoData.AssignUnit = days[0].Unit;
  }
  //#endregion "getUnitType"

  //#region  "Get On Click All Employee Details"
  GetEmployeeDetailsByEmployeeId(employeeId: number) {
    console.log('Employee Id -- ', employeeId);
    this.loading = true;
    this.hrService.GetEmployeesDetailsByEmployeeId(this.setting.getBaseUrl() + GLOBAL.API_Hr_GetEmployeeById, employeeId).subscribe(
      data => {

        if (data.StatusCode == 200 && data.data.EmployeeDetailList != null) {
          this.employeeListDetail = [];
          data.data.EmployeeDetailList.forEach(element => {
            this.employeeListDetail.push(element);
          });
          console.log(this.employeeListDetail);
          this.showData = this.employeeListDetail[0];
        }
        //this.employeeprofessionallist = this.showData[0].EmployeeProfessionalList
        this.loading = false;
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
  //#endregion

}
