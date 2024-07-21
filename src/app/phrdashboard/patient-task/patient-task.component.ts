import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HealthrecordsservicesService } from '../HealthRecordsServices/healthrecordsservices.service';

@Component({
  selector: 'app-patient-task',
  templateUrl: './patient-task.component.html',
  styleUrls: ['./patient-task.component.css'],
})
export class PatientTaskComponent implements OnInit {
  patientID: string;
  hospitalID: string;
  branchID: string;
  patientTaskDetails: any;
  patientTaskDetailsLength: any;
  menuId: any;
  differReasonDialog: boolean = false;
  differReasonForm: FormGroup;
  differEvent: any;
  differRowData: any;
  cars = [
    { "brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff" },
  ]


  constructor(
    private healthRecordsServices: HealthrecordsservicesService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getLocalStorageDetails();
    this.getPatientTaskList();
    this.differReasonForm = this.fb.group({
      differReason: ['', Validators.required]
    })
  }

  getLocalStorageDetails() {
    var patient_Id = localStorage.getItem('guid');
    this.patientID = JSON.parse(patient_Id || '{}');
    var hospital_Id = localStorage.getItem('organization_id');
    this.hospitalID = JSON.parse(hospital_Id || '{}');
    var branch_Id = localStorage.getItem('hospital_Id');
    this.branchID = JSON.parse(branch_Id || '{}');
  }

  getPatientTaskList() {
    this.healthRecordsServices.getPatientTaskDetails(this.patientID).subscribe((res) => {
      this.patientTaskDetails = res;
      this.patientTaskDetailsLength = this.patientTaskDetails.length;
    })
  }

  ChangeTaskStatus(event: any, rowData: any,) {
    let index = event;
    let itemId = rowData
    const payload = {
      index, itemId
    }
    this.healthRecordsServices.updateTaskStatus(payload).subscribe((res) => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Status Changed Successfully', });
        this.getPatientTaskList();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Status Changed Failed!', });
      }
    })
  }


  ChangeDefferTaskStatus(event: any, rowData: any) {
    this.differReasonDialog = true;
    this.differEvent = event;
    this.differRowData = rowData;
  }
  addDifferReason() {
    this.differReasonDialog = false;
    if (!this.differReasonForm.valid) {
      return;
    }
    const payload = this.differReasonForm.value;
    payload['index'] = this.differEvent;
    payload['itemId'] = this.differRowData;
    this.healthRecordsServices.updateTaskStatus(payload).subscribe((res) => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Status Changed Successfully', });
        this.differReasonForm.reset();
        this.getPatientTaskList();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Status Changed Failed!', });
      }
    });
  }

}
