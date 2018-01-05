import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HrService, OfficeType, MonthlyPayrollSheet, CurrencyType } from '../hr.service';

@Component({
  selector: 'app-monthly-payroll-sheet',
  templateUrl: './monthly-payroll-sheet.component.html',
  styleUrls: ['./monthly-payroll-sheet.component.css']
})
export class MonthlyPayrollSheetComponent implements OnInit {

  officeType: OfficeType[];
  currencyType: CurrencyType[];
  monthlyPayrollSheet: MonthlyPayrollSheet[];
  dataSource: any;

  constructor(private hrService: HrService,private fb: FormBuilder) { 

    this.officeType = this.hrService.getOfficeType();
    this.currencyType = this.hrService.getCurrencyType();
    this.monthlyPayrollSheet = this.hrService.getMonthlyPayrollSheet();
    this.dataSource = {
      store: {
        type: 'array',
        key: 'ID',
        data: this.hrService.getMonthlyPayrollSheet()
      }
    }
  }

  ngOnInit() {
  }

}
