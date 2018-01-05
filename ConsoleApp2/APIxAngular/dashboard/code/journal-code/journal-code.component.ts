import { Component, OnInit } from '@angular/core';
import { CodeService, JournalCodeData, DeleteJournalCode } from '../code.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { AppSettingsService } from '../../../Services/App-settings.Service';
import { BsModalService } from 'ngx-bootstrap';
import { JournalCodeList } from '../../../Models/CodeModel';
import { GLOBAL } from '../../../shared/global';

@Component({
  selector: 'app-journal-code',
  templateUrl: './journal-code.component.html',
  styleUrls: ['./journal-code.component.css']
})
export class JournalCodeComponent implements OnInit {

  showFilterRow: boolean;
  popupAddJournalVisible = false;
  journalcodedata : JournalCodeData;
  journalcodelist : JournalCodeList[];

  constructor(private router: Router, private toastr: ToastrService,private fb: FormBuilder,private setting : AppSettingsService , private modalService: BsModalService, private codeservice: CodeService) 
  { 
      this.showFilterRow = true;
      this.journalcodedata = this.codeservice.getJournalCodeData();
  }


  ngOnInit() {
    this.getJournalCodeList();
  }

  //TODO: Event for ADD, UPDATE, DELETE
  logEvent(eventName) {
    //this.events.unshift(eventName);
  }

  UpdateJournalCode(eventName)
  {
  }

  ShowPopup()
  {
      this.journalcodedata = this.codeservice.getJournalCodeData();
      this.popupAddJournalVisible = true;
  }

  HidePopup()
  {
      this.popupAddJournalVisible = false;
  }

  //Get all Journal Details
  getJournalCodeList()
  { 
      this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_JournalCode_GetAllJournalDetail).subscribe(
          data => {                      
              this.journalcodelist = [];   
              data!=null || data!=undefined? data.data.JournalDetailList.forEach(element => {
                this.journalcodelist.push({JournalCode:element.JournalCode,JournalName:element.JournalName});                            
          }):null;
      },
      error => {  
      if (error.StatusCode == 500) {
        this.toastr.error("Internal Server Error....");
      }
      else if (error.StatusCode == 401) {
        this.toastr.error("Unauthorized Access Error....");
      } 
      else if(error.StatusCode == 403)      
      {
        this.toastr.error("Forbidden Error....");
      }
      else {
      }}
  )
}

onFormSubmit(model)
{
    this.AddJournalCode(model);
}

AddJournalCode(model)
{
  var addjournalcode: JournalCodeData = {
    JournalCode : 0,
    JournalName : model.JournalName
  };
  this.codeservice.AddEditJournalCode(this.setting.getBaseUrl() + GLOBAL.API_JournalCode_AddJournalDetail, addjournalcode).subscribe(
      data => {        
          if (data.StatusCode == 200) //Success
          {
            this.toastr.success("Journal Code Added Successfully!!!");
            this.getJournalCodeList();
            this.HidePopup();              
          }
          else if(data.StatusCode == 900)
          {
            this.toastr.error("Journal Name already exist!!!");
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

EditJournalCode(model)
{
  var addjournalcode: JournalCodeData = {
    JournalCode : model.key.JournalCode,
    JournalName : model.key.JournalName
  };
  this.codeservice.AddEditJournalCode(this.setting.getBaseUrl() + GLOBAL.API_JournalCode_EditJournalDetail, addjournalcode).subscribe(
      data => {        
          if (data.StatusCode == 200) //Success
          {
              this.HidePopup();  
              this.toastr.success("Journal Code Updated Successfully!!!");
              this.getJournalCodeList();                       
          }
          else if(data.StatusCode == 900)
          {
            this.toastr.error("Journal Name already exist!!!");
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

DeleteJournalCode(model)
{
  var deletejournalcode: DeleteJournalCode = {
      JournalCode : model.key.JournalCode
  };
  this.codeservice.DeleteJournalCode(this.setting.getBaseUrl() + GLOBAL.API_JournalCode_DeleteJournalDetail, deletejournalcode).subscribe(
      data => {        
          if (data.StatusCode == 200) //Success
          {
              this.toastr.success("Journal Code Deleted Successfully!!!");
              this.getJournalCodeList();
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

  
  

}
