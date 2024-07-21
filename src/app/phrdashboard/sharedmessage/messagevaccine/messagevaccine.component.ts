import { Component, OnInit } from '@angular/core';
import { PatientSignaturesService } from '../../HealthRecordsServices/patient-signatures.service';

@Component({
  selector: 'app-messagevaccine',
  templateUrl: './messagevaccine.component.html',
  styleUrls: ['./messagevaccine.component.css']
})
export class MessagevaccineComponent implements OnInit {
  appointmentdata:any
 message:string='appointment'
 Conversation_id:any
 providername:any
 displayMmessageBox:boolean=false
 displayMessageList:boolean=true
 appointmetcount:any
 messagedatainbox:any
  constructor(private patientSignatures:PatientSignaturesService) { }
  ngOnInit(): void {
    this.messagedatainbox=this.patientSignatures.messagecontanddata.filter(message => message.Message_type =="immunization")
    this.appointmetcount=this.messagedatainbox.length
  }
  RenderComponent(guid:any,Conversation_id:any){
    console.log('rendercomponent11',guid,Conversation_id);
this.providername=guid;
this.Conversation_id=Conversation_id
console.log('Conversation_id',this.Conversation_id);
    this.displayMmessageBox =true;
    this.displayMessageList =false;
    // this.appointmentmessage=this.patientSignatures.messagecontanddata
    // console.log(this.appointmentmessage,this.patientSignatures.messagecontanddata);
    // this.messagedatainbox=this.patientSignatures.messagecontanddata.filter(message => message.Message_type =="order")

  }
}
