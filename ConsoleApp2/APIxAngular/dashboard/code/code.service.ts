import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CurrencyCode, OfficeCode, OfficeCodefordelete, EmailSetting, LeaveReason } from '../../Models/CodeModel';

// chartOfAccounts------------------------------------>
export class ChartOfAccountLevel {
    ID: number;
    AccountLevel: string;
    ChartOfAccountLevelDetails: ChartOfAccountLevelDetail[];
}

export class ChartOfAccountLevelDetail {
    ID: number;
    AccountCode: number;
    AccountName: string;
    AccountType: number;
}

export class AccountType {
    AccountTypeId: number;
    AccountTypeName: string;
}
// chartOfAccounts------------------------------------>

// analyticalCodes
export class AnalyticalCode {
    ID: number;
    Code: string;
    Donor: string;
    Program: string;
    Project: string;
    Area: string;
    Sector: string;
    Job: string;
    Description: string;
    Amount: string;
    Currency: string;
    Book: string;
    DonorCode: string;
    Status: boolean;
}

//analyticalCodes ---> Projects Tab-5
export class ProjectTab {
    ID: number;
    Code: string;
    Description: string;
    Program: string;
    Budget: number;
    ProjectStartDate: string;
    ProjectEndDate: string;
    ReceivedAmount: number;
    ProjectCurrency: string;
    Status: boolean;
}

//chartOfAccounts
// let accountTypeDropdowns: string[] = [
//     'Expandable', 'Non Expandable', 'Other'];

let accountLevelDropdowns: string[] = [
    'Main level', 'Control level', 'Sub level', 'Input level'];



let chartOfAccountLevels: ChartOfAccountLevel[] = [
    {
        "ID": 1,
        "AccountLevel": "Main Level",
        "ChartOfAccountLevelDetails": [
            {
                "ID": 1,
                "AccountCode": 1,
                "AccountName": "Saving",
                "AccountType": 1
            },
            {
                "ID": 2,
                "AccountCode": 2,
                "AccountName": "Current",
                "AccountType": 2,
            }
        ]

    },
    {
        "ID": 2,
        "AccountLevel": "Control Level",
        "ChartOfAccountLevelDetails": [
            {
                "ID": 1,
                "AccountCode": 1,
                "AccountName": "Saving",
                "AccountType": 2
            },
            {

                "ID": 3,
                "AccountCode": 3,
                "AccountName": "Other",
                "AccountType": 1
            }
        ]

    },
    {
        "ID": 3,
        "AccountLevel": "Sub Level",
        "ChartOfAccountLevelDetails": [
            {
                "ID": 1,
                "AccountCode": 1,
                "AccountName": "Saving",
                "AccountType": 2
            }
        ]

    },
    {
        "ID": 4,
        "AccountLevel": "Input Level",
        "ChartOfAccountLevelDetails": [
            {
                "ID": 1,
                "AccountCode": 1,
                "AccountName": "Saving",
                "AccountType": 3
            },
            {
                "ID": 2,
                "AccountCode": 1,
                "AccountName": "Saving",
                "AccountType": 1
            },
            {
                "ID": 3,
                "AccountCode": 1,
                "AccountName": "Current",
                "AccountType": 2
            },
            {
                "ID": 4,
                "AccountCode": 4,
                "AccountName": "Current",
                "AccountType": 3
            }
        ]

    }
];

//analyticalCodes
let analyticalCodes: AnalyticalCode[] = [
    {
        "ID": 1,
        "Code": "Main",
        "Donor": "Main",
        "Program": "Main",
        "Project": "Main",
        "Area": "Main",
        "Sector": "Main",
        "Job": "Main",
        "Description": "Main",
        "Amount": "Main",
        "Currency": "Afg",
        "Book": "Main",
        "DonorCode": "Main",
        "Status": true
    },
    {
        "ID": 2,
        "Code": "Main",
        "Donor": "Main",
        "Program": "Main",
        "Project": "Main",
        "Area": "Main",
        "Sector": "Main",
        "Job": "Main",
        "Description": "Main",
        "Amount": "Main",
        "Currency": "Afg",
        "Book": "Main",
        "DonorCode": "Main",
        "Status": true
    },
    {
        "ID": 3,
        "Code": "Main",
        "Donor": "Main",
        "Program": "Main",
        "Project": "Main",
        "Area": "Main",
        "Sector": "Main",
        "Job": "Main",
        "Description": "Main",
        "Amount": "Main",
        "Currency": "USD",
        "Book": "Main",
        "DonorCode": "Main",
        "Status": false
    },
    {
        "ID": 4,
        "Code": "Main",
        "Donor": "Main",
        "Program": "Main",
        "Project": "Main",
        "Area": "Main",
        "Sector": "Main",
        "Job": "Main",
        "Description": "Main",
        "Amount": "Main",
        "Currency": "USD",
        "Book": "Main",
        "DonorCode": "Main",
        "Status": true
    }
];

//analyticalCodes --> Projects Tab-5
let projectTabs: ProjectTab[] = [
    {
        "ID": 1,
        "Code": "12232",
        "Description": "ERP",
        "Program": "ERP-Tech",
        "Budget": 500000,
        "ProjectStartDate": "01/20/2017",
        "ProjectEndDate": "03/29/2017",
        "ReceivedAmount": 152100,
        "ProjectCurrency": "USD",
        "Status": true
    },
    {
        "ID": 2,
        "Code": "23412",
        "Description": "ERP",
        "Program": "ERP-Tech",
        "Budget": 625124,
        "ProjectStartDate": "01/20/2017",
        "ProjectEndDate": "05/29/2017",
        "ReceivedAmount": 25000,
        "ProjectCurrency": "AFG",
        "Status": true
    },
    {
        "ID": 3,
        "Code": "12232",
        "Description": "Health Care",
        "Program": "ERP-Tech",
        "Budget": 2000000,
        "ProjectStartDate": "04/19/2017",
        "ProjectEndDate": "07/30/2017",
        "ReceivedAmount": 120000,
        "ProjectCurrency": "USD",
        "Status": true
    }
];


export class CurrencyData {
    CurrencyId: any;
    CurrencyCode: string;
    CurrencyName: string;
    CurrencyRate: DoubleRange;
}

let currencydata: CurrencyData = {
    "CurrencyId": "",
    "CurrencyCode": "",
    "CurrencyName": "",
    "CurrencyRate": null
};

export class OfficeData {
    OfficeId: any;
    OfficeCode: string;
    OfficeName: string;
    SupervisorName: string;
    PhoneNo: string;
    FaxNo: string;
    OfficeKey: string;
}

let officedata: OfficeData = {
    "OfficeId": "",
    "OfficeCode": "",
    "OfficeName": "",
    "SupervisorName": "",
    "PhoneNo": "",
    "FaxNo": "",
    "OfficeKey": ""
}

export class EmailSettingData {
    EmailId: any;
    SenderEmail: string;
    EmailTypeId: any;
    EmailTypeName: string;
    SenderPassword: string;
    SmtpPort: any;
    SmtpServer: string;
    EnableSSL: boolean;
}

let emailsetting: EmailSettingData = {
    "EmailId": "",
    "SenderEmail": "",
    "EmailTypeId": "",
    "EmailTypeName": "",
    "SenderPassword": "",
    "SmtpPort": "",
    "SmtpServer": "",
    "EnableSSL": false
}

export class JournalCodeData {
    JournalCode: any;
    JournalName: string;
}

let journalcodedata = {
    "JournalCode": "",
    "JournalName": ""
}

export class DeleteJournalCode {
    JournalCode: any;
}
let deletejournalcode: DeleteJournalCode = {
    "JournalCode": ""
}

//Alpit 28-11-17
export class AccountLevel {
    ID: number;
    AccountLevelName: string;
}

let accountLevels: AccountLevel[] = [
    {
        "ID": 1,
        "AccountLevelName": "Main Level Account"
    },
    {
        "ID": 2,
        "AccountLevelName": "Control Level Account"
    },
    {
        "ID": 3,
        "AccountLevelName": "Sub Level Account"
    },
    {
        "ID": 4,
        "AccountLevelName": "Input Level Account"
    }
];

export class Company {
    ID: number;
    CompanyName: string;
    Address: string;
    City: string;
    State: string;
    Zipcode: number;
    Phone: string;
    Fax: string;
    Website: string;
}

let companies: Company[] = [{
    "ID": 1,
    "CompanyName": "SuprMart",
    "Address": "702 SW 8th Street",
    "City": "Bentonville",
    "State": "Arkansas",
    "Zipcode": 72716,
    "Phone": "(800) 555-2797",
    "Fax": "(800) 555-2171",
    "Website": "http://www.nowebsitesupermart.com"
}, {
    "ID": 2,
    "CompanyName": "El'Depot",
    "Address": "2455 Paces Ferry Road NW",
    "City": "Atlanta",
    "State": "Georgia",
    "Zipcode": 30339,
    "Phone": "(800) 595-3232",
    "Fax": "(800) 595-3231",
    "Website": "http://www.nowebsitedepot.com"
}];

// 20-12-2017
export class ProjectDetails {
    ProjectName: any;
    Description: any;
    StartDate: any;
    EndDate: any;
    CurrencyId: any;
    Budget: DoubleRange;
    ReceivableAmount: DoubleRange;
    PayableAmount: DoubleRange;
    CurrentBalance: DoubleRange;
    Status: number;
}

let projectDetail: ProjectDetails = {
    "ProjectName": "",
    "Description": "",
    "StartDate": "",
    "EndDate": "",
    "CurrencyId": "",
    "Budget": null,
    "ReceivableAmount": null,
    "PayableAmount": null,
    "CurrentBalance": null,
    "Status": null
};

let leavereasondata: LeaveReason = {
    "LeaveReasonId": "",
    "ReasonName": "",
    "Unit": null
};


@Injectable()
export class CodeService {

    constructor(private http: Http) { }

    getCompanies(): Company[] {
        return companies;
    }

    //Account level dropdown
    getAccountLevels() {
        return accountLevels;
    }
    //Manage Chat of account

    //chartOfAccounts
    getChartOfAccountLevels() {
        return chartOfAccountLevels;
    }

    //Dropdown for main level account
    getAccountType(url: string) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url, options)
            .map((response: Response) => {
                let codelist = response.json();
                if (codelist) {
                    return codelist;
                }
            }).catch(this.handleError);
    }


    getAccountLevelDropdowns() {
        return accountLevelDropdowns;
    }

    //analyticalCodes
    getAnalyticalCodes() {
        return analyticalCodes;
    }
    //analyticalCodes --> Project Tab-5
    getProjectTabs() {
        return projectTabs;
    }

    getCurrencyData(): CurrencyData {
        currencydata.CurrencyId = "";
        currencydata.CurrencyCode = "";
        currencydata.CurrencyName = "";
        currencydata.CurrencyRate = null;
        return currencydata;
    }

    projectDetailModel(): ProjectDetails {
        projectDetail.ProjectName = "";
        projectDetail.Description = "";
        projectDetail.StartDate = "";
        projectDetail.EndDate = "";
        projectDetail.CurrencyId = "";
        projectDetail.Budget = null;
        projectDetail.ReceivableAmount = null;
        projectDetail.PayableAmount = null;
        projectDetail.CurrentBalance = null;
        projectDetail.Status = null;
        return projectDetail;
    }

    GetAllCodeList(url: string) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url, options)
            .map((response: Response) => {
                let codelist = response.json();
                if (codelist) {
                    return codelist;
                }
            }).catch(this.handleError);
    }

    GetAllBudgetLineDetails(url: string, projectId: any) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url + "?ProjectId=" + projectId, options)
            .map((response: Response) => {
                let codelist = response.json();
                if (codelist) {
                    return codelist;
                }
            }).catch(this.handleError);
    }

    GetAllBudgetLineReceivable(url: string, projectId: any) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url + "?projectId=" + projectId, options)
            .map((response: Response) => {
                let codelist = response.json();
                if (codelist) {
                    return codelist;
                }
            }).catch(this.handleError);
    }

    GetAllBudgetLineReceivableByProjectId(url: string, projectId: any, budgetlineid: any) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url + "?projectId=" + projectId + "&budgetlineid=" + budgetlineid, options)
            .map((response: Response) => {
                let codelist = response.json();
                if (codelist) {
                    return codelist;
                }
            }).catch(this.handleError);
    }

    GetAllBudgetLineReceivedDetails(url: string, projectId: any, budgetlineid: any, receivableId: any) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url + "?projectId=" + projectId + "&budgetlineid=" + budgetlineid + "&receivableId=" + receivableId, options)
            .map((response: Response) => {
                let codelist = response.json();
                if (codelist) {
                    return codelist;
                }
            }).catch(this.handleError);
    }

    GetAllBudgetLinePaidDetails(url: string, projectId: any, budgetlineid : any, payableId:any) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url+"?projectId="+projectId+"&budgetLineId="+budgetlineid+"&payableId="+payableId, options)
            .map((response: Response) => {
                let codelist = response.json();
                if (codelist) {
                    return codelist;
                }
            }).catch(this.handleError);
    }

    AddEditCurrencyCode(url: string, model: CurrencyCode) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });

        let a = new RequestOptions();
        let b =
            {
                CurrencyId: model.CurrencyId,
                CurrencyCode: model.CurrencyCode,
                CurrencyName: model.CurrencyName,
                CurrencyRate: model.CurrencyRate
            }

        return this.http.post(url, JSON.stringify(b)
            , options)
            .map((response: Response) => {
                let journal = response.json();
                if (journal) {
                    return journal;
                }
            }).catch(this.handleError);

    }

    getOfficeData(): OfficeData {
        officedata.OfficeId = "";
        officedata.OfficeCode = "";
        officedata.OfficeName = "";
        officedata.SupervisorName = "";
        officedata.PhoneNo = "";
        officedata.FaxNo = "";
        officedata.OfficeKey = "";
        return officedata;
    }

    AddEditOfficeCode(url: string, model: OfficeCode) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });

        let a = new RequestOptions();
        let b =
            {
                OfficeId: model.OfficeId,
                OfficeCode: model.OfficeCode,
                OfficeName: model.OfficeName,
                SupervisorName: model.SupervisorName,
                PhoneNo: model.PhoneNo,
                FaxNo: model.FaxNo,
                OfficeKey: model.OfficeKey
            }

        return this.http.post(url, JSON.stringify(b)
            , options)
            .map((response: Response) => {
                let journal = response.json();
                if (journal) {
                    return journal;
                }
            }).catch(this.handleError);

    }

    DeleteOfficeCode(url: string, model: OfficeCodefordelete) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });

        let a = new RequestOptions();
        let b =
            {
                OfficeId: model.OfficeId
            }

        return this.http.post(url, JSON.stringify(b)
            , options)
            .map((response: Response) => {
                let journal = response.json();
                if (journal) {
                    return journal;
                }
            }).catch(this.handleError);

    }


    getEmailSettingData(): EmailSettingData {
        emailsetting.EmailId = "";
        emailsetting.SenderEmail = "";
        emailsetting.EmailTypeId = "";
        emailsetting.EmailTypeName = "";
        emailsetting.SenderPassword = "";
        emailsetting.SmtpPort = "";
        emailsetting.SmtpServer = "";
        emailsetting.EnableSSL = false;
        return emailsetting;
    }

    AddEditEmailSetting(url: string, model: EmailSetting) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });

        let a = new RequestOptions();
        let b =
            {
                EmailId: model.EmailId,
                SenderEmail: model.SenderEmail,
                EmailTypeName: model.EmailTypeName,
                EmailTypeId: model.EmailTypeId,
                SenderPassword: model.SenderPassword,
                SmtpPort: model.SmtpPort,
                SmtpServer: model.SmtpServer,
                EnableSSL: model.EnableSSL
            }

        return this.http.post(url, JSON.stringify(b)
            , options)
            .map((response: Response) => {
                let journal = response.json();
                if (journal) {
                    return journal;
                }
            }).catch(this.handleError);

    }

    AddEditJournalCode(url: string, model: JournalCodeData) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });

        let a = new RequestOptions();
        let b =
            {
                JournalCode: model.JournalCode,
                JournalName: model.JournalName
            }

        return this.http.post(url, JSON.stringify(b)
            , options)
            .map((response: Response) => {
                let journal = response.json();
                if (journal) {
                    return journal;
                }
            }).catch(this.handleError);

    }

    DeleteJournalCode(url: string, model: DeleteJournalCode) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });

        let a = new RequestOptions();
        let b =
            {
                JournalCode: model.JournalCode
            }

        return this.http.post(url, JSON.stringify(b)
            , options)
            .map((response: Response) => {
                let journal = response.json();
                if (journal) {
                    return journal;
                }
            }).catch(this.handleError);

    }

    //MainLevelAccount ---------- Alpit 30-11-2017
    getMainLevelAccounts(url: string) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });

        return this.http.get(url, options)
            .map((response: Response) => {
                let codelist = response.json();
                if (codelist) {
                    return codelist;
                }
            }).catch(this.handleError);
    }


    //Add MainLevelAccount ---------- Alpit 30-11-2017
    AddMainLevelAccount(url: string, model: any) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });
        let obj =
            {
                AccountName: model.AccountName,
                AccountLevelId: model.AccountLevelId,
                AccountTypeId: model.AccountTypeId,
                AccountTypeName: model.AccountTypeName,
                ParentID: model.ParentID,
                DepRate: model.DepRate,
                DepMethod: model.DepMethod,
                AccountNote: model.AccountNote,
                MDCode: model.MDCode,
                Show: model.Show
            }
        return this.http.post(url, JSON.stringify(obj)
            , options)
            .map((response: Response) => {
                let chartOfAccount = response.json();
                if (chartOfAccount) {
                    return chartOfAccount;
                }
            }).catch(this.handleError);

    }

    // Edit ChartOfAccountDetail---------- Alpit 2-12-2017    
    EditChartOfAccountDetail(url: string, model: any) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });
        let obj = null;
        if (model.ParentID == 0) {
            obj =
                {
                    AccountName: model.AccountName,
                    AccountCode: model.AccountCode,
                    AccountTypeId: model.AccountTypeId,
                    AccountLevelId: model.AccountLevelId + 1,
                    ParentID: model.ParentID + 1,
                    // AccountTypeId: model.AccountTypeId,
                    // AccountTypeName: model.AccountTypeName,
                    // ParentID: model.ParentID,
                    // DepRate: model.DepRate,
                    // DepMethod: model.DepMethod,
                    // AccountNote: model.AccountNote,
                    // MDCode: model.MDCode,
                    // Show: model.Show
                }
        } else {
            obj =
                {
                    AccountName: model.AccountName,
                    AccountCode: model.AccountCode,
                    AccountTypeId: model.AccountTypeId,
                    AccountLevelId: model.AccountLevelId,
                    ParentID: model.ParentID,
                    // AccountTypeId: model.AccountTypeId,
                    // AccountTypeName: model.AccountTypeName,
                    // ParentID: model.ParentID,
                    // DepRate: model.DepRate,
                    // DepMethod: model.DepMethod,
                    // AccountNote: model.AccountNote,
                    // MDCode: model.MDCode,
                    // Show: model.Show
                }
        }
        return this.http.post(url, JSON.stringify(obj)
            , options)
            .map((response: Response) => {
                let chartOfAccount = response.json();
                if (chartOfAccount) {
                    return chartOfAccount;
                }
            }).catch(this.handleError);

    }

    getJournalCodeData(): JournalCodeData {
        journalcodedata.JournalCode = "";
        journalcodedata.JournalName = "";
        return journalcodedata;
    }

    GetAllExchangeRate(url: string) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url, options)
            .map((response: Response) => {
                let codelist = response.json();
                if (codelist) {
                    return codelist;
                }
            }).catch(this.handleError);
    }

    AddExchangeRate(url: string, model: any) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.post(url, model
            , options)
            .map((response: Response) => {
                let journal = response.json();
                if (journal) {
                    return journal;
                }
            }).catch(this.handleError);
    }

    EditExchangeRate(url: string, model: any) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.post(url, JSON.stringify(model)
            , options)
            .map((response: Response) => {
                let journal = response.json();
                if (journal) {
                    return journal;
                }
            }).catch(this.handleError);
    }

    AddProjectDetails(url: string, model: any) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.post(url, JSON.stringify(model)
            , options)
            .map((response: Response) => {
                let journal = response.json();
                if (journal) {
                    return journal;
                }
            }).catch(this.handleError);

    }

    //bipul
    getLeaveReasonData(): LeaveReason {
        leavereasondata.LeaveReasonId = "";
        leavereasondata.ReasonName = "";
        leavereasondata.Unit = null;
        return leavereasondata;
    }

    //bipul
    AddEditLeaveReasonDetail(url: string, model: LeaveReason) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });

        let a = new RequestOptions();
        let b =
            {
                LeaveReasonId: model.LeaveReasonId,
                ReasonName: model.ReasonName,
                Unit: model.Unit
            }

        return this.http.post(url, JSON.stringify(b)
            , options)
            .map((response: Response) => {
                let journal = response.json();
                if (journal) {
                    return journal;
                }
            }).catch(this.handleError);
    }



    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');

    }
}


export class EditChartOfAccount {
    AccountCode: number;
    AccountName: string;
    AccountTypeId: number;
}


//MainLevelAccount     ---important
export class MainLevelAccount {
    ParentID: number;
    AccountLevelId: number;
    AccountTypeName: "Main Level Accounts";
    AccountNote: number;
    AccountName: string;
    AccountTypeId: number;
    Show: boolean;
    MDCode: string;
    // DepMethod: string;
    // DepRate: number;
}

//ControlLevelAccount     ---important
export class ControlLevelAccount {
    ParentID: number;
    AccountLevelId: number;
    AccountTypeName: "Control Level Accounts";
    AccountNote: number;
    MainLevel: number;
    AccountName: string;
    AccountTypeId: number;
    Show: boolean;
    MDCode: string;
}

//SubLevelAccount     ---important
export class SubLevelAccount {
    ParentID: number;
    AccountLevelId: number;
    AccountTypeName: "Sub Level Accounts";
    AccountNote: number;
    ControlLevel: number;
    AccountName: string;
    AccountTypeId: number;
    Show: boolean;
    MDCode: string;
}

//InputLevelAccount     ---important
export class InputLevelAccount {
    ParentID: number;
    AccountLevelId: number;
    AccountTypeName: "Input Level Accounts";
    AccountNote: number;
    SubLevel: number;
    AccountName: string;
    AccountTypeId: number;
    Show: boolean;
    MDCode: string;
}


//MainLevelAccount
export class chartOfAccountsData {
    ID: number;
    ParentID: number;
    AccountName: string;
    AccountCode: number;
    AccountTypeId: number;
    AccountLevelId: number;
}





