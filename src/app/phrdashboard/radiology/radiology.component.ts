import { Component, OnInit } from '@angular/core';
import { HealthrecordsservicesService } from '../HealthRecordsServices/healthrecordsservices.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-radiology',
  templateUrl: './radiology.component.html',
  styleUrls: ['./radiology.component.css']
})
export class RadiologyComponent implements OnInit {
  patientID:any;
  phrradiologydata:any;
  medicationlength:any
  public _opened: boolean = false;
  public _toggleSidebar() {
    this._opened = !this._opened;
  }

  constructor(public healthrecordsservice:HealthrecordsservicesService,private ngxLoader: NgxUiLoaderService) { }

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
    
this.getradiologydata();
  }

  getradiologydata(){
     this.ngxLoader.startLoader("loader-01"); 
    this.healthrecordsservice.getradiologyData(this.patientID).subscribe((data:any)=>{
      console.log('test data',data);
      console.log(data.length);
      this.phrradiologydata=data
      this.medicationlength=data.length
      this.ngxLoader.stopLoader("loader-01"); 
    }) 
  }

}
