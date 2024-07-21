import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientMessageService {

  constructor(private http: HttpClient) { }

  /* Patient Message Reminder Services */
  getPatientMessageRecords(payload: any) {
    return this.http.post(environment.apiurl + 'messagephr/getPatientMessageReminder', { payload });
  }

}
