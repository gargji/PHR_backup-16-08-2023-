import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as saveAs from 'file-saver';
import { MessageService } from 'primeng/api';
import { HealthrecordsservicesService } from 'src/app/phrdashboard/HealthRecordsServices/healthrecordsservices.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-documentview',
  templateUrl: './documentview.component.html',
  styleUrls: ['./documentview.component.css']
})
export class DocumentviewComponent implements OnInit {

  @ViewChild('ytplayer', { static: false }) ytPlayer: ElementRef;
  viewdoc: boolean = true
  fullimage: any
  checkextention: any;
  src: any
  docid: any
  fullpath: any
  safeUrl: SafeResourceUrl;

  matchkeyform = new FormGroup({
    key: new FormControl('',[Validators.required]),

   
  })

  // matchkeyform:FormGroup
  constructor( public http: HttpClient,public routes: ActivatedRoute, public healthrecordsservices: HealthrecordsservicesService,public messageserveice: MessageService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
   
    this.src = "https://media.istockphoto.com/id/1649298438/photo/joyful-retired-couple-hiking.jpg?s=2048x2048&w=is&k=20&c=NdZsIz0Za4yFt34gqQcNbtZEpAahxO2p_Jk9SPfr2co="
    //  this.checkextention = 'jpg';
    // console.log(  this.ytPlayer.nativeElement.src)
    this.routes.queryParams.subscribe((param) => {
      console.log(param);
      this.docid = param.id
      // this.patient = param.patientID;
      console.log(this.docid);

      // this.createRegistrationForm()
      // this.createdobverify()    });
      // console.log(this.checkextention)
    })
  
    this.getdocument()

  }


  example: boolean = false
  docview: boolean
  docdata: any = []
  key:any
  getdocument() {
    console.log("hy")
    this.example = true
    this.docview = false
    this.healthrecordsservices.getdocbyid(this.docid).subscribe((data) => {
      console.log(data)
      this.docdata = data
      this.fordownload=this.docdata
      this.key=this.docdata[0].secretkey
      this.path(this.docdata)
      this.docview = false
    })
   

   
  }
  foundItem:any
  fordownload:any
  docchnage(data: any) {
    console.log(data)
    this.foundItem = this.docdata.filter(item => item.id == data.id);
    console.log(this.foundItem, "same data with")
    this.fordownload=this.foundItem[0].fileName
    // foundItem
    this.path(this.foundItem)
 
  }
  file_name:any
  fullpath1: any
  fullpath2: any
  path(data: any) {
    // this.checkextention = data[0].doctype_extention.split('/')[1]
    // console.log(this.checkextention, "splited")
    this.file_name =data[0].fileName

    this.fullpath = environment.media_path + data[0].documentpath

    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fullpath)
    console.log(this.safeUrl)
    this.fullpath2 = this.fullpath1.changingThisBreaksApplicationSecurity

  }
  onmatch(){
console.log(this.matchkeyform.value,this.key);
console.log(this.docdata)
if( this.docdata.length ==0){
  this.messageserveice.add({ severity: 'warn', summary: 'Failed', detail: 'document expire' });
  this.example = false
}
else{
  if(this.matchkeyform.value.key== this.key){
    this.example = false
    this.docview = true
  }
  else{
    this.messageserveice.add({ severity: 'warn', summary: 'Failed', detail: 'Enter valid key' });
  }
}

  }
  downloadDocument() {
   

    // Replace with the actual URL of the file on the server
    const fileUrl =    this.fullpath ;
    console.log(fileUrl)
    console.log(this.fordownload[0].fileName)

    const headers = new HttpHeaders({ 'Content-Type': 'application/octet-stream' });

    // this.http.get(fileUrl, { headers, responseType: 'blob' as 'json' }).subscribe(response:Blob => {
    //   saveAs(response, data.fileName+'.ext'); // Specify the desired file name
    // });
    this.http.get(fileUrl, { responseType: 'blob' as 'json' }).subscribe((response: Blob) => {
      saveAs(response, this.fordownload[0].fileName); // Specify the desired file name
    });
  }

  // side bar
  isCollapsed = false;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  // sidebar end 
}
