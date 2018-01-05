//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { UserComponent } from './user.component'
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import {DialogModule} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/components/common/shared';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { UserService } from './user.service';
import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { CommonModule } from '@angular/common';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { TextMaskModule } from 'angular2-text-mask';
import {CheckboxModule} from 'primeng/primeng';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DialogModule,
    MultiSelectModule,
    TextMaskModule,
    DropdownModule,
    DataTableModule,SharedModule,    
    CheckboxModule,
    NgxPermissionsModule.forChild({
      permissionsIsolate: true, 
      rolesIsolate: true}),
      //BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
    TranslateModule.forChild({}),
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#31c3aa', 
      secondaryColour: '#000', 
      tertiaryColour: '#a129'
  }),
  ],
  providers: [UserService],
  
})
export class AdminModule { }
