import { Component, Input, OnInit } from '@angular/core';
import { PatientSignaturesService } from '../../HealthRecordsServices/patient-signatures.service';

@Component({
  selector: 'app-sentmsg',
  templateUrl: './sentmsg.component.html',
  styleUrls: ['./sentmsg.component.css']
})
export class SentmsgComponent implements OnInit {
  patientID: any;
  hospital_ID: any;
  branchID: any;
  messagedraftdata:any
  displayMmessageBox:boolean=false
  displayMessageList:boolean=true
  @Input() Conversation_id:any
  providername:any
  messagedraftlength:any
  drafts:any='PHR_Draft'
  filteredMessages: any;
  searchText: any;
  firstname:any
  constructor(public patientSignatures: PatientSignaturesService) { }

  ngOnInit(): void {
    var patientid = localStorage.getItem('guid')

    this.patientID = JSON.parse(patientid || '{}')
  
    var hospital_id = localStorage.getItem('organization_id')
 
    this.hospital_ID = JSON.parse(hospital_id || '{}')
 
    var branch_id = localStorage.getItem('hospital_id')
    this.branchID = JSON.parse(branch_id || '{}')

    this.getsentmsg();
    this.patientSignatures.measagedataload.subscribe((data)=>{
      
      this.getsentmsg();
    })
  }
  getsentmsg(){
    
    
    this.patientSignatures.getsentmsg(this.patientID).subscribe((data:any)=>{
     
      this.messagedraftdata=data;
      this.messagedraftlength=data.length
      console.log('getMessagedetail',data);
      
      
      
    })
  }
  RenderComponent(guid:any,Conversation_id:any,firstName:any){
    console.log(Conversation_id,)
    console.log('rendercomponent11',guid,Conversation_id);
this.providername=guid;
this.Conversation_id=Conversation_id
this.firstname=firstName
console.log('Conversation_id',this.Conversation_id);
    
    this.displayMmessageBox =true;
    this.displayMessageList =false;
  }
  applyFilter() {
    console.log('hit')
    
    // If searchText is empty, reset filteredMessages to original messagedatainbox
    
    // if (!this.searchText.trim()) {
    //   this.filteredMessages = [...this.messagedatainbox];
    //   return;
    // }

    // Filter messagedatainbox based on searchText
    // this.filteredMessages = this.messagedatainbox.filter(element =>
    //    element.FirstName== this.searchText
    //   // console.log(    this.filteredMessages)
    //   // message.text.toLowerCase().includes(this.searchText.toLowerCase())
    // );

    this.filteredMessages=  this.messagedraftdata.filter(message => message.firstname ==this.searchText)
    console.log( this.filteredMessages)

    this.filteredMessages=this.messagedraftdata
  }
}


