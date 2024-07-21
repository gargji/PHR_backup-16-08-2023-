import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommanserviceService } from 'src/app/commanservice.service';
import {startRegistration, startAuthentication } from '@simplewebauthn/browser';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import * as platform from 'platform';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { InputMaskModule } from 'primeng/inputmask';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  email: any
  password: any;
  hopitalID: any
  value!: string;
  patient: any
  hide = true;
  userData:any

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.email]),
    password: new FormControl('', [Validators.required]),
  })
  hospital_id: any;
  Branch_ID: any;
  patientID: any;
  location: any;
  matchauthenticator:any=false
  loginform:any=true
  anotherwaylogin:any
  codeform:FormGroup
  constructor(public http: HttpClient,private commonService: CommanserviceService,private socket:Socket, public messageService: MessageService, private route: Router, public routes: ActivatedRoute, private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    this.socket.on('receive_message2',(data)=>{
      this.check()
      // setTimeout(() => {
   
      //   alert("user logout")
      // }, 1000);
    })
   }

  ngOnInit(): void {
    this.routes.queryParams.subscribe((param) => {
      this.hopitalID = param.hopitalID
      this.patient = param.patient;
    });


    this.getLocation();
    this.getDeviceInfo();
    // this.getip()
 

    // Get device type
    const deviceType = platform.product;
    console.log('Device Type:', deviceType);

    // Get operating system
this.codeform=new FormGroup({
  backupcode: new FormControl('',Validators.required)

})
  }
secret:any
token:any
bakcupcode:any
sessionid:any
async submit_login_details() {
  try {
    const data: any = await this.commonService.getIp().toPromise();
    const ip = data.ip;
    console.log(ip, "ip address before login");

    if (this.loginForm.valid) {
      this.sessionid = this.newGuid();
      this.userData = await this.commonService.createUser(this.loginForm.value, this.sessionid, ip).toPromise();
      console.log(this.userData, "rahul");

      if (this.userData.guid) {
        if (this.userData.authenticator == 1) {
          this.anotherwaylogin = true;
          // this.secret = this.userData.authenticator_key;
          // console.log(this.secret, "this.secret");
          this.loginform = false;
          this.matchauthenticator = true;
          return;
        } else if (this.userData.passkey == 1) {
          this.anotherwaylogin = true;
          this.login();
        } else {
          // await this.commonService.getUserDetails(this.userData[0].guid).subscribe((res)=>{
            this.handleLoginSuccess(this.userData[0], this.sessionid);
          // })
        
        }
      } else if (this.userData.length > 0) {
      // await this.commonService.getUserDetails(this.userData[0].guid).subscribe((res)=>{
          this.handleLoginSuccess(this.userData[0], this.sessionid);
        // })
      
      } 
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.userData[0] });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email Id And Password Is Required' });
    }
  } catch (error) {
    console.log("Error occurred:", error.error.error);
    const errorMessage = error.error.error;
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage
    });
  }
}

async handleLoginSuccess(userData: any, sessionid: string) {
 await this.checkCookieData()
  this.socket.emit('login', userData);
  localStorage.setItem('session_id', JSON.stringify(sessionid));
  localStorage.setItem('organization_id', JSON.stringify(userData.organization_id));
  localStorage.setItem('hospital_id', JSON.stringify(userData.hospital_id));
  localStorage.setItem('guid', JSON.stringify(userData.guid));
  localStorage.setItem('user_name', JSON.stringify(userData.user_name));
  localStorage.setItem('reload', '0');
  this.getsessiondetails(this.sessionid);

 
  this.route.navigate(['/approved']);
}


  
  togglePassword() {
    this.hide = !this.hide;
  }
  ip:any
  deviceType:any
  osVersion:any
// getip(){
//   this.commonService.getIp().subscribe((data:any)=>{
//     console.log(data,"my ip")
    
//     this.ip=data.ip;

//     const ip = data.ip;
//     const userAgent = window.navigator.userAgent;
//     this.deviceType = this.getDeviceType(userAgent);
//     this.osVersion = this.getOSVersion(userAgent);
//     console.log(ip, this.deviceType,this.osVersion);
//   })
// }
getDeviceType(userAgent: string): string {
  if (/mobile/i.test(userAgent)) {
    return 'Mobile';
  } else {
    return 'Desktop';
  }
}
private getOSVersion(userAgent: string): string {
  let osVersion = '';
  const osRegex = /(Windows NT \d+\.\d+|Android \d+\.\d+|Mac OS X \d+_\d+)/;
  const match = userAgent.match(osRegex);
  if (match) {
    osVersion = match[0];
  }
  return osVersion;
}

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log('Latitude: ' + position.coords.latitude);
          console.log('Longitude: ' + position.coords.longitude);
          this.getLocationName(position.coords.latitude, position.coords.longitude);

        },
        error => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  deviceName:any
  getDeviceInfo() {
    this.deviceName = navigator.userAgent;
    console.log('Device Name:',  this.deviceName);
  }
  getLocationName(latitude: number, longitude: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
  
    this.httpClient.get<any>(url).subscribe(
      response => {
        if (response) {
          this.location = response.display_name;
          console.log('Location:', location);
        } else {
          console.error('Error getting location.');
        }
      },
      error => {
        console.error('Error getting location:', error);
      }
    );
  }
  
  sendloginhistory(sessionid){

    var hospital_id = localStorage.getItem('hospital_id')
    this.hospital_id = JSON.parse(hospital_id);
    var Branch_id = localStorage.getItem('organization_id')
    this.Branch_ID = JSON.parse(Branch_id);
    var patientid = localStorage.getItem('guid')

    this.patientID = JSON.parse(patientid || '{}')
    this.commonService.createloginhistory(this.patientID,this.Branch_ID,this.hospital_id,this.deviceType,this.location,this.ip,this.browser,this.os,this.osVersion,sessionid).subscribe((data)=>{
      console.log(data)
    })
  }


  browser:any
  os:any
  getsessiondetails(sessionid){
    this.commonService.getIp().subscribe((data:any)=>{
        this.ip=data.ip;
      const userAgent = window.navigator.userAgent;
      this.deviceType = this.getDeviceType(userAgent);
      // this.osVersion = this.getOSVersion(userAgent);
      this.browser = platform.name;
      console.log('Browser:',this.browser);
      this.os = platform.os.family;
      console.log('Operating System:',this.os );
      this.osVersion = platform.os.version;
      console.log('Operating System:', this.osVersion);
      console.log(this.ip, this.deviceType,this.osVersion);
      this.sendloginhistory(sessionid)
    })
  }
  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  // clearTimeout: any;
  // autoLogout(interval: number) {
    
  //   }, interval * 1000); // Convert interval from seconds to milliseconds
  // }
  
  check() {
    // Check if the user is logged in
    this.isUserLoggedIn().then(loggedIn => {
      if (!loggedIn) {
        // If the user is not logged in, clear the interval and perform logout
        localStorage.clear();
        this.route.navigate(['login']);
      }
    });
  }
session_id:any
  isUserLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      var sessionid = localStorage.getItem('session_id');
      this.session_id = JSON.parse(sessionid || '{}')
      console.log(this.patientID);
      // Check if sessionid exists
      if (!  this.session_id) {
        resolve(false); // Resolve with false if sessionid does not exist
        return;
      }
  
      // No need to parse sessionid as it's already a string
  
      this.commonService.checkuser(this.patientID,   this.session_id).subscribe((res) => {
        var checkdata = res[0];
  
        if (checkdata && checkdata.count === 1) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, (error) => {
        console.error('Error checking user status:', error);
        resolve(false); // Resolve with false if there's an error
      });
    });
  }

  isValid:any
    async verifyToken(){
      // console.log(this.secret)
    this.http.post<{ isValid: boolean }>(environment.apiurl+'phr_patient/verify', { patientID:this.userData.guid,token: this.token, secret: this.secret })
      .subscribe(
        response => {
          this.isValid = response.isValid;
        console.log("done")
        if(this.isValid){
      this.commonService.getUserDetails(this.userData.guid).subscribe((res)=>{
            console.log(res[0])
            this.handleLoginSuccess(res[0], this.sessionid);
          });
         
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Otp not match' });
        }
        },
        error => {
        
          console.error('Error verifying token:', error);
        }
      );
  }


  // for passkey access
  async login() {
    try {
      // Step 1: Get the login challenge options from the server
      const response = await this.commonService.loginChallenge(this.userData.guid).toPromise();
      const { options } = response;
  
      // Step 2: Perform the authentication using the provided options
      const authenticationResult = await startAuthentication(options);
      console.log(authenticationResult);
  
      // Step 3: Verify the authentication result with the server
      const verifyResponse = await this.commonService.loginVerify(this.userData.guid, authenticationResult).toPromise();
  
      // Step 4: Check the verification response and print true if successful
      if (verifyResponse.success) {
        console.log(true);

        //  // localStorage.setItem('session_id', JSON.stringify(sessionid));
        //  localStorage.setItem('organization_id', JSON.stringify(this.userData[0].organization_id));
        //  localStorage.setItem('hospital_id', JSON.stringify(this.userData[0].hospital_id));
        //  localStorage.setItem('guid', JSON.stringify(this.userData[0].guid));
        //  localStorage.setItem('user_name', JSON.stringify(this.userData[0].user_name));
        //  localStorage.setItem('reload', '0');
        //  // this.getsessiondetails(sessionid);
        //  this.route.navigate(['/approved']);
 this.commonService.getUserDetails(this.userData.guid).subscribe((res)=>{
            console.log(res[0])
            this.handleLoginSuccess(res[0], this.sessionid);
          });
      } else {
        console.error('Login verification failed:', verifyResponse.error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'not match ' });
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    
  }
  showbackupcodeform:boolean=false
  anotherway(){
    this.matchauthenticator=false
  this.showbackupcodeform=true
  }

  verifycode(){
    console.log(this.codeform.value,"code")
    if(this.codeform.valid){
      this.commonService.verifycode(this.userData.guid,this.codeform.value).subscribe((res)=>{
        console.log(res)
        if(res.status=='success'){
          this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Sucessfully match ' });
          this.commonService.getUserDetails(this.userData.guid).subscribe((res)=>{
            console.log(res[0])
            this.handleLoginSuccess(res[0], this.sessionid);   
            this.backupcode()
             });
        }else{
          this.messageService.add({ severity: 'error', summary: 'Service Message', detail: 'code not match'})
        }
      })
    }else{

      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'form not valid'})
    }
 
  }

  REVERSE(){
    this.matchauthenticator=true
    this.showbackupcodeform=false
}

code:any
backupcode(){
  this.commonService.genratebackupcode(this.userData.guid,this.userData.hospital_ID,this.userData.branchID).subscribe((res)=>{
console.log(res)
if(res){
this.code=res
this.downloadCodes()
// this.backupcodedilog=true


}})}


downloadCodes(): void {
  // const codesJson = JSON.stringify(this.code, null, 2); // Convert codes array to JSON string
  const codesJson =  this.code.backupCodes.join('\n'); 
  const blob = new Blob([codesJson], { type: 'application/json' }); // Create blob with JSON data
  const url = window.URL.createObjectURL(blob); // Create URL for blob
  const a = document.createElement('a'); // Create anchor element
  a.href = url;
  a.download = 'Healaxy-phr-backupcode.json'; // Set download attribute
  a.click(); // Simulate click to trigger download
  window.URL.revokeObjectURL(url); // Revoke URL to release memory
}

async checkCookieData() {
  debugger;
  const cookieData = this.cookieService.get('userData');
  console.log(cookieData);

  if (cookieData == '') {
    console.log("rahul");
    await this.sendAlertMail();
    this.setCookieData();
  }
}

setCookieData() {
  const userDataForCookie = {
    userid: this.userData[0].guid,
    username: this.userData[0].user_name
  };
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7); // Expires in 7 days

  this.cookieService.set('userData', JSON.stringify(userDataForCookie), expiryDate);
}

async sendAlertMail() {
  try {
    const res = await this.commonService.sendalertemail(this.userData, this.location).subscribe();
    console.log(res);
  } catch (error) {
    console.error('Error sending alert email', error);
  }
}
// }
}
