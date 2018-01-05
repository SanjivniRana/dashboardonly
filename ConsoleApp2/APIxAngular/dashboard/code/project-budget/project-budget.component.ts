import { Component, OnInit } from '@angular/core';
import { Tab } from '../../accounts/accounts.service';
import { CodeService, Company } from '../code.service';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsService } from '../../../Services/App-settings.Service';
import { GLOBAL } from '../../../shared/global';

@Component({
  selector: 'app-project-budget',
  templateUrl: './project-budget.component.html',
  styleUrls: ['./project-budget.component.css']
})
export class ProjectBudgetComponent implements OnInit {
  showSelectedTab = 0;
  companies: Company[];
  projectList: any[];

  projectBudget: any[];
  windows: any;
  tabs: Tab[] = [
    {
      id: 0,
      text: "Project Budget"
    },
    {
      id: 1,
      text: "Budget Line"
    },
    {
      id: 2,
      text: "Budget Line Received"
    }];

  constructor(private codeservice: CodeService, private setting: AppSettingsService, private toastr: ToastrService) {
    this.companies = this.codeservice.getCompanies();
    this.windows = window;
    this.projectBudget = [
      {
        ProjectId: null,
        AmountReceivable: null,
        AmountPayable: null,
        CurrentBalance: null,
        StartDate: null,
        EndDate: null
      }
    ];
  }

  ngOnInit() {
    this.getAllProjectBudgetDetails();
    this.getAllProjectDetails();
  }

  selectTab(event) {
    if (event.itemIndex == 0) {
      this.showSelectedTab = 0;
    }
    else if (event.itemIndex == 1) {
      this.showSelectedTab = 1;
    }
    else if (event.itemIndex == 2) {
      this.showSelectedTab = 2;
    }
  }
  
  logEvent(eventName, obj) {
    if (eventName == "RowUpdating") {
      var value = Object.assign(obj.oldData, obj.newData);     // Merge old data with new Data 
      this.editProjectBudget(value);
    }
    if (eventName == "RowInserting") {
      this.addProjectBudget(obj.data);
    }
  }

  addProjectBudget(model) {
    this.codeservice.AddExchangeRate(this.setting.getBaseUrl() + GLOBAL.API_ProjectBudget_AddProjectBudget, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Budget Added Successfully!!!");
        }
        this.getAllProjectBudgetDetails();
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
        this.getAllProjectBudgetDetails();
      }
    );
  }

  editProjectBudget(model)
  {
    this.codeservice.AddExchangeRate(this.setting.getBaseUrl() + GLOBAL.API_ProjectBudget_EditProjectBudget, model).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Budget Updated Successfully!!!");
        }
        this.getAllProjectBudgetDetails();
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
        this.getAllProjectBudgetDetails();
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

  getAllProjectDetails() {
    this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_ProjectBudget_GetAllProjectDetail).subscribe(
      data => {
        this.projectList = [];
        if (data.data.ProjectDetailList != null && data.StatusCode == 200) {
          data.data.ProjectDetailList.forEach(element => {
            this.projectList.push(element);
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

  sendRowData(data){
    localStorage.setItem("SelectedBudgetId",data.data.BudgetId);
  }

}
