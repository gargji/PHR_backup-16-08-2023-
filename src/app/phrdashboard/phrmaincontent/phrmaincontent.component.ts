import { Component, OnInit } from '@angular/core';
import { PatientSignaturesService } from '../HealthRecordsServices/patient-signatures.service';
import { Router } from '@angular/router';
import { PatientMessageService } from 'src/app/Services/patient-message.service';
// import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phrmaincontent',
  templateUrl: './phrmaincontent.component.html',
  styleUrls: ['./phrmaincontent.component.css'],
  // providers:[DatePipe]/
})
export class PHRMaincontentComponent implements OnInit {
  patientID: string;
  hospitalID: string;
  branchID: string;
  loginPatientDetails: any;
  appointmentAllRecords: any;
  appointmentDataRecords: any;
  appointmentLength: number;
  reminderAllRecords: any;
  reminderAllRecordsLength: number;
  orderAllRecords: any;
  orderAllRecordsLength: number;
  vaccineAllRecords: any;
  vaccineAllRecordsLength: number;
  appointmentRecords: any;
  username: any;

  constructor(
   
    private patientSignatureService: PatientSignaturesService,
    private router: Router,
    private patientMessageServices: PatientMessageService,

  ) { }

  ngOnInit(): void {
    
    this.getLocalStorageDetails();
    this.getPatientAppointmentDetails();
    this.getPatientReminderDetails();
    this.getPatientOrderDetails();
    this.getPatientVaccineDetails();
  }

  getLocalStorageDetails() {
    var patient_Id = localStorage.getItem('guid');
    this.patientID = JSON.parse(patient_Id || '{}');
    var hospital_Id = localStorage.getItem('organization_id');
    this.hospitalID = JSON.parse(hospital_Id || '{}');
    var branch_Id = localStorage.getItem('hospital_Id');
    this.branchID = JSON.parse(branch_Id || '{}');
    this. username=JSON.parse(localStorage.getItem('user_name'))
    console.log(this.username)
  }

  getPatientAppointmentDetails() {
    this.patientSignatureService.getMessage_Inboxdetail(this.patientID).subscribe((res) => {
      this.appointmentAllRecords = res;
      this.appointmentDataRecords = this.appointmentAllRecords.filter((data: any) => data.Message_type == "appointments");
      console.log(this.appointmentDataRecords.length,"appointmentDataRecords")
      this.appointmentDataRecords.sort((a: any, b: any) => {
        const dateA = new Date(a.start_date);
        const dateB = new Date(b.start_date);
        return dateB.getTime() - dateA.getTime();
      });
      this.appointmentLength = this.appointmentDataRecords?.length;
      this.appointmentRecords = this.appointmentDataRecords[0];

      console.log(this.appointmentLength,"appointmentLength")
      if (this.appointmentLength > 0) {
        this.loginPatientDetails = this.appointmentDataRecords[0];
      } else {
        this.loginPatientDetails = null;
      }
    });
  }

  getPatientReminderDetails() {
    let type = "Reminder";
    const payload = {
      type, patientID: this.patientID
    }
    this.patientMessageServices.getPatientMessageRecords(payload).subscribe((res: any) => {
      this.reminderAllRecords = res[0];
      this.reminderAllRecordsLength = res.length;
    })
  }

  getPatientOrderDetails() {
    let type = "order";
    const payload = {
      type, patientID: this.patientID
    }
    this.patientMessageServices.getPatientMessageRecords(payload).subscribe((res: any) => {
      this.orderAllRecords = res[0];
      this.orderAllRecordsLength = res.length;
    })
  }

  getPatientVaccineDetails() {
    let type = "immunization";
    const payload = {
      type, patientID: this.patientID
    }
    this.patientMessageServices.getPatientMessageRecords(payload).subscribe((res: any) => {
      this.vaccineAllRecords = res[0];
      this.vaccineAllRecordsLength = res.length;
    })
  }

  viewAllAppointmentNavigate() {
    this.router.navigate(['/approved/massage']);
  }
  viewAllReminderNavigate() {
    this.router.navigate(['/approved/massage']);
  }
  viewAllOrderNavigate() {
    this.router.navigate(['/approved/massage']);
  }

}