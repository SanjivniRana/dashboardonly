import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Vouchers Listing,add, edit Class
export class VoucherClass {
    ID: number;
    VoucherNo: string;
    VoucherDate: string;
    VoucherRefNo: string;
    Office: string;
    Journal: string;
    Description: string;
    Currency: string;
    ChequeNo?: string;
    VoucherType?: string;
}

export class Document {
    ID: any;
    DocumentName: string;
    DocumentFilePath?: string;
    DocumentDate?: string;
    VoucherNo?: string;
}

export class VoucherTransaction {
    VoucherNo: number;
    Description: string;
    DebitAccount: number;
    CreditAccount: number;
    Amount: number;
    TransactionDate: string;
    TransactionId?: string;
}

//Ledger Class
export class Ledger{
    AccountCode: number;
    ChartAccountName: string;
    CurrencyName: string;
    transactionlist: Transactionlist[];
}

export class Transactionlist{
    TransactionNo: number;
    AccountName: string;
    TransactionDate: string;
    DebitAmount: number;
    CreditAmount: number;
    VoucherNo: number;
    Description: string;
}

//Journal
export class JournalVoucherModel {    
    JournalCode: number;
    AccountCode: number;
    Amount: number;
    TransactionNo: number;
    TransactionDate: string;
    TransactionType: string;
    VoucherNo: number;
}

//FOR ADVANCE DEDUCTION 

export class AdvanceDeductionClass {
    ID: number;
    Currency: string;
    Office: string;
    Month: string;
    AdvanceDeductionSalarys: AdvanceDeductionSalary[];
}

export class AdvanceDeductionSalary {
    ID: number;
    EmployeeName: string;
    NetSalaryAdvance: number;
    AdvanceDeduction: number;
    NetSalary: number;
}

let advanceDeduction: AdvanceDeductionClass[] = [
    {
        "ID": 1,
        "Currency": "AFG-AFG",
        "Office": "TestOffice",
        "Month": "2017/11/17",
        "AdvanceDeductionSalarys": [{
            "ID": 4,
            "EmployeeName": "Naval Bhatt",
            "NetSalaryAdvance": 50000,
            "AdvanceDeduction": 10000,
            "NetSalary": 40000,
        },
        {
            "ID": 4,
            "EmployeeName": "Fuster Cluck",
            "NetSalaryAdvance": 60000,
            "AdvanceDeduction": 10000,
            "NetSalary": 50000,
        },
        {
            "ID": 4,
            "EmployeeName": "Hamza",
            "NetSalaryAdvance": 70000,
            "AdvanceDeduction": 40000,
            "NetSalary": 30000,
        }]

    },
    {
        "ID": 2,
        "Currency": "USD-USD",
        "Office": "TestOffice1",
        "Month": "2017/11/18",
        "AdvanceDeductionSalarys": [{
            "ID": 5,
            "EmployeeName": "Rohit Grover",
            "NetSalaryAdvance": 50000,
            "AdvanceDeduction": 10000,
            "NetSalary": 40000,
        },
        {
            "ID": 5,
            "EmployeeName": "Bipul",
            "NetSalaryAdvance": 60000,
            "AdvanceDeduction": 10000,
            "NetSalary": 50000,
        },
        {
            "ID": 5,
            "EmployeeName": "Shubham",
            "NetSalaryAdvance": 70000,
            "AdvanceDeduction": 40000,
            "NetSalary": 30000,
        },
        {
            "ID": 5,
            "EmployeeName": "Alpit",
            "NetSalaryAdvance": 70000,
            "AdvanceDeduction": 40000,
            "NetSalary": 30000,
        }]

    }];

//END ADVANCE DEDUCTION


//FOR Financial-Report 
export class Tab {
    id: number;
    text: string;
}

export class FinancialReport_Notes_of_COAClass {
    ID: number;
    Code: number;
    AccountName: string;
    Notes: number;
}

let financial_notes_of_COAClass: FinancialReport_Notes_of_COAClass[] = [
    {
        "ID": 1,
        "Code": 3123,
        "AccountName": "Income D",
        "Notes": 18,
    },
    {
        "ID": 2,
        "Code": 3123,
        "AccountName": "Income D",
        "Notes": 18,
    },
    {
        "ID": 3,
        "Code": 3123,
        "AccountName": "Income D",
        "Notes": 18,
    }];

export class FinancialReport_NotesClass {
    ID: number;
    Code: number;
    Narration: string;
    Notes: number;
    BalanceType: string;
}

let financial_notes: FinancialReport_NotesClass[] = [
    {
        "ID": 4,
        "Code": 11,
        "Narration": "Reserve Account",
        "Notes": 12,
        "BalanceType": "SUM"
    },
    {
        "ID": 5,
        "Code": 11,
        "Narration": "Reserve Account",
        "Notes": 12,
        "BalanceType": "SUM"
    },
    {
        "ID": 6,
        "Code": 11,
        "Narration": "Reserve Account",
        "Notes": 12,
        "BalanceType": "SUM"
    }];

export class FinancialReport_BalanceSheetClass {
    ID: number;
    Description: string;
    Notes: number;
    Balance: number;
    Currency: string;
}

let financial_balancesheet: FinancialReport_BalanceSheetClass[] = [
    {
        "ID": 7,
        "Description": "Donor Funds",
        "Notes": 4,
        "Balance": 9000,
        "Currency": "USD-USD"
    },
    {
        "ID": 8,
        "Description": "Donor Funds",
        "Notes": 4,
        "Balance": 9000,
        "Currency": "USD-USD"
    },
    {
        "ID": 9,
        "Description": "Donor Funds",
        "Notes": 4,
        "Balance": 9000,
        "Currency": "AFG-AFG"
    }];

export class FinancialReport_IncomeClass {
    ID: number;
    Description: string;
    Notes: number;
    Balance: number;
    Currency: string;
}

let financial_Income: FinancialReport_IncomeClass[] = [
    {
        "ID": 10,
        "Description": "Currency Exchange Loss",
        "Notes": 15,
        "Balance": 480,
        "Currency": "USD-USD"
    },
    {
        "ID": 11,
        "Description": "Currency Exchange Loss",
        "Notes": 15,
        "Balance": 480,
        "Currency": "AFG-AFG"
    },
    {
        "ID": 12,
        "Description": "Currency Exchange Loss",
        "Notes": 15,
        "Balance": 480,
        "Currency": "AFG-AFG"
    }];

export class FinancialReport_Details_of_NotesClass {
    ID: number;
    AccountCode: number;
    AccountName: string;
    Notes: number;
    Balance: number;
    Currency: string;
}

let financial_details: FinancialReport_Details_of_NotesClass[] = [
    {
        "ID": 13,
        "AccountCode": 410201,
        "AccountName": "Sports Income",
        "Notes": 15,
        "Balance": 6000,
        "Currency": "USD-USD"
    },
    {
        "ID": 14,
        "AccountCode": 410201,
        "AccountName": "Sports Income",
        "Notes": 15,
        "Balance": 6000,
        "Currency": "USD-USD"
    },
    {
        "ID": 15,
        "AccountCode": 410201,
        "AccountName": "Sports Income",
        "Notes": 15,
        "Balance": 6000,
        "Currency": "AFG-AFG"
    }];


let tabs: Tab[] = [
    {
        id: 0,
        text: "Notes in COA"
    },
    {
        id: 1,
        text: "Notes"
    },
    {
        id: 2,
        text: "Balance Sheet"
    },
    {
        id: 3,
        text: "Income/Exp AC"
    },
    {
        id: 4,
        text: "Details Of Notes"
    }
];

//End Financial-Report

//Start Financial Year DropDown
export class FinancialYear {
    ID: number;
    Year: string;
}

let years: FinancialYear[] = [
    {
        "ID": 1,
        "Year": "2014"
    },
    {
        "ID": 2,
        "Year": "2015"
    },
    {
        "ID": 3,
        "Year": "2016"
    },
    {
        "ID": 4,
        "Year": "2017"
    }];
//End Financial Year DropDown

//Start of Budget Balance

export class BudgetBalanceClass {
    ID: number;
    Currency: string;
    Budget: number;
    RecordType: string;
    Date: string;
    BudgetBalance: BudgetBalanceInnerClass[];
}

export class BudgetBalanceInnerClass {
    ID: number;
    BLine: string;
    BLineDescription: string;
    Currency: string;
    Budget: number;
    Expenditure: number;
    Balance: number;
    Percentage: string;
}

let budget: BudgetBalanceClass[] = [
    {
        "ID": 1,
        "Currency": "USD-USD",
        "Budget": 12000,
        "RecordType": "Single Currency",
        "Date": "2015/03/16",
        "BudgetBalance": [{
            "ID": 4,
            "BLine": "410201",
            "BLineDescription": "Kabul Clinic Income",
            "Currency": "USD-USD",
            "Budget": 12000,
            "Expenditure": 2000,
            "Balance": 10000,
            "Percentage": "83.3333%"
        },
        {
            "ID": 5,
            "BLine": "410201",
            "BLineDescription": "Kabul Clinic Income",
            "Currency": "USD-USD",
            "Budget": 12000,
            "Expenditure": 2000,
            "Balance": 10000,
            "Percentage": "83.3333%"
        },
        {
            "ID": 6,
            "BLine": "410201",
            "BLineDescription": "Kabul Clinic Income",
            "Currency": "USD-USD",
            "Budget": 12000,
            "Expenditure": 2000,
            "Balance": 10000,
            "Percentage": "83.3333%"
        },
        {
            "ID": 7,
            "BLine": "410201",
            "BLineDescription": "Kabul Clinic Income",
            "Currency": "USD-USD",
            "Budget": 12000,
            "Expenditure": 2000,
            "Balance": 10000,
            "Percentage": "83.3333%"
        },
        {
            "ID": 8,
            "BLine": "410201",
            "BLineDescription": "Kabul Clinic Income",
            "Currency": "USD-USD",
            "Budget": 12000,
            "Expenditure": 2000,
            "Balance": 10000,
            "Percentage": "83.3333%"
        }]
    }, {
        "ID": 2,
        "Currency": "AFG-AFG",
        "Budget": 10000,
        "RecordType": "Single Currency",
        "Date": "2016/03/16",
        "BudgetBalance": [{
            "ID": 9,
            "BLine": "410201",
            "BLineDescription": "Sports Clinic Income",
            "Currency": "AFG-AFG",
            "Budget": 10000,
            "Expenditure": 1000,
            "Balance": 9000,
            "Percentage": "90%"
        },
        {
            "ID": 10,
            "BLine": "410201",
            "BLineDescription": "Sports Clinic Income",
            "Currency": "AFG-AFG",
            "Budget": 10000,
            "Expenditure": 1000,
            "Balance": 9000,
            "Percentage": "90%"
        },
        {
            "ID": 11,
            "BLine": "410201",
            "BLineDescription": "Sports Clinic Income",
            "Currency": "AFG-AFG",
            "Budget": 10000,
            "Expenditure": 1000,
            "Balance": 9000,
            "Percentage": "90%"
        },
        {
            "ID": 12,
            "BLine": "410201",
            "BLineDescription": "Sports Clinic Income",
            "Currency": "AFG-AFG",
            "Budget": 10000,
            "Expenditure": 1000,
            "Balance": 9000,
            "Percentage": "90%"
        },
        {
            "ID": 13,
            "BLine": "410201",
            "BLineDescription": "Sports Clinic Income",
            "Currency": "AFG-AFG",
            "Budget": 10000,
            "Expenditure": 1000,
            "Balance": 9000,
            "Percentage": "90%"
        }]
    },
    {
        "ID": 3,
        "Currency": "USD-USD",
        "Budget": 30000,
        "RecordType": "Single Currency",
        "Date": "2017/03/16",
        "BudgetBalance": [{
            "ID": 14,
            "BLine": "410201",
            "BLineDescription": "Kabul Clinic Income",
            "Currency": "AFG-AFG",
            "Budget": 30000,
            "Expenditure": 10000,
            "Balance": 20000,
            "Percentage": "66.666%"
        },
        {
            "ID": 15,
            "BLine": "410201",
            "BLineDescription": "Kabul Clinic Income",
            "Currency": "AFG-AFG",
            "Budget": 30000,
            "Expenditure": 10000,
            "Balance": 20000,
            "Percentage": "66.666%"
        },
        {
            "ID": 16,
            "BLine": "410201",
            "BLineDescription": "Kabul Clinic Income",
            "Currency": "AFG-AFG",
            "Budget": 30000,
            "Expenditure": 10000,
            "Balance": 20000,
            "Percentage": "66.666%"
        },
        {
            "ID": 17,
            "BLine": "410201",
            "BLineDescription": "Kabul Clinic Income",
            "Currency": "AFG-AFG",
            "Budget": 30000,
            "Expenditure": 10000,
            "Balance": 20000,
            "Percentage": "66.666%"
        },
        {
            "ID": 18,
            "BLine": "410201",
            "BLineDescription": "Kabul Clinic Income",
            "Currency": "AFG-AFG",
            "Budget": 30000,
            "Expenditure": 10000,
            "Balance": 20000,
            "Percentage": "66.666%"
        }]
    }];

//End of Budget Balance

@Injectable()
export class AccountsService {
    constructor(private http: Http) {
    }

    //Document Function 

    getAdvanceDeduction() {
        return advanceDeduction;
    }

    getTabs(): Tab[] {
        return tabs;
    }

    getFinancial_COA() {
        return financial_notes_of_COAClass;
    }

    getFinancial_Notes() {
        return financial_notes;
    }

    getFinancial_BalanceSheet() {
        return financial_balancesheet;
    }

    getFinancial_Income() {
        return financial_Income;
    }

    getFinancial_DetailsNotes() {
        return financial_details;
    }

    getFinancialYear_Report() {
        return years;
    }

    getBudgetBalance() {
        return budget;
    }

    //Voucher Services

    GetAllVoucherDetails(url: string) {
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

    AddVoucher(url: string, model: any) {
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

    EditVoucher(url: string, model: any) {
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

    //Voucher Document Services
    GetVoucherDocumentDetails(url: string, VoucherNo) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url + "?VoucherNo=" + VoucherNo, options)
            .map((response: Response) => {
                let codelist = response.json();
                if (codelist) {
                    return codelist;
                }
            }).catch(this.handleError);
    }

    AddVoucherDocument(url: string, model: any) {        
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });
        let obj : any =
            {
                DocumentName : model.DocumentName,
                FilePath : model.DocumentFilePath,
                DocumentDate : model.DocumentDate,
                VoucherNo : model.VoucherNo
            }

        return this.http.post(url, obj
            , options)
            .map((response: Response) => {
                let journal = response.json();
                if (journal) {
                    return journal;
                }
            }).catch(this.handleError);

    }

    // Voucher Transaction Services

    //Dropdown Bind For Credit & Debit Accounts
    GetAccountDetails(url: string) {
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

    GetAllVoucherTransactionDetail(url: string, VoucherNo) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url + "?VoucherNo=" + VoucherNo, options)
            .map((response: Response) => {
                let codelist = response.json();
                if (codelist) {
                    return codelist;
                }
            }).catch(this.handleError);
    }

    AddVoucherTransaction(url: string, model: any) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });
        let obj =
            {
                DebitAccount: model.DebitAccount,
                CreditAccount: model.CreditAccount,
                Amount: model.Amount,
                Description: model.Description,
                TransactionDate: model.TransactionDate,
                VoucherNo: model.VoucherNo,
                CurrencyId: model.CurrencyId
            }

        return this.http.post(url, JSON.stringify(obj)
            , options)
            .map((response: Response) => {
                let journal = response.json();
                if (journal) {
                    return journal;
                }
            }).catch(this.handleError);

    }

    EditVoucherTransaction(url: string, model: any) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });
        let obj =
            {
                DebitAccount: model.DebitAccount,
                CreditAccount: model.CreditAccount,
                Amount: model.Amount,
                Description: model.Description,
                TransactionDate: model.TransactionDate,
                VoucherNo: model.VoucherNo,
                TransactionId: model.TransactionId,
                CurrencyId: model.CurrencyId
            }

        return this.http.post(url, JSON.stringify(obj)
            , options)
            .map((response: Response) => {
                let journal = response.json();
                if (journal) {
                    return journal;
                }
            }).catch(this.handleError);

    }

    //Journal Services

    GetAllJournalDetails(url: string, model: any) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url + "?CurrencyId=" + model.CurrencyId + "&fromdate=" + model.FromDate + "&todate=" + model.ToDate + "&officeid=" + model.OfficeId + "&RecordType=" + model.RecordType, options)
            .map((response: Response) => {
                let codelist = response.json();
                if (codelist) {
                    return codelist;
                }
            }).catch(this.handleError);
    }

    //Ledger Services

    GetAllLedgerDetails(url: string, model: any) {
        let obj = {
            CurrencyId: model.CurrencyId,
            OfficeCode: model.OfficeCode,
            RecordType: model.RecordType,
            AccountId: model.AccountId,
            FromDate: model.FromDate,
            ToDate: model.ToDate
        };
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.post(url, obj, options)
            .map((response: Response) => {
                let codelist = response.json();
                if (codelist) {
                    return codelist;
                }
            }).catch(this.handleError);
    }

    //Trial Balance Services

    GetAllTrailBalance(url: string, model: any) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url + "?OfficeId=" + model.OfficeId + "&Fromdate=" + model.Fromdate + "&Todate=" + model.Todate + "&CurrencyId=" + model.CurrencyId + "&RecordType=" + model.RecordType, options)
            .map((response: Response) => {
                let codelist = response.json();
                if (codelist) {
                    return codelist;
                }
            }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}
