import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Subject } from 'rxjs/internal/Subject';
// import { CommanService } from 'src/app/comman.service';
import { environment } from 'src/environments/environment';
import { PatientSignaturesService } from '../../HealthRecordsServices/patient-signatures.service';
import { Router, RouterLink } from '@angular/router';
// import { MessagecenterService } from '../messagecenter.service';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-messagedetails',
  templateUrl: './messagedetails.component.html',
  styleUrls: ['./messagedetails.component.css']
})
export class MessagedetailsComponent implements OnInit {

  patientID: any;

  @Output() CancleButtonToEmit = new EventEmitter();
  eventsSubject: Subject<void> = new Subject<void>();
  
  processbarOne: number = 0;
  processbarTwo: number = 0;
  messagedata:any[]=[]
  docpath:any[]=[]
  trashmessage:string='trsh'
  display: any
  messagedocumentsdata:any[]=[]
  messagetype:string='bookmark'
  imgPath:any = environment.HttpPath
// message:string='vaibhva'
// [Conversation_id]="Conversation_id"
@Input() providername:any
@Input() Conversation_id:any
@Input() firstname:any
@Output() backbuttonToEmit=new EventEmitter();
@Input() id:any
@Input() tab:any

  displayModal: boolean = false;
  displayBasic: boolean;
  displayMmessageBox:boolean=false
  displayBasic2: boolean = false;
  displayMessageList:boolean=true;
  countmessage:any
  imagepathlist:any
  envpath: string;

  showBasicDialog() {
    this.display = true;
    this.replyMessage.patchValue({
      
    })
  }

  // showBasicDialog2() {
  //   this.display = true;
  // }
  constructor(public patientSignatures: PatientSignaturesService, private location: Location, public router: Router,public messageService:MessageService) { }

  ngOnInit(): void {
    
  console.log(this.tab,"Opened Tab");
  
  var patientid=localStorage.getItem('guid')
  console.log(patientid,'Deepak Dixit');
  this.patientID=JSON.parse(patientid || '{}')
  console.log(this.patientID, 'Deepak Dixit');



    this.getmessagedocumentsfilename();
    this.getMessagedetail();
    console.log('openSendMessage', this.replyMessage.value);
    // this.displayBasic = true;
    

    

  }
  
  // goBack(): void {
  //   this.location.back();
  // }

  // goBack(){
  //   window.history.back();
  // }
  goBack(event) { 
    this.displayMessageList=false
    this.displayMmessageBox=true
  }

  replyMessage = new FormGroup({



    To_sender: new FormControl(''),
    To_Subject: new FormControl(''),

    message: new FormControl(''),

  })
  
  getMessagedetail(){
    console.log('getMessagedetail',this.providername,this.Conversation_id,this.firstname);
    
    this.patientSignatures.getmessage_detail(this.providername,this.Conversation_id).subscribe((data:any)=>{
      this.messagedata=data;
      this.countmessage=data.length;
      var convo = []
     for (let i = 0; i < this.messagedata[0].length; i++) {
       var documents = []
      for (let j = 0; j < this.messagedata[1].length; j++) {
        
       if(this.messagedata[0][i].messageid == this.messagedata[1][j].Message_id){
        
        documents.push(this.messagedata[1][j])
       }
        
      }
      convo.push({message: this.messagedata[0][i], document: documents })
     }
     this.messagedata = convo;
     console.log(this.messagedata[0], 'msg');
     
    })
    this.envpath=environment.providerpath
  }
  getmessagedocumentsfilename(){
    console.log('getMessagedetail',this.providername,this.Conversation_id);
    
    this.patientSignatures.getmessage_documents_filename(this.Conversation_id).subscribe((data:any)=>{
      console.log('getmessagedocumentsfilename',data);
      this.messagedocumentsdata=data;
    
      
      
    })
  }
  patchmessagedata(){

  }
  // }
  Save_message_1() {
   
  }
  showBasicDialog2(){
this.display=true
  }
  boolmarkmessage(){
    
    
    this.patientSignatures.bookmark_message(this.messagetype,this.Conversation_id).subscribe((data:any)=>{
      if(data){
        this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
        this.patientSignatures.datarelodebookmarked()
      }
    
          console.log(data);
  })
}

Trashmessage(){
 
  console.log('boolmarkmessage');
  
  this.patientSignatures.Trash_message(this.trashmessage,this.Conversation_id).subscribe((data:any)=>{
  if(data){
    this.patientSignatures.datarelodebookmarked()
    this.patientSignatures.datarelode()
    this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been delete Successfully ' });
  }
        console.log(data);
})
}

cancelbutton(event:any){
  console.log(event,'cancelbutton');
  // this.replyMessage.reset();
  // this.eventsSubject.next(event);
  
}
cancelDialog(){
  console.log('cancelDialog');
  this.display=false
  this.getMessagedetail();
}

RenderComponent(guid:any,Conversation_id:any){
  
  console.log('rendercomponent11',guid,Conversation_id);
this.providername=guid;
this.Conversation_id=Conversation_id
console.log('Conversation_id',this.Conversation_id);

  this.displayMmessageBox =true;
  this.displayMessageList =false;
}

}


