import { Component, OnInit } from '@angular/core';
import { DxTabsModule, DxSelectBoxModule } from 'devextreme-angular';
import { AccountsService, Tab, FinancialYear } from '../accounts.service';
import ArrayStore from 'devextreme/data/array_store';

@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.css']
})
export class FinancialReportComponent implements OnInit {
  tabContent: string;
  showSelectedTab = 0;
  tabs: Tab[];
  showFilterRow: boolean;
  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;
  tab5: any;

  financialYear: FinancialYear[];
  data: any;

  constructor(private accountservice:AccountsService) { 
    
    this.financialYear = this.accountservice.getFinancialYear_Report();
    this.data = new ArrayStore({
        data: this.financialYear,
        key: "ID"
    });

    this.tabs = this.accountservice.getTabs();
    this.showFilterRow = true;
    this.tab1 = {
        store: {
            type: 'array',
            key: 'ID',
            data: this.accountservice.getFinancial_COA()
        }
    }
    this.tab2 = {
      store: {
          type: 'array',
          key: 'ID',
          data: this.accountservice.getFinancial_Notes()
      }
  }
  this.tab3 = {
      store: {
          type: 'array',
          key: 'ID',
          data: this.accountservice.getFinancial_BalanceSheet()
      }
  }
    this.tab4 = {
      store: {
          type: 'array',
          key: 'ID',
          data: this.accountservice.getFinancial_Income()
      }
    }
    this.tab5 = {
      store: {
          type: 'array',
          key: 'ID',
          data: this.accountservice.getFinancial_DetailsNotes()
      }
    }
  }

  selectTab(e) {
    this.showSelectedTab = e.itemIndex;
      // this.tabContent = this.tabs[e.itemIndex].content;
  }

  selectedFinancialYear(value)
  {
  }

  ngOnInit() {
  }

}
