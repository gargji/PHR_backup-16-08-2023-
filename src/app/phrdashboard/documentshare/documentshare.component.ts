import { Component, ElementRef, OnInit, ViewChild, }  from '@angular/core';
import { HealthrecordsservicesService } from '../HealthRecordsServices/healthrecordsservices.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
// import { FormGroup } from '@angular/forms';

// import { Component, OnInit } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { HealthrecordsservicesService } from '../HealthRecordsServices/healthrecordsservices.service';
import { BaseComponent } from '../common/base.component';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import { event } from 'jquery';
import { environment } from 'src/environments/environment';
import * as JSZip from 'jszip';
import { PatientAppointmentService } from '../HealthRecordsServices/patient-appointment.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-documentshare',
  templateUrl: './documentshare.component.html',
  styleUrls: ['./documentshare.component.css'],
  providers: [DatePipe]
})
export class DocumentshareComponent extends BaseComponent implements OnInit  {

  safeUrl: SafeResourceUrl;


  ingredient!: string;
  // products!: Product[];
  // sidebarVisible12= false;


  // sidebarVisible1234:boolean=false


  Products: any

  // selectedProducts!: Product;

  @ViewChild('ytplayer', { static: false }) ytPlayer: ElementRef;
  items: MenuItem[] | undefined;
  sharedoc: boolean = false

  selectedCountry: any;
  filteredCountries: any[];
  countries: any;
  sidebible:any = true;
  createfolder:boolean=false;
  uploadDocumentmodel:boolean=false
  medication_drug: any
  procedureinsert: FormGroup;
  documentshare: FormGroup;
  createfolderform:FormGroup;
  uploadDocumentform:FormGroup;
  displayModal: boolean = false;
  patientID: any;
  indication_data: any
  documentdata:any=[]

  showModalDialog() {
    this.displayModal = true;
    this.isEdit = false
  }
  isCollapsed = true;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  medicationdata: any;

  representatives: any;
  medicationlength: any
  cars = [
    { "brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff" },
  ]
  // displayModal: boolean=false;
  //   showModalDialog() {
  //     this.displayModal = true;
  // }
  constructor(private sanitizer: DomSanitizer,public healthrecordsservices: HealthrecordsservicesService, public confirmationservice: ConfirmationService, public messageserveice: MessageService, private ngxLoader: NgxUiLoaderService, private datepipe: DatePipe, public http: HttpClient, public patientappointmentservices: PatientAppointmentService) {
super()
   }


  sortOrder: number;
  sortField: string;
  hospital_ID: any
  branchID: any
  dynamicPath: any;
  ngOnInit(): void {

 
    this.items = [
      {
        label: 'Download',
        icon: 'pi pi-download',
        command: () => {

          this.downloadDocument(this.menudata)
 

        }
      },
      {
        label: 'Share',
        icon: 'pi pi-share-alt',
        command: () => {
     
          this.sharefunc1(this.menudata)
 

        }
      },
      {
        label: 'View',
        icon: 'pi pi-eye',
        command: () => {

          this.alldatadialog(this.menudata)
 

        }
      }
    ];
    this.ngxLoader.start();
    setTimeout(() => {
      this.ngxLoader.stop();
    }, 2000);


    setTimeout(() => {

    }, 2000);



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


    // this.get_procedure_data();





    //  form 
    this.documentshare = new FormGroup({
      provider_name: new FormControl('',Validators.required),
check1:new FormControl('option1'),
      Email: new FormControl('',),
      expire:new FormControl('1'),
      expirecheck:new FormControl('1')
    })


      this.forwarddate('1')
      console.log(this.expectdinventory
        ,"bydefultdate")
       this.documentshare.patchValue({
          expire:this.expectdinventory
  
      })
// this.forexpire()

    this.createfolderform = new FormGroup({
      folder_name: new FormControl('',[Validators.required]),

     
    })
    this.uploadDocumentform = new FormGroup({
      file_name: new FormControl('',[Validators.required]),
      folder_name: new FormControl('',[Validators.required]),

     
    })

    this.envpath = environment.media_path;
    //  console.log(this.envpath,"thisis");
    //  if(!this.envpath){
    //     this.dynamicPath =environment.media_path2;
    //     console.log(this.dynamicPath);
    //  }

    this.GetPatientDocument()
    this.get_provider_name()
    this.getfolder()
    // this.uploadbyme()
  //  this.maildata()
  }





  // toggleSidebar() {
  //   this.sidebarVisible12 = !this.sidebarVisible12;
  // }



  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  // submit_madiactiondata(){
  //   this.procedureinsert = new FormGroup({
  //     medicationdata: new FormControl(''),

  //   });
  //   console.log(this.procedureinsert);
  // }



  // for single share      
//   submitshare() {
// if(this.documentshare.valid && this.selectedPatient != null){
//   this.ngxLoader.startLoader("loader-01"); 
//   this.forwarddate(this.documentshare.controls['expire'].value)
// console.log(this.expectdinventory
//   ,"bydefultdate")
//  this.documentshare.patchValue({
//     expire:this.expectdinventory

// })

//   console.log(this.documentshare.value,"ye values h",this.selectedPatient,this.isdisable)
 

//   console.log(this.documentshare.valid)
 
//   this.healthrecordsservices.sharedoc(environment.documenturl,this.patientID, this.branchID, this.hospital_ID,this.documentshare.value,this.selectedPatient ).subscribe((data: any) => {

// this.sharedoc=false
// this.documentshare.reset();
// this.documentshare.patchValue({check1 : 'option1'});
// this.documentshare.patchValue({expire : '1'});
// this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'success' });
// this.GetPatientDocument()
// this.selectedPatients=false
// this.showbutton=false
// this.selectedPatient=[]
// this.get_provider_name()
// this.expiredate=''
// // this.checkanytimefunction2()
// this.ngxLoader.stopLoader("loader-01"); 
// this.isdisable='option1'
// this.anytime()


//   })
// }
// else{
//   this.messageserveice.add({ severity: 'warn', summary: 'Failed', detail: 'Error' });
// }


//     // 

//     // if (this.procedureinsert.valid) {
    

   
//     // }
//     // else {
//     //   this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
//     // }
//   }





  Medication(event: any) {
    // this.procedureinsert.reset();
    this.selectedPatient = []
  }
  documentshareformclear(event: any) {
    this.documentshare.reset();
    this.selectedPatients=false
this.showbutton=false
this.selectedPatient=[]



  }
  createfolderformclear(event: any) {
  this.createfolderform.reset()

  }
  cleardocform(event: any) {
    this.uploadDocumentform.reset();
    // this.selectedPatient = []
  }
 







  patchdata: any;
  isEdit: boolean = false;
  editid: any


  menudata:any
  menuid: any
  data(value) {
    console.log(value)
    this.menuid = value.id
    this.menudata=value
    
  }


  // share document

  Patientdocumentlenth: any
  Patientdocument: any;

  selectedPatient: any;
  // sidebarVisibles: boolean = false;
  selectedPatients: boolean = false;
  showbutton: boolean = false;
  visibleButton() {
    if (this.showbutton == false) {
      this.showbutton = true;
    } else {
      this.showbutton = false;
    }
  }

  GetPatientDocument() {
    this.ngxLoader.startLoader("loader-01"); 

    console.log(this.patientID)
    this.healthrecordsservices.GetPatientDocument(this.patientID).subscribe((data: any) => {
      this.Patientdocument = data;
      this.Patientdocumentlenth = data.length
      this.Products = this.Patientdocument
      this.ngxLoader.stopLoader("loader-01"); 
      this.documentdata=this.Patientdocument
      console.log(this.Patientdocument, "document data")

    });
  }
  getDownload() {
    if (this.selectedPatient && this.selectedPatient.length > 0) {
      this.selectedPatients = true;
    } else {
      this.selectedPatients = false;
    }
    console.log("selectedPatient", this.selectedPatient);

  }
  viewdoc: boolean = false;
  siebarimage: any;

  checktype: any = '';
  documentType: any;
  docSize: any;
  Date_uplods: any;
  patientname: any;
  providername: any;
  tagname: any;
  showdata: any;
  openpicdata: any;
  envpath: any;
  allpatientsdocument: any;
  fullpath1: any
  fullpath2: any
  mailimage:any
  alldatadialog(data) {
    console.log(data)
  
  
     
    this.documentType = data.documentType;
    this.docSize = data.docSize;
    this.Date_uplods = data.Date_uplods;
    this.viewdoc = true;
    this.pdfVisable = true;
    this.siebarimage = data?.full_path;
    
    this.patientname = data.completeName;
    this.providername = data.providername;
    this.tagname = data.tag;
    this.checktype = data.fileName;
    this.fullimage = this.envpath + this.siebarimage;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fullimage)
    console.log(this.safeUrl)
    // this.fullpath2 = this.fullpath1.changingThisBreaksApplicationSecurity/
    this.ytPlayer.nativeElement.src = this.fullimage;
    // this.ytPlayer.nativeElement.src = data.documentpath;

    // this.openpicdata = data;
    // this.headername = this.checkextention;
    console.log('data======================', data);

  }
  pdfVisable: boolean = false;
  fullimage: any;
  headername: any;

  // tabledataMYDocument: any[] = []
  // getFileNameFromPath(path: string): string {
  //   const parts = path.split(/[\\/]/);
  //   return parts[parts.length - 1];
  // }
  generateAndDownloadZip() {
    console.log('generateAndDownloadZip=>>>>>>>>>0', this.selectedPatient);

    const zip = new JSZip();
    let folderName: string;
    const promises: Promise<void>[] = [];

    this.selectedPatient.forEach((item) => {
      const fullPath = environment.media_path + item.full_path;
      console.log('fullPath=>>>', fullPath);

      folderName = item.documentType;

      const fileName = this.getFileNameFromPath(fullPath);

      // Add the file to the zip
      const promise = this.readFileContent(fullPath).then((fileContent) => {
        zip.file(fileName, fileContent, { binary: true });
      });

      promises.push(promise);
    });

    // Wait for all files to be added to the zip
    Promise.all(promises).then(() => {
      // Generate and download the zip file
      zip.generateAsync({ type: 'blob' }).then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        if (this.selectedPatient.length === 1) {
          a.download = folderName + '.zip';
        } else {
          a.download = 'All_Documents.zip';
        }

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
    });
  }

  getFileNameFromPath(path: string): string {
    const parts = path.split(/[\\/]/);
    return parts[parts.length - 1];
  }

  readFileContent(filePath: string): Promise<ArrayBuffer> {
    // Adjust this method based on your specific logic to fetch the content of the file
    return this.http.get(filePath, { responseType: 'arraybuffer' }).toPromise();
  }
  // }



  // selectedDocumentUrl=
  // downloadDocument(data) {
  //   this.siebarimage = data.full_path;
  //   const link = document.createElement('a');
  //   link.href =  this.envpath+this.siebarimage;
  //   link.download = 'selected-document.pdf'; // Specify the desired file name
  //   link.target = '_blank';
  //   link.click();
  // }

  downloadDocument(data) {
    this.siebarimage = data.full_path;
    // Replace with the actual URL of the file on the server
    const fileUrl = this.envpath + this.siebarimage;
    
    console.log(fileUrl)
    const headers = new HttpHeaders({ 'Content-Type': 'application/octet-stream', });

    // this.http.get(fileUrl, { headers, responseType: 'blob' as 'json' }).subscribe(response:Blob => {
    //   saveAs(response, data.fileName+'.ext'); // Specify the desired file name
    // });
    console.log(fileUrl)
    this.http.get(fileUrl, { responseType: 'blob' as 'json' }).subscribe((response: Blob) => {
      saveAs(response, data.fileName); // Specify the desired file name
    });
  }

  sharefunc() {
    console.log("selectedPatient", this.selectedPatient);
    this.sharedoc = true
    // this.documentshare.get('provider_name').setValidators(Validators.required);
    this.documentshare.controls['provider_name'].setValidators(Validators.required);
    this.documentshare.controls['provider_name'].updateValueAndValidity();
   
    console.log(this.documentshare.value, "shared form");
    this.documentshare.patchValue({check1 : 'option1',expirecheck:'1'});
    this.documentshare.patchValue({expire : '1'});


  }
  submitshareAll(){

console.log(this.documentshare.valid)
this.ngxLoader.startLoader("loader-01"); 

    if(this.documentshare.valid && this.selectedPatient !=null){
      console.log(this.documentshare.controls['expire'].value,"form valuessssssssssssss")
      this.forwarddate(this.documentshare.controls['expire'].value)
      console.log(this.expectdinventory
        ,"bydefultdate")
       this.documentshare.patchValue({
          expire:this.expectdinventory
      
      })
      console.log(this.documentshare.value,"ye values h",this.selectedPatient,this.isdisable)
      // if(this.isdisable=='option1'){
      //   console.log("in condition ")
      //   this.documentshare.get('Email').clearValidators()
      // }
      // else{
      //   console.log('in condition');
  
      //   this.documentshare.get('provider_name').clearValidators()
      // }
  
      console.log(this.documentshare.valid)
      // 
  
      // let dateformat = new Date(this.procedureinsert.value.start_date);
      // this.procedureinsert.value.start_date = this.datepipe.transform(dateformat, 'yyyy-MM-dd');
      // console.log(this.procedureinsert.value.start_date,"new date")
      // let dateformat1 = new Date(this.procedureinsert.value.from_date);
      // this.procedureinsert.value.from_date = this.datepipe.transform(dateformat1, 'MM/dd/yyyy');
  
      this.healthrecordsservices.sharedocAll(environment.documenturl,this.patientID, this.branchID, this.hospital_ID,this.documentshare.value,this.selectedPatient ).subscribe((data: any) => {
  this.documentshare.reset()
  this.documentshare.patchValue({check1 : 'option1'});
this.documentshare.patchValue({expire : '1'});
  this.sharedoc=false
  this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'success' });
  this.selectedPatients=false
  this.showbutton=false
  this.selectedPatient=[]
  // this.forexpire()
  this.ngxLoader.stopLoader("loader-01"); 
  this.checkanytimefunction2()
  this.isdisable='option1'
this.anytime()
// this.healthrecordsservices.secretkey(data.key);
// this.healthrecordsservices.emitEvent(data.key)
    
      })
    }else{
      this.messageserveice.add({ severity: 'warn', summary: 'Failed', detail: 'Error' });
    }

  }
  canclselectedPatient(data) {
    console.log(data)
    const index = this.selectedPatient.findIndex(object => {
      return object.id === data;
    });


    console.log(index);
    // this.healthrecordsservices.delete_Allergy(id).subscribe((data: any) => {
    //   console.log(data,"this is remove allergy data");





    // for the static delete
    console.log(
      this.selectedPatient.splice(index, 1), "ho rha h")
    console.log(this.selectedPatient, "splice hone ke baad");


  }

  // displayDialogUploadDocument: boolean = false
  // displayDialogUploadDocuments() {
  //   console.log('displayDialogUploadDocuments');

  //   this.displayDialogUploadDocument = true
  //   // this.defaultdateissue();
  //   // this.UploadFolderForm.controls['filename'].patchValue(this.uploadedFiles[0]?.filename)

  // }

  // Uploadsdoc(){}
  // UploadFolderForm:FormGroup
  // onHidefloder(){}
  // selectedProducts:any

  // isRowSelectable(event: any) {
  //   return !this.Patientdocument(event.data);
  // }
  providernamedata: any;
  get_provider_name() {
    // this.ngxLoader.startLoader("loader-01");
    // console.log(this.hospital_ID);
    this.patientappointmentservices.getprovidernameservicess(this.branchID).subscribe((data: any) => {
      console.log(data);
      console.log(data.length);
      this.providernamedata = data
      // this.HospitalLocationlength = data.length
      // this.ngxLoader.stopLoader("loader-01");
    })
  }
  isdisable: any = 'option1';

  checkanytime: any
  checked: boolean = true;
  anytime() {
    //  this.isdisable=false

    this.isdisable = this.documentshare.controls['check1'].value
    console.log(this.isdisable);
 if(this.isdisable=='option1'){
      console.log("in condition1 ")
      this.documentshare.controls['Email'].clearValidators()
      this.documentshare.controls['provider_name'].setValidators(Validators.required)
 
    }
  
    if(this.isdisable=='option2'){
      console.log('in condition2');
      
      this.documentshare.controls['provider_name'].clearValidators();
      this.documentshare.controls['Email'].setValidators([Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.email]);
   
    }
  // this.checkanytimefunction2()
  this.documentshare.controls['provider_name'].updateValueAndValidity();
  this.documentshare.controls['Email'].updateValueAndValidity();
    
    
  }
  checkanytimefunction2(){
    this.documentshare.controls['Email'].clearValidators()
    this.documentshare.controls['provider_name'].clearValidators();
    this.documentshare.controls['provider_name'].updateValueAndValidity();
    this.documentshare.controls['Email'].updateValueAndValidity();
    
    console.log(this.documentshare.valid);
  }
  sharefunc1(data) {
   
    this.isEdit=true
    this.selectedPatient = []
    this.selectedPatient.push(data)
    console.log(this.selectedPatient)
    this.sharedoc = true
    this.documentshare.controls['provider_name'].setValidators(Validators.required);
    this.documentshare.controls['provider_name'].updateValueAndValidity();
    console.log(this.documentshare.value, "shared form");
    this.documentshare.patchValue({check1 : 'option1',expirecheck:'1'});
    this.documentshare.patchValue({expire : '1'});




  }

  onRowUnselect(event: any) {
    console.log('Row unselected:', event.target.value);
    // Handle the unselected row as needed
  }

  // for upload document
  uplaodedFilePDF: any[] = []
  imgData: { id: string; filename: string; extension: string; url: any; };
  uploadedFiles: any[] = [];
  fullpathArray: any[] = []
  fullpath: string;
  totalSizeKB: any;
  files: any
  formdata: FormData = new FormData()

  // onUpload(event:any) {


  //   this.uplaodedFilePDF = FileList = event.target.files;
  //   console.log(event.target.files);

  //   let totalSize = 0;
  //   const allRawImgArr = event.target.files;
  //   this.uplaodedFilePDF = allRawImgArr;
  //   for (let i = 0; i < allRawImgArr.length; i++) {
  //     const file = new FileReader();
  //     const fileName:string= allRawImgArr[i].name;
  //     const fileSizeBytes = allRawImgArr[i].size;
  //     const filetype=allRawImgArr[i].type
  //     totalSize = fileSizeBytes;

  //     file.onload = (e) => {
  //       const base64Data: any = e.target.result;
  //       const imgData = {
  //         id: `${allRawImgArr[i].lastModified}-${Math.floor(Math.random() * 100000)}`,
  //         filename: fileName,
  //         extension: fileName.split('.')[1],
  //         url: base64Data,
  //         totalSizeKB: (totalSize / 1024).toFixed(2),
  //         filetype:filetype

  //       };
  //       this.imgData = imgData
  //       this.uploadedFiles.push(imgData);
  //       let date = new Date()
  //       var guid = this.newGuid()
  //       for (let index = 0; index < this.uplaodedFilePDF.length; index++) {
  //         let fullPath = `${environment.media_path}\\${this.hospital_ID}\\${this.branchID}\\${guid}.${this.imgData?.extension}`;
  //         this.formdata.append('profile', this.uplaodedFilePDF[index], fullPath);
  //         this.fullpath = fullPath;
  //         this.fullpathArray.push({ fullpath: fullPath, fileName: this.uploadedFiles[index].filename , filetype: this.uploadedFiles[index].filetype })
  //       }
  //       console.log(this.fullpathArray);
  //       this.uploadDocument()
  //       // this.displayDialogUploadDocuments()
  //     }
  //     file.readAsDataURL(allRawImgArr[i]);
  //     this.totalSizeKB = (totalSize / 1024).toFixed(2)
  //   }
  // }
  formdata1 = new FormData();
  myfile: any
  totalSize: any
  filename:any
  fullPath2:any
  extension:any
  onUpload1(event: any) {
    this.myfile = event.target.files[0];
    this.totalSize = this.myfile.size
    console.log(this.myfile);
    console.log(this.myfile.name);

    var guid = this.newGuid()
    this.filename=this.myfile.name
   this.extension=this.filename.split('.').pop()
    // this.formdata1.append('file', this.myfile, Date.now() + "." + this.myfile.name.split('.').pop());
    // this.fullPath2 = `${this.patientID}\\patientData\\${this.patientID}\\doc\\${this.filename}`
    // this.formdata.append('profile',  this.myfile, this.fullPath2      );
    let fullPath = `MyDocument\\phrdata\\${guid}.${this.extension}`;
    this.formdata.append('profile',     this.myfile, fullPath);
    this.fullpath = fullPath;
    this.fullpathArray.push({ fullpath: fullPath, fileName:this.myfile.filename })
    
    // file.readAsDataURL(allRawImgArr[i]);
    this.totalSizeKB = (this.totalSize / 1024).toFixed(2)

    this.uploadDocumentform.patchValue({
      file_name: this.filename
   
   });
   console.log(this.totalSizeKB)
    this.uploadDocumentmodel=true
    // this.uploadDocument()
  }
  uploadDocument() {
    this.ngxLoader.startLoader("loader-01"); 
if(this.uploadDocumentform.valid){

  // this.healthrecordsservices.sendFileToServer(this.formdata1).subscribe((res) => {
    this.healthrecordsservices.sendFileToServer(this.formdata).subscribe((res) => {
    console.log(res)
    // this.fullPath2
 
    this.healthrecordsservices.uploaddocument(this.patientID, this.branchID, this.hospital_ID, this.fullpath, this.totalSizeKB,this.uploadDocumentform.value).subscribe((data: any) => {
      console.log(data);
      if (data == 'inserted') {
        this.uploadDocumentmodel = false;
        this.uploadDocumentform.reset()
        // this.fullpathArray=[]
        this.totalSizeKB=''
        this.totalSize=''
        this.filename=''
        this.myfile=''
        this.formdata1.set('file','')
        this.ngxLoader.stopLoader("loader-01"); 


        this.messageserveice.add({ severity: 'success', summary: 'Upload', detail: 'Successfully Uploaded' });
    this.GetPatientDocument();
      } else {
        this.messageserveice.add({ severity: 'warn', summary: 'Failed', detail: 'Error' });
      }
    });


  
  })
 // this.UploadFolderForm.value.patient_id = this.patientguid

}
else{
  this.messageserveice.add({ severity: 'warn', summary: 'Failed', detail: 'form invaild' });
}
   
  }
  folder_name:any
  submitfoldername(){

 this.folder_name=this.createfolderform.value.folder_name

const foundItem =this.folderdata.filter(item => item.Folder_name === this.folder_name);
console.log(foundItem,"same namee")
if(foundItem.length >0){
  console.log('hega')
  this.messageserveice.add({ severity: 'warn', summary: 'Failed', detail: 'folder already exists' });
}
else{
  
if(this.createfolderform.valid){
  this.ngxLoader.startLoader("loader-01"); 
  this.healthrecordsservices.createfolder(this.patientID, this.branchID, this.hospital_ID,this.createfolderform.value).subscribe((data: any) => {
    if (data == 'inserted'){
      // this.displayDialogUploadDocument = false;
      this.messageserveice.add({ severity: 'success', summary: 'Upload', detail: 'Successfully Created' });
        this.GetPatientDocument();
        this.createfolder=false
        this.getfolder()
        this.ngxLoader.stopLoader("loader-01"); 
    } 
      
    })
  }
  else{
    this.messageserveice.add({ severity: 'warn', summary: 'Failed', detail: 'form invaild' });
  }
}



}
  folderdata:any
  getfolder(){
    this.healthrecordsservices.getfolders(this.patientID).subscribe((data)=>{
console.log(data,'folder name')
this.folderdata=data
    })
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  folderwisedata(data:any){
    console.log(data,this.Patientdocument)

    const foundItem =this.Patientdocument.filter(item => item.phr_folder_id == data.id);
    console.log(foundItem,"same data with")
    this.documentdata=foundItem
  }
  uploadedbymedata:any
  uploadbyme(){
    const foundItem =this.Patientdocument.filter(item => item.upload_by == 'PHR');
    console.log(foundItem,"same data with")
    this.uploadedbymedata=foundItem
    this.documentdata=foundItem
  
  }
  sharewithme(){
    const foundItem =this.Patientdocument.filter(item => item.upload_by == 'EHR');
    console.log(foundItem,"same data with")
    this.documentdata=foundItem
    this.maildata()

  }


  sharebymename:any
  sharebyme(){
    this.healthrecordsservices.sharebyme(this.patientID).subscribe((data)=>{
      console.log(data)
      this.documentdata=data
      // this.sharebymename=  this.documentdata
      
    })
  }

  maildata(){
    this.healthrecordsservices.GetPatientmailDocument(this.patientID).subscribe((data)=>{
      console.log(data,"mail data ")
      this.documentdata=data


    })
  }
  isSidebarCollapsed = false;
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  expiredate:any
  expire(){
    console.log()
    this.expiredate=this.documentshare.controls['expirecheck'].value
    console.log( this.expiredate)
    this.forwarddate(this.expiredate)
}

//     })

  

//   // forexpire(){
//   //   this.documentshare = this.fb.group({
//   //     expire: ['1'] , // Set the default value to '1'
//   //     provider_name: new FormControl(''),
  
//   //     Email: new FormControl(''),
//   //   });
//   // }

// }

calculateForwardDate(currentDate: Date, daysToAdd: number): Date {
  const forwardDate = new Date(currentDate);
  forwardDate.setDate(currentDate.getDate() + daysToAdd);
  return forwardDate;
}

formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear();

  return `${year}/${month}/${day}`;
}
expectdinventory: any;
forwarddate(data123:any) {
  console.log(data123)
  var date = new Date();
  var newcount = parseInt(data123);
  console.log(newcount,"rrrrr====")
  const forwardDate = this.calculateForwardDate(date, newcount);
  const formattedForwardDate = this.formatDate(forwardDate);
  this.expectdinventory = formattedForwardDate;
  // this.locationForm.value.next_expected_inventory = this.expectdinventory;
  console.log('forwardDate=>>>>>>>>', this.expectdinventory);
  
  this.documentshare.patchValue({
    expire:data123
    
        })

        // this.documentshare.patchValue({
        //   expirecheck:data123
          
        //       })

}
viewdocdelete(){

    this.siebarimage = '';
  



}
}