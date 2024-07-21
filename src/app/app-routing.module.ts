
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthsummaryComponent } from './phrdashboard/healthsummary/healthsummary.component';

import { PHRDashboardComponent } from './phrdashboard/phrdashboard.component';
import { ScheduleandappointmentComponent } from './phrdashboard/scheduleandappointment/scheduleandappointment.component';
import { SharedmessageComponent } from './phrdashboard/sharedmessage/sharedmessage.component';
import { LoginComponent } from './shared/login/login.component';
import { RegistrationComponent } from './shared/registration/registration.component';
import { SharedComponent } from './shared/shared.component';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { DocumentviewComponent } from './shared/documentview/documentview.component';
import { AccountmanageComponent } from './shared/accountmanage/accountmanage.component';


// import { AuthguardGuard } from './services/authguard.guard';

const routes: Routes = [
  { path: '', component: SharedComponent , pathMatch: 'full',},
  // {
  //   path:'approved',
  //   canActivate:[AuthGuard],
  //   component:PHRDashboardComponent,
  // },
  { path: 'login', component: LoginComponent },
  {path :'documentview',component:DocumentviewComponent},

  {
    path:"registration",
    component:RegistrationComponent, pathMatch: 'full'
  },
  {
    path:"manageaccount",
    canActivate:[AuthGuard],
    component:AccountmanageComponent
  },

  {
    path: 'approved',
    canActivate:[AuthGuard],
    loadChildren: () => import('./phrdashboard/phrdashboard.module').then(m => m.PhrdashboardModule),
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,onSameUrlNavigation:'reload'})],
  exports: [RouterModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }
