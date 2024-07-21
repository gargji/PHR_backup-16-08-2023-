import { Component, OnInit, Input  } from '@angular/core';
import { HealthrecordsservicesService } from '../HealthRecordsServices/healthrecordsservices.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() show: boolean;

  timeFormat:any
  medicationlength:any
  medicationdata:any;
  patientproblemdata:any;
  phr_vatals:any;
  patientID:any;
  planofcare:any;
isLoading: boolean=false;
problemisLoading:boolean=false
vitalsisLoading:boolean=false
  constructor(public healthrecordsservices:HealthrecordsservicesService,  private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {

    
    
    var patientid=localStorage.getItem('guid')
    console.log(patientid);
    this.patientID=JSON.parse(patientid || '{}')
    console.log(this.patientID);

    this.getmedicationdata();
    this.getpatientproblem();
    this.getVitals();
    this.getplanofcare();
    this.ngxLoader.start();
   

  }

  getmedicationdata(){    
    this.ngxLoader.startLoader("loader-01"); 
    this.isLoading=true  
    this.healthrecordsservices.getmedicationDate(this.patientID).subscribe((data:any)=>{
      console.log('test data',data);
      console.log(data.length);
      this.medicationdata=data
      this.medicationlength=data.length
      this.ngxLoader.stopLoader("loader-01"); 
      this.isLoading=false
    })
  }
  
  getpatientproblem(){ 
    this.problemisLoading=true   
    this.ngxLoader.startLoader("loader-01"); 
    this.healthrecordsservices.getpatientproblem(this.patientID).subscribe((data:any)=>{
      // console.log('test data',data);
      console.log(data.length);
      this.patientproblemdata=data
      this.medicationlength=data.length
      this.ngxLoader.stopLoader("loader-01"); 
      this.problemisLoading=false
    })
  }

  vitalsdata1:any
  vitalsdata2:any
  vitalsdata3:any
  getVitals(){    
    this.vitalsisLoading=true
    this.healthrecordsservices.getVitals(this.patientID).subscribe((data:any)=>{
      console.log('test data',data);
      console.log(data.length);
      this.phr_vatals=data
      this.vitalsdata1 = this.phr_vatals[0]
     this.vitalsdata2 = this.phr_vatals[1]
      this.vitalsdata3 = this.phr_vatals[2]
      console.log(this.vitalsdata1,'----------------------------------');
      
    // this.phr_vatals.vitalsdata1 = this.phr_vatals.getChartsVitalsData[1]
    // this.phr_vatals.vitalsdata2 = this.phr_vatals.getChartsVitalsData[2]
      this.medicationlength=data.length
      this.vitalsisLoading=false
    })
    
  }

  

  getplanofcare(){    
    
    this.healthrecordsservices.getplanofcare(this.patientID).subscribe((data:any)=>{
      console.log('test data',data);
      console.log(data.length);
      this.planofcare=data
      this.medicationlength=data.length
  
    })
  }

}
