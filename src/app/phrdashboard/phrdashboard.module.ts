import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhrdashboardRoutingModule } from './phrdashboard-routing.module';
import { SharedmessageComponent } from './sharedmessage/sharedmessage.component';
import { SharedModule } from 'primeng/api';
import { MessagecontentComponent } from './sharedmessage/messagecontent/messagecontent.component';
import { PHRheaderComponent } from './phrheader/phrheader.component';
import { PHRsidebarComponent } from './phrsidebar/phrsidebar.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { MenuItem } from 'primeng/api';
import { ScheduleandappointmentComponent } from './scheduleandappointment/scheduleandappointment.component';
import { MainphrheaderComponent } from './mainphrheader/mainphrheader.component';
import { SidebarModule } from 'ng-sidebar';


import { OverlayPanelModule } from 'primeng/overlaypanel';

import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { RouterModule } from '@angular/router';
import { PHRDashboardComponent } from './phrdashboard.component';
import { MessagesidebarComponent } from './sharedmessage/messagesidebar/messagesidebar.component';
import { BookmarkedComponent } from './sharedmessage/bookmarked/bookmarked.component';
import { DashboardfooterComponent } from './dashboardfooter/dashboardfooter.component';
import { MessageappointmentComponent } from './sharedmessage/messageappointment/messageappointment.component';
import { AutomatedmessagesComponent } from './sharedmessage/automatedmessages/automatedmessages.component';
import { TrashComponent } from './sharedmessage/trash/trash.component';
import { MessagedetailsComponent } from './sharedmessage/messagedetails/messagedetails.component';
import { DialogModule } from 'primeng/dialog';
import { MessagedraftsComponent } from './sharedmessage/messagedrafts/messagedrafts.component';
import { SharedocComponent } from './sharedmessage/sharedoc/sharedoc.component';
import { EditorModule } from 'primeng/editor';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhrvitalsComponent } from './phrvitals/phrvitals.component';

import { MedicationComponent } from './medication/medication.component';
import { DataViewModule } from 'primeng/dataview';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { VisitRecordsComponent } from './visit-records/visit-records.component';
import { RadiologyComponent } from './radiology/radiology.component';
import { FamilyHistoryComponent } from './family-history/family-history.component';
import { DocumentCenterComponent } from './document-center/document-center.component';
import { PrevebtiveCareComponent } from './prevebtive-care/prevebtive-care.component';
import { MySignaturesComponent } from './my-signatures/my-signatures.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommancontrolvalidatorsComponent } from './common/commancontrolvalidators/commancontrolvalidators.component';
import { CompousemessageComponent } from './sharedmessage/compousemessage/compousemessage.component';
import { FamilyAppointmentComponent } from './family-appointment/family-appointment.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { ScheduleAnAppointmentComponent } from './schedule-an-appointment/schedule-an-appointment.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { AppointmentLetterComponent } from './appointment-letter/appointment-letter.component';
import { LetterDetailsComponent } from './letter-details/letter-details.component';
import { CareTeamProvidersComponent } from './care-team-providers/care-team-providers.component';


import { ProcedureComponent } from './procedure/procedure.component';
import { AvatarModule } from 'primeng/avatar';
import { DietComponent } from './diet/diet.component';
import { TherapiesComponent } from './therapies/therapies.component';
import { DocumentshareComponent } from './documentshare/documentshare.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FlowsheetComponent } from './flowsheet/flowsheet.component';
import { SidebarModule as new123 } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AccordionModule } from 'primeng/accordion';

import { CheckboxModule } from 'primeng/checkbox';
import { ChartModule } from 'primeng/chart';
import { MessagelabsComponent } from './sharedmessage/messagelabs/messagelabs.component';
import { MessagevaccineComponent } from './sharedmessage/messagevaccine/messagevaccine.component';
import { MessageletterComponent } from './sharedmessage/messageletter/messageletter.component';
import { SentmsgComponent } from './sharedmessage/sentmsg/sentmsg.component';
import { NewflowsheetComponent } from './newflowsheet/newflowsheet.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { LabresultComponent } from './labresult/labresult.component';
import { MessagereminderComponent } from './sharedmessage/messagereminder/messagereminder.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { PatientTaskComponent } from './patient-task/patient-task.component';
import { TableModule } from 'primeng/table';
import { PHRMaincontentComponent } from './phrmaincontent/phrmaincontent.component';

// import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [
    PHRDashboardComponent,
    SharedmessageComponent,
    MessagecontentComponent,
    PHRheaderComponent,
    PHRsidebarComponent,
    MainphrheaderComponent,
    MessagesidebarComponent,


    ScheduleandappointmentComponent,

    BookmarkedComponent,
    DashboardfooterComponent,
    MessageappointmentComponent,
    AutomatedmessagesComponent,
    TrashComponent,
    MessagedetailsComponent,
    MessagedraftsComponent,
    SharedocComponent,
    DashboardComponent,
    PhrvitalsComponent,
    MedicationComponent,
    ProcedureComponent,
    VisitRecordsComponent,
    RadiologyComponent,
    FamilyHistoryComponent,
    DocumentCenterComponent,
    PrevebtiveCareComponent,
    MessagereminderComponent,
    PatientTaskComponent,
    MySignaturesComponent, FlowsheetComponent,
    CommancontrolvalidatorsComponent, CompousemessageComponent,
    FamilyAppointmentComponent, BookAppointmentComponent, ScheduleAnAppointmentComponent, 
    AppointmentDetailsComponent, AppointmentLetterComponent,
     LetterDetailsComponent, CareTeamProvidersComponent, DietComponent, 
     ProcedureComponent, TherapiesComponent, 
     DocumentshareComponent, MessagelabsComponent, MessagevaccineComponent,
      MessageletterComponent, SentmsgComponent, NewflowsheetComponent, InvoiceComponent, 
      PharmacyComponent, VaccineComponent, LabresultComponent,PHRMaincontentComponent
  ],
  imports: [
    MultiSelectModule,
    TableModule,

    InputSwitchModule,
    ToggleButtonModule,
    CommonModule,
    OverlayPanelModule,
    AvatarModule,
    CheckboxModule,
    PhrdashboardRoutingModule,
    PanelMenuModule,
    SidebarModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    TabViewModule,
    MenuModule,
    DropdownModule,
    DialogModule,
    EditorModule,
    ProgressBarModule,
    InputTextareaModule,

    RadioButtonModule,
    DataViewModule,
    AutoCompleteModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule, InputNumberModule,
    AutoCompleteModule,
    ProgressBarModule,
    InputTextModule,
    new123,
    AccordionModule,
    ChartModule





  ],
  providers: [MessageService, ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class PhrdashboardModule { }
