import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { AppSettingsService } from '../../../Services/App-settings.Service';
import { GLOBAL } from '../../../shared/global';
import { ToastrService } from 'ngx-toastr';
import { DocumentComponent } from './document/document.component';
import { CodeService } from '../../code/code.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { empty } from 'rxjs/observable/empty';

@Component({
    selector: 'app-vouchers',
    templateUrl: './vouchers.component.html',
    styleUrls: ['./vouchers.component.css'],

})
export class VouchersComponent implements OnInit, OnDestroy {
    currencyModel: any[];
    officeCodeModel: any[];
    journalcodelist: any[];
    voucherTypeArr: any[];
    voucherDetails: any[];
    selectedVoucherNo: any;                 //Store VoucherNo to localStorage
    voucherNoMain: any;                     // set voucherNo on Popup
    voucherDocumentDetails: any[];
    popupVisibleDocument = false;
    projectArr: any[];
    projectBudgetLineArr: any[];
    budgetLineArr: any[];
    windows: any;
    defaultDoc: any;
    popupVisible: boolean = false;
    docpath: any;
    docPopupVisible = false;
    imageURL: string;
    addNewDocument: any;

    constructor(private accountservice: AccountsService, private router: Router, private codeservice: CodeService, private setting: AppSettingsService, private toastr: ToastrService, private _DomSanitizer: DomSanitizer) {
        // VoucherType Static array
        this.voucherTypeArr = [{ "VoucherTypeId": 1, "VoucherTypeName": "Journal" },
        { "VoucherTypeId": 2, "VoucherTypeName": "Adjustment" }];
        // this.projectArr = [{
        //     "ProjectId": 98,
        //     "ProjectName":"Project X1"
        // },
        // {
        //     "ProjectId": 99,
        //     "ProjectName":"Project X12"
        // }];

        this.windows = window;

        // this.projectBudgetLineArr = [{
        //     "BudgetLineId": 1,
        //     "Description": "Payroll",
        //     "ProjectId": 98
        // },
        // {
        //     "BudgetLineId": 2,
        //     "Description": "Salary",
        //     "ProjectId": 98
        // },
        // {
        //     "BudgetLineId": 3,
        //     "Description": "PayrollABC",
        //     "ProjectId": 100
        // }];

        this.budgetLineFilteredList = this.budgetLineFilteredList.bind(this);

        this.voucherDocumentDetails = [{ DocumentGUID: "", DocumentName: "" }]
        this.addNewDocument = {
            DocumentName: "",
            DocumentFilePath: "",
            DocumentDate: ""
        };
        this.windows = window;
        this.docpath = _DomSanitizer.bypassSecurityTrustResourceUrl(this.setting.getDocUrl() + "nodoc.pdf");

    }

    ngOnDestroy(): void {
        this.docpath = this._DomSanitizer.bypassSecurityTrustResourceUrl(this.setting.getDocUrl() + "nodoc.pdf");
    }

    ngOnInit() {
        this.getCurrencyCodeList();
        this.getOfficeCodeList();
        this.getJournalCodeList();
        this.getAllVoucherDetails();
        this.getAllProjectDetails();
    }

    // On Cascading Project Selection

    onEditorPreparing(e) {
        if (e.parentType === "dataRow" && e.dataField === "BudgetLineId") {
            e.editorOptions.disabled = (typeof e.row.data.ProjectId !== "number");
        }
    }

    setStateValue(rowData: any, value: any) {
        this.getBudgetLineDetails(value);
        rowData.BudgetLineId = null;
        (<any>this).defaultSetCellValue(rowData, value);
    }

    budgetLineFilteredList(options) {
        if (options.hasOwnProperty('data')) {
            if (options.data.hasOwnProperty('ProjectId')) {
                this.getBudgetLineDetails(options.data.ProjectId);
            }
        }
        return {
            store: this.projectBudgetLineArr,
            filter: options.data ? ["ProjectId", "=", options.data.ProjectId] : null
        };
    }

    getBudgetLineDetails(ProjectId) {
        this.codeservice.GetAllBudgetLineDetails(this.setting.getBaseUrl() + GLOBAL.API_Accounting_GetAllBudgetLineDetails, ProjectId).subscribe(
            data => {
                this.projectBudgetLineArr = [];
                if (data.data.ProjectBudgetLineList != null && data.StatusCode == 200 && data.data.ProjectBudgetLineList.length > 0) {
                    data.data.ProjectBudgetLineList.forEach(element => {
                        this.projectBudgetLineArr.push(element);
                    });
                }

                // var obj = {
                //     data : {
                //         "ProjectId" : ProjectId
                //     }
                // };
                // this.budgetLineFilteredList(obj);
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

    getAllProjectDetails() {
        this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_ProjectBudget_GetAllProjectDetail).subscribe(
            data => {
                this.projectArr = [];
                if (data.data.ProjectDetailList != null && data.StatusCode == 200) {
                    data.data.ProjectDetailList.forEach(element => {
                        this.projectArr.push(element);
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

    //TODO: Event for ADD, UPDATE, DELETE
    logEvent(eventName, obj) {
        if (eventName == "RowUpdating") {
            var value = Object.assign(obj.oldData, obj.newData);     // Merge old data with new Data 
            this.EditVoucher(value);
        }
        if (eventName == "RowInserting") {
            this.AddVoucher(obj.data);
        }
    }

    AddVoucher(obj) {
        this.accountservice.AddVoucher(this.setting.getBaseUrl() + GLOBAL.API_Accounting_AddVouchers, obj).subscribe(
            data => {
                if (data.StatusCode == 200) {
                    this.toastr.success("Voucher Added Successfully!!!");
                }
                this.getAllVoucherDetails();
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
                this.getAllVoucherDetails();
            }
        );
    }

    EditVoucher(value) {
        this.accountservice.EditVoucher(this.setting.getBaseUrl() + GLOBAL.API_Accounting_EditVouchers, value).subscribe(
            data => {
                if (data.StatusCode == 200) {
                    this.toastr.success("Voucher Updated Successfully!!!");
                }
                this.getAllVoucherDetails();
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
                this.getAllVoucherDetails();
            }
        );
    }

    //Get Currency Code in Add, Edit Dropdown 
    getCurrencyCodeList() {
        this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_CurrencyCodes_GetAllCurrency).subscribe(
            data => {
                this.currencyModel = [];
                if (data.data.CurrencyList != null) {
                    data.data.CurrencyList.forEach(element => {
                        this.currencyModel.push(element);
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

    //Get Office Code in Add, Edit Dropdown 
    getOfficeCodeList() {
        this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_OfficeCode_GetAllOfficeDetails).subscribe(
            data => {
                if (data.data.OfficeDetailsList != null) {
                    this.officeCodeModel = [];
                    data.data.OfficeDetailsList.forEach(element => {
                        this.officeCodeModel.push(element);
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

    //Get Journal Code in Add, Edit Dropdown
    getJournalCodeList() {
        this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_JournalCode_GetAllJournalDetail).subscribe(
            data => {
                if (data.data.JournalDetailList != null) {
                    this.journalcodelist = [];
                    data.data.JournalDetailList.forEach(element => {
                        this.journalcodelist.push(element);
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

    //Get voucher details list
    getAllVoucherDetails() {
        this.accountservice.GetAllVoucherDetails(this.setting.getBaseUrl() + GLOBAL.API_Accounting_GetAllVoucherDetails).subscribe(
            data => {
                if (data.data.VoucherDetailList != null) {
                    this.voucherDetails = [];
                    data.data.VoucherDetailList.forEach(element => {
                        this.voucherDetails.push(element);
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
        );
    }

    //Alpit -- 4/12/2017
    //Vouchers Document details popup trigger
    onRowClickEvent(data) {
        //use in document using input binding
        this.voucherNoMain = data.VoucherRefNo;
        localStorage.setItem("SelectedVoucherNumber", data.VoucherNo);
        this.GetVoucherDocumentList();
        this.popupVisibleDocument = true;
    }

    selectedReferenceNo(data) {
        this.voucherNoMain = data.data.VoucherRefNo;
        localStorage.setItem("SelectedVoucherNumber", data.data.VoucherNo);
        this.GetVoucherDocumentList();
        this.popupVisibleDocument = true;
    }

    sendRowData(rowData) {
        localStorage.setItem("SelectedVoucherNumber", rowData.key.VoucherNo);
        localStorage.setItem("SelectedVoucherCurrency", rowData.key.CurrencyId);
        localStorage.setItem("SelectedOfficeId", rowData.key.OfficeId);
    }

    onCancelVoucherDocument() {
        this.popupVisibleDocument = false;
    }


    // Document Functions

    addDocument() {
        this.popupVisibleDocument = true;
        //this.docpath=this._DomSanitizer.bypassSecurityTrustResourceUrl("http://localhost:5000/Docs/272cf72f-e742-49e9-8c28-f372becc2507.png");
    }

    cancelDeleteVoucher() {
        this.popupVisible = false;
    }

    backToVouchers() {
        this.router.navigate(['../vouchers']);
    }

    getfilename(docpath) {
        //  return data["key"].DocumentName;
        return this._DomSanitizer.bypassSecurityTrustResourceUrl(docpath);
        //   return this.docpath;
    }

    filePath(data) {
        //return this._DomSanitizer.bypassSecurityTrustUrl(data["key"].FilePath);
        return this._DomSanitizer.bypassSecurityTrustResourceUrl(data);
    }

    //Event Fire on image Selection
    onImageSelect(event: any) {
        var file: File = event.value[0];
        var myReader: FileReader = new FileReader();
        myReader.readAsDataURL(file);
        myReader.onloadend = (e) => {
            this.imageURL = myReader.result;
        }
    }

    // Add Document with file uploader
    onFormSubmit(data: any) {
        this.addNewDocument.DocumentFilePath = this.imageURL;
        data.VoucherNo = localStorage.getItem("SelectedVoucherNumber");
        this.AddVoucherDocument(data);
    }

    GetVoucherDocumentList() {
        // this.docpath=this._DomSanitizer.bypassSecurityTrustResourceUrl(this.setting.getDocUrl()+ "nodoc.pdf");       
        this.accountservice.GetVoucherDocumentDetails(this.setting.getBaseUrl() + GLOBAL.API_Accounting_GetVoucherDocumentDetail, localStorage.getItem("SelectedVoucherNumber")).subscribe(
            data => {
                if (data.StatusCode == 200) {
                    this.voucherDocumentDetails = [];
                    data.data.VoucherDocumentDetailList.forEach(element => {
                        this.voucherDocumentDetails.push(element);
                    });
                }

                if (this.voucherDocumentDetails.length > 0) {
                    this.defaultDoc = this._DomSanitizer.bypassSecurityTrustResourceUrl(this.setting.getDocUrl() + this.voucherDocumentDetails[this.voucherDocumentDetails.length - 1].DocumentGUID);
                }
                else {
                    this.defaultDoc = this._DomSanitizer.bypassSecurityTrustResourceUrl(this.setting.getDocUrl() + "nodoc.pdf");
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
        );
    }

    //Add New Voucher Document
    AddVoucherDocument(data) {
        this.accountservice.AddVoucherDocument(this.setting.getBaseUrl() + GLOBAL.API_Accounting_AddVouchersDocument, data).subscribe(
            data => {
                if (data.StatusCode == 200) {
                    this.toastr.success("Document Added Successfully!!!");
                }
                this.GetVoucherDocumentList();
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
        this.cancelDeleteVoucher();
    }

    docPreview() {
        this.docPopupVisible = true;
    }
    selectDoc(e) {
        // this.defaultDoc = this._DomSanitizer.bypassSecurityTrustResourceUrl(this.setting.getDocUrl()+e.value);
        this.docpath = this._DomSanitizer.bypassSecurityTrustResourceUrl(this.setting.getDocUrl() + e.value);
        this.popupVisibleDocument = true;
    }
}
