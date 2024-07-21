import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentCenterComponent } from './document-center/document-center.component';
import { FamilyHistoryComponent } from './family-history/family-history.component';
import { HealthsummaryComponent } from './healthsummary/healthsummary.component';
import { MedicationComponent } from './medication/medication.component';
import { MySignaturesComponent } from './my-signatures/my-signatures.component';
import { PHRDashboardComponent } from './phrdashboard.component';
import { PHRMaincontentComponent } from './phrmaincontent/phrmaincontent.component';
import { PhrvitalsComponent } from './phrvitals/phrvitals.component';
import { PrevebtiveCareComponent } from './prevebtive-care/prevebtive-care.component';
import { RadiologyComponent } from './radiology/radiology.component';
import { AutomatedmessagesComponent } from './sharedmessage/automatedmessages/automatedmessages.component';
import { BookmarkedComponent } from './sharedmessage/bookmarked/bookmarked.component';
import { MessageappointmentComponent } from './sharedmessage/messageappointment/messageappointment.component';

import { MessagecontentComponent } from './sharedmessage/messagecontent/messagecontent.component';
import { MessagedetailsComponent } from './sharedmessage/messagedetails/messagedetails.component';
import { MessagedraftsComponent } from './sharedmessage/messagedrafts/messagedrafts.component';
import { SharedmessageComponent } from './sharedmessage/sharedmessage.component';
import { SharedocComponent } from './sharedmessage/sharedoc/sharedoc.component';
import { TrashComponent } from './sharedmessage/trash/trash.component';
import { VisitRecordsComponent } from './visit-records/visit-records.component';
import { CompousemessageComponent } from './sharedmessage/compousemessage/compousemessage.component';
import { FamilyAppointmentComponent } from './family-appointment/family-appointment.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { ScheduleAnAppointmentComponent } from './schedule-an-appointment/schedule-an-appointment.component';
import { AppointmentLetterComponent } from './appointment-letter/appointment-letter.component';
import { LetterDetailsComponent } from './letter-details/letter-details.component';
import { CareTeamProvidersComponent } from './care-team-providers/care-team-providers.component';

import { ProcedureComponent } from './procedure/procedure.component';
import { DietComponent } from './diet/diet.component';
import { TherapiesComponent } from './therapies/therapies.component';
import { DocumentshareComponent } from './documentshare/documentshare.component';
import { FlowsheetComponent } from './flowsheet/flowsheet.component';

import { NewflowsheetComponent } from './newflowsheet/newflowsheet.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { LabresultComponent } from './labresult/labresult.component';
import { PatientTaskComponent } from './patient-task/patient-task.component';

const phRDashboardroutes: Routes = [
{
  path: '',component:PHRDashboardComponent,
  
  // component: PHRDashboardComponent,
    children: [
      { path: '', component: PHRMaincontentComponent },
      {path:'newflowsheet',component:NewflowsheetComponent},
      { path: 'healthSummery', component: HealthsummaryComponent},
      {path:'documentshare',component:DocumentshareComponent},
      { path: 'massage', component: SharedmessageComponent},
      // {path: 'sharemassge',component:SharedmessageComponent},
      {path: 'starred', component:BookmarkedComponent},
      {path:'appointment', component:MessageappointmentComponent},
      {path:'reminder', component:AutomatedmessagesComponent},
      {path:'trash', component:TrashComponent},
      {path:'messagedetails',component:MessagedetailsComponent},
      {path:'drafts',component:MessagedraftsComponent},
      {path:'sharedocument',component:SharedocComponent},
      {path:'dashboard', component:DashboardComponent},
      {path:'vitals',component:PhrvitalsComponent},
      {path:'flowsheet',component:FlowsheetComponent},
      {path:'medication', component:MedicationComponent},
      {path:'procedure',component:ProcedureComponent},
      {path:'Diet',component:DietComponent},
      {path:'Therapies',component:TherapiesComponent},
      // {path:'Visit_Records', component: VisitRecordsComponent,canActivate: [AuthGuard],},
      {path:'Visit_Records', component: VisitRecordsComponent},
      {path:'radiology', component:RadiologyComponent},
      {path:'Family_History', component:FamilyHistoryComponent},
      {path:'document_center', component:DocumentCenterComponent},
      {path:'prevebtive_care', component:PrevebtiveCareComponent},
      {path:'my_signatures', component:MySignaturesComponent},
      {path:'compose_message',component:CompousemessageComponent},
      {path:'family_appointment', component:FamilyAppointmentComponent},
      {path:'book_appointment', component:BookAppointmentComponent},
      {path:'appointment_details', component:AppointmentDetailsComponent},
      {path:'schedule_an_appointment', component:ScheduleAnAppointmentComponent},
      {path:'appointment_letter', component:AppointmentLetterComponent},
      {path:'letter_details',component:LetterDetailsComponent},
      {path:'careteamprovider', component:CareTeamProvidersComponent},
      // {path:'manageaccount/:id',component:AccountmanageComponent},
      {path:'Invoice',component:InvoiceComponent},
      {path:'pharmacy',component:PharmacyComponent},
      {path:'labresult&order',component:LabresultComponent},
      {path:"task",component:PatientTaskComponent}
    ]
  }


 
];


// for customized web
// console.log(JSON.parse(localStorage.getItem('visit_summary')))
// if(JSON.parse(localStorage.getItem('visit_summary'))==1){
  
//   console.log("eeeeeeeeeeeeee"  ,phRDashboardroutes[0].children)
//   phRDashboardroutes[0].children.push( {path:'Visit_Records', component: VisitRecordsComponent})
//   console.log("after push"  ,phRDashboardroutes[0].children)
// }
// else{
//   console.log("condition fail")
// }

@NgModule({
  imports: [RouterModule.forChild(phRDashboardroutes)],

  exports: [RouterModule],
  
})


export class PhrdashboardRoutingModule { }
