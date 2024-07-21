import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Subject } from 'rxjs/internal/Subject';
// import { CommanService } from 'src/app/comman.service';
import { environment } from 'src/environments/environment';
// import { PatientSignaturesService } from '../../HealthRecordsServices/patient-signatures.service';
import { Router, RouterLink } from '@angular/router';
// import { MessagecenterService } from '../messagecenter.service';
import { Location } from '@angular/common';
import { PatientSignaturesService } from '../HealthRecordsServices/patient-signatures.service';

@Component({
  selector: 'app-sharedmessage',
  templateUrl: './sharedmessage.component.html',
  styleUrls: ['./sharedmessage.component.css']
})
export class SharedmessageComponent implements OnInit {


  
  message:any='Inbox'
  displayBasic3:boolean=false

  
  public _opened: boolean = true;
  patientID: any;
  hospital_ID: any;
  branchID: any;
  messagecounts: any;
  messagedatainbox: any;
  bookmarkdata: any;
  eventsSubject: Subject<void> = new Subject<void>();
  draftdata: any;
  drafts:any='PHR_Draft'
  messagetrashtlength: any;
  bookmarkmessagecount: any;
  sentdata: any;
  public _toggleSidebar() {


    this._opened = !this._opened;

    
  }

  constructor(public patientSignatures:PatientSignaturesService) { }

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
    this.getMessageInboxdetail()

    this.patientSignatures.measagedataload.subscribe((data)=>{

      this.getMessageInboxdetail();
    })

  }

  openClickedComponent(optionValue:any){
    console.log(optionValue);
  this.message = optionValue;
  console.log(this.message);
  
  }
  showBasicDialog2()
{
this.displayBasic3=true;
}
shouldDrafted:boolean=true;
cancelDialog(){
  this.displayBasic3=false;
  this.shouldDrafted=false;
}
backbutton(event){
  console.log('vaibhav');
  
  this.message='draft'
}

// HealthIssues(event:any){

//   this.replyMessage.reset();
//   }
// onDialogClosed() {
//   // Code to handle the event when the dialog is closed
//   console.log('Dialog closed');
//   // You can add any other logic here
// }
closesidebar(){
 this._opened=false
}
toggleSubMenu(subMenuId: string) {
  const subMenu = document.getElementById(subMenuId);
  if (subMenu) {
      subMenu.classList.toggle('show');
  }
}



// for data length
messagedatvaccine:any[]=[]
messagevaccinecounts:any
messagedatappointments:any[]=[]
messageappointmentscounts:any
messageordercounts:any
messagedatorder:any[]=[]
messagedatreminder:any[]=[]
messageremindercounts:any
getMessageInboxdetail(){

  
  this.patientSignatures.getMessage_Inboxdetail(this.patientID).subscribe((data:any)=>{
    console.log('getMessageInboxdetail',data);
    this.messagedatainbox=data;
    // this.messagecounts=data.filter(message => message.draft !="PHR_Draft").length;
    this.messagecounts=this.messagedatainbox.length
    this.messagedatvaccine=this.messagedatainbox.filter(message => message.Message_type =="immunization")
    this.messagevaccinecounts=this.messagedatvaccine.length
    this.messagedatappointments=this.messagedatainbox.filter(message => message.Message_type =="appointments")
    this.messageappointmentscounts=this.messagedatappointments.length
    this.messagedatorder=this.messagedatainbox.filter(message => message.Message_type =="order")
    this.messageordercounts=this.messagedatorder.length
    this.messagedatreminder=this.messagedatainbox.filter(message => message.Message_type =="Reminder")
    this.messageremindercounts=this.messagedatreminder.length
    console.log(this.messagedatreminder,"sssssssssssssssssssss")
    // console.log(this.messagedatainbox)
    // Assuming this.messagedatainbox is an array of message objects

// Filter the data based on the condition
// this. bookmarkdata = (this.messagedatainbox.filter(message => message.Bookmark_by_phr === 1)).length
// this.draftdata=(this.messagedatainbox.filter(message => message.draft === 'PHR_Draft')).length
// Now filteredData contains only the messages where send_by_phr is equal to 1



    
  })
  this.getdrafMessagedetail()
  this.trashdata()
  this.getBookMarkedData()
  this.getsentmsg()
}
onDialogClosed(event,callled){
  if(this.shouldDrafted){
    this.eventsSubject.next(event);
  }
  this.shouldDrafted=true;
}
getdrafMessagedetail(){
    
    
  this.patientSignatures.getmessagedraft_detail(this.drafts,this.patientID).subscribe((data:any)=>{
   
    // this.messagedraftdata=data;
    this.draftdata=data.length
    console.log('getMessagedetail',data);
    
    
    
  })
}
trshmessage:string='trsh'
trashdata(){
  this.patientSignatures.getTrashmessage_detail(this.trshmessage,this.patientID).subscribe((data:any)=>{
    console.log('getTrashMessagedetail1111',data);
    // this.trashmessagedata=data;
    this.messagetrashtlength=data.length
    // this.messagecounts=data.length;
  })
}
getBookMarkedData(){

  this.patientSignatures.get_BookMarked_Datalength(this.patientID).subscribe((data:any)=>{

  
    this.bookmarkdata=data.length
    
    
  })
  
}
getsentmsg(){
    
    
  this.patientSignatures.getsentmsg(this.patientID).subscribe((data:any)=>{
   
    this.sentdata=data.length;
    // this.messagedraftlength=
    console.log('getMessagedetail',data);
    
    
    
  })
}

}
