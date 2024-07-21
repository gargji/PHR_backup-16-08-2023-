import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
// import { CommanService } from 'src/app/comman.service';
// import { MessagecenterService } from '../messagecenter.service';
import { PatientSignaturesService } from '../../HealthRecordsServices/patient-signatures.service';

@Component({
  selector: 'app-messageappointment',
  templateUrl: './messageappointment.component.html',
  styleUrls: ['./messageappointment.component.css']
})
export class MessageappointmentComponent implements OnInit {
 appointmentdata:any
 message:string='appointment'
 Conversation_id:any
 providername:any
 displayMmessageBox:boolean=false
 @Output() backbuttonToEmit=new EventEmitter();
 displayMessageList:boolean=true
 appointmetcount:any
  constructor( public patientSignatures:PatientSignaturesService) { }

  ngOnInit(): void {
    this.getappointmentData();
    this.patientSignatures.measagedataload.subscribe((data)=>{

      this.getappointmentData();
    })
  }
  appointmentmessage:any
  messagedatainbox:any
  getappointmentData(){
    // console.log('Conversation_id',this.Conversation_id);
    // console.log('firstname',this.Conversation_id);
    // this.patientSignatures.get_appointment_Data(this.message).subscribe((data:any)=>{
    //   console.log('get_appointment_Data',data);
    //   this.appointmentdata=data;
    //   this.appointmetcount=data.length; 
    // })

  this.messagedatainbox=this.patientSignatures.messagecontanddata.filter(message => message.Message_type =="appointments")
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

  }
// }

// RenderComponent2(guid:any,Conversation_id:any,firstName){
//   console.log('rendercomponent11',guid,Conversation_id);
// this.providername=guid;
// this.Conversation_id=Conversation_id
// this.firstname=firstName
// console.log('Conversation_id',this.Conversation_id);

//   this.displayMmessageBox =true;
//   this.displayMessageList =false;
// }
}