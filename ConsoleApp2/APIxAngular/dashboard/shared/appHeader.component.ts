import { Component, OnInit, NgZone, Output, EventEmitter, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { PasswordModule } from 'primeng/primeng';
import { LanguageChange } from '../../Shared/languageChange';
import { CommonService } from '../../app.common';
import { ActivatedRoute, Route, Router } from '@angular/router';
//import {ChangePasswordComponent} from '../shared/changePassword.component';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CustomValidation } from '../../Shared/customValidations';
import { commonService } from '../../Services/common.service';
import { AppSettingsService } from '../../Services/App-settings.Service';
import { Http } from '@angular/http';
//import { ChangePasswordComponent } from './changePassword.component';
import { GLOBAL } from '../../shared/global';
import { UserService } from '../admin/user.service';
import { Subject } from 'rxjs';
import { CurrentPasswordModel } from '../../Models/CurrentPasswordModel';
import { ToastrService } from 'ngx-toastr';
import { DashboardComponent } from '../dashboard.component'
@Component({
    selector: "app-header",
    templateUrl: './appHeader.component.html',
    providers: [GLOBAL]
})

export class AppHeaderComponent implements OnDestroy {

    @Output() checkToken: EventEmitter<any> = new EventEmitter<any>();
    // @ViewChild(ChangePasswordComponent) changepassword:ChangePasswordComponent;

    display: boolean = false;
    currentLanguage: string = 'en';
    loading = false;
    commonService = new CommonService();
    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;
    modalChangePassword: BsModalRef;
    private ChangePassword: FormGroup;
    private CurrentPassword: FormControl;
    private unsubscribe: Subject<void> = new Subject<void>();


    config = {
        animated: true,
        keyboard: true,
        backdrop: true,
        ignoreBackdropClick: false
    };

    UserName: any;

    isValidPassword = true;
    constructor(
        private idle: Idle,
        private keepalive: Keepalive,
        private languageChange: LanguageChange,
        private route: ActivatedRoute,
        private router: Router,
        private zone: NgZone,
        private modalService: BsModalService,
        private fb: FormBuilder,
        private cs: commonService,
        private settings: AppSettingsService,
        private http: Http,
        private setting: AppSettingsService,
        private userService: UserService,
        private toastr: ToastrService,
        public _dashboard: DashboardComponent


    ) {
        let token = localStorage.getItem('authenticationtoken');

        idle.setIdle(300);
        idle.setTimeout(400);
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
        idle.onTimeout.subscribe(() => {
            this.idleState = 'Timed out!';
            this.timedOut = true;
            this.logout();
        });
        idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
        idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');
        keepalive.interval(60);
        keepalive.onPing.subscribe(() => this.lastPing = new Date());
        this.reset();

        this.CurrentPassword = new FormControl('', Validators.compose([Validators.required]));
        this.ChangePassword = this.fb.group({
            CurrentPassword: this.CurrentPassword,
            //'CurrentPassword' : ["", [Validators.required],[this.cs.validateCurrentPassword.bind(this)]],
            'NewPassword': ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
            'ConfirmPassword': ["", Validators.compose([CustomValidation.ConfirmPassword, Validators.required, Validators.minLength(5), Validators.maxLength(20)])]
        });
    }

    ngOnInit() {
        this.UserName = localStorage.getItem('UserName');
    }
    isConfirmPassword = true;
    isFormValid = false;

    onSubmitPasswordChange(value: CurrentPasswordModel) {
        if (value != null) {
            this.loading = true;
            this.userService.changePassword(this.setting.getBaseUrl() + GLOBAL.API_ChangePassword, value)
                .takeUntil(this.unsubscribe)
                .subscribe(data => {
                    if (data.StatusCode == 200) {
                        this.toastr.success("Password changed");
                        this.modalChangePassword.hide();
                    } else {
                        this.toastr.error("there is some error on page");
                    }
                    this.loading = false;
                });
        }

    }
    confirmPasswordCheck(value, newpass) {
        if (value != newpass) {
            this.isConfirmPassword = false;
            this.isFormValid = false;
        } else {
            this.isConfirmPassword = true;
            this.isFormValid = true;
        }
    }

    passwordIsValid(value) {
        if (value != undefined && value != null && value != '') {
            this.userService.
                checkCurrentPassword(this.setting.getBaseUrl() + GLOBAL.API_CheckCurrentPassword, value)
                .takeUntil(this.unsubscribe)
                .subscribe(data => {
                    if (data.StatusCode == 200) {
                        this.isValidPassword = true;
                        this.isFormValid = true;
                    } else {
                        this.isFormValid = false;
                        this.isValidPassword = false;
                    }
                }, error => {
                });
        } else {
            this.isValidPassword = true;
        }
    }
    get newPassword() {
        return this.ChangePassword.controls["NewPassword"];
    }
    get currentPassword() {
        return this.ChangePassword.controls["CurrentPassword"];
    }
    onblur(e) {
    }
    changeLang(lang) {
        this.languageChange.changeLang(lang)
        this.currentLanguage = lang;
    }

    logout() {
        localStorage.removeItem('authenticationtoken');
        localStorage.removeItem('ng2Idle.main.expiry');
        localStorage.removeItem('ng2Idle.main.idling');
        localStorage.removeItem('UserId');
        localStorage.removeItem('UserId');
        localStorage.removeItem('UserName');
        localStorage.removeItem('SelectedVoucherNumber');
        localStorage.removeItem('SelectedVoucherCurrency');
        localStorage.removeItem('SelectedOfficeId');
        this.router.navigate(['../login']);

        this.commonService.menuVisibility = false;
        this.checkToken.emit();
        this.idle.stop();
    }
    changePassword(display: boolean) {
        // this.changepassword.clickme(true);
    }
    reset() {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
    }

    ChangePasswordModal(template: TemplateRef<any>) {
        this.modalChangePassword = this.modalService.show(
            template,
            Object.assign({}, this.config, { class: 'gray modal-lg' })
        );
    }

    currentPasswordMatch(event) {

    }
    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    toggleSideFun() {
        this._dashboard.toggleSide = !this._dashboard.toggleSide;        
    }
}