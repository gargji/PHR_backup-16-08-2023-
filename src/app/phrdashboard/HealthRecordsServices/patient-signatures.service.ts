import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
// import { HttpHeaders } from '@angular/common/http';
// import (HttpHeaders)

@Injectable({
  providedIn: 'root'
})
export class PatientSignaturesService {
  measagedataload=new EventEmitter<any>();
  messagecontanddata:any
  constructor(private http:HttpClient) { }
  


  datarelode(){
    console.log('vaibhav');
    
    this.measagedataload.emit(event);
    
  }
  datarelodebookmarked(){
    console.log('vaibhav');
    
    this.measagedataload.emit(event);
    
  }
  
  // datarelode(){
  //   console.log('vaibhav');
  //   debugger
  //   this.measagedataload.emit(event);
    
  // }
  // datarelodebookmarked(){
  //   console.log('vaibhav');
  //   debugger
  //   this.measagedataload.emit(event);
    
  // }
 uploadFilesMetadata(formdata:any){
  return this.http.post<any[]>(environment.apiurl+'patients_signature/uploadFilesMetadata',formdata);
 }




 uploadFilesMetadatastore(patient_Id:any, patient_signatures:any){
  return this.http.post<any[]>(environment.apiurl+'patients_signature/uploadFilesMetadatastore',{patient_Id:patient_Id,patient_signatures:patient_signatures});
 }
 getpatientsignatureData(patientID:any){
  return this.http.post<any[]>(environment.apiurl+'patients_signature/phr_patientsignature',{patientID})
 }


delete_signaturedata(patientID:any){
  return this.http.post<any[]>(environment.apiurl+'patients_signature/phr_delete_signature',{patientID})
}



// set all service form messagephr center start hear


uploadFileToServer(uploadFiles: any) : Observable<any> {
  //  console.log(uploadFiles.get("DATA"));
   const headers = new HttpHeaders().append("enctype", "multipart/form-data")
   return this.http.post<any>(environment.apiurl+ "messagephr/UPLOAD_FILES", uploadFiles,{ headers:headers ,reportProgress: true, observe: 'events'})
  }


uploadFilesmessageMetadata(replyMessage:any,Conversation_id:any,documents:any,sender_id:any,messagid:any,hospital_ID,branchID){
  console.log(replyMessage.value,'chouhan');
  return this.http.post(environment.apiurl+'messagephr/Save_message',{replyMessage,Conversation_id,documents,sender_id,messagid,hospital_ID,branchID});
 }
 
 Draftmessage(replyMessage:any,Conversation_id:any,Draftmessage:any,patientID,hospital_ID,branchID){
  console.log(replyMessage.value,'chouhan');
  
  return this.http.post(environment.apiurl+'messagephr/Draft_message',{replyMessage,Conversation_id,Draftmessage,patientID,hospital_ID,branchID});
 }
 getDoctor_user_registration(text:any){
  console.log('chouhan',text);
  
  return this.http.post(environment.apiurl+'messagephr/getDoctor_user_registration',{text:text});
 }
 getmessage_detail(providername:any,Conversation_id:any,){
  return this.http.post(environment.apiurl+'messagephr/getmessage_detail',{providername,Conversation_id});
 }
 getmessage_documents_filename(Conversation_id:any){
  return this.http.post(environment.apiurl+'messagephr/getmessage_documents_filename',{Conversation_id});
 }
 getMessage_Inboxdetail(patientID){
  return this.http.post(environment.apiurl+'messagephr/getMessage_Inboxdetail',{patientID});
 }
 bookmark_message(messagetype:any,Conversation_id:any){
  return this.http.post(environment.apiurl+'messagephr/bookmark_message',{messagetype,Conversation_id});
 }
 get_BookMarked_Data(messagephr:any,Conversation_id:any,patientID){
  return this.http.post(environment.apiurl+'messagephr/get_BookMarked_Data',{messagephr,Conversation_id,patientID});
 }

 get_BookMarked_Datalength(patientID){
  return this.http.post(environment.apiurl+'messagephr/get_BookMarked_Datalength',{patientID});
 }
  Trash_message(trashmessage:any,Conversation_id:any){
    return this.http.post(environment.apiurl+'messagephr/Trash_message',{trashmessage,Conversation_id});
   }
   trashclear(id){
    return this.http.post(environment.apiurl+'messagephr/cleartrash',{id});
   }
   getTrashmessage_detail(trshmessage:any,patient_Id){
    return this.http.post(environment.apiurl+'messagephr/getTrashmessage_detail',{trshmessage,patient_Id});
   }

   getsentmsg(patient_Id){
    return this.http.post(environment.apiurl+'messagephr/getsentmsg',{patient_Id});
   }
   get_appointment_Data(messagephr:any){
    return this.http.post(environment.apiurl+'messagephr/get_appointment_Data',{messagephr});
   }
   getmessagedraft_detail(drafts:any,patientID){
    return this.http.post(environment.apiurl+'messagephr/getmessagedraft_detail',{drafts,patientID});
   }
   get_Riminder_data(RiminderData:any){
    return this.http.post(environment.apiurl+'messagephr/get_Riminder_data',{RiminderData});
   }
   uploadocumentsfiles(formDataArray:any,Conversation_id:any,sender_id:any,replyMessage:any,messagid:any){
    return this.http.post(environment.apiurl+'messagephr/upload_documents_files',{formDataArray,Conversation_id,sender_id,replyMessage,messagid});
   }
   getPatientMessageRecords(payload: any) {
    console.log('mohit')
    return this.http.post(environment.apiurl + 'messagephr/getPatientMessageReminder', { payload });
  }

  //  preventive care 
  getmasterreminderdata(patientguid: any) {
    // return this.httpclient.post(environment.apiurl + 'reminders/getmasterreminderdata', { patientguid });
    return this.http.post<any>(environment.apiurl + 'reminders/getmasterreminderdata', { patientguid });
  }
  getvaccinedata(patientguid: any) {
    // return this.httpclient.post(environment.apiurl + 'reminders/getmasterreminderdata', { patientguid });
    return this.http.post<any>(environment.apiurl + 'reminders/getvaccinedata', { patientguid });
  }


  //  preventive care end
  //  mohit

}


// set all service form messagephr center end hear


