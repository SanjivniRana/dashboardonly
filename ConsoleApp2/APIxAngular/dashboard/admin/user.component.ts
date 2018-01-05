import { Component, OnInit, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { UserService } from './user.service';
import { MultiSelectModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/components/common/api';
import { GLOBAL } from '../../shared/global';
import { DropdownModule } from 'primeng/primeng';
import { AppSettingsService } from '../../Services/App-settings.Service';
import { AddUsers, EditUsers } from '../../Models/AddUser';
import { ToastrService } from 'ngx-toastr';
import { TextMaskModule } from 'angular2-text-mask';
import { CustomValidation } from '../../Shared/customValidations';
import { Router } from '@angular/router';
import { OnDestroy } from "@angular/core";

import { Subject } from "rxjs/Subject";
import { CurrentPasswordModel, RestPasswordModel } from '../../Models/CurrentPasswordModel';
export interface UserDetails {
  FirstName;
  LastName;
  Email;
  Office;
  Status;
  UserId;
  Id;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None

})

export class UserComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject<void>();


  // AddUser Modal Popup

  loading = false;
  loadingPermission = false;
  loadingRolesMultiselect = false;
  loadingPermissionForRoles = false;
  loadingRoles = false;

  selectedValue: any;
  userForm: FormGroup;
  userRoles: FormGroup;
  AddPermissions: FormGroup;
  userEditForm: FormGroup;

  //Modal popup instances
  modalRef: BsModalRef;
  modalRefPermission: BsModalRef;
  modalPermission: BsModalRef;
  modalResetPassword: BsModalRef;

  modalEditUserPermission: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };

  //User DataTabale
  userDetails: UserDetails[];

  // Add User dropdowns
  officeId: SelectItem[];
  status: SelectItem[];
  department: SelectItem[];
  roles: SelectItem[];
  RolesUser: SelectItem[];
  Permissions: SelectItem[];
  private ChangePassword: FormGroup;

  //UserId For AddRoles
  UserId: any;               //Global UserId FROM Table is selected for controls
  addRoles: any[];
  arrPermissionsId: any[];
  arrPermissionsName: any[];
  permissionsAndRoleModel: any[];
  selectedValueInRoles: any[];
  selectedRole: any;
  setDepartmentValue: any;

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private router: Router, private toastr: ToastrService, private fb: FormBuilder, private setting: AppSettingsService, private modalService: BsModalService, private userService: UserService) {

    // AddUser Modal Popup    
    this.userForm = this.fb.group({
      'FirstName': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
      'LastName': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
      'Email': [null, [Validators.required, Validators.email]],
      'Phone': [null, Validators.required],
      'Password': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
      'ConfirmPassword': [null, Validators.compose([CustomValidation.ComparePassword, Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
      'OfficeId': [null, Validators.required],
      'Department': [null, Validators.required],
      'Status': [null]
    });

    this.ChangePassword = this.fb.group({
      'NewPassword': ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
      'ConfirmPassword': ["", Validators.compose([CustomValidation.ConfirmPassword, Validators.required, Validators.minLength(5), Validators.maxLength(20)])]
    });
    //Status Array
    this.status = [{ label: 'Active', value: 1 },
    { label: 'InActive', value: 0 }];

    //Add Roles Form
    this.userRoles = this.fb.group({
      'Roles': [null]
    });

    //Add Permissions Form
    this.AddPermissions = this.fb.group({
      'Roles': [null],
      'Permissions': [null]
    });

    this.userEditForm = this.fb.group({
      'FirstName': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
      'LastName': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
      'Email': [null, [Validators.required, Validators.email]],
      'Phone': [null, Validators.required],
      // 'Password' : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
      // 'ConfirmPassword' : [null, Validators.compose([CustomValidation.ComparePassword,Validators.required, Validators.minLength(6), Validators.maxLength(20)])], 
      'OfficeId': [null, Validators.required],
      'Department': [null, Validators.required],
      'Status': [null]
    });
  }

  display: boolean = false;
  ngOnInit() {
    this.getOffices();
    this.getUserList();
    this.getUserRoles();
  }

  getOffices() {
    this.userService.getOffices(this.setting.getBaseUrl() + GLOBAL.API_AllOffice_URL)
      .takeUntil(this.unsubscribe)
      .subscribe(data => {
        this.officeId = [];
        data.data.OfficeDetailsList.forEach(element => {
          this.officeId.push({ label: element.OfficeName, value: element.OfficeCode });
        });
      });

  }

  getDepartment(officeCode) {
    this.userService.getDepartment(this.setting.getBaseUrl() + GLOBAL.API_AllDepartment_Url, officeCode).subscribe(data => {
      this.department = [];
      data.data.Departments.forEach(element => {
        this.department.push({ label: element.DepartmentName, value: element.DepartmentId });
      });
    });
  }

  onChangeOffice(officeCode: any) {
    this.getDepartment(officeCode);
  }

  onRoleChange(event) {
    this.selectedValueInPermission = [];
    this.selectedRole = event.value.id;
    this.loadingPermissionForRoles = true;
    this.userService.getPermissionByRoleId(this.setting.getBaseUrl() + GLOBAL.API_Permissions_GetPermissionsByRoleId, this.selectedRole).
      subscribe(data => {
        if (data.StatusCode == 200) {
          this.loadingPermissionForRoles = false;
          data.data.PermissionsInRolesList.forEach(element => {
            this.selectedValueInPermission.push({ PermissionId: element.PermissionId, PermissionName: element.PermissionName });
          });
        }
      },
      error => {
        //this.loading=false;
        //this.toastr.error("There is Some error....");
        if (error.message == 500) {

          //  this.messages.push({ severity: 'error', summary: 'Error Message', detail: 'Oops, Something went wrong. Please try again.' });
        }
        else if (error.message == 0) {
          //this.messages.push({ severity: 'error', summary: 'Error Message', detail: 'Network error, Please try again later' });
        }
        else {
          //this.messages.push({ severity: 'error', summary: 'Error Message', detail: 'Some error occured, Please contact your admin' });
        }
      }
      );
  }

  getUserList() {
    this.loading = true;
    this.userService.GetUserList(this.setting.getBaseUrl() + GLOBAL.API_UserDetail_GetUserList).subscribe(
      data => {

        this.userDetails = [];
        this.loading = false;
        data.data.UserDetailsList.forEach(element => {
          this.userDetails.push({ FirstName: element.FirstName, LastName: element.LastName, Email: element.Username, UserId: element.UserId, Id: element.Id, Office: element.OfficeName, Status: element.Status == 1 ? "Active" : "InActive" });
        });
      },
      error => {
        this.loading = false;

        if (error.StatusCode == 500) {
          this.toastr.error("Internal Server Error....");
          //  this.messages.push({ severity: 'error', summary: 'Error Message', detail: 'Oops, Something went wrong. Please try again.' });
        }
        else if (error.StatusCode == 401) {
          this.toastr.error("Unauthorized Access Error....");
          //this.messages.push({ severity: 'error', summary: 'Error Message', detail: 'Network error, Please try again later' });
        }
        else if (error.StatusCode == 403) {
          this.toastr.error("Forbidden Error....");
        }
        else {
          //this.messages.push({ severity: 'error', summary: 'Error Message', detail: 'Some error occured, Please contact your admin' });
        }
      }
    )
  }

  getUserRoles() {
    this.loadingRoles = true;
    this.userService.getUserRoles(this.setting.getBaseUrl() + GLOBAL.API_UserRoles_GetRolesList).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.loadingRoles = false;
          this.roles = [];
          data.data.RoleList.forEach(element => {
            this.roles.push({ label: element.RoleName, value: { id: element.Id, name: element.RoleName } });
          });
        }

      }
    )
  }

  onChangePermission(event) {
    this.permissionsAndRoleModel = [];
    event.value.forEach(element => {
      this.permissionsAndRoleModel.push({ RoleId: this.selectedRole, PermissionId: element.PermissionId });
    });
  }


  assignRolesToUser(Roles) {
    this.addRoles = [];
    for (var i in Roles.Roles) {
      this.addRoles.push(Roles.Roles[i].name);
    }
    this.userService.assignRolesToUser(this.setting.getBaseUrl() + GLOBAL.API_UserRoles_AssignRoleToUser, this.UserId, this.addRoles)
      .takeUntil(this.unsubscribe).subscribe(
      data => {

        if (data.StatusCode == 200) //Success
        {
          this.toastr.success("Roles Added Successfully!!!");
          this.getUserList();
          this.modalRefPermission.hide();
        }
        else {
          this.toastr.error("Error!!!");
        }
      }
      )
  }

  getUserDetailByUserId(UserId) {
    this.userService.getUserDetailByUserId(this.setting.getBaseUrl() + GLOBAL.API_UserDetail_GetUserDetailsByUserId, UserId).subscribe(
      data => {
        this.setDepartmentValue = [];
        this.getDepartment(data.data.UserDetailsList[0].OfficeCode);
        data.data.UserDetailsList.forEach(element => {
          this.setDepartmentValue.push({ label: element.DepartmentName, value: element.DepartmentId });
          this.userEditForm.setValue({
            FirstName: element.FirstName,
            LastName: element.LastName,
            Email: element.Username,
            Phone: element.Phone,
            OfficeId: element.OfficeCode,
            Department: element.DepartmentId,
            Status: element.Status
          });
        });
      }
    )
  }

  PermissionsInRoles(value) {
    this.loadingPermission = true;
    this.userService.PermissionsInRoles(this.setting.getBaseUrl() + GLOBAL.API_Permissions_AddPermissionInRoles, this.permissionsAndRoleModel).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.loadingPermission = false;
          this.toastr.success("Permissions Added Successfully!!!");
          this.modalPermission.hide();
        }
      }
    )
  }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, this.config, { class: 'gray modal-lg' })
    );
  }

  userFormSubmit(model) {
    var obj: any = {};
    var addUser: AddUsers = {
      UserName: model.Email,
      Email: model.Email,
      Password: model.Password,
      FirstName: model.FirstName,
      LastName: model.LastName,
      UserType: localStorage.getItem("UserRoles"),
      OfficeCode: model.OfficeId,
      OfficeName: "",
      DepartmentName: "",
      DepartmentId: model.Department,
      Status: model.Status,
      Phone: model.Phone
    };
    this.userService.AddUser(this.setting.getBaseUrl() + GLOBAL.API_UserDetail_AddUser, addUser).subscribe(
      data => {
        if (data.StatusCode == 200) //Success
        {
          this.toastr.success("User Added Successfully!!!");
          this.getUserList();
          this.modalRef.hide();
        }
        else if (data.StatusCode == 900) {
          this.toastr.error("User already exist!!!");
        }
        else {
          this.toastr.error("Error!!!");
        }
      },
      error => {
        //error message
      }
    );
    // this.modalRef.hide();
  }

  userEditFormSubmit(model) {
    var obj: any = {};
    var editUser: EditUsers = {
      UserName: model.Email,
      Email: model.Email,
      // Password : model.Password,
      FirstName: model.FirstName,
      LastName: model.LastName,
      UserType: localStorage.getItem("UserRoles"),
      OfficeCode: model.OfficeId,
      OfficeName: "",
      DepartmentName: "",
      DepartmentId: model.Department,
      Status: model.Status,
      Id: this.UserId,
      Phone: model.Phone
    };

    this.userService.EditUser(this.setting.getBaseUrl() + GLOBAL.API_UserDetail_EditUser, editUser).subscribe(
      data => {
        if (data.StatusCode == 200) //Success
        {
          this.toastr.success("User Updated Successfully!!!");
          this.getUserList();
        }
        else {
          this.toastr.error("Error!!!");
        }
        this.modalEditUserPermission.hide();
      },
      error => {
        //error message
      }
    );
    this.modalEditUserPermission.hide();
  }

  private userName: string;
  onSubmitPasswordChange(model: RestPasswordModel) {
    model.UserName = this.userName;

    this.userService.
      resetPassword(this.setting.getBaseUrl() + GLOBAL.API_ResetPassword, model)
      //.takeUntil(this.unsubscribe)
      .subscribe(data => {
        if (data.StatusCode == 200) {
          this.toastr.success("Passowrd Reset Successfully!");
          this.modalResetPassword.hide();
        } else {
          this.toastr.error("Ther is somme error");
        }
      });
  }
  openModelOnResetPassword(templateReset: TemplateRef<any>, covalue) {
    this.userName = covalue.Email;
    this.modalResetPassword = this.modalService.show(
      templateReset,
      Object.assign({}, this.config, { class: 'gray modal-lg' })
    );
  }
  //openModalPermissions(templatePermissions: TemplateRef<any>,colvalue) { 
  getUserRolesByUserId(UserId) {
    this.loadingRolesMultiselect = true;
    this.userService.getUserRolesByUserId(this.setting.getBaseUrl() + GLOBAL.API_UserRoles_GetUserRolesByUserId, UserId).subscribe(
      data => {
        if (data.StatusCode == 200) {
          this.loadingRolesMultiselect = false;
          this.selectedValueInRoles = [];
          data.data.RoleList.forEach(element => {
            this.selectedValueInRoles.push({ id: element.Id, name: element.RoleName });
          });
        }
      }
    )
  }

  openModalPermissions(templatePermissions: TemplateRef<any>, colvalue) {
    this.getUserRolesByUserId(colvalue.Id);
    this.UserId = colvalue.Id;
    this.modalRefPermission = this.modalService.show(
      templatePermissions,
      Object.assign({}, this.config, { class: 'gray modal-lg' })
    );
  }

  openModalAddPermissions(AddPermissionsTemplate: TemplateRef<any>) {
    this.getPermissions();
    this.modalPermission = this.modalService.show(
      AddPermissionsTemplate,
      Object.assign({}, this.config, { class: 'gray modal-lg' })
    );
  }

  openModalEditPermissions(EditPermissionsTemplate: TemplateRef<any>, colvalue) {
    this.getPermissions();
    this.getUserDetailByUserId(colvalue.Id);
    this.UserId = colvalue.Id;
    this.modalEditUserPermission = this.modalService.show(
      EditPermissionsTemplate,
      Object.assign({}, this.config, { class: 'gray modal-lg' })
    );
  }

  selectedValueInPermission: any[];
  getPermissions() {
    this.Permissions = [];
    this.userService.getPermissions(this.setting.getBaseUrl() + GLOBAL.API_Permissions_GetPermissions)
      .takeUntil(this.unsubscribe)
      .subscribe(
      data => {
        data.data.PermissionsList.forEach(element => {
          this.Permissions.push({ label: element.Name, value: { PermissionId: element.Id, PermissionName: element.Name } });
        });
      }
      )
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
