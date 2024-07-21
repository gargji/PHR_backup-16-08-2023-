import { Component, OnInit } from '@angular/core';
import { HealthrecordsservicesService } from '../HealthRecordsServices/healthrecordsservices.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import {Message} from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseComponent } from '../common/base.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-phrvitals',
  templateUrl: './phrvitals.component.html',
  styleUrls: ['./phrvitals.component.css']
})
export class PhrvitalsComponent extends BaseComponent implements OnInit {
 
  importResultOfreviewData:any;
  signValue:any;
  headerPanleorlist:any;
  printData:any;
  patientID:any;
  Investigationlength:any;
  Investigationdata:any
  displayModal: boolean;
  vitalsdata:any;
  vitalslength:any;
  displayvitalModal:boolean
  vitaldatainsert:FormGroup;
  displayBasic: boolean = false;
  display_lab_results_dialog: boolean=false;
  vitaldatsubmit:any;
  public _opened: boolean = false;
  msgs: Message[] = [];



  public _toggleSidebar() {
    this._opened = !this._opened;
  }


  showvitalDialog() {
    this.displayvitalModal = true;
}

    constructor( private ngxLoader: NgxUiLoaderService, public healthrecordsservice:HealthrecordsservicesService, public confirmationservice:ConfirmationService, public messageserveice:MessageService) { 
      super()
    }
 


  ngOnInit(): void {


    this.ngxLoader.start();
    setTimeout(() => {
      this.ngxLoader.stop(); 
    }, 2000);
  

    setTimeout(() => {
      
    }, 2000);




     var patientid=localStorage.getItem('guid')
    console.log(patientid);
    this.patientID=JSON.parse(patientid || '{}')
    console.log(this.patientID);
     this.getInvestigationdata();
     this.getvitalsdata();
    //  this.submit_allargydata();
     this.getflow_vitalsite_data();
     this.vitaldatainsert= new FormGroup({
      Site_SBP: new FormControl ('',[Validators.required]),
      DBP: new FormControl('',[Validators.required]),
      Pulse: new FormControl('',[Validators.required]),
      Temp: new FormControl('',[Validators.required]),
      bpsite_name: new FormControl('',[Validators.required]),
      device: new FormControl('',[Validators.required]),
      RR: new FormControl('',[Validators.required]),
      SpO2: new FormControl('',[Validators.required]),
      o2flow: new FormControl('',[Validators.required]),
      hight: new FormControl(''),
      weight: new FormControl(''),
      BSA: new FormControl('',[Validators.required]),
      datevital_date:new FormControl('',[Validators.required])
    })
  }
  
  getInvestigationdata(){
    this.ngxLoader.startLoader("loader-01"); 
    this.healthrecordsservice.getInvestigationData(this.patientID).subscribe((data:any)=>{
      console.log(data);
      console.log(data.length);
      this.Investigationdata=data
      this.Investigationlength=data.length
      this.ngxLoader.stopLoader("loader-01"); 
    })
  }
  getvitalsdata(){
    this.healthrecordsservice.getVitals(this.patientID).subscribe((data:any)=>{
      console.log(data);
      console.log(data.length);
      this.vitalsdata=data
      this.vitalslength=data.length
      
    })
  }
  showModalDialog(item:any){
    this.display_lab_results_dialog = true;

    console.log(item);
    
    this.headerPanleorlist = item.ParentName;
    this.healthrecordsservice.getTransactionLabOrderForImportResutlsAPI(item).subscribe((data:any)=>{
      console.log(data);
    
      this.importResultOfreviewData=data;
      console.log(this.importResultOfreviewData);
      this.signValue=this.importResultOfreviewData[0]
      this.printData=this.importResultOfreviewData
 
    })
  }
  vitalsiteshow:any
getflow_vitalsite_data() {
   this.healthrecordsservice.getflowvitalsitedataShow(this.patientID).subscribe((data: any) => { 
    console.log('test data',data);
    console.log(data.length);
    this.vitalsiteshow=data
  })

}
submit_vitaldata(){
  console.log(this.vitaldatainsert.value);
  if(this.validateFormAndGrid(this.vitaldatainsert)){
    this.healthrecordsservice.vitaldatasubmit(this.vitaldatainsert.value, this.patientID).subscribe((data: any) => {
    
      this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted'});
      this.displayvitalModal = false
      this.getvitalsdata()
     var vitaldata=data
    this.vitaldatsubmit=vitaldata
    }) 
   
  }
  else{
    this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field'});
  }
 
}
vitaldata(event:any){
  this.vitaldatainsert.reset();
}

}

