import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Subject } from 'rxjs/internal/Subject';
// import { PatientSignaturesService } from '../HealthRecordsServices/patient-signatures.service';
// import { CommanService } from 'src/app/comman.service';

// import { MessagecenterService } from '../messagecenter.service';
import { PatientSignaturesService } from '../../HealthRecordsServices/patient-signatures.service';

@Component({
  selector: 'app-automatedmessages',
  templateUrl: './automatedmessages.component.html',
  styleUrls: ['./automatedmessages.component.css']
})
export class AutomatedmessagesComponent implements OnInit {
  remindermessage:any
  RiminderData:any='reminder'
  messageappintmentlength:any
  constructor(public patientSignatures:PatientSignaturesService) { }

  ngOnInit(): void {
    this.getRiminderdata();
  }
getRiminderdata(){
  this.patientSignatures.get_Riminder_data(this.RiminderData).subscribe((data:any)=>{
    console.log('getRiminderdata11',data);
    this.remindermessage=data;
    this.messageappintmentlength=data.length;
    // this.countmessage=data.length;
    
  }) 
}
}
