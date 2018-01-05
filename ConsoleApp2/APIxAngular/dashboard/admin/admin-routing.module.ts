import { Routes, RouterModule } from '@angular/router'
import { UserComponent } from './user.component';
import { AdminComponent } from './admin.component';
import { AccountsComponent } from '../accounts/accounts.component';
import { NgModule } from '@angular/core';

const Admin_Router: Routes =
    [{
        path: '', component: UserComponent,
        children:
            [
                { path: 'admin', component: AdminComponent },
                { path: 'user', component: UserComponent }
            ]
    }];


@NgModule({
    imports: [RouterModule.forChild(Admin_Router)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }

