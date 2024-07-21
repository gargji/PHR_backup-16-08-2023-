import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
// import { CommanService } from 'src/app/comman.service';
import { MessagecenterService } from '../messagecenter.service';
import { PatientSignaturesService } from '../../HealthRecordsServices/patient-signatures.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-messagecontent',
  templateUrl: './messagecontent.component.html',
  styleUrls: ['./messagecontent.component.css']
})
export class MessagecontentComponent implements OnInit {
  messagedatainbox:any
  providername:any
  @Input() _opened:any
  Conversation_id:any
  messagecounts:any
  modal:boolean=false;
  id:any
  displayMessageList: boolean =true;
  displayMmessageBox: boolean =false
  imgPath:any = environment.HttpPath
  patientID: any;
  hospital_ID: any;
  branchID: any;
  message: string;
  firstname: any;
  searchText: string;
  filteredEmployees: any;
  filteredMessages: any[];
  constructor(public patientSignatures:PatientSignaturesService) { }

  ngOnInit(): void {
  
    
console.log(this._opened)
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
    this.getMessageInboxdetail();
    this.patientSignatures.measagedataload.subscribe((data)=>{

      this.getMessageInboxdetail();
    })
  }
  getMessageInboxdetail(){
    var str = "Transaction_Time"; 
    var splitted = str.split(" ", 1); 
       console.log(splitted)
       console.log(this.patientID,'getMessageInboxdetail11111111111111111111111');
       this.patientSignatures.getMessage_Inboxdetail(this.patientID).subscribe((data:any)=>{
      console.log('getMessageInboxdetail',data);
      this.messagedatainbox=  data.filter(message => message.draft !="PHR_Draft")
      // this.messagedatainbox=data;
      this.messagecounts=  this.messagedatainbox.length;
      this.patientSignatures.messagecontanddata= this.messagedatainbox
      
    })
  }
  RenderComponent(guid:any,Conversation_id:any,id:any,firstname:any){
    
    console.log('rendercomponent11',guid,Conversation_id);
this.providername=guid;
this.Conversation_id=Conversation_id
this.id=id
this.firstname=firstname
console.log('Conversation_id',this.firstname);

    this.displayMmessageBox =true;
    this.displayMessageList =false;
  }
  backbutton(event){
    console.log('vaibhav');
    
    this.message='Inbox'
  }

// for delete 
  deletemsg(data){
console.log(data)
  }


 



    
  // searchKey(data: string) {
  //   console.log("i")
  //   this.searchText = data;
  //   this.search();
  // }

  // search() {
  //   this.filteredEmployees = this.searchText === ""? this.messagedatainbox : this.messagedatainbox.filter((element) => {
  //     return element.FirstName.toLowerCase() == this.searchText.toLowerCase();
  //   });
  // }

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

    this.filteredMessages=  this.messagedatainbox.filter(message => message.FirstName ==this.searchText)
    console.log( this.filteredMessages)
    this.filteredMessages=this.messagedatainbox
  }
}

