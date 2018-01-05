import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppSidebarComponent } from "./shared/appSideBar.component";
import { AppHeaderComponent } from "./shared/appHeader.component";
import { LoginComponent } from "../Login/login.component";
import { HttpModule } from "@angular/http";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";
import { NgxPermissionsModule } from "ngx-permissions";
import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { HttpLoaderFactory } from "../app.module";
import { ToastrModule } from "ngx-toastr";
import { LoadingModule, ANIMATION_TYPES } from "ngx-loading";
import { NgIdleKeepaliveModule } from "@ng-idle/keepalive";
import { UserService } from './admin/user.service';
import { commonService } from "../Services/common.service";
import { LanguageChange } from "../Shared/languageChange";
import { TranslateStore } from "@ngx-translate/core/src/translate.store";
import { AuthenticationService } from "../Services/Authentication.Service";
import { AppSettingsService } from "../Services/App-settings.Service";
import { httpClientService } from "../Auth/httpClient";
import { MessageService } from "primeng/components/common/messageservice";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule, //Routing
        HttpModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ModalModule.forRoot(),
        NgxPermissionsModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        LoadingModule.forRoot({
            animationType: ANIMATION_TYPES.threeBounce,
            backdropBackgroundColour: 'rgba(0,0,0,0.1)',
            backdropBorderRadius: '4px',
            primaryColour: '#31c3aa',
            secondaryColour: '#000',
            tertiaryColour: '#a129'
        }),
        NgIdleKeepaliveModule.forRoot()
    ],
    declarations: [
        DashboardComponent,
        AppHeaderComponent,
        AppSidebarComponent                
    ],

    providers: [
        UserService,
        commonService,
        LanguageChange,
        TranslateService,
        TranslateStore,
        HttpClient,
        AuthenticationService,
        AppSettingsService,
        httpClientService,
        MessageService
    ],

})
export class DashboardModule { }