import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { PatientSignaturesService } from '../../HealthRecordsServices/patient-signatures.service';
// import { CommanService } from 'src/app/comman.service';
// import { MessagecenterService } from '../messagecenter.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  trshmessage:string='trsh'
  messagedata:any
  providername:any
  Conversation_id:any
  trashmessagedata:any
  messagetrashtlength:any
  messagecounts:any
  displayMmessageBox:boolean=false;
  displayMessageList:boolean=true;
  patientID: any;
  hospital_ID: any;
  branchID: any;
  constructor(private patientSignatures:PatientSignaturesService) { }

  ngOnInit(): void {
    var patientid = localStorage.getItem('guid')
    console.log(patientid);
    this.patientID = JSON.parse(patientid || '{}')
    console.log(this.patientID);
    var hospital_id = localStorage.getItem('organization_id')
    console.log(hospital_id, "hospital id");
    this.hospital_ID = JSON.parse(hospital_id || '{}')
    console.log(this.hospital_ID)
    var branch_id = localStorage.getItem('hospital_id')
    this.branchID = JSON.parse(branch_id || '{}')
    console.log(this.branchID)
    this.getTrashMessagedetail();  }
  getTrashMessagedetail(){
    console.log('getTrashMessagedetail22 22'); 
    
    this.patientSignatures.getTrashmessage_detail(this.trshmessage,this.patientID).subscribe((data:any)=>{
      console.log('getTrashMessagedetail1111',data);
      this.trashmessagedata=data;
      this.messagetrashtlength=data.length
      this.messagecounts=data.length;
    })
  }
  RenderComponent(guid:any,Conversation_id:any){
    console.log('rendercomponent11',guid,Conversation_id);
this.providername=guid;
this.Conversation_id=Conversation_id
console.log('Conversation_id',this.Conversation_id);

    this.displayMmessageBox =true;
    this.displayMessageList =false;
  }

  deletealldata(){
    console.log(this.trashmessagedata)
    for (let index = 0; index < this.trashmessagedata.length; index++) {
      const element = this.trashmessagedata[index];
      this.patientSignatures.trashclear(this.trashmessagedata[index].id).subscribe((data)=>{
        this.patientSignatures.datarelode()

      })
      
    }
  }
}
