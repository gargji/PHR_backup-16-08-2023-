import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class HealthrecordsservicesService {
setmsg:any

  constructor(public http: HttpClient) { }


  // }

// document start
  GetPatientDocument(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_getpatientdocument', { patientID: patientID })
  }
  GetPatientmailDocument(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_sharewithmail', { patientID: patientID })
  }
  getdocbyid(docid: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_getdocbyid', { docid: docid })
  }


  uploaddocument(patientID: any, branchID: any, hospital_ID: any, fullpathArray: any, totalSizeKB: any,uploadDocumentform:any ) {
    console.log(fullpathArray)
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_uploaddocument', { patientID: patientID, branchID: branchID, hospital_ID: hospital_ID, fullpathArray: fullpathArray, totalSizeKB: totalSizeKB,uploadDocumentform:uploadDocumentform})
  }
  sharedoc(documenturl:any,patientID: any, branchID: any, hospital_ID: any, documentshare: any, selecteddoc: any, ) {
    // console.log(fullpathArray)
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_sharedoc', {documenturl:documenturl, patientID: patientID, branchID: branchID, hospital_ID: hospital_ID, documentshare: documentshare, selecteddoc: selecteddoc})
  }
  sharedocAll(documenturl:any,patientID: any, branchID: any, hospital_ID: any, documentshare: any, selecteddoc: any, ) {
    // console.log(fullpathArray)
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_sharedocAll', {documenturl:documenturl, patientID: patientID, branchID: branchID, hospital_ID: hospital_ID, documentshare: documentshare, selecteddoc: selecteddoc})
  }

  sendFileToServer(formData: any) {
    console.log(formData);
    
    return this.http.post<any>( environment.apiurl+'who/uploadProfile', formData)
  }

  // sendFileToServer(formData: any) {
  //   console.log(formData);

  //   return this.httpclient.post<any>(environment.apiurl + 'who/uploadProfile', formData)
  // }

  createfolder(patientID:any,branchID:any,hospital_ID:any,createfolderform:any){
    return this.http.post<any>( environment.apiurl+'healthRecord/phr_createfolder',{patientID:patientID,branchID:branchID,hospital_ID:hospital_ID,createfolderform:createfolderform})
  }

  getfolders(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_getfoldersname', { patientID:patientID })
  }


  sharebyme(patientID: any){
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_sharebyme', { patientID:patientID })
  }
  // secretkey(data:any){
  //   // const setmsg = data
  //   this.setmsg = data;
  //   console.log(this.setmsg,"this is secret key serviceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
  //   console.log(this.getmsg())

  // }
  getmsg(){
    console.log(this.setmsg)
    return this.setmsg
  }
//   document end

// flowsheet start
changetimeof_flowsheet(timeid:any,date1:any,patientguid:any){
  return this.http.post(environment.apiurl + 'flowsheet/changetimeof_flowsheet',{id:timeid,date1:date1,patientguid:patientguid})
}
deletevitalflowsheetdata(timeid:any){
  return this.http.post(environment.apiurl + 'flowsheet/deletevitalflowsheetdata',{id:timeid})
}

saveflowsheetColumData(cols:any,patientguid:any){
  return this.http.post(environment.apiurl+'flowsheet/saveflowsheetColumData',{cols,patientguid})
}
getflowsheetcolumdata(patientguid:any){
  return this.http.post(environment.apiurl+'flowsheet/getflowsheetcolumdata',{patientguid})
}
get_transation_vital_data(patientguid:any){
  return this.http.post(environment.apiurl+'flowsheet/get_transation_vital_data',{patientguid})
}
getflowsheetdata(){
  return this.http.get(environment.apiurl+'flowsheet/getflowsheetdata')
}
flowsheetheaderdata(){
  return this.http.get(environment.apiurl+'flowsheet/flowsheetheaderdata')

}
flowsheetsave(flowsheetdatas:any,flowsheetvital:any,patientguid:any){
  return this.http.post(environment.apiurl+'flowsheet/flowsheetsave_data',{flowsheetdatas,flowsheetvital,patientguid})
}
flowsheetCheckBoxsave(flowsheetvital:any,patientguid:any){
  return this.http.post(environment.apiurl+'flowsheet/flowsheetCheckBoxsave',{flowsheetvital,patientguid})
}
getflowsheetCheckBoxsave(patientguid:any){
  return this.http.post(environment.apiurl+'flowsheet/flowsheetCheckBoxsaveget',{patientguid})
}

sidebarsubheaderdata(sidebarsubheader:any,patientguid:any){
  return this.http.post(environment.apiurl+'flowsheet/sidebarsubheaderdata',{sidebarsubheader,patientguid})
}
graphdata(flowsheetsubheader:any,patientguid:any){
  return this.http.post(environment.apiurl+'flowsheet/graphdata',{flowsheetsubheader:flowsheetsubheader,patientguid:patientguid})
}

vitalsitedata(){
  return this.http.get(environment.apiurl+'flowsheet/getvitalsitedata')
}
cuffsize(){
  return this.http.get(environment.apiurl+'flowsheet/getcuffsize')
}
getposition(){
  return this.http.get(environment.apiurl+'flowsheet/getposition')
}
getmethod(){
  return this.http.get(environment.apiurl+'flowsheet/getmethod')
}
gettempraturedevice(){
  return this.http.get(environment.apiurl+'flowsheet/gettempraturedevice')
}
getConsciousness(){
  return this.http.get(environment.apiurl+'flowsheet/getConsciousness')
}

// flowsheet end

// procedure start
  get_procedure_data(text: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_getprocedure_data', { text })
  }

  get_indication_data(text: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_getprocedure_indication', { text })
  }

  get_procedure_type() {
    return this.http.get<any[]>(environment.apiurl + 'healthRecord/phr_get_procedure_type')
  }

  submit_procedure(proceduredata: any, patientID: any, hospital_ID: any, Branch_ID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/submit_proceduredata', { proceduredata: proceduredata, patientID: patientID, hospital_ID: hospital_ID, Branch_ID: Branch_ID })

  }

  update_procedure(proceduredata: any, id: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/update_procedure', { proceduredata: proceduredata, id: id })

  }
  getmedicationDate(patientID: any) {

    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_patient', { patientID })

  }
  getproceduredata(patientID: any) {

    return this.http.post<any[]>(environment.apiurl + 'healthRecord/procedure_data', { patientID })

  }
// procedure end

  getAllergiesData(patientID: any) {

    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_allergies', { patientID })

  }
  getAllergiestype(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_allergiestype', { patientID })
  }

  getgetImmunizationsData(patientID: any) {

    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_Immunizations', { patientID })

  }

  getpatientproblem(patientID: any) {

    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_patient_problem', { patientID })

  }

  getVitals(patientID: any) {

    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_vitals', { patientID })

  }

  getplanofcare(patientID: any) {

    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_planofcare', { patientID })

  }


  master_drug(text: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/master_drug', { text })
  }

  submit_madiaction(medicationdata: any, patientID: any, hospital_ID: any, Branch_ID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/submit_madiactiondata', { medicationinsert: medicationdata, patientID: patientID, hospital_ID: hospital_ID, Branch_ID: Branch_ID })

  }

// VISIT
  getVisitsData(patientID: any) {

    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_Immunizations', { patientID })

  }
  getvisitrecordData(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_visitsrecord', { patientID })
  }

  getrequestvisitData(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_requestvisit', { patientID })
  }

  deletevisitrecord(ID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_visitrecorddelete', { id:ID })
  }

  deletereqestrecord(ID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_reqestrecorddelete', { id:ID })
  }


  // VISIT
  getradiologyData(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/getTransactionLabOrderwithResult', { patientID })
  }

  getInvestigationData(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_getInvestigation', { patientID })
  }


  getFamiltHistory(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_getFamiltHistory', { patientID })
  }

  getProcedureHistoryservice(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_getProcedureHistory', { patientID })
  }

  getTobaccoHistoryservice(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_getTobaccoHistory', { patientID })
  }
  getSexualHistoryservice(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_getSexualHistory', { patientID })
  }

  getImplantedDeviceshistoryservice(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_ImplantedDeviceshistory', { patientID })
  }

  getgetHospitalizationhistoryservice(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_getHospitalizationhistory', { patientID })
  }



  getAlcohslSubstanceshistoryservice(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_getAlcohslSubstanceshistory', { patientID })
  }

  delete_Allergy(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_delete_alargye', { patientID })
  }

  delete_Patientprobl(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_Patientprobl', { patientID })
  }

  

  delete_medication(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_delmedication', { patientID })
  }

  delete_family_history(id: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_delfamilyhistory', { id })
  }
  delete_immunization(id: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_delimmunization', { id })
  }

  delete_Procedure(id: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_delprocedure', { id })
  }

  edit_procedure(id: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_editprocedure', { id })
  }

  
 edit_medication(id: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_editmedication', { id })
  }



  getTransactionLabOrderForImportResutlsAPI(data: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/getTransactionLabOrderForImportResutls', { data })
    // return this.http.post<any[]>(environment.apiurl+'healthRecord/getTransactionLabOrderForImportResutls',{data:data, patientID:patientID})
  }

  submit_healthissue(patientproblemdata: any, patientID: any, hospital_ID: any, Branch_ID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/submit_healthissuedata', { currenthealthinsert: patientproblemdata, patientID: patientID, hospital_ID: hospital_ID, Branch_ID: Branch_ID })

  }
  master_healthisse(text: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/healthisse', { text })
  }



  allargyshowdata(summaryAllergiesdata: any, patientID: any, hospital_ID: any, Branch_ID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/submit_allargydata', { allargyinsert: summaryAllergiesdata, patientID: patientID, hospital_ID: hospital_ID, Branch_ID: Branch_ID })

  }

  masterallargy(text: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/masterAllargy', { text })
  }

  get_Manufacrure_data(text: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/get_Manufacrure_data', { text });
  }

  masterImmunizations(text: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/mastermasterImmunizations', { text })
  }



  Immunizationshowdata(summaryImmunizations: any, patientID: any, hospital_ID, Branch_ID) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/submit_Immunization', { Immunizationsinsert: summaryImmunizations, patientID: patientID, hospital_ID: hospital_ID, Branch_ID: Branch_ID })

  }

  getseveritydataShow(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_allergy_severity', { patientID })
  }

  getfamilystatusdata(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_family_data_status', { patientID })
  }

  getfamilyRelation(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_family_data_relation', { patientID })
  }

  getMedFrequencydataShow(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_Med_FrequencydataShow', { patientID })
  }

  getMeddosequantity(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_Med_Dosequantity', { patientID })
  }


  getMedInstrationsdataShow(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_Med_InstrationsdataShow', { patientID })
  }

  familyhistoryinsertdata(FamiltHistorydata: any, patientID: any, hospital_ID: any, Branch_ID: any) {

    return this.http.post<any[]>(environment.apiurl + 'healthRecord/submit_FamiltHistorydata', { FamiltHistorydata: FamiltHistorydata, patientID: patientID, hospital_ID: hospital_ID, Branch_ID: Branch_ID })


  }

  masterfamilyhistory(text: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_master_fimalyhistory', { text })
  }

  getflowvitalsitedataShow(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/phr_flowvitaldataShow', { patientID })
  }


  vitaldatasubmit(vitalsdata: any, patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/submit_vitaldata', { vitaldatainsert: vitalsdata, patientID: patientID })
  }





  // invoice
  getinvoicedata(patientID: any) {
    return this.http.post<any[]>(environment.apiurl + 'healthRecord/getinvoicedata', { patientID: patientID })
  }



  //Diet services
  getAllDietType() {
    return this.http.get(environment.apiurl + 'healthRecord/dietType');
  }
  addDiet(payload: any) {
    return this.http.post(environment.apiurl + 'healthRecord/addDiet', payload);
  }
  deleteDietById(dietId: string) {
    return this.http.delete(environment.apiurl + `healthRecord/diet/${dietId}`);
  }
  getAllDietRecords(payload: any) {
    return this.http.post(environment.apiurl + 'healthRecord/allDietRecord', payload);
  }
  getAllTherapyType() {
    return this.http.get(environment.apiurl + 'healthRecord/therapyType');
  }
  getTherapyNameList(data: any) {
    return this.http.post(environment.apiurl + 'healthRecord/therapyNameList', data);
  }
  addTherapy(payload: any) {
    return this.http.post(environment.apiurl + 'healthRecord/addTherapy', payload);
  }
  deleteTherapyById(therapyId: string) {
    return this.http.delete(environment.apiurl + `healthRecord/therapy/${therapyId}`);
  }
  getAllTherapyRecords(payload: any) {
    return this.http.post(environment.apiurl + 'healthRecord/therapyList', payload);
  }

  //diet end 
// pharmacy start
findCountry(text) {
  return this.http.post(environment.apiurl + 'healthRecord/findCountry', { text: text });

}
getStatesAPI(countryId) {
  return this.http.post<any>(environment.apiurl + 'healthRecord/getStates', { countryId });

}
getDistrictDataAPI(states_name) {
  return this.http.post<any>(environment.apiurl + 'healthRecord/getDisrict', { states_name });

}
getPincodesAccToDistrictAPI(district: any) {
  return this.http.post<any>(environment.apiurl + 'healthRecord/getPincodesAccToDistrict', { district });
}
findPostalCode(text: any) {
  return this.http.post<any>(environment.apiurl + 'healthRecord/findPostalCode', { text: text });
}


submitpharmacydata(patientID,hospital_ID,branchID,formvalue){
  return this.http.post(environment.apiurl + 'healthRecord/addpharmacydata', { patientID,hospital_ID,branchID,formvalue });
}
getpharmacydata(patientID){
  return this.http.post(environment.apiurl + 'healthRecord/getpharmacydata', { patientID });
}
delete_Pharmacy(id) {
  return this.http.post<any[]>(environment.apiurl + 'healthRecord/delete_pharmacy', { id })
}
// pharmacy end

// lab
getlaborder(patientID){
  return this.http.post(environment.apiurl + 'healthRecord/getlaborder', { patientID });
}
getlabresult(patientID){
return this.http.post(environment.apiurl + 'healthRecord/getlabresult', { patientID });
}

getlabresultdetail(orderId,patientID){
  return this.http.post(environment.apiurl + 'healthRecord/getlabresultdetail', {orderId, patientID }); 
}
getdownload(orderId,patientID){
  return this.http.post(environment.apiurl + 'healthRecord/getdownload', {orderId, patientID }); 
}


genrateLABTEMP(patientID){
  return this.http.post(environment.apiurl + 'healthRecord/genrateLABTEMP', { patientID }); 

}
detailsdata(modeldata){
  return this.http.post(environment.apiurl + 'healthRecord/detailsdata', { modeldata }); 
}
// lab end



// task
/* Patient Task Services Start */

getPatientTaskDetails(patientId: string) {
  return this.http.post(environment.apiurl + 'healthRecord/patientTaskList', { patientId });
}

updateTaskStatus(differPayload: any) {
  return this.http.put(environment.apiurl + 'healthRecord/updateTaskStatus', differPayload)
}

/* Patient Task Services End */
}

