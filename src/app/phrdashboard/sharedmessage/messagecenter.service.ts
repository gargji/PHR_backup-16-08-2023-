
import { Injectable,Input,Output,EventEmitter, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagecenterService {

  
  @Output() aClickedEvent = new EventEmitter<string>();
  // @Output() aClickedEvent = new EventEmitter<any>();
  // header: any =new Headers();
  constructor(private httpClient: HttpClient) { }
  // openMeassagepopup(popup: any) {
  //   console.log('openMeassagepopup');
    
  //   this.aClickedEvent.emit(popup);
  //   console.log(popup);
    
  // }


  uploadFileToServer(uploadFiles: any) : Observable<any> {
    //  console.log(uploadFiles.get("DATA"));
     const headers = new HttpHeaders().append("enctype", "multipart/form-data")
     return this.httpClient.post<any>(environment.apiurl+ "messagephr/UPLOAD_FILES", uploadFiles,{ headers:headers ,reportProgress: true, observe: 'events'})
    }


  uploadFilesMetadata(replyMessage:any,Conversation_id:any,documents:any,sender_id:any,messagid:any){
    console.log(replyMessage.value,'chouhan');
    return this.httpClient.post(environment.apiurl+'messagephr/Save_message',{replyMessage,Conversation_id,documents,sender_id,messagid});
   }
   
   Draftmessage(replyMessage:any,Conversation_id:any,Draftmessage:any){
    console.log(replyMessage.value,'chouhan');
    
    return this.httpClient.post(environment.apiurl+'messagephr/Draft_message',{replyMessage,Conversation_id,Draftmessage});
   }
   getDoctor_user_registration(text:any){
    console.log('chouhan',text);
    
    return this.httpClient.post(environment.apiurl+'messagephr/getDoctor_user_registration',{text:text});
   }
   getmessage_detail(providername:any,Conversation_id:any,){
    return this.httpClient.post(environment.apiurl+'messagephr/getmessage_detail',{providername,Conversation_id});
   }
   getmessage_documents_filename(Conversation_id:any){
    return this.httpClient.post(environment.apiurl+'messagephr/getmessage_documents_filename',{Conversation_id});
   }
   getMessage_Inboxdetail(patientID){
    return this.httpClient.post(environment.apiurl+'messagephr/getMessage_Inboxdetail',{patientID});
   }
   bookmark_message(messagetype:any,Conversation_id:any){
    return this.httpClient.post(environment.apiurl+'messagephr/bookmark_message',{messagetype,Conversation_id});
   }
   get_BookMarked_Data(message:any,Conversation_id:any){
    return this.httpClient.post(environment.apiurl+'messagephr/get_BookMarked_Data',{message,Conversation_id});
   }
    Trash_message(trashmessage:any,Conversation_id:any){
      return this.httpClient.post(environment.apiurl+'messagephr/Trash_message',{trashmessage,Conversation_id});
     }
     getTrashmessage_detail(trshmessage:any){
      return this.httpClient.post(environment.apiurl+'messagephr/getTrashmessage_detail',{trshmessage});
     }
     get_appointment_Data(message:any){
      return this.httpClient.post(environment.apiurl+'messagephr/get_appointment_Data',{message});
     }
     getmessagedraft_detail(drafts:any){
      return this.httpClient.post(environment.apiurl+'messagephr/getmessagedraft_detail',{drafts});
     }
     get_Riminder_data(RiminderData:any){
      return this.httpClient.post(environment.apiurl+'messagephr/get_Riminder_data',{RiminderData});
     }
     uploadocumentsfiles(formDataArray:any,Conversation_id:any,sender_id:any,replyMessage:any,messagid:any){
      return this.httpClient.post(environment.apiurl+'messagephr/upload_documents_files',{formDataArray,Conversation_id,sender_id,replyMessage,messagid});
     }
     
  }
//   constructor() { }
// }this.replyMessage.value, this.Conversation_id, this.destinationPath, this.sender_id
