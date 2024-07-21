import { Component, Inject, OnInit } from '@angular/core';
import ZoomMtgEmbedded from "@zoomus/websdk/embedded"

import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommanserviceService } from '../commanservice.service';
import { PatientAppointmentService } from '../phrdashboard/HealthRecordsServices/patient-appointment.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {

  authEndpoint = 'http://192.168.1.179:4000/';
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


  client = ZoomMtgEmbedded.createClient();
  visisble: boolean = false;

  zoomMeetings:any
  constructor( public httpClient: HttpClient, @Inject(DOCUMENT) document,public commonserivce:CommanserviceService) { }

  ngOnInit(): void {
    let meetingSDKElement = document.getElementById('meetingSDKElement');
    this.client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
        toolbar: {
          buttons: [
            {
              text: 'Custom Button',
              className: 'CustomButton',
              onClick: () => {
                console.log('custom button');
              }
            }
          ]
        }
      }
    }); 
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
  
  ngOnDestroy(): void {
    console.log('destroying');
    
    ZoomMtgEmbedded.destroyClient();
  }
}
