import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { first, Observable } from 'rxjs';
// import { CommanService } from 'src/app/comman.service';
// import { patientSignaturesService } from '../patientSignatures.service';
import { PatientSignaturesService } from '../../HealthRecordsServices/patient-signatures.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-compousemessage',
  templateUrl: './compousemessage.component.html',
  styleUrls: ['./compousemessage.component.css']
})
export class CompousemessageComponent implements OnInit {

submit_Immunizations() {
throw new Error('Method not implemented.');
}
replyMessage:any=FormGroup
  @Input() events: Observable<void>;
  @Input() CancleButtonToEmit = new EventEmitter();
  @Output() CancleDialogtoenit = new EventEmitter();
  @Input() onhide: any
  @Input() id:any
  @Input() firstname:any
  processbarOne: number = 0;
  processbarTwo: number = 0;
  Draftmessage: any = 'PHR_Draft'
  documnentname:any
  display: any
  documents: any[] = []
  document: any[] = []
  showdocument: any[]=[]
  destinationPath:any
  uploadFiles: any[] = []
  providername: any
  @Input() Conversation_id: any
  displayModal: boolean = false;
  displayBasic: boolean;
  sender_id: any 
  displayBasic2: boolean = false;
  uniqeID1:any
  messagid:any
  formDataArray: any[] = []
  collectionPath: any[] = []
  HttpEventType: any
  patientID: any;
  hospital_ID: any;
  branchID: any;
  showBasicDialog() {
    this.displayBasic = true;

  }

  showBasicDialog2() {
    this.display = true;
  }

  constructor(public patientSignatures: PatientSignaturesService, public messageService:MessageService) { }

  ngOnInit(): void {

    this.replyMessage = new FormGroup({
      sender: new FormControl('',[Validators.required]),
     To_Subject: new FormControl('',[Validators.required]),
 
     message: new FormControl('',[Validators.required]),
     document: new FormControl(' ',[Validators.required])
   })
    console.log(this.firstname,"saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    if(this.firstname){
      this.getMasterProviderData1(this.firstname)
    }
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
    this.sender_id=this.patientID
    this.messagid =  this.newGuid();


    this.events.subscribe((event) => {

      console.log('vaibhav', event);
      if (this.replyMessage.controls['sender'].value != '' || this.replyMessage.controls['To_Subject'].value != '' || this.replyMessage.controls['message'].value != '') {
        // if(this.Conversation_id==''  || this.Conversation_id== undefined || this.Conversation_id==null){
          this.Conversation_id =  this.newGuid();
        // }

        console.log('openSendMessage1111', this.replyMessage.value, this.Conversation_id);
        this.displayBasic2 = true;
        this.patientSignatures.Draftmessage(this.replyMessage.value, this.Conversation_id, this.Draftmessage,this.patientID,this.hospital_ID,this.branchID).subscribe((data: any) => {
          if(data){
            this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
            console.log(data);
            this.patientSignatures.datarelode()
            this.replyMessage.reset();

          }
       

        })
      }
    });
    // this.patientSignatures.aClickedEvent.subscribe((data: any) => {
    //   console.log('Event message from Component A: ', data);
    //   // this.display = data;
    //   console.log('vaibhav');


    // });
    console.log('openSendMessage', this.replyMessage.value);
    // this.displayBasic = true;


  }
   newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){ 
      var r = Math.random() * 16 | 0,
      v = c == 'Y' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })
  
}
  // draftmessage(value: Partial<{ sender: string | null; To_Subject: string | null; message: string | null; }>, Conversation_id: any, draftmessage: any) {
  //   throw new Error('Method not implemented.');
  // }

  // Save_message_1(){

  // }public generateUniqSerial() {

  showPreview() {
    const inpBtn = document.getElementById('imgSelector') as HTMLInputElement;
    inpBtn.click();
  }


  uplaodedFile: any[] = []
  previewType: any
  imgData: any
  displayDialog: boolean = false
  uploadedFiles: any[] = [];

  showDialog(type = 'image', data = '') {

    this.previewType = type;
    this.imgData = data;
    this.displayDialog = true;

  }

  getMasterProviderData(event: any) {

    console.log(event.query);
    console.log(this.firstname)

    // var type = this.problemform.controls['AllergyIntoleranceType'].value;
    this.patientSignatures.getDoctor_user_registration(event.query).subscribe((data: any) => {
      console.log('REGISTATION USER  data', data);
      this.providername = data


    })
  }
  providerdata=[]
  getMasterProviderData1(event: any) {
    // Call the getDoctor_user_registration method and subscribe to the returned observable
    this.patientSignatures.getDoctor_user_registration(event).subscribe((data: any) => {
        console.log('REGISTRATION USER data', data);
        
        // Assign the data to the first element of the providername array
        this.providername = data;

        // Construct an object containing guid and firstname properties
        var providername = {
            guid: this.providername[0].guid,
            firstname: this.providername[0].firstname
            
        };
console.log(providername,'this is obj')
        // Update the sender field of the replyMessage form with the objs object
        this.replyMessage.patchValue({sender:providername})
 
    });

}

  cancelbutton(event: any) {

    this.CancleButtonToEmit.emit(event)


  }
  

  //  draftmessage(){
  //   console.log('draftmessagedraftmessagedraftmessage');
  //   if(this.replyMessage.controls['sender'].value!='')
  //  }

  fileupload(event: any) {
    console.log('fileupload', event);
    console.log('fileupload', event.target.files);
     console.log('fileupload', event.target.files.name);
    console.log('fileuploadqqq', event.target.value);
    this.uploadFiles = event.target.files;
    this.document = event.target.value;
    this.showdocument=['']
    for (let i = 0; i < this.uploadFiles.length; i++) {
      console.log('fileupload222', event.target.files[i].name);
     
  this.showdocument.push({'docu':event.target.files[i].name})
    //  this.formDataArray.push({'filepath':this.destinationPath,'filename':this.uploadFiles[i].name});
    }
    console.log('showdocument',this.showdocument);
    


    
  }
  progressBarValue: any = 0
  Save_message_1() {
    if(this.Conversation_id==''  || this.Conversation_id== undefined || this.Conversation_id==null){
      this.Conversation_id    = newGuidID();

      function newGuidID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){ 
          var r = Math.random() * 16 | 0,
          v = c == 'X' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        })
      
    }
    }
  
    // console.log('this.uploadFiles',this.uploadFiles);
    // this.documnentname=this.uploadFiles[0].FileList .name;
    console.log('documnentname',this.uploadFiles);
    
    
    if(this.uploadFiles.length==0){
      console.log(this.uploadFiles.length);
      this.uploadFilesMetadata()
    }else{
    // this.hrtreeviewComponent.displayUploadForm = false
    this.formDataArray = [];
    // this.fileUploadForm.reset();
    // this.displayProccessDialog = true;
    const formData = new FormData()
    for (let i = 0; i < this.uploadFiles.length; i++) {
      this.destinationPath = ''
      // this.formDataArray.push(this.destinationPath);
      console.log(this.formDataArray);
       this.destinationPath=this.Conversation_id+"/"+this.uploadFiles[i].name;      
      console.log("destinationPath", this.destinationPath);
      this.formDataArray.push({'filepath':this.destinationPath,'filename':this.uploadFiles[i].name});
      console.log('this.formDataArray',this.formDataArray);
      
      formData.append('DATA', this.uploadFiles[i], this.destinationPath)

      // formData.append("DICOM_FILES", this.uploadFiles[i], this.uploadFiles[i].name)
      // formData.append('DICOM_FILES', new File([this.uploadFiles[i].file], this.uploadFiles[i].name),destinationPath)

      if (i == this.uploadFiles.length - 1) {
        this.patientSignatures.uploadFileToServer(formData).subscribe((event: HttpEvent<any>) => {

          console.log(event);

          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:

              this.progressBarValue = Math.round(Math.round(event.loaded / event.total! * 100));
              console.log(`Uploaded11! ${this.progressBarValue}%`);
              this.uploadocumentsfiles();
              this.uploadFilesMetadata()
        
              break;
            case HttpEventType.Response:
              console.log('Files Uploaded Successfully!');
              this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
           
              setTimeout(() => {
                this.progressBarValue = 0;
              }, 1500);
            }
          })
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field'});
      }
    }
  }  
  }
  uploadFilesMetadata(){
   

if(this.Conversation_id==''  || this.Conversation_id== undefined || this.Conversation_id==null){

}
    console.log('');
    
    this.patientSignatures.uploadFilesmessageMetadata(this.replyMessage.value, this.Conversation_id, this.destinationPath, this.sender_id,this.messagid,this.hospital_ID,this.branchID).subscribe((data: any) => {
    if(data="success"){
      this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your Message Has Been send Successfully ' });
      console.log(data);
      this.patientSignatures.datarelode()
      this.replyMessage.reset();
      this.CancleDialogtoenit.emit()
    }     
  })
  if(this.firstname){
    this.getMasterProviderData1(this.firstname)
  }
}

uploadocumentsfiles(){
  this.patientSignatures.uploadocumentsfiles(this.formDataArray, this.Conversation_id, this.sender_id,this.replyMessage.value,this.messagid).subscribe((data: any) => {
    console.log(data);

})
}
deleteshowdocuments(){ 
  this.showdocument=['']
  console.log('deleteshowdocuments');
  

}
// patchvalue(){
//   console.log("310",this.Conversation_id)

  
// }
}


