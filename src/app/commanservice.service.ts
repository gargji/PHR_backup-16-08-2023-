import { EventEmitter, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
@Injectable({
  providedIn: 'root'
})
export class CommanserviceService {
  joinZoom = new EventEmitter<any>();




  constructor( private httpClient: HttpClient, ) { }
  createUser(data:any,sessionid,ip){
  
    return this.httpClient.post(environment.apiurl+'phr_patient/Phrlogin',{data:data,sessionid:sessionid,ip:ip})
  }
  


 joinZoomMeeting(event){
  console.log('inevent');
  
    this.joinZoom.emit(event);
  }
  // this.registrationForm.value,this.hopitalID,this.patient,this.username,this.branchId
  submit_registration_details(registrationForm:any,hopitalID:any,patient:any,username:any,branchId:any){
    console.log('submit_registration_details');
    
    return this.httpClient.post(environment.apiurl+'phr_patient/phrregister',{registrationForm,patient,hopitalID,username,branchId})
  }
// to get email and name
getemail(data:any){
  return this.httpClient.post(environment.apiurl+'phr_patient/Phrgetemail',{data:data})
}
getuserdata(data:any){
  return this.httpClient.post(environment.apiurl+'phr_patient/Phrgetuserdetail',{data:data})
}

getcountry(){
  return this.httpClient.get(environment.apiurl+'phr_patient/Phrgetcountry')
}
getcountry1(text:any){
  return this.httpClient.post(environment.apiurl+'phr_patient/Phrgetcountry1',{text})
}
getstate(text:any){
  return this.httpClient.post(environment.apiurl+'phr_patient/Phrgetstate',{text})
}
getcity(code:any,name:any){
  return this.httpClient.post(environment.apiurl+'phr_patient/Phrgetcity',{code,name})
}

chnagepass(guid:any,data:any){
  return this.httpClient.post(environment.apiurl+'phr_patient/chnagepass',{guid,data})
}

sendotp(otp:any,email:any,){
  console.log(otp,email)
  return this.httpClient.post(environment.apiurl+'phr_patient/send-otp',{otp,email})
}

// new flowsheet 
getflowsheetdataheader(labsname:any) {
  return this.httpClient.post(environment.apiurl + 'flowsheets/getflowsheetdataheader',{labsname})
}
flowsheetlabsdataheader(labsname:any) {
  return this.httpClient.post(environment.apiurl + 'flowsheets/flowsheetlabsdataheader',{labsname})
}

getLabsflowsheetCheckBoxsave(patientguid: any,labsname:any) {
    return this.httpClient.post(environment.apiurl + 'flowsheets/labsflowsheetCheckBoxsaveget', { patientguid,labsname })
  }
  LabsflowsheetCheckBoxsave(flowsheetvital: any, patientguid: any,labsname:any) {
    return this.httpClient.post(environment.apiurl + 'flowsheets/LabsflowsheetCheckBoxsave', { flowsheetvital, patientguid,labsname })
  }
  getmasterLabsflowsheetheader() {
    return this.httpClient.get(environment.apiurl + 'flowsheets/getmasterLabsflowsheetheader')
  }

  Labsflowsheetsave(flowsheetdatas: any, flowsheetvital: any, patientguid: any,labsname:any) {
    return this.httpClient.post(environment.apiurl + 'flowsheets/Labsflowsheetsave', { flowsheetdatas, flowsheetvital, patientguid ,labsname})
  }
  getlabsflowsheetcontaindata(patientguid: any,labsname:any) {
    return this.httpClient.post(environment.apiurl + 'flowsheets/getlabsflowsheetcontaindata', { patientguid,labsname })
  }
  savelabsflowsheetColumData(cols: any, patientguid: any,labsname:any) {
    return this.httpClient.post(environment.apiurl + 'flowsheets/savelabsflowsheetColumData', { cols, patientguid,labsname })
  }
  getlabsflowsheetcolumdata(patientguid: any,labsname:any) {
    return this.httpClient.post(environment.apiurl + 'flowsheets/getlabsflowsheetcolumdata', { patientguid ,labsname})
  }
  getflowsheetfavrate(){
    return this.httpClient.get(environment.apiurl + 'flowsheets/getflowsheetfavrate');
  }
  getlabsnamelist(event){
    return this.httpClient.post(environment.apiurl + 'flowsheets/getlabsnamelist',{event});
  }
  // share record
  sharerecorddata(patient_id,hospital_id,Branch_ID,sharerecordfrom){
    return this.httpClient.post(environment.apiurl + 'phr_patient/sharerecorddata',{patient_id,hospital_id,Branch_ID,sharerecordfrom});
  }
  getsharerecorddata(patient_id){
    return this.httpClient.post(environment.apiurl + 'phr_patient/getsharerecorddata',{patient_id});
  }
  // check user pass

  checkpass(guid,Password){
    return this.httpClient.post(environment.apiurl + 'phr_patient/checkpass',{guid,Password});
  }
  // for account
  getIp(){
    return this.httpClient.get("https://ipapi.co/json")
  }
  createloginhistory(patientID,Branch_ID,hopitalID,deviceName,location,ip,browser,os,osVersion,sessionid){
    return this.httpClient.post(environment.apiurl + 'phr_patient/createloginhistory',{patientID,Branch_ID,hopitalID,deviceName,location,ip,browser,os,osVersion,sessionid});
  }
  getactivityhistory(patientID){
    return this.httpClient.post(environment.apiurl + 'phr_patient/getactivityhistory',{patientID});
  }
  getsessionhistory(patientID){
    return this.httpClient.post(environment.apiurl + 'phr_patient/getsessionhistory',{patientID});
  }


  checkuser(patientID,session_id){
    return this.httpClient.post(environment.apiurl + 'phr_patient/checkuser',{patientID,session_id});
  }
  updatestatus(patientID,session_id){
    return this.httpClient.post(environment.apiurl + 'phr_patient/chnagsessionestatus',{patientID,session_id});
  }

  addnumber(patientID,mobile){
    return this.httpClient.post(environment.apiurl + 'phr_patient/add_patient_number',{patientID,mobile});
  }

  addemail(patientID,email){
    return this.httpClient.post(environment.apiurl + 'phr_patient/add_patient_email',{patientID,email});
  }


  getpatientnumber(patientID){
    return this.httpClient.post(environment.apiurl + 'phr_patient/get_patient_number',{patientID});
  }
  setbydeaultnumber(item,activenumber){
    return this.httpClient.post(environment.apiurl + 'phr_patient/setbydeaultnumber',{item,activenumber});
  }

  getpatientemail(patientID){
    return this.httpClient.post(environment.apiurl + 'phr_patient/get_patient_email',{patientID});
  }

  setbydeaultemail(item,activeemail){
    return this.httpClient.post(environment.apiurl + 'phr_patient/setbydeaultemail',{item,activeemail});
  }
  
  submit_allowed_ip(patientID,formvalue){
    return this.httpClient.post(environment.apiurl + 'phr_patient/submit_allowed_ip',{patientID,formvalue});
  }
  get_allowed_ip(patientID){
    return this.httpClient.post(environment.apiurl + 'phr_patient/get_allowed_ip',{patientID});
  }

  deletemail(patientID,mailid){
    return this.httpClient.post(environment.apiurl + 'phr_patient/deletemail',{patientID,mailid});
  }
  deletephone(patientID,mailid){
    return this.httpClient.post(environment.apiurl + 'phr_patient/deletephone',{patientID,mailid});
  }
  closemyaccount(patientID){
    return this.httpClient.post(environment.apiurl + 'phr_patient/closemyaccount',{patientID});
  }
  setlimit(patientID,limit){
    return this.httpClient.post(environment.apiurl + 'phr_patient/setlimit',{patientID,limit});
  }
  updatepatientimg(patientID,path){
    return this.httpClient.post(environment.apiurl + 'phr_patient/updatepatientimg',{patientID,path});
  }
  generateSecretKey(): Observable<{ secretKey: string }> {
    return this.httpClient.get<{ secretKey: string }>(environment.apiurl+'generateSecretKey');
  }
  updatesecurity(patientID,mode,active,secret){
    return this.httpClient.post(environment.apiurl+'phr_patient/updatesecurity',{patientID,mode,active,secret});
  }
  letscheck(){
    return this.httpClient.get(environment.apiurl+'registerpasskey');
  
  }


  // register(username: string) {
  //   return this.httpClient.post(environment.apiurl + 'register', { username })
  //     // .then((res: any) => {
  //     //   const { options, challenge } = res;
  //     //   return startRegistration(options)
  //     //     .then((response) => {
  //     //       return this.httpClient.post(environment.apiurl + 'register/response', { username, response, challenge }).toPromise();
  //     //     });
  //     // });
  // }
 
  registerChallenge(userId: string): Observable<any> {

    return this.httpClient.post<any>(environment.apiurl+'phr_patient/register-challenge', { userId });
  }

  registerVerify(userId: string, cred: any): Observable<any> {
    
    return this.httpClient.post<any>(environment.apiurl+'phr_patient/register-verify', { userId, cred });
  }

  loginChallenge(userId: string): Observable<any> {

    return this.httpClient.post<any>(environment.apiurl+'phr_patient/login-challenge', { userId });
  }

  loginVerify(userId: string, cred: any): Observable<any> {
    
    return this.httpClient.post<any>(environment.apiurl+'phr_patient/login-verify', { userId, cred });
  }
  deactivepasskey(patientID){
    return this.httpClient.post<any>(environment.apiurl+'phr_patient/deactivepasskey', { patientID });

  }
  updateuserdetails(patientID,formdata){
    return this.httpClient.post<any>(environment.apiurl+'phr_patient/updateuserpersonaldetail', { patientID, formdata });
  }
  genratebackupcode(patientID,hospital_ID,branchId){
    return this.httpClient.post<any>(environment.apiurl+'phr_patient/genratebackupcode', { patientID,hospital_ID,branchId });
  }
  getbackupcode(patientID){
    return this.httpClient.post<any>(environment.apiurl+'phr_patient/getBackupCodes', { patientID });
  }
  verifycode(patientID,code){
    return this.httpClient.post<any>(environment.apiurl+'phr_patient/verifycode', { patientID,code });
  }
  getUserDetails(guid){
    return this.httpClient.post<any>(environment.apiurl+'phr_patient/getUserDetails', { guid});
  }

  deleteip(itemid,patientID){
    return this.httpClient.post<any>(environment.apiurl+'phr_patient/deleteip', { itemid,patientID});
  }

  // private readonly apiUrl1 = 'https://maps.googleapis.com/maps/api/geocode/json';
  getCoordinatesForCity(cityName: string) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`;
    return this.httpClient.get(url);
  }
    getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

  sendalertemail(userdata,location){
    return this.httpClient.post<any>(environment.apiurl+'phr_patient/sendalertemail', { userdata,location});
  }
}