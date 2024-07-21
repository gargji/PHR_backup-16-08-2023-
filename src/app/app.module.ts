import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AccordionModule} from 'primeng/accordion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedComponent } from './shared/shared.component';
import { HeaderComponent } from './shared/header/header.component';
import { MainframeComponent } from './shared/mainframe/mainframe.component';
import { PasswordModule } from 'primeng/password';
import { LoginComponent } from './shared/login/login.component';
import { PHRDashboardComponent } from './phrdashboard/phrdashboard.component';
// import { PHRheaderComponent } from './phrdashboard/phrheader/phrheader.component';
// import { PHRsidebarComponent } from './phrdashboard/phrsidebar/phrsidebar.component';
import { PHRMaincontentComponent } from './phrdashboard/phrmaincontent/phrmaincontent.component';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'ng-sidebar';
import { TableModule } from 'primeng/table';
// import { MainphrheaderComponent } from './phrdashboard/mainphrheader/mainphrheader.component';
import { HealthsummaryComponent } from './phrdashboard/healthsummary/healthsummary.component';
import {InputTextModule} from 'primeng/inputtext';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelMenuModule } from 'primeng/panelmenu';
import {MenuModule} from 'primeng/menu';
import { RegistrationComponent } from './shared/registration/registration.component';
// import { ScheduleandappointmentComponent } from './phrdashboard/scheduleandappointment/scheduleandappointment.component';
import {DropdownModule} from 'primeng/dropdown';
import { SidebarModule as PrimeNGSidebarModule } from 'primeng/sidebar';

// import { SharedModule } from 'primeng/api';
import { PhrdashboardModule } from './phrdashboard/phrdashboard.module';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputNumberModule} from 'primeng/inputnumber';
import { BaseComponent } from './phrdashboard/common/base.component';
import { NgxUiLoaderModule,NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import {CheckboxModule} from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { OtpverifyComponent } from './shared/otpverify/otpverify.component';
import { DocumentviewComponent } from './shared/documentview/documentview.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { AccountmanageComponent } from './shared/accountmanage/accountmanage.component';


import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

import { SocketIoModule,SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PanelModule } from 'primeng/panel';
// import { QRCodeModule } from 'angularx-qrcode';
// import { NgxSpinnerModule } from 'ngx-spinner';
// import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { InputMaskModule } from 'primeng/inputmask';

// for date picker





@NgModule({
  declarations: [
    AppComponent,
    HealthsummaryComponent,
 BaseComponent,
 RegistrationComponent,
    LoginComponent,
    MainframeComponent,
    HeaderComponent,
    FooterComponent,
    OtpverifyComponent,
    DocumentviewComponent,
    SharedComponent,
    AccountmanageComponent,
  
//  PaymentComponent,


 
   
  ],
  imports: [
    AvatarModule,
    PanelModule,
    InputMaskModule,
    RadioButtonModule,
    CommonModule,
    TableModule,
    AvatarGroupModule,
    PasswordModule,
    PrimeNGSidebarModule,
    AccordionModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule,OverlayPanelModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    HttpClientModule,
    TabViewModule,
    PanelMenuModule,
    MenuModule,
    DropdownModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    AutoCompleteModule,
    MessageModule,
    MessagesModule,
    InputNumberModule,
    CheckboxModule,
    DialogModule,
    HttpClientModule,
    ButtonModule,
    FormsModule,
    ConfirmDialogModule,
    CheckboxModule,
    CalendarModule,
    InputTextModule,
    // SharedModule,
    SocketIoModule.forRoot(environment.socketConfig),
    InputTextareaModule,

    // ProgressSpinnerModule,
    NgxUiLoaderModule,NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    }),

    
    RouterModule.forRoot([]) 
    
    // PhrdashboardModule

  ],
  providers: [MessageService, ConfirmationService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  exports:[NgxUiLoaderHttpModule, NgxUiLoaderModule],
  bootstrap: [AppComponent],


})
export class AppModule { }
