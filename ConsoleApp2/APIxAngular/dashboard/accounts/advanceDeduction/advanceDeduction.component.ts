import { Component, OnInit, ViewChild } from '@angular/core';
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
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-advanceDeduction',
  templateUrl: './advanceDeduction.component.html'
})
export class AdvanceDeductionComponent implements OnInit {
  dataSource: any;
  showFilterRow: boolean;

  //Use for event handling 
  events: Array<string> = [];


  constructor(private accountservice: AccountsService) {
    this.showFilterRow = true;
    this.dataSource = {
      store: {
        type: 'array',
        key: 'ID',
        data: this.accountservice.getAdvanceDeduction()
      }
    }
  }
  ngOnInit() {
  }


  //TODO: Event for ADD, UPDATE, DELETE
  logEvent(eventName) {    
    this.events.unshift(eventName);
  }

}