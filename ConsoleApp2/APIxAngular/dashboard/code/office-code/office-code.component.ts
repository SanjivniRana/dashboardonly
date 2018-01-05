import { Component, OnInit } from '@angular/core';
import { OfficeData, CodeService } from '../code.service';
import { OfficeCode, OfficeCodefordelete } from '../../../Models/CodeModel';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { AppSettingsService } from '../../../Services/App-settings.Service';
import { BsModalService } from 'ngx-bootstrap';
import { GLOBAL } from '../../../shared/global';

@Component({
    selector: 'app-office-code',
    templateUrl: './office-code.component.html',
    styleUrls: ['./office-code.component.css']
})
export class OfficeCodeComponent implements OnInit {
  showFilterRow: boolean;
  popupVisible = false;
  ConfirmationPopup = false;
  officedata : OfficeData;
  officecodedt : OfficeCode[];
  officecodeid : any;

  constructor(private router: Router, private toastr: ToastrService,private fb: FormBuilder,private setting : AppSettingsService , private modalService: BsModalService, private codeservice: CodeService) 
  { 
      this.officedata = this.codeservice.getOfficeData();
      this.showFilterRow = true;
  }

  ngOnInit() {
    this.getOfficeCodeList();
  }

  showPopup() 
  { 
    this.officedata = this.codeservice.getOfficeData();
      this.popupVisible = true;
  }
    

    HidePopup() {
        this.popupVisible = false;
    }

    ShowConfirmationPopup(data) {

        this.officecodeid = data.data.OfficeId
        this.ConfirmationPopup = true;
    }

    HideConfirmationPopup() {
        this.ConfirmationPopup = false;
    }

    //Get all Office Details
    getOfficeCodeList() {
        this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_OfficeCode_GetAllOfficeDetails).subscribe(
            data => {
                this.officecodedt = [];
                data.data.OfficeDetailsList.forEach(element => {
                    this.officecodedt.push({
                        OfficeId: element.OfficeId,
                        OfficeCode: element.OfficeCode,
                        OfficeName: element.OfficeName,
                        SupervisorName: element.SupervisorName,
                        PhoneNo: element.PhoneNo,
                        FaxNo: element.FaxNo,
                        OfficeKey: element.OfficeKey
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

        if (model.OfficeId == "") {
            this.AddOfficeCode(model);
        }
        else {
            this.EditOfficeCode(model);
        }
    }

    AddOfficeCode(model) {
        var obj: any = {};
        var addofficecode: OfficeCode = {
            OfficeId: 0,
            OfficeCode: model.OfficeCode,
            OfficeName: model.OfficeName,
            SupervisorName: model.SupervisorName,
            PhoneNo: model.PhoneNo,
            FaxNo: model.FaxNo,
            OfficeKey: model.OfficeKey
        };
        this.codeservice.AddEditOfficeCode(this.setting.getBaseUrl() + GLOBAL.API_OfficeCode_AddOfficeDetail, addofficecode).subscribe(
            data => {
                if (data.StatusCode == 200) //Success
                {
                    this.toastr.success("Office Code Added Successfully!!!");
                    this.getOfficeCodeList();
                    this.officedata = this.codeservice.getOfficeData();
                    this.HidePopup();
                }
                else if (data.StatusCode == 900) {
                    this.toastr.error("Office Code already exist!!!");
                }
                else {
                    this.toastr.error("Error!!!");
                }
            },
            error => {
                //error message
            }
        );
    }

    EditOfficeCode(model) {
        var obj: any = {};
        var addofficecode: OfficeCode = {
            OfficeId: model.OfficeId,
            OfficeCode: model.OfficeCode,
            OfficeName: model.OfficeName,
            SupervisorName: model.SupervisorName,
            PhoneNo: model.PhoneNo,
            FaxNo: model.FaxNo,
            OfficeKey: model.OfficeKey
        };
        this.codeservice.AddEditOfficeCode(this.setting.getBaseUrl() + GLOBAL.API_OfficeCode_EditOfficeDetails, addofficecode).subscribe(
            data => {
                if (data.StatusCode == 200) //Success
                {
                    this.HidePopup();
                    this.toastr.success("Office Code Updated Successfully!!!");
                    this.getOfficeCodeList();
                    this.officedata = this.codeservice.getOfficeData();
                }
                else if (data.StatusCode == 900) {
                    this.toastr.error("Office Code already exist!!!");
                }
                else {
                    this.toastr.error("Error!!!");
                }
            },
            error => {
                //error message
            }
        );
    }

    DeleteOfficeCode() {

        var obj: any = {};
        var addofficecode: OfficeCodefordelete = {
            OfficeId: this.officecodeid
        };
        this.codeservice.DeleteOfficeCode(this.setting.getBaseUrl() + GLOBAL.API_OfficeCode_DeleteOfficeDetails, addofficecode).subscribe(
            data => {
                if (data.StatusCode == 200) //Success
                {
                    this.HideConfirmationPopup();
                    this.toastr.success("Office Code Deleted Successfully!!!");
                    this.getOfficeCodeList();
                }
                else {
                    this.toastr.error("Error!!!");
                }
            },
            error => {
                //error message
            }
        );
    }

    GetOfficeDetailByCode(data) {

        this.officedata.OfficeId = data.data.OfficeId;
        this.officedata.OfficeCode = data.data.OfficeCode;
        this.officedata.OfficeName = data.data.OfficeName;
        this.officedata.SupervisorName = data.data.SupervisorName;
        this.officedata.PhoneNo = data.data.PhoneNo;
        this.officedata.FaxNo = data.data.FaxNo;
        this.officedata.OfficeKey = data.data.OfficeKey;
        this.popupVisible = true;
    }

}
