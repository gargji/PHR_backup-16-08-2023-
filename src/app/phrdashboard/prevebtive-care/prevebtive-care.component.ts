import { Component, OnInit } from '@angular/core';
import { PatientSignaturesService } from '../HealthRecordsServices/patient-signatures.service';

@Component({
  selector: 'app-prevebtive-care',
  templateUrl: './prevebtive-care.component.html',
  styleUrls: ['./prevebtive-care.component.css']
})
export class PrevebtiveCareComponent implements OnInit {
  patientID:any
  hospital_ID:any
  branchID:any
  constructor(private commanservice:PatientSignaturesService) { }

  ngOnInit(): void {
    var patientid=localStorage.getItem('guid')
  console.log(patientid);
  this.patientID=JSON.parse(patientid || '{}')
  console.log(this.patientID);
  var hospital_id=localStorage.getItem('organization_id')
  console.log(hospital_id,"hospital id");
 this.hospital_ID=JSON.parse(hospital_id || '{}')
   console.log(this.hospital_ID)
   var branch_id=localStorage.getItem('hospital_id')
   this.branchID=JSON.parse(branch_id || '{}')
console.log(this.branchID)
this.gettransation_healthyreminderdata();
this.getvaccinedata()
  }
  reminderdatahealthy:any
  healthyreminderdatahistorical:any
  gettransation_healthyreminderdata() {
    this.commanservice.getmasterreminderdata(this.patientID).subscribe((data: any) => {
      // this.reminderdatahealthy = data
      this.reminderdatahealthy = data.filter(key => key.Status == null);
      this.healthyreminderdatahistorical = data.filter(key => key.Status == 'Refused' || key.Status == 'Cancel Permanently' || key.Status == 'Satisfield elsewhere');
    })
  }
  vaccinedata:any
  vaccinedataother:any
  getvaccinedata() {
    this.commanservice.getvaccinedata(this.patientID).subscribe((data: any) => {
      // this.reminderdatahealthy = data
      this.vaccinedata = data.filter(key => key.status == null);
      this.vaccinedataother = data.filter(key => key.status != null);
      
    })
  }
}
