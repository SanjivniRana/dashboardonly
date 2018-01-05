import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        children: [

            { path: 'accounts', loadChildren: './accounts/accounts.module#AccountsModule' },
            {
                path: 'admin', loadChildren: './admin/admin.module#AdminModule'
                // canActivate: [NgxPermissionsGuard],
                // data: {
                //     permissions:{
                //         only : ['Admin','SuperAdmin'],
                //         except : ['Guest']
                //     }
                // },
            },
            { path: 'code', loadChildren: './code/code.module#CodeModule' },
            { path: 'pmu', loadChildren: './pmu/pmu.module#PMUModule' },
            { path: 'hr', loadChildren: './hr/hr.module#HrModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }