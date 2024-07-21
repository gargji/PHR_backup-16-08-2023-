import { Component, Inject, OnInit } from '@angular/core';
import { CommanserviceService } from '../commanservice.service';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import { ZoomMtg } from '@zoomus/websdk';

@Component({
  selector: 'app-phrdashboard',
  templateUrl: './phrdashboard.component.html',
  styleUrls: ['./phrdashboard.component.css']
})
export class PHRDashboardComponent implements OnInit {
  authEndpoint = 'http://localhost:4000/';
  sdkKey = 'P5c91fCRUDFrUPuKymYA';
  meetingNumber = '4529377801';
  password = 'n34A6F';
  role = 2;
  userName = 'Rahul Garg';
  userEmail = 'gargjirahul@gmail.com';
  registrantToken = '';
  zakToken = '';
  leaveUrl = 'http://localhost:4200';
  userDetails: any


  client :any;


  zoomMeetings:any
  public _opened: boolean = false;
  public _toggleSidebar() {
    this._opened = !this._opened;
  }



  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document,public commonserivce:CommanserviceService) { }
 
  ngOnInit(): void {

    // location.reload()
    this.client = ZoomMtgEmbedded.createClient();

    this.commonserivce.joinZoom.subscribe((data:any)=>{
      console.log(data , 'calling ');
      
      this.getSignature()
 })
 
  }
  getSignature(){
    console.log('calling for signature');
    this.httpClient.post(this.authEndpoint, {
      meetingNumber: this.meetingNumber,
	    role: this.role
    }).toPromise().then((data: any) => {
      if(data.signature) {
        console.log(data.signature)
        this.startMeeting(data.signature)
      } else {
        console.log(data)
      }
    }).catch((error) => {
      console.log(error)
    })
    
  }
  startMeeting(signature) {    
    this.client.join({
      signature: signature,
      sdkKey: this.sdkKey,
      meetingNumber: this.meetingNumber,
      password: this.password,
      userName: this.userName,
      userEmail: this.userEmail,
      tk: this.registrantToken,
      zak: this.zakToken
    })
  }
}
