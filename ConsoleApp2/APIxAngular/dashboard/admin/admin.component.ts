import { Component, OnInit } from '@angular/core';
import { NgxRolesService } from 'ngx-permissions';
import { NgxPermissionsService } from 'ngx-permissions';
import { GLOBAL } from '../../shared/global';
import { AppSettingsService } from '../../Services/App-settings.Service';
import { AuthenticationService } from '../../Services/Authentication.Service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  RolesAndPermissionsList: any[];
  PermissionsArr: any[];

  constructor(private permisstionService:NgxPermissionsService,private rolePermissions:NgxRolesService,private appSettigs: AppSettingsService,private authenticationService: AuthenticationService) { }

  ngOnInit() {

    const permissions = ['USER','ADMIN']
    this.permisstionService.loadPermissions(permissions);  
    this.getRolesAndPermissionsByUserId(localStorage.getItem('UserId'));
  }

  permissionwithRole:any;
  getRolesAndPermissionsByUserId(UserId)
  {
    this.authenticationService.getRolesAndPermissionsByUserId(this.appSettigs.getBaseUrl() + GLOBAL.API_UserRoles_GetUserRolesByUserId,UserId).subscribe(
      data=>{            
        this.PermissionsArr = [];
        this.permissionwithRole={};
        for(var i=0; i<data.data.RoleList.length ;i++)
        {                    
          let rolename= data.data.RoleList[i].RoleName;
          this.RolesAndPermissionsList = [];
          this.RolesAndPermissionsList = data.data.RoleList[i].PermissionsList;
          for(var j=0;j<data.data.RoleList[i].PermissionsList.length;j++){
            this.PermissionsArr.push(data.data.RoleList[i].PermissionsList[j].Name);
          }
           this.permissionwithRole[""+rolename+""]= this.PermissionsArr;
           this.PermissionsArr=[];
       
        }
        var permissionStr =  this.PermissionsArr.join(',');
        localStorage.setItem('UserPermissions',this.permissionwithRole);
    });
    
  }

}
