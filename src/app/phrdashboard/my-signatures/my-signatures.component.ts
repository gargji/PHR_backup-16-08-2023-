import {
  Component,
  ElementRef,
  VERSION,
  ViewChild,
  OnInit
} from "@angular/core";
import { PatientSignaturesService } from '../HealthRecordsServices/patient-signatures.service';
import { FormControl,FormBuilder,FormControlName,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import {MessageService} from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import SignaturePad from "signature_pad";
@Component({
  selector: 'app-my-signatures',
  templateUrl: './my-signatures.component.html',
  styleUrls: ['./my-signatures.component.css'],
  host: {
    '(keyup.ctrl.k)': 'clear()'
  }
})


export class MySignaturesComponent implements OnInit {
  display:boolean=false
  //  file upload from malar
  name = "Angular " + VERSION.major;
  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  sig: SignaturePad;

  patientsignatureshowdata:any;
  patientsignaturelength:any;
  displayBasic: boolean = false;
  signatureupload: FormGroup;
  signatureuploadData: any;

  signaturedata:any;
  signaturelength:any;
  patientID:any;
  uploadFiles:any[]=[];
  document:any[]=[];
  showdocument:any
  images = [];
  url = '';
  signatureNeeded!: boolean;

  imageService: any;
  fileToUpload:any;
  // fileToUpload:File=null;

  formdata = new FormData();
  constructor( private patient_signature:PatientSignaturesService, public router: Router,public messageService: MessageService, private httpClient: HttpClient, private sanitizer: DomSanitizer, public confirmationService:ConfirmationService ) { }

  ngOnInit(): void {
    this.sig = new SignaturePad(this.canvas.nativeElement);
  

    var patientid=localStorage.getItem('guid')
    console.log(patientid);
    this.patientID=JSON.parse(patientid || '{}')
    console.log(this.patientID);
    

    this.createform();
    this.getpatientsignaturedata();


  }

  createform() {
    this.signatureupload = new FormGroup({
      filepath: new FormControl('', Validators.required),
    });
  }


  ngForm=new FormGroup({
    // signature_upload:new FormControl(''),
  })


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      this.url = reader.result as string;
    };
    reader.readAsDataURL(file);
    console.log('fileupload', event);
    console.log('fileupload', event.target.files);
     console.log('fileupload', event.target.files.signature_upload);
    console.log('fileuploadqqq', event.target.value);
    this.uploadFiles = event.target.files;
    this.document = event.target.value;
    this.showdocument=['']
    for (let i = 0; i < this.uploadFiles.length; i++) {
      console.log('fileupload222', event.target.files[i].signature_upload);
     
  this.showdocument.push({'docu':event.target.files[i].signature_upload})
    //  this.formDataArray.push({'filepath':this.destinationPath,'filename':this.uploadFiles[i].name});
    }
    console.log('showdocument',this.showdocument);
  }

  uploadFilesMetadata(){
   
      console.log('ngForm',this.ngForm.value);
  
  }


  submit_signature() {
debugger
    this.patient_signature.uploadFilesMetadata(this.formdata).subscribe((data:any)=>{
      //  if(data == 'success'){
        if(data ){

          console.log(data);
        if(this.signatureupload.valid){
            this.patient_signature.uploadFilesMetadatastore(this.patientID, this.signatureupload.value.filepath).subscribe((data:any)=>{
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'your signature is updated' });
              this.display=false
              
            })
          }else{
            this.messageService.add({ severity: 'error', summary: 'Warning', detail: 'Please Enter Valid Data!!' });
          }
       }

    })
    
  }

  safeURl(oldURL:any): SafeUrl {
 return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
}



  onFileChange(e: any) {
    if (e.target.files && e.target.files[0]) {

      console.log(e.target.files);
      
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        var url =  'testname' + '.' + e.target.files[0].type.split('/')[1] ;
        console.log(url);
        console.log(e.target.files[0]);
        this.formdata.append('profile', e.target.files[0], url);
        this.signatureupload.patchValue({filepath: url});
      };
    }

  }

  getpatientsignaturedata(){
    this.patient_signature.getpatientsignatureData(this.patientID).subscribe((data:any)=>{

    if(data.length >0){
      console.log(data);
      console.log(data.length);
      this.patientsignatureshowdata=data
      this.patientsignaturelength=data.length
      this.url=environment.signaturepath + data[0]?.patient_signatures
    }
  
      
    })
  }

  

  delete_sgnature(id:any){
    this.confirmationService.confirm({
      message: 'Remove Form Dashboard And Show On history?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.patient_signature.delete_signaturedata(id).subscribe((data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your Current Health Issues Data Has Been Deleted' });
          this.displayBasic = false
          this.getpatientsignaturedata()
          this.url=""
        
        })
      },
      reject: (type:any) => {
        this.messageService.add({ severity: 'error', summary: 'Canceled Request', detail: 'You have canceled The Delete Data Option' });
      }
    });



  }

  clear() {
    this.sig.clear();
  }
  
// my-signatures.component.ts

// Import necessary modules


  // ... existing code ...

  savePad() {
    const base64Data = this.sig.toDataURL(); // Get the base64 data from the canvas
    const blobData = this.dataURLtoBlob(base64Data); // Convert base64 to Blob
    this.url=base64Data
    const file = new File([blobData], 'signature.png', { type: 'image/png' }); // Create a File object
    var url1 =  'testname' + '.' + file.type.split('/')[1] ;
    // Now, you can upload the file using your existing upload logic
    this.signatureupload.patchValue({filepath: url1});
    this.formdata.append('signature_upload', file,url1);
    // this.showdocument.push({'docu':this.signatureupload.value.filepath.signature_upload})
    // The rest of your existing code...
    this.submit_signature();
  }

  // Helper function to convert dataURL to Blob
  dataURLtoBlob(dataURL: string): Blob {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  }


 show(){
  this.display=true
 }
}
