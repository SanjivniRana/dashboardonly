import { Component, OnInit } from '@angular/core';
import { PmuService, PMUProjectList, PMUProjectDetail } from '../pmu.service';
import ArrayStore from 'devextreme/data/array_store';
import { Tab, HrService } from '../../hr/hr.service';
import { CodeService, ProjectDetails, CurrencyData } from '../../code/code.service';
import { AppSettingsService } from '../../../Services/App-settings.Service';
import { GLOBAL } from '../../../shared/global';
import { ToastrService } from 'ngx-toastr';
import { CurrencyCode } from '../../../Models/CodeModel';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  showInfoTabs: Tab[]
  openInfoTab = 0;                    // Tabs Toggle Flag
  currencyModel: any[];               // Currency Model Datasource

  selectedProjectModel: any;
  selectedProjectId: any;
  selectedProjectName: any;
  selectedProjectDescription: any;

  ShowCommentsActive = true;          // Project Task & Activities
  ShowCommentsInActive = true;        // Project Task & Activities

  windows: any;
  projectBudgetLine: any[];           // Related to Tab 2
  projectList: any[];                 // Related to Tab 2
  projectBudgetReceivable: any[];
  projectBudgetPayable:any[];

  projectModel: any;                  // Add Project Details Model
  popupVisible: boolean = false;      // Add Project Popup Flag Property
  Status: any[];                      // Add Project Static Flag

  BudgetLineTypeArr: any[];           // B/L type Datasource
  AddReceivable: any = 0;     // Flag for B/L and Receivable Grid
  selectedBudgetLineTypeId : any;
  selectedDescription: any;
  selectedReceivableId: any;
  selectedPayableId: any;

  projectBudgetReceived:any[];
  projectBudgetPaid:any[];
  Amount:any;
  pattern: any;

  constructor(private pmuservice: PmuService, private hrService: HrService, private setting: AppSettingsService, private codeservice: CodeService, private toastr: ToastrService) {
    this.showInfoTabs = [
      {
        id: 0,
        text: "Project Description"
      },
      {
        id: 1,
        text: "Documents"
      },
      {
        id: 2,
        text: "Budget"
      },
      {
        id: 3,
        text: "Task & Activities"
      }];

    this.windows = window;

    this.projectBudgetLine = [
      {
        ProjectId: null,
        BudgetLineId: null,
        BudgetLineTypeId: null,
        Description: null,
        AmountReceivable: null,
        AmountPayable: null
      }
    ];

    this.projectModel = {
      ProjectName: null,
      Description: null,
      StartDate: null,
      EndDate: null,
      CurrencyId: null,
      Budget: null,
      ReceivableAmount: null,
      PayableAmount: null,
      CurrentBalance: null,
      Status: null
    };

    this.Status = [{
      "Id": 1,
      "Value": "Active"
    },
    {
      "Id": 2,
      "Value": "Inactive"
    }];

    this.projectBudgetReceivable = [
      {
        ProjectId: null,
        BudgetLineType: null,
        ExpectedDate: null,
        Amount: null
      }
    ];

    this.selectedProjectModel = {
      ProjectName: null,
      Description: null,
      StartDate: null,
      EndDate: null,
      CurrencyId: null,
      Budget: null,
      ReceivableAmount: null,
      PayableAmount: null,
      CurrentBalance: null,
      Status: null
    };
  }

  ngOnInit() {
    this.getCurrencyCodeList();
    this.getBudgetLineTypes();
    this.getAllProjectDetails();
  }

  // Render SideBar Project Details
  getAllProjectDetails() {
    this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_ProjectBudget_GetAllProjectDetail).subscribe(
      data => {
        this.projectList = [];
        if (data.data.ProjectDetailList != null && data.StatusCode == 200) {
          data.data.ProjectDetailList.forEach(element => {
            this.projectList.push(element);
          });
        }
        this.projectModel = data.data.ProjectDetailList[0];       // For First Tym loading
        this.selectedProjectModel = data.data.ProjectDetailList[0];
        this.selectedProjectId = data.data.ProjectDetailList[0].ProjectId;
        this.selectedProjectName = data.data.ProjectDetailList[0].ProjectName;
        this.selectedProjectDescription = data.data.ProjectDetailList[0].Description;
        this.getAllBudgetLineDetails();                 // Initial Binding Of tabs
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

  //Get Currency Dropdown List
  getCurrencyCodeList() {
    this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_CurrencyCodes_GetAllCurrency).subscribe(
      data => {
        this.currencyModel = [];
        if (data.data.CurrencyList != null && data.StatusCode == 200) {
          data.data.CurrencyList.forEach(element => {
            this.currencyModel.push(element);
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

  //Get Currency Dropdown List
  getBudgetLineTypes() {
    this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_BudgetLine_GetBudgetLineTypes).subscribe(
      data => {
        this.BudgetLineTypeArr = [];
        if (data.data.BudgetLineTypeList != null && data.StatusCode == 200) {
          data.data.BudgetLineTypeList.forEach(element => {
            this.BudgetLineTypeArr.push(element);
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

  //Selected Project Value OnClick
  selectedProject(item) {
    this.selectedProjectModel = item;             // Value assigned when user clicked on add project icon and then on edit detail icon then datasource gets empty.
    this.projectModel = item;                     // For Project Description DataBinding
    this.selectedProjectId = item.ProjectId;
    this.selectedProjectName = item.ProjectName;
    this.selectedProjectDescription = item.Description;
    this.AddReceivable = 0;

    this.getAllBudgetLineDetails();               // Project Budget Line Hit
    // Project Document Hit
    // Task & Activity Hit

  }

  // Open Project Modal
  addProjectModal(flag) {
    if (flag == 1)                                     // Flag 1 for add project details
    {
      this.projectModel = {
        ProjectName: null,
        Description: null,
        StartDate: null,
        EndDate: null,
        CurrencyId: null,
        Budget: null,
        ReceivableAmount: null,
        PayableAmount: null,
        CurrentBalance: null,
        Status: null
      };
    }
    else {                                             // Flag 2 for edit project details
      this.projectModel = this.selectedProjectModel;
    }
    this.popupVisible = true;
  }

  // Add project popup
  HidePopup() {
    this.popupVisible = false;
    this.projectModel = this.selectedProjectModel;        // Needs To be Changed as the values changes
  }

  // Save From Project Popup (Plus Icon)
  AddEditProjectDetails(model) {   
    if(model.ProjectId !=null && model.ProjectId != 0)
    {
      this.EditProjectDetails(model);
    }
    else{
      this.AddProjectDetails(model);
    }
  }

  // OnSubmit Add New Project
  AddProjectDetails(model){
    this.codeservice.AddProjectDetails(this.setting.getBaseUrl() + GLOBAL.API_ProjectBudget_AddProjectDetails, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Project Added Successfully!!!");
        }
        this.getAllProjectDetails();
        this.popupVisible = false;
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
        this.getAllProjectDetails();
      }
    );
  }

  // OnSubmit Edit New Project
  EditProjectDetails(model){
    this.codeservice.AddProjectDetails(this.setting.getBaseUrl() + GLOBAL.API_ProjectBudget_EditProjectDetails, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Project Updated Successfully!!!");
        }
        this.getAllProjectDetails();
        this.popupVisible = false;
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
        this.getAllProjectDetails();
      }
    );
  }

  // On Tab Selection
  openInfoTabs(e) {
    this.openInfoTab = e.itemIndex;
  }

  // Get All Budget Lines Details
  getAllBudgetLineDetails() {
    this.codeservice.GetAllBudgetLineReceivable(this.setting.getBaseUrl() + GLOBAL.API_PMU_GetAllBudgetLineDetails, this.selectedProjectId).subscribe(
      data => {
        this.projectBudgetLine = [];
        if (data.data.ProjectBudgetLineList != null && data.StatusCode == 200) {
          data.data.ProjectBudgetLineList.forEach(element => {
            this.projectBudgetLine.push(element);
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

  // Budget Line DataGrid Events
  logEvent(eventName, obj) {
    if (eventName == "RowUpdating") {
      var value = Object.assign(obj.oldData, obj.newData);     // Merge old data with new Data 
      this.editProjectBudgetLine(value);
    }
    if (eventName == "RowInserting") {
      this.addProjectBudgetLine(obj.data);
    }
  }

  // Project Budget Line Add
  addProjectBudgetLine(model) {
    model.ProjectId = this.selectedProjectId;
    this.codeservice.AddExchangeRate(this.setting.getBaseUrl() + GLOBAL.API_PMU_AddBudgetLine, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("BudgetLine Added Successfully!!!");
        }
        this.getAllBudgetLineDetails();
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
        this.getAllBudgetLineDetails();
      }
    );
  }

  // Project Budget Line Edit
  editProjectBudgetLine(model) {
    model.ProjectId = this.selectedProjectId;
    this.codeservice.AddExchangeRate(this.setting.getBaseUrl() + GLOBAL.API_PMU_EditBudgetLine, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("BudgetLine Updated Successfully!!!");
        }
        this.getAllBudgetLineDetails();
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
        this.getAllBudgetLineDetails();
      }
    );
  }

  // Project Budget Line Receivable Link On Click
  addReceivableClicked(data) {
    this.selectedBudgetLineTypeId = data.data.BudgetLineTypeId;
    this.selectedDescription = data.data.Description;
    localStorage.setItem("SelectedBudgetLineId", data.data.BudgetLineId);
    this.AddReceivable = 1;
    this.getBudgetLineReceivableDetails();
  }

  // Project Budget Line Payable Link On Click
  addPayableClicked(data){
    this.selectedBudgetLineTypeId = data.data.BudgetLineTypeId;
    this.selectedDescription = data.data.Description;
    localStorage.setItem("SelectedBudgetLineId", data.data.BudgetLineId);
    this.AddReceivable = 3;
    this.getBudgetLinePayableDetails();
  }

  // Task & Activity tabs Accordion Toggle
  ActiveComments() {
    if (this.ShowCommentsActive == true) {
      this.ShowCommentsActive = false;
    }
    else {
      this.ShowCommentsActive = true;;
    }
  }

  // Task & Activity tabs Accordion Toggle
  InActiveComments() {
    if (this.ShowCommentsInActive == true) {
      this.ShowCommentsInActive = false;
    }
    else {
      this.ShowCommentsInActive = true;;
    }
  }

  // Back Button Toggle Functionality
  ShowBudgetLineGrid(gridParam) {
    this.AddReceivable = gridParam;
  }

  // Get All Budget Lines Receivable Details
  getBudgetLineReceivableDetails() {
    this.codeservice.GetAllBudgetLineReceivableByProjectId(this.setting.getBaseUrl() + GLOBAL.API_PMU_GetBudgetLineReceivableDetails, this.selectedProjectId, localStorage.getItem("SelectedBudgetLineId")).subscribe(
      data => {
        this.projectBudgetReceivable = [];
        if (data.data.BudgetReceivableList != null && data.StatusCode == 200) {
          data.data.BudgetReceivableList.forEach(element => {
            this.projectBudgetReceivable.push(element);
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
  
  getBudgetLinePayableDetails() {
    this.codeservice.GetAllBudgetLineReceivableByProjectId(this.setting.getBaseUrl() + GLOBAL.API_PMU_GetBudgetLinePayableDetails, this.selectedProjectId, localStorage.getItem("SelectedBudgetLineId")).subscribe(
      data => {
        this.projectBudgetPayable = [];
        if (data.data.BudgetPayableList != null && data.StatusCode == 200) {
          data.data.BudgetPayableList.forEach(element => {
            this.projectBudgetPayable.push(element);
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

  // Receivable Grid Events
  logEventReceivable(eventName, obj) {
    if (eventName == "RowUpdating") {
      var value = Object.assign(obj.oldData, obj.newData);     // Merge old data with new Data 
      this.editBudgetLineReceivable(value);
    }
    if (eventName == "RowInserting") {
      this.addBudgetLineReceivable(obj.data);
    }
  }

  // Project Budget Line Receivable Add Installment
  addBudgetLineReceivable(model) {    
    model.ProjectId = this.selectedProjectId;
    model.BudgetLineId = localStorage.getItem("SelectedBudgetLineId");
    model.BudgetLineType = this.selectedBudgetLineTypeId;  
    model.Description = this.selectedDescription;
    this.codeservice.AddExchangeRate(this.setting.getBaseUrl() + GLOBAL.API_PMU_AddBudgetLineReceivable, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Receivable Amount Added Successfully!!!");
        }
        this.getBudgetLineReceivableDetails();
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
        this.getBudgetLineReceivableDetails();
      }
    );
  }

  // Project Budget Line Receivable Edit Installment
  editBudgetLineReceivable(model) {
    model.ProjectId = this.selectedProjectId;
    model.BudgetLineId = localStorage.getItem("SelectedBudgetLineId");
    model.BudgetLineType = this.selectedBudgetLineTypeId;
    model.Description = this.selectedDescription;
    this.codeservice.AddExchangeRate(this.setting.getBaseUrl() + GLOBAL.API_PMU_EditBudgetLineReceivable, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Receivable Amount Updated Successfully!!!");
        }
        this.getBudgetLineReceivableDetails();
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
        this.getBudgetLineReceivableDetails();
      }
    );
  }

  logEventPayable(eventName, obj){
    if (eventName == "RowUpdating") {
      var value = Object.assign(obj.oldData, obj.newData);     // Merge old data with new Data 
      this.editBudgetLinePayable(value);
    }
    if (eventName == "RowInserting") {
      this.addBudgetLinePayable(obj.data);
    }
  }

  addBudgetLinePayable(model) {    
    model.ProjectId = this.selectedProjectId;
    model.BudgetLineId = localStorage.getItem("SelectedBudgetLineId");
    model.BudgetLineType = this.selectedBudgetLineTypeId;  
    this.codeservice.AddExchangeRate(this.setting.getBaseUrl() + GLOBAL.API_PMU_AddBudgetLinePayable, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Payable Amount Added Successfully!!!");
        }
        this.getBudgetLinePayableDetails();
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
        this.getBudgetLinePayableDetails();
      }
    );
  }

  // Project Budget Line Payable Edit Installment
  editBudgetLinePayable(model) {
    model.ProjectId = this.selectedProjectId;
    model.BudgetLineId = localStorage.getItem("SelectedBudgetLineId");
    model.BudgetLineType = this.selectedBudgetLineTypeId;
    this.codeservice.AddExchangeRate(this.setting.getBaseUrl() + GLOBAL.API_PMU_EditBudgetLinePayable, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Payable Amount Updated Successfully!!!");
        }
        this.getBudgetLinePayableDetails();
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
        this.getBudgetLinePayableDetails();
      }
    );
  }

  addReceivedClicked(data){
    this.AddReceivable = 2;
    this.Amount = data.data.Amount;
    this.selectedReceivableId = data.data.BudgetReceivalbeId;
    this.getBudgetLineReceivedDetails();    
  }

  setStateValue(rowData: any, value: any): void {
    if(value > this.Amount) 
    {
      this.pattern = true;
    }
    rowData.BudgetLineId = null;
    (<any>this).defaultSetCellValue(rowData, value);
}

  getBudgetLineReceivedDetails() {
    this.codeservice.GetAllBudgetLineReceivedDetails(this.setting.getBaseUrl() + GLOBAL.API_PMU_GetBudgetLineReceivedDetails, this.selectedProjectId, localStorage.getItem("SelectedBudgetLineId"),this.selectedReceivableId).subscribe(
      data => {
        this.projectBudgetReceived = [];
        if (data.data.BudgetReceivedAmountList != null && data.StatusCode == 200) {
          data.data.BudgetReceivedAmountList.forEach(element => {
            this.projectBudgetReceived.push(element);
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

  getBudgetLinePayableAmountDetails() {
    this.codeservice.GetAllBudgetLinePaidDetails(this.setting.getBaseUrl() + GLOBAL.API_PMU_GetBudgetLinePaidDetails, this.selectedProjectId, localStorage.getItem("SelectedBudgetLineId"),this.selectedPayableId).subscribe(
      data => {
        this.projectBudgetPaid = [];
        if (data.data.BudgetPaidAmountList != null && data.StatusCode == 200) {
          data.data.BudgetPaidAmountList.forEach(element => {
            this.projectBudgetPaid.push(element);
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

  logEventReceivedAmount(eventName, obj) {
    if (eventName == "RowUpdating") {
      var value = Object.assign(obj.oldData, obj.newData);     // Merge old data with new Data 
      this.editBudgetLineReceived(value);
    }
    if (eventName == "RowInserting") {
      this.addBudgetLineReceived(obj.data);
    }
  }

  addBudgetLineReceived(model){
    model.BudgetReceivalbeId = this.selectedReceivableId;
    this.codeservice.AddExchangeRate(this.setting.getBaseUrl() + GLOBAL.API_PMU_AddBudgetLineReceived, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Received Amount Added Successfully!!!");
        }
        this.getBudgetLineReceivedDetails();
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
        this.getBudgetLineReceivedDetails();
      }
    );
  }

  editBudgetLineReceived(model){
    this.codeservice.AddExchangeRate(this.setting.getBaseUrl() + GLOBAL.API_PMU_EditBudgetLineReceived, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Received Amount Updated Successfully!!!");
        }
        this.getBudgetLineReceivedDetails();
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
        this.getBudgetLineReceivedDetails();
      }
    );
  }

  addPayableAmountClicked(data){
    this.AddReceivable = 4;
    this.selectedPayableId = data.data.BudgetPayableId;
    this.getBudgetLinePayableAmountDetails();
  }

  logEventPaidAmount(eventName, obj){
    if (eventName == "RowUpdating") {
      var value = Object.assign(obj.oldData, obj.newData);     // Merge old data with new Data 
      this.editBudgetLinePaid(value);
    }
    if (eventName == "RowInserting") {
      this.addBudgetLinePaid(obj.data);
    }
  }

  addBudgetLinePaid(model){
    model.BudgetPayableId = this.selectedPayableId;
    this.codeservice.AddExchangeRate(this.setting.getBaseUrl() + GLOBAL.API_PMU_AddBudgetLinePaid, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Paid Amount Added Successfully!!!");
        }
        this.getBudgetLinePayableAmountDetails();
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
        this.getBudgetLinePayableAmountDetails();
      }
    );
  }

  editBudgetLinePaid(model){
    model.BudgetPayableId = this.selectedPayableId;
    this.codeservice.AddExchangeRate(this.setting.getBaseUrl() + GLOBAL.API_PMU_EditBudgetLinePaid, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Paid Amount Updated Successfully!!!");
        }
        this.getBudgetLinePayableAmountDetails();
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
        this.getBudgetLinePayableAmountDetails();
      }
    );
  }

  defaultVisible: boolean = false;
  toggleDefault() {
    this.defaultVisible = !this.defaultVisible;
  }
}
