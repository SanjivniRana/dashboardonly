import { Component, OnInit } from '@angular/core';
import { HrService, OfficeType, PayrollMonthlyHours } from '../hr.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsService } from '../../../Services/App-settings.Service';
import { BsModalService } from 'ngx-bootstrap';
import { GLOBAL } from '../../../shared/global';
import { CodeService } from '../../code/code.service';

@Component({
    selector: 'app-payroll-monthly-hours',
    templateUrl: './payroll-monthly-hours.component.html',
    styleUrls: ['./payroll-monthly-hours.component.css']
})
export class PayrollMonthlyHoursComponent implements OnInit {
    popupVisible = false;
    showFilterRow: boolean;
    monthlyhoursdt: any[];
    monthlyhoursdata: any;
    officelistdt: any[];


    constructor(private router: Router, private toastr: ToastrService, private fb: FormBuilder, private setting: AppSettingsService, private modalService: BsModalService, private hrservice: HrService, private codeservice: CodeService) {
        // this.monthlyhoursdata = this.hrservice.getPayrollMonthlyHours();
        this.showFilterRow = true;
    }

    ngOnInit() {
        this.getPayrollMonthlyHoursList();
        this.getAllOfficeList();
        this.initializeForm();
    }

    initializeForm() {
        this.monthlyhoursdata = {
            "OfficeId": null,
            "Hours": null
        }
    }

    getPayrollMonthlyHoursList() {
        this.hrservice.GetAllDropdown(this.setting.getBaseUrl() + GLOBAL.API_HR_GetAllPayrollMonthlyHourDetail).subscribe(
            data => {
                this.monthlyhoursdt = [];
                data.data.PayrollMonthlyHourList.forEach(element => {
                    this.monthlyhoursdt.push(element);
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
        )
    }

    getAllOfficeList() {
        this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_AllOffice_URL).subscribe(
            data => {
                this.officelistdt = [];
                data.data.OfficeDetailsList.forEach(element => {
                    this.officelistdt.push({
                        OfficeId: element.OfficeId,
                        OfficeName: element.OfficeName
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
        )
    }

    onFormSubmit(model) {
        // if(model.LeaveReasonId == "")
        // {
        //   this.AddLeaveReasonDetail(model);
        // }
        // else
        // {
        //   this.EditLeaveReasonDetail(model);
        // }
        this.AddLeaveReasonDetail(model);
    }

    AddLeaveReasonDetail(model) {
        model.PayrollMonth = model.Date.getMonth() + 1;
        model.PayrollYear = model.Date.getFullYear();
        this.hrservice.AddEditPayrollMonthlyHour(this.setting.getBaseUrl() + GLOBAL.API_HR_AddPayrollMonthlyHourDetail, model).subscribe(
            data => {
                if (data.StatusCode == 200) {
                    this.toastr.success("Employee Added Successfully!!!");
                }
                // this.allFormInitialize();
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

    showPopup() {
        // this.monthlyhoursdata = this.hrservice.getPayrollMonthlyHours();
        this.popupVisible = true;
    }

    HidePopup() {
        this.popupVisible = false;
    }

}
