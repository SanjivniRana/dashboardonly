import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CurrentPasswordModel, RestPasswordModel } from '../../Models/CurrentPasswordModel';
import { AddUsers, EditUsers } from '../../Models/AddUser';
@Injectable()
export class UserService {

    constructor(private http: Http) {}

    
    GetUserList(url: string) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url, options)
            .map((response: Response) => {
                let user = response.json();
                if (user) {
                    return user;
                }

            }).catch(this.handleError);

    }

    getUserRoles(url: string) :Observable<any> {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url, options)
            .map((response: Response) => {
                let user = response.json();
                if (user) {
                    return user;
                }

            }).catch(this.handleError);

    }

    getUserRolesByUserId(url: string, UserId) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url+"?userid="+UserId, options)
            .map((response: Response) => {
                let user = response.json();
                if (user) {
                    return user;
                }

            }).catch(this.handleError);

    }

    getUserDetailByUserId(url: string, UserId) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url+"?UserId="+UserId, options)
            .map((response: Response) => {
                let user = response.json();
                if (user) {
                    return user;
                }

            }).catch(this.handleError);

    }

    assignRolesToUser(url: string, userId:string ,addRoles:any[]) {        
        var obj = {
            UserId : userId,
            Roles : addRoles
        };    
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.post(url,obj, options)
            .map((response: Response) => {
                let user = response.json();
                if (user) {
                    return user;
                }

            }).catch(this.handleError);

    }

    AddUser(url: string, model: AddUsers) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });
        
        let a=new RequestOptions();
        let b=
         {
            FirstName:model.FirstName,
            LastName:model.LastName,
            UserName : model.UserName,
            Email : model.Email,
            Password : model.Password,
            UserType : 1,
            OfficeCode : model.OfficeCode,
            DepartmentId :model.DepartmentId,
            Status:model.Status,
            Phone: model.Phone
        
        }
                
        return this.http.post(url, JSON.stringify(b)
        ,options)            
        .map((response: Response) => {
                let user = response.json();
                if (user) {
                    return user;
                }
            }).catch(this.handleError);

    }

    EditUser(url: string, model: EditUsers) {
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });
        
        let a=new RequestOptions();
        let b=
         {
            FirstName:model.FirstName,
            LastName:model.LastName,
            UserName : model.UserName,
            Email : model.Email,
            // Password : model.Password,
            UserType : 1,
            OfficeCode : model.OfficeCode,
            DepartmentId :model.DepartmentId,
            Status:model.Status,
            Id: model.Id,
            Phone: model.Phone
        }
                
        return this.http.post(url, JSON.stringify(b)
        ,options)            
        .map((response: Response) => {
                let user = response.json();
                if (user) {
                    return user;
                }
            }).catch(this.handleError);

    }

    getOffices(url: string):Observable<any> {
            let Myheaders = new Headers();
            Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
            let options = new RequestOptions({ headers: Myheaders });
            return this.http.get(url,options)
                .map((response: Response) => {
                    let user = response.json();
                    if (user) {                        
                        return user;
                    }
    
                }).catch(this.handleError);
    
     }    

     getDepartment(url: string ,officeCode) {
        var obj: any = {};
        obj.officeCode   = officeCode;        
        let Myheaders = new Headers();            
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url+"?officeCode="+officeCode,options) 
            .map((response: Response) => {
                let user = response.json();
                if (user) {                    
                    return user;
                }

            }).catch(this.handleError);

    }

    getPermissions(url: string):Observable<any> {     
        let Myheaders = new Headers();            
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.get(url,options) 
            .map((response: Response) => {
                let user = response.json();
                if (user) {                    
                    return user;
                }

            }).catch(this.handleError);

    }

    PermissionsInRoles(url: string, obj):Observable<any> {        
        // var obj = {
        //     UserId : userId,
        //     Roles : addRoles
        // };    
        let Myheaders = new Headers();
        Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
        Myheaders.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: Myheaders });
        return this.http.post(url, obj, options)
            .map((response: Response) => {
                let user = response.json();
                if (user) {
                    return user;
                }

            }).catch(this.handleError);

    }
 getPermissionByRoleId (url:string,roleid){
    let Myheaders = new Headers();
    Myheaders.append("Authorization", "Bearer " + localStorage.getItem("authenticationtoken"));
    Myheaders.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: Myheaders });
    return this.http.get(url+"?roleid="+roleid,options)
    .map((response: Response) => {
        let user = response.json();
        if (user) {
            return user;
        }

    }).catch(this.handleError);
 }
     
 resetPassword(url:string,model:RestPasswordModel){
          
    let Myheaders=new  Headers();
    
       Myheaders.append("Authorization","Bearer "+localStorage.getItem("authenticationtoken"));
       Myheaders.append("Content-Type","application/json");
       let options =new RequestOptions({headers:Myheaders});
       return this.http.post(url,model,options).
        map(response=>
        {
            let user = response.json();
            if (user) {
                return user;
            } 
        }).catch(this.handleError);
 }
 changePassword(url:string,model:CurrentPasswordModel){
    let Myheaders=new  Headers();
    
       Myheaders.append("Authorization","Bearer "+localStorage.getItem("authenticationtoken"));
       Myheaders.append("Content-Type","application/json");
       let options =new RequestOptions({headers:Myheaders});
       return this.http.post(url,model,options).map(response=>
        {
            let user = response.json();
            if (user) {
                return user;
            } 
        }).catch(this.handleError);
 }
   checkCurrentPassword(url:string,currentPassword:string){
       let Myheaders=new  Headers();
    
       Myheaders.append("Authorization","Bearer "+localStorage.getItem("authenticationtoken"));
       Myheaders.append("Content-Type","application/json");
       let options =new RequestOptions({headers:Myheaders});
       return this.http.get(url+"?pwd="+currentPassword,options).map(response=>
        {
            let user = response.json();
            if (user) {
                return user;
            } 
        }).catch(this.handleError);
   } 
   private handleError(error: Response) {
        
        return Observable.throw(error.json().error || 'Server error');
    }    
}