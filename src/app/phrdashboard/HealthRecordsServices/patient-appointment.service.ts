import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}


@Injectable({
  providedIn: 'root'
})
export class PatientAppointmentService {
  joinZoom = new EventEmitter<any>();

 


  constructor(public http:HttpClient) { }
  joinZoomMeeting(event){
    console.log('inevent');
    
      this.joinZoom.emit(event);
    }
  getReasonOfVisiservicess(patientID:any){
    
    return this.http.post<any[]>(environment.apiurl+'patient_appointment/phr_Reasonoffvisit',{patientID})

  }
  delete_PatientproblBookappoinment(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'patient_appointment/phr_Patientprobl', { patientID })
  }

  filterreasonofvisitservices(text:any){
    return this.http.post<any[]>(environment.apiurl+'patient_appointment/phr_filterreasonofvisitservices',{text})  
 }


 gethospitallocationservicess(patientID:any){
  return this.http.post(environment.apiurl+'patient_appointment/phr_gethospitaldata',{patientID})
}

getprovidernameservicess(newhospitalid:any){
  return this.http.post(environment.apiurl+'patient_appointment/phr_providernamedata',{newhospitalid})
}




getAllProvidersOfhospitalServices(patientID:any, newhospitalid:any){
   return this.http.post<any[]>(environment.apiurl + 'patient_appointment/phr_getAllProvidersOfhospital', {patientID, newhospitalid})
  }

  submit_reasonofvisitservice(reasonofvisitinsert:any,patientID:any,datetime:any){
    
    return this.http.post<any[]>(environment.apiurl+'patient_appointment/phr_submit_reasonofvisitservice',{reasonofvisitinsert,patientID,datetime})

  }

  submit_HospitalAddressservice(Hospitallocationinsert:any,patientID:any,datetime:any,seletedHospitalId:any){
    
    return this.http.post<any[]>(environment.apiurl+'patient_appointment/phr_submit_Hospitaladdressdata',{Hospitallocationinsert,patientID,datetime,seletedHospitalId})

  }
  
  submit_ProviderNameservice(providerdatainsert:any,patientID:any,datetime:any, seletedHospitalproviderId:any,Provider_id:any){
    
    return this.http.post<any[]>(environment.apiurl+'patient_appointment/phr_submit_Provider_data',{providerdatainsert,patientID,datetime, seletedHospitalproviderId,Provider_id})

  }

  delete_provider(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'patient_appointment/phr_delprovider', { patientID })
  }
  delete_hospital(patientID:any){
    return this.http.post<any[]>(environment.apiurl+'patient_appointment/phr_hospital',{patientID})
  }

  getClinicNameservicess(organization_id:any){
    return this.http.post(environment.apiurl+'patient_appointment/phr_hospitalClinicData',{organization_id})  
  }
  
  submit_slottime_service(finalData:any){
    
    return this.http.post<any[]>(environment.apiurl+'patient_appointment/phr_slottimebokking',{finalData})

  }

  getslotbookingtimeservicess(patientID:any,newhospitalid2:any, ProviderID:any){
    return this.http.post<any[]>(environment.apiurl + 'patient_appointment/phr_getSlot_Booking', {patientID, newhospitalid2, ProviderID})
  }

   reqestforvisit(data:any,obj:any){
    return this.http.post<any[]>(environment.apiurl+'patient_appointment/phr_reqestforvisit',{data,obj})

   }
   Appoinmenttype(){
    return this.http.get<any[]>(environment.apiurl+'patient_appointment/phr_appoinmenttype')

   }
}
