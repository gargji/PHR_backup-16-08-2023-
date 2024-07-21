import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Subject } from 'rxjs/internal/Subject';
// import { CommanService } from 'src/app/comman.service';
import { MessagecenterService } from '../messagecenter.service';
import { PatientSignaturesService } from '../../HealthRecordsServices/patient-signatures.service';

@Component({
  selector: 'app-messagedrafts',
  templateUrl: './messagedrafts.component.html',
  styleUrls: ['./messagedrafts.component.css']
})
export class MessagedraftsComponent implements OnInit {
  messagedraftdata:any
  displayMmessageBox:boolean=false
  displayMessageList:boolean=true
  @Input() Conversation_id:any
  providername:any
  messagedraftlength:any
  drafts:any='PHR_Draft'
  patientID: any;
  hospital_ID: any;
  branchID: any;

  constructor(public patientSignatures: PatientSignaturesService) { }

  ngOnInit(): void {
    var patientid = localStorage.getItem('guid')

    this.patientID = JSON.parse(patientid || '{}')
  
    var hospital_id = localStorage.getItem('organization_id')
 
    this.hospital_ID = JSON.parse(hospital_id || '{}')
 
    var branch_id = localStorage.getItem('hospital_id')
    this.branchID = JSON.parse(branch_id || '{}')

    this.getdrafMessagedetail();
    this.patientSignatures.measagedataload.subscribe((data)=>{
      
      this.getdrafMessagedetail();
    })
  }
  getdrafMessagedetail(){
    
    
    this.patientSignatures.getmessagedraft_detail(this.drafts,this.patientID).subscribe((data:any)=>{
     
      this.messagedraftdata=data;
      this.messagedraftlength=data.length
      console.log('getMessagedetail',data);
      
      
      
    })
  }
  RenderComponent(guid:any,Conversation_id:any){
    console.log(Conversation_id,)
    console.log('rendercomponent11',guid,Conversation_id);
this.providername=guid;
this.Conversation_id=Conversation_id
console.log('Conversation_id',this.Conversation_id);
    
    this.displayMmessageBox =true;
    this.displayMessageList =false;
  }
}
