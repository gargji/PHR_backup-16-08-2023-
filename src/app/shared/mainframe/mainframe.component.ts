import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mainframe',
  templateUrl: './mainframe.component.html',
  styleUrls: ['./mainframe.component.css']
})
export class MainframeComponent implements OnInit {
  patient:any
  constructor(public route:ActivatedRoute,) { }

  ngOnInit(): void {
    // setTimeout(() => {
      // this.route.queryParams.subscribe((param) => {
      //   this.patient = param.patient;
      //   console.log('this.patient',this.patient);
    
      // });
    // }, 200);
   
   
  }

}

