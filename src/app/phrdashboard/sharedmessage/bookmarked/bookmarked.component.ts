import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
// import { CommanService } from 'src/app/comman.service';
// import { MessagecenterService } from '../messagecenter.service';
import { PatientSignaturesService } from '../../HealthRecordsServices/patient-signatures.service';


@Component({
  selector: 'app-bookmarked',
  templateUrl: './bookmarked.component.html',
  styleUrls: ['./bookmarked.component.css']
})
export class BookmarkedComponent implements OnInit {
  @Input() Conversation_id:any
  bookmarkeddata:any
  providername:any
  displayMmessageBox:boolean=false
  displayMessageList:boolean=true
  bookmarkmessagecount:any

  message:string='bookmark'
  patientID: any;
  hospital_ID: any;
  branchID: any;

  constructor( public patientSignatures:PatientSignaturesService) { }

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
    this.getBookMarkedData();
    this.patientSignatures.measagedataload.subscribe((data)=>{
      
      this.getBookMarkedData();
    })
  }
  getBookMarkedData(){
    console.log('Conversation_id',this.Conversation_id);
    console.log('firstname',this.Conversation_id);
    
    this.patientSignatures.get_BookMarked_Data(this.message,this.Conversation_id,this.patientID).subscribe((data:any)=>{
      console.log('getBookMarkedData',data);
      this.bookmarkeddata=data;
      this.bookmarkmessagecount=data.length
      
      
    })
    
  }
  firstname: any;
  RenderComponent(guid:any,Conversation_id:any,firstName){
    console.log('rendercomponent11',guid,Conversation_id);
this.providername=guid;
this.Conversation_id=Conversation_id
this.firstname=firstName
console.log('Conversation_id',this.Conversation_id);

    this.displayMmessageBox =true;
    this.displayMessageList =false;
  }
}
