import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HrComponent } from './hr.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProspectiveEmployeesComponent } from './prospective-employees/prospective-employees.component';
import { AdvancesComponent } from './advances/advances.component';
import { MonthlyLeavesRegisterComponent } from './monthly-leaves-register/monthly-leaves-register.component';
import { MonthlyPayrollSheetComponent } from './monthly-payroll-sheet/monthly-payroll-sheet.component';
import { PayrollMonthlyHoursComponent } from './payroll-monthly-hours/payroll-monthly-hours.component';
import { AddEmployeesComponent } from './employees/add-employees/add-employees.component';

const hr_Router: Routes =
    [{
        path: '', component: HrComponent,
        children: [
            { path: 'employees', component: EmployeesComponent },
            { path: 'prospective-employees', component: ProspectiveEmployeesComponent },
            { path: 'advances', component: AdvancesComponent },
            { path: 'leave-register', component: MonthlyLeavesRegisterComponent },
            { path: 'payroll', component: MonthlyPayrollSheetComponent },
            { path: 'payroll-monthly-hours', component: PayrollMonthlyHoursComponent },
            { path: 'add-employees', component: AddEmployeesComponent },
        ]
    }];
@NgModule({
    imports: [RouterModule.forChild(hr_Router)],
    exports: [RouterModule]
})
export class HrRoutingModule { }