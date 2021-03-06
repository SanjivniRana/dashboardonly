import { Component, OnInit, ViewChild, ElementRef, Input, Pipe, PipeTransform, Sanitizer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../../accounts.service';
import { commonService } from '../../../../Services/common.service';
import { AppSettingsService } from '../../../../Services/App-settings.Service';
import { ToastrService } from 'ngx-toastr';
import { GLOBAL } from '../../../../shared/global';
import { DomSanitizer,BrowserModule, SafeResourceUrl, SafeUrl, SafeValue } from '@angular/platform-browser';
import { VouchersComponent } from '../vouchers.component';
import { debug } from 'util';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { SecurityContext } from '@angular/core/src/security';
import { DomSanitizerImpl } from '@angular/platform-browser/src/security/dom_sanitization_service';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
    }

    public transform(url: string): any {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}

@Component({
    selector: 'app-document',
    templateUrl: './document.component.html',
})

export class DocumentComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        this.docpath = this._DomSanitizer.bypassSecurityTrustResourceUrl(this.setting.getDocUrl() + "nodoc.pdf");
    }
    // dataSource: any[];
    popupVisible = false;
    addNewDocument: any;
    voucherNumber: any;
    @Input() docpath: any;
    imageURL: string;
    filePathUrl:any;

    imageData = { Image: "" }
    windows: any;

    docPopupVisible = false;
    resetUploader : boolean = false;

    //Get Data From Voucher 
    @Input() VoucherNo: any;
    @Input() voucherDocumentDetails: any[];

    constructor(private accountservice: AccountsService, private vouchercomponent: VouchersComponent, private setting: AppSettingsService, private toastr: ToastrService, private router: Router, private fb: FormBuilder, private commonservice: commonService, private _DomSanitizer: DomSanitizer) {
        this.voucherNumber = this.commonservice.voucherNumber;
        this.voucherDocumentDetails = [{ DocumentGUID: "", DocumentName: "" }]
        this.addNewDocument = {
            DocumentName: null,
            DocumentFilePath: null,
            DocumentDate: null
        };
        this.windows = window;
        this.docpath = _DomSanitizer.bypassSecurityTrustResourceUrl(this.setting.getDocUrl() + "nodoc.pdf");
    }

    ngOnInit() {
        this.GetVoucherDocumentList();
    }

    addDocument() {
        this.addNewDocument = {
            DocumentName: null,
            DocumentFilePath: null,
            DocumentDate: null
        };
        // this.resetUploader = true;
        this.popupVisible = true;
        //this.docpath=this._DomSanitizer.bypassSecurityTrustResourceUrl("http://localhost:5000/Docs/272cf72f-e742-49e9-8c28-f372becc2507.png");
    }

    cancelDeleteVoucher() {
        this.popupVisible = false;     
        // this.resetUploader = true;           
    }

    backToVouchers() {
        this.router.navigate(['../vouchers']);
    }

    getfilename(docpath) {
        //  return data["key"].DocumentName;


        return this._DomSanitizer.bypassSecurityTrustResourceUrl(docpath);
        // return this._DomSanitizer.sanitize(SecurityContext.URL,docpath);
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

    selectedDropdown: any;
    GetVoucherDocumentList() {
        this.accountservice.GetVoucherDocumentDetails(this.setting.getBaseUrl() + GLOBAL.API_Accounting_GetVoucherDocumentDetail, localStorage.getItem("SelectedVoucherNumber")).subscribe(
            data => {
                if (data.StatusCode == 200) {
                    this.voucherDocumentDetails = [];
                    data.data.VoucherDocumentDetailList.forEach(element => {
                        this.voucherDocumentDetails.push(element);
                    });
                }

                if (this.voucherDocumentDetails.length > 0) {
                    this.selectedDropdown = this.voucherDocumentDetails[this.voucherDocumentDetails.length - 1].DocumentGUID;
                    // this.voucherDocumentDetails = this.voucherDocumentDetails[this.voucherDocumentDetails.length -1].DocumentGUID;     
                    this.docpath = this._DomSanitizer.bypassSecurityTrustResourceUrl(this.setting.getDocUrl() + this.voucherDocumentDetails[this.voucherDocumentDetails.length - 1].DocumentGUID);
                }
                else {
                    this.docpath = this._DomSanitizer.bypassSecurityTrustResourceUrl(this.setting.getDocUrl() + "nodoc.pdf");
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
        this.filePathUrl = this.voucherDocumentDetails.filter(x=>x.DocumentGUID == e.value)[0].DocumentName;
        // this.docpath = this._DomSanitizer.bypassSecurityTrustUrl(this.setting.getDocUrl() + e.value);
        // this.filePath = this._DomSanitizer.bypassSecurityTrustResourceUrl(e);
        this.docpath = this._DomSanitizer.bypassSecurityTrustResourceUrl(this.setting.getDocUrl() + e.value);
    }
}
