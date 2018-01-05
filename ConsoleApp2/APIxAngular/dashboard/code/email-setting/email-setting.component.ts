import { Component, OnInit } from '@angular/core';
import { EmailSetting, EmailTypeList } from '../../../Models/CodeModel';
import { EmailSettingData,  CodeService } from '../code.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { AppSettingsService } from '../../../Services/App-settings.Service';
import { BsModalService } from 'ngx-bootstrap';
import { GLOBAL } from '../../../shared/global';

@Component({
  selector: 'app-email-setting',
  templateUrl: './email-setting.component.html',
  styleUrls: ['./email-setting.component.css']
})
export class EmailSettingComponent implements OnInit {
  showFilterRow: boolean;
  emailsettingdt : EmailSetting[];
  emailsettingdata : EmailSettingData;
  popupVisible = false;  
  emailtypelistdata : EmailTypeList[]

  constructor(private router: Router, private toastr: ToastrService,private fb: FormBuilder,private setting : AppSettingsService , private modalService: BsModalService, private codeservice: CodeService) 
  { 
      this.emailsettingdata = this.codeservice.getEmailSettingData();

      this.showFilterRow = true;
      this.getEmailTypeList();
  }

  ngOnInit() {
      this.getEmailSettingList();
  }

  showPopup() 
  { 
      this.emailsettingdata = this.codeservice.getEmailSettingData();
      this.popupVisible = true;
  }

  HidePopup() 
  {            
      this.popupVisible = false;
  }

  //Get all Email Setting Details
  getEmailSettingList()
  { 
      this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_EmailSetting_GetAllEmailSettingDetail).subscribe(
          data => {                      
              this.emailsettingdt = [];        
              data.data.EmailSettingList.forEach(element => {
              this.emailsettingdt.push({
                EmailId: element.EmailId,
                SenderEmail: element.SenderEmail,
                EmailTypeName: element.EmailTypeName,
                EmailTypeId: element.EmailTypeId,
                SenderPassword: element.SenderPassword,
                SmtpPort: element.SmtpPort,
                SmtpServer: element.SmtpServer,
                EnableSSL: element.EnableSSL
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
      else if(error.StatusCode == 403)      
      {
        this.toastr.error("Forbidden Error....");
      }
      else {
      }}
  )
}

getEmailTypeList()
{ 
    this.codeservice.GetAllCodeList(this.setting.getBaseUrl() + GLOBAL.API_EmailType_GetAllEmailType).subscribe(
        data => {                      
            this.emailtypelistdata = [];        
            data.data.EmailTypeList.forEach(element => {
            this.emailtypelistdata.push({
                EmailTypeId: element.EmailTypeId,
                EmailTypeName: element.EmailTypeName
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
    if(model.EmailId == "")
    {
        this.AddEmailSetting(model);
    }
    else
    {
        this.EditEmailSetting(model);
    }
}

AddEmailSetting(model)
{
  var obj: any = {};
  var addemailsetting: EmailSetting = {
    EmailId : 0,
    SenderEmail : model.SenderEmail,
    EmailTypeName : model.EmailTypeName,
    EmailTypeId : model.EmailTypeId,
    SenderPassword : model.SenderPassword,
    SmtpPort : model.SmtpPort,
    SmtpServer : model.SmtpServer,
    EnableSSL : model.EnableSSL
  };
  this.codeservice.AddEditEmailSetting(this.setting.getBaseUrl() + GLOBAL.API_EmailSetting_AddEmailSettingDetail, addemailsetting).subscribe(
      data => {        
          if (data.StatusCode == 200) //Success
          {
            this.toastr.success("Email Setting Detail Added Successfully!!!");
            this.getEmailSettingList();
            this.HidePopup();              
          }
          else if(data.StatusCode == 900)
          {
            this.toastr.error("Email Setting Detail already exist!!!");
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

EditEmailSetting(model)
{
  var obj: any = {};
  var addemailsetting: EmailSetting = {
    EmailId : model.EmailId,
    SenderEmail : model.SenderEmail,
    EmailTypeName : model.EmailTypeName,
    EmailTypeId : model.EmailTypeId,
    SenderPassword : model.SenderPassword,
    SmtpPort : model.SmtpPort,
    SmtpServer : model.SmtpServer,
    EnableSSL : model.EnableSSL
  };
  this.codeservice.AddEditEmailSetting(this.setting.getBaseUrl() + GLOBAL.API_EmailSetting_EditEmailSettingDetail, addemailsetting).subscribe(
      data => {        
          if (data.StatusCode == 200) //Success
          {
              this.HidePopup();  
              this.toastr.success("Email Setting Detail Updated Successfully!!!");
              this.getEmailSettingList();                       
          }
          else if(data.StatusCode == 900)
          {
            this.toastr.error("Email Setting Detail already exist!!!");
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

GetEmailSettingDetailsById(data)
{
    this.emailsettingdata.EmailId = data.data.EmailId;
    this.emailsettingdata.EmailTypeId = data.data.EmailTypeId;
    this.emailsettingdata.SenderEmail = data.data.SenderEmail;
    this.emailsettingdata.SenderPassword = data.data.SenderPassword;
    this.emailsettingdata.SmtpPort = data.data.SmtpPort;
    this.emailsettingdata.SmtpServer = data.data.SmtpServer;
    this.emailsettingdata.EnableSSL = data.data.EnableSSL;
    this.popupVisible = true;
}



}
