import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { Tab, HrService } from '../../hr/hr.service';
import { GLOBAL } from '../../../shared/global';
import { PmuService } from '../../pmu/pmu.service';
import { AppSettingsService } from '../../../Services/App-settings.Service';
import { CodeService } from '../../code/code.service';
import { ToastrService } from 'ngx-toastr';
import { empty } from 'rxjs/observable/empty';

@Component({
  selector: 'app-budget-balance',
  templateUrl: './budget-balance.component.html',
  styleUrls: ['./budget-balance.component.css']
})
export class BudgetBalanceComponent implements OnInit {
  showInfoTabs: Tab[]
  openInfoTab = 0;                    // Tabs Toggle Flag
  currencyModel: any[];
  Status: any[];
  // selectedProjectId:any;              // Selected Project
  // selectedProjectName:any;       
  selectedProjectModel: any[];

  ShowCommentsActive = true;          // Project Task & Activities
  ShowCommentsInActive = true;        // Project Task & Activities

  windows: any;
  projectBudget: any[];               // Tab 2
  projectList: any[];                 // Tab 2
  projectBudgetLine: any[];

  projectModel: any;
  popupVisible: boolean = false;

  TotalExpenditure: any;
  TotalIncome: any;
  TotalPayable: any;
  TotalReceivable: any;
  Balance: any;

  // Summary Panel Popover
  TotalIncomeModel:any[];
  TotalPayableModel:any[];
  TotalReceivableModel:any[];
  TotalExpenditureModel:any[];

  withAnimationOptionsVisiblePopOver1: boolean;
  withAnimationOptionsVisiblePopOver2: boolean;
  withAnimationOptionsVisiblePopOver3: boolean;
  withAnimationOptionsVisiblePopOver4: boolean;

  selectedProjectId: any;
  selectedBudgetLine: any;
  selectedItem: any;

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
    this.projectBudget = [
      {
        ProjectId: null,
        AmountReceivable: null,
        AmountPayable: null,
        CurrentBalance: null,
        StartDate: null,
        EndDate: null,
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
      CurrentAmount: null,
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

    this.selectedProjectModel = [{
      ProjectName: null,
      Description: "ABC",
      ReceivableAmount: null,
      PayableAmount: null,
      CurrentBalance: null,
      StartDate: null,
      EndDate: null
    }];
  }

  ngOnInit() {
    this.getAllProjectDetails();
  }

  getAllProjectDetails() {
    this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_ProjectBudget_GetAllProjectDetail).subscribe(
      data => {
        this.projectList = [];
        if (data.data.ProjectDetailList != null && data.StatusCode == 200) {
          data.data.ProjectDetailList.forEach(element => {
            this.projectList.push(element);
          });
          this.selectedProjectId = data.data.ProjectDetailList[0].ProjectId;
          this.getBudgetLineDetails(this.selectedProjectId);
          this.GetProjectBudgetSummary(this.selectedProjectId);
          this.selectedProjectModel = data.data.ProjectDetailList[0];
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

  GetProjectBudgetSummary(ProjectId){
    this.codeservice.GetAllBudgetLineReceivable(this.setting.getBaseUrl() + GLOBAL.API_PMU_GetProjectBudgetSummary, ProjectId).subscribe(
      data => {
        if(data.StatusCode == 200){
          this.TotalExpenditure = data.data.TotalExpenditure;
          this.TotalIncome = data.data.TotalIncome;
          this.TotalPayable = data.data.TotalPayable;
          this.TotalReceivable = data.data.TotalRecivable
          this.Balance = data.data.Balance;
          if(data.data.BudgetPaidAmountList != null && data.data.BudgetPaidAmountList.length > 0){
            this.TotalIncomeModel = [];
            data.data.BudgetPaidAmountList.forEach(element => {
              this.TotalIncomeModel.push(element);
            });
          }
          if(data.data.BudgetPayableList != null && data.data.BudgetPayableList.length > 0){
            this.TotalPayableModel = [];
            data.data.BudgetPayableList.forEach(element => {
              this.TotalPayableModel.push(element);
            });
          }
          if(data.data.BudgetReceivableList != null && data.data.BudgetReceivableList.length > 0){
            this.TotalReceivableModel = [];
            data.data.BudgetReceivableList.forEach(element => {
              this.TotalReceivableModel.push(element);
            });
          }
          if(data.data.BudgetReceivedAmountList != null && data.data.BudgetReceivedAmountList.length > 0){
            this.TotalExpenditureModel = [];
            data.data.BudgetReceivedAmountList.forEach(element => {
              this.TotalExpenditureModel.push(element);
            });
          }
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

  //Selected Project 
  selectedProject(item) {
    this.selectedItem = item;
    this.selectedProjectId = item.ProjectId;
    this.getBudgetLineDetails(this.selectedProjectId);
    this.GetProjectBudgetSummary(this.selectedProjectId);
  }

  selectedBudgetLineFunc(item){
    this.selectedBudgetLine = item.BudgetLineId
    // Fetch Summary Panel and Grid Details
    this.getAllProjectBudgetDetails();
  }

  getBudgetLineDetails(ProjectId) {
    this.codeservice.GetAllBudgetLineDetails(this.setting.getBaseUrl() + GLOBAL.API_Accounting_GetAllBudgetLineDetails, ProjectId).subscribe(
      data => {        
        this.projectBudgetLine = [];
        this.projectBudget = [];
        if (data.data.ProjectBudgetLineList != null && data.StatusCode == 200 && data.data.ProjectBudgetLineList.length > 0) {
          data.data.ProjectBudgetLineList.forEach(element => {
            this.projectBudgetLine.push(element);
          });
          this.selectedBudgetLine = data.data.ProjectBudgetLineList[0].BudgetLineId;
          // Calls The Summary Panel and Budget Line Transaction Details        
          this.getAllProjectBudgetDetails();
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

  getAllProjectBudgetDetails() {
    this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_ProjectBudget_GetAllProjectBudgetDetail).subscribe(
      data => {
        this.projectBudget = [];
        if (data.data.ProjectBudgetList != null && data.StatusCode == 200) {
          data.data.ProjectBudgetList.forEach(element => {
            this.projectBudget.push(element);
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

  logEvent(eventName, obj) {
    // if (eventName == "RowUpdating") {
    //   var value = Object.assign(obj.oldData, obj.newData);     // Merge old data with new Data 
    //   this.editProjectBudget(value);
    // }
    // if (eventName == "RowInserting") {
    //   this.addProjectBudget(obj.data);
    // }
  }

  

  toggleWithAnimationOptionsPopOver1() {
    this.withAnimationOptionsVisiblePopOver1 = !this.withAnimationOptionsVisiblePopOver1;
  }

  toggleWithAnimationOptionsPopOver2() {
    this.withAnimationOptionsVisiblePopOver2 = !this.withAnimationOptionsVisiblePopOver2;
  }

  toggleWithAnimationOptionsPopOver3() {
    this.withAnimationOptionsVisiblePopOver3 = !this.withAnimationOptionsVisiblePopOver3;
  }

  toggleWithAnimationOptionsPopOver4() {
    this.withAnimationOptionsVisiblePopOver4 = !this.withAnimationOptionsVisiblePopOver4;
  }

}
