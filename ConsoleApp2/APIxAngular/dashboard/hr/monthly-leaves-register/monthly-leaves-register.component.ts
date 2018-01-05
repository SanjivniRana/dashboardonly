import { Component, OnInit } from '@angular/core';
import { HrService, OfficeType, MonthlyLeavesRegister } from '../hr.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-monthly-leaves-register',
  templateUrl: './monthly-leaves-register.component.html',
  styleUrls: ['./monthly-leaves-register.component.css']
})
export class MonthlyLeavesRegisterComponent implements OnInit {

  
  officeType: OfficeType[];
  monthlyLeavesRegister: MonthlyLeavesRegister[];
  dataSource: any;

  constructor(private hrService: HrService,private fb: FormBuilder) { 

    this.officeType = this.hrService.getOfficeType();
    this.monthlyLeavesRegister = this.hrService.getMonthlyLeavesRegister();
    this.dataSource = {
      store: {
        type: 'array',
        key: 'ID',
        data: this.hrService.getMonthlyLeavesRegister()
      }
    }

  }

  ngOnInit() {
  }

}
