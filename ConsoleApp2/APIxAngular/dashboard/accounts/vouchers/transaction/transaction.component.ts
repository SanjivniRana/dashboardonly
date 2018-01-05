import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AccountsService, VoucherTransaction } from '../../accounts.service';
import { VouchersComponent } from '../vouchers.component';
import { commonService } from '../../../../Services/common.service';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsService } from '../../../../Services/App-settings.Service';
import { GLOBAL } from '../../../../shared/global';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    providers: [VouchersComponent]
})
export class TransactionComponent implements OnInit {
    dataSource: VoucherTransaction[];
    voucherNumber: any;
    AccountsArr : any[];
    windows:any;

    constructor(private accountservice: AccountsService, private router: Router, private setting: AppSettingsService, private toastr: ToastrService, private fb: FormBuilder, private voucherComponent: VouchersComponent, private commonservice: commonService) {
        // this.dataSource = this.accountservice.getVoucherTransactionModel();
        this.voucherNumber = this.commonservice.voucherNumber;
        this.windows = window;      
    }

    ngOnInit() {
        this.GetAccountDetails();  
        this.GetAllVoucherTransactionDetail();      
    }

    GetAccountDetails() {
        this.accountservice.GetAccountDetails(this.setting.getBaseUrl() + GLOBAL.API_Accounting_GetAccountDetails).subscribe(
            data => {            
                this.AccountsArr = [];
                if(data.StatusCode == 200)                          
                {
                    data.data.AccountDetailList.forEach(element => {
                        this.AccountsArr.push(
                            {
                                AccountCode: element.AccountCode,
                                AccountName: element.AccountName
                            }                            
                        );                        
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
                else {
                }
            }
        )
    }

    GetAllVoucherTransactionDetail()
    {
        this.accountservice.GetAllVoucherTransactionDetail(this.setting.getBaseUrl() + GLOBAL.API_Accounting_GetAllVoucherTransactionDetail, localStorage.getItem("SelectedVoucherNumber")).subscribe(
            data => {                
                if(data.StatusCode == 200)
                {
                    this.dataSource = [];
                    data.data.VoucherTransactionList.forEach(element => {
                        this.dataSource.push(element);
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
                else {
                }
            }
        )
    }

    logEvent(eventName, obj) {
        
        if(eventName == "RowInserting")
        {
            obj.data.VoucherNo = localStorage.getItem("SelectedVoucherNumber");
            obj.data.CurrencyId = localStorage.getItem("SelectedVoucherCurrency");            
            obj.data.OfficeId = localStorage.getItem("SelectedOfficeId");
            this.AddVoucherTransaction(obj.data);
        }

        else if(eventName == "RowUpdating")
        {
            var value = Object.assign(obj.oldData,obj.newData);     // Merge old data with new Data
            value.VoucherNo = localStorage.getItem("SelectedVoucherNumber");
            value.CurrencyId = localStorage.getItem("SelectedVoucherCurrency");            
            value.OfficeId = localStorage.getItem("SelectedOfficeId");
            this.EditVoucherTransaction(value);
        }
        this.GetAllVoucherTransactionDetail();
    }    

    AddVoucherTransaction(data)
    {
        this.accountservice.AddVoucherTransaction(this.setting.getBaseUrl() + GLOBAL.API_Accounting_AddVouchersTransaction, data).subscribe(
            data => {
                if(data.StatusCode == 200)
                {
                    this.toastr.success("Transaction Added Successfully!!!");
                }
                else if(data.StatusCode == 400)
                {
                    this.toastr.error(data.Message);
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
                else {
                }
            }
        )
    }

    EditVoucherTransaction(data)
    {
        this.accountservice.EditVoucherTransaction(this.setting.getBaseUrl() + GLOBAL.API_Accounting_EditVouchersTransaction, data).subscribe(
            data => {
                if(data.StatusCode == 200)
                {
                    this.toastr.success("Transaction Updated Successfully!!!");
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
                else {
                }
            }
        )
    }

    backToVouchers() {
        this.router.navigate(['../vouchers']);
    }
    onFormSubmit(value) {

    }
}
