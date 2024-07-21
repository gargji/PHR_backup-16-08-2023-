import { Component, OnInit } from '@angular/core';
import { PatientSignaturesService } from '../../HealthRecordsServices/patient-signatures.service';

@Component({
  selector: 'app-messagereminder',
  templateUrl: './messagereminder.component.html',
  styleUrls: ['./messagereminder.component.css']
})
export class MessagereminderComponent implements OnInit {
  appointmentdata:any
  message:string='appointment'
  Conversation_id:any
  providername:any
  displayMmessageBox:boolean=false
  displayMessageList:boolean=true
  appointmetcount:any
   constructor( public patientSignatures:PatientSignaturesService) { }
 
   ngOnInit(): void {
     this.getappointmentData();
   }
   appointmentmessage:any
   messagedatainbox:any
   messagelength:any
   getappointmentData(){
     // console.log('Conversation_id',this.Conversation_id);
     // console.log('firstname',this.Conversation_id);
     // this.patientSignatures.get_appointment_Data(this.message).subscribe((data:any)=>{
     //   console.log('get_appointment_Data',data);
     //   this.appointmentdata=data;
     //   this.appointmetcount=data.length; 
     // })
   this.messagedatainbox=this.patientSignatures.messagecontanddata.filter(message => message.Message_type =="Reminder")
   this.messagelength= this.messagedatainbox.length
   console.log( this.messagedatainbox)
   }
   RenderComponent(guid:any,Conversation_id:any){
     console.log('rendercomponent11',guid,Conversation_id);
 this.providername=guid;
 this.Conversation_id=Conversation_id
 console.log('Conversation_id',this.Conversation_id);
     this.displayMmessageBox =true;
     this.displayMessageList =false;
    //  this.appointmentmessage=this.patientSignatures.messagecontanddata
    //  console.log(this.appointmentmessage,this.patientSignatures.messagecontanddata);
   }
 }
 
 
